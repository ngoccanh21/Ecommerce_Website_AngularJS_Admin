import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaisanphamService {

  [x: string]: any;
  readonly PhotoUrl = 'http://localhost:18058/images/';

  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/LoaiSanPham"
  getAllLoaiSanPham(): Observable<any> {
    return this.http.get('http://localhost:18058/api/LoaiSanPham')
  }

  getLoaiSanPhamById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/LoaiSanPham'+id)
  }

  deleteLoaiSanPham(id:number){
    return this.http.delete('http://localhost:18058/api/LoaiSanPham/' + id)
  }

  updateLoaisanpham(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/LoaiSanPham/' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addLoaisanpham(id:any) {
    return this.http.post<any>('http://localhost:18058/api/LoaiSanPham/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  UploadPhoto(val: any) {
    return this.http.post('http://localhost:18058/api/SanPham/SaveFile', val);
  }

}
