import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

    contacts: any[] = [];
    totalRecords: number = 0;
    searchTerm: string = '';
    pageSize: number = 10;
    currentPage: number = 1;
    searchPerformed: boolean = false; // This is for not to show any records prior to search
    pageSizes: number[] = [10, 30, 50, 75, 100]; // Available page sizes
    
    constructor(private contactService: ContactService) { }

    ngOnInit() {
        // Initial load if needed
    }

    onSearch() {
        this.currentPage = 1;
        this.searchPerformed = true; // Set the flag to true when search is performed
        this.loadContacts({ first: 0, rows: this.pageSize });
    }

    loadContacts(event: any) {
        this.currentPage = (event.first / this.pageSize) + 1;
        this.contactService.getContacts(this.searchTerm, this.currentPage, this.pageSize).subscribe(response => {
            this.contacts = response.data;
            this.totalRecords = response.total;
        });
    }

    onPageSizeChange(event: any) {
      this.pageSize = event.target.value;
      this.onSearch(); // Reload contacts with the new page size
    }

    // Count status of Search results
    // Calculate the start record number
  get startRecord(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  // Calculate the end record number
  get endRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }
}
