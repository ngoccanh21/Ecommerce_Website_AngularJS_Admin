import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  [x: string]: any;
  readonly PhotoUrl = 'http://localhost:18058/images/';
  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/SanPham"
  getAllSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/SanPham')
  }

  getAllLoaiSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/LoaiSanPham')
  }

  getSanPhamByd(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/SanPham'+id)
  }

  deleteSanPham(id:number){
    return this.http.delete('http://localhost:18058/api/SanPham/' + id)
  }

  updatesanpham(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/SanPham/' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addsanpham(id:any) {
    return this.http.post<any>('http://localhost:18058/api/SanPham/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  UploadPhoto(val: any) {
    return this.http.post('http://localhost:18058/api/SanPham/SaveFile', val);
  }
}
