import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.url;
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/addressBook/bookdata`);
  }

  // getEmployees(): Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/empdata`);
  // }

  saveEmpData(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/save`, data);
  }

  findById(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/find/${id}`);
  }

  editEmpData(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/edit/${id}`, data);
  }

  deletEmpData(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/remove/${id}`);
  }
}
