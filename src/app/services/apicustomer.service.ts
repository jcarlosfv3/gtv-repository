import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApicustomerService {
  url: string = 'https://localhost:44327/api/customer';

  constructor(private  http: HttpClient)
  {

  }
  getCustomers(): Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  addCustomer(customer: Customer): Observable<Response>{
    return this.http.post<Response>(this.url, customer, httpOption);
  }

  editCustomer(customer: Customer): Observable<Response>{
    return this.http.put<Response>(this.url, customer, httpOption);
  }

  deleteCustomer(id: number): Observable<Response>{
    return this.http.delete<Response>(`${this.url}/${id}`);
  }

}
