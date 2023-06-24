import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhacungcapService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/NhaCungCap"
  getAllNCC(): Observable<any> {
    return this.http.get('http://localhost:18058/api/NhaCungCap')
  }

  getNCCById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/NhaCungCap'+id)
  }

  deleteNCC(id:number){
    return this.http.delete('http://localhost:18058/api/NhaCungCap/' + id)
  }

  updateNCC(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/NhaCungCap/' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addNCC(id:any) {
    return this.http.post<any>('http://localhost:18058/api/NhaCungCap/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
