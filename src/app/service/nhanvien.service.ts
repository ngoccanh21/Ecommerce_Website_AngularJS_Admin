import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/NhanVien"
  getAllNhanVien(): Observable<any> {
    return this.http.get('http://localhost:18058/api/NhanVien')
  }

  getNhanVienById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/NhanVien'+id)
  }

  deleteNhanVien(id:number){
    return this.http.delete('http://localhost:18058/api/NhanVien/' + id)
  }

  updateNhanVien(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/NhanVien/(id)?id=' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addNhanVien(id:any) {
    return this.http.post<any>('http://localhost:18058/api/NhanVien/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
