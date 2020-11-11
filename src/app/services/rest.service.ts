import { Customer } from 'src/app/models/Customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  private BASE_URL = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }


  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.BASE_URL);
  }

  public deleteCustomer(customer: Customer): Observable<any> {
    const options = { body: customer, withCredentials: true };
    return this.httpClient.delete<any>(this.BASE_URL, options);
  }


  public addCustomer(customer: Customer): Observable<any> {
    const cust = {
      lastName: customer.lastName, firstName: customer.firstName,
      email: customer.email, password: customer.password
    }
    const options = { withCredentials: true };
    return this.httpClient.post<any>(this.BASE_URL, cust, options);
  }


  public updateCustomer(customer: Customer): Observable<any>{
    const options = { /*body: customer,*/ withCredentials: true };
    return this.httpClient.put<any>(this.BASE_URL, customer, options);
  }
}
