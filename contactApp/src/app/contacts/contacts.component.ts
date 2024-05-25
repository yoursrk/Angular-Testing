import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: any[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void { }

  loadContacts10(): void {
    this.contactsService.getContacts10().subscribe((data) => {
      this.contacts = data;
    });
  }

    loadContacts100(): void {
      this.contactsService.getContacts100().subscribe((data) => {
        this.contacts = data;
      });
  }
 
}