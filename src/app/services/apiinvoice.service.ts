import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiinvoiceService {
  url: string = 'https://localhost:44327/api/invoice';

  constructor(private http: HttpClient) { }

  add(invoice: Invoice): Observable<Response> {
    return this.http.post<Response>(this.url, invoice, httpOption);
  }
}
