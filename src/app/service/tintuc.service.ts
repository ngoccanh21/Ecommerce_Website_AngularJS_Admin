import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TintucService {

  [x: string]: any;
  readonly PhotoUrl = 'http://localhost:18058/images/';

  constructor(private http:HttpClient) { }
  url = "http://localhost:18058/api/TinTuc"
  getAllTinTuc(): Observable<any> {
    return this.http.get('http://localhost:18058/api/TinTuc')
  }

  getTinTucById(id:number): Observable<any> {
    return this.http.get('http://localhost:18058/api/TinTuc'+id)
  }

  deleteTinTuc(id:number){
    return this.http.delete('http://localhost:18058/api/TinTuc/' + id)
  }

  updateTinTuc(data:any, id:number) {
    return this.http.put<any>('http://localhost:18058/api/TinTuc/' + id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addTinTuc(id:any) {
    return this.http.post<any>('http://localhost:18058/api/TinTuc/',id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  UploadPhoto(val: any) {
    return this.http.post('http://localhost:18058/api/SanPham/SaveFile', val);
  }

}
