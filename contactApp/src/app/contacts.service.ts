import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl10 = '/api/contacts10';
  private apiUrl100 = '/api/contacts100';

    constructor(private http: HttpClient) { }

  getContacts10(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl10);
  }

  getContacts100(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl100);
  }
}
