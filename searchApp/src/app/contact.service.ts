import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Contact {
    FirstName: string;
    LastName: string;
    Email1: string;
    MobilePhone: string;
    JobTitle: string;
    City: string;
    State: string;
    Country: string;
    Summary: string;
}

interface ContactResponse {
    data: Contact[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:3000/contacts';

    constructor(private http: HttpClient) { }

    getContacts(search: string, page: number, pageSize: number): Observable<ContactResponse> {
        let params = new HttpParams()
            .set('search', search)
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        return this.http.get<ContactResponse>(this.apiUrl, { params });
    }
}
