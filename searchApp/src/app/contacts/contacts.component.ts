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
    pageSize: number = 50;
    currentPage: number = 1;
    searchPerformed: boolean = false; // This is for not to show any records prior to search
    
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
