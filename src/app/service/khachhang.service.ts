import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/KhachHang"
  getAllKhachHang(): Observable<any> {
    return this.http.get('http://localhost:18058/api/KhachHang')
  }

  getKhachHangById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/KhachHang'+id)
  }

  deleteKhachHang(id:number){
    return this.http.delete('http://localhost:18058/api/KhachHang/' + id)
  }

  updateKhachHang(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/KhachHang/' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addKhachHang(id:any) {
    return this.http.post<any>('http://localhost:18058/api/KhachHang/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
