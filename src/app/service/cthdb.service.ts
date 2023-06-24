import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CthdbService {

  constructor(private http:HttpClient) { }
  getAllCTHDB(): Observable<any> {
    return this.http.get('http://localhost:18058/api/CTHDB')
  }

  getoneCTHDB(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/CTHDB/'+id)
  }
}
