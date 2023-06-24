import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KhachhangService } from 'src/app/service/khachhang.service';
import { khachhang } from './khachhang.model';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent implements OnInit {

  khachhangs:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  khachhangModelobj: khachhang = new khachhang();

  userFilter: any = { tenKH: ''};
  total:any;
  page:number=1;

  constructor(private api:KhachhangService, private frombuiler: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      tenKH: [''],
      diaChi: [''],
      sdt: [''],
      tk: [''],
      pass: [''],
      anh: [''],
      //id tenKH diaChi sdt tk pass anh
    })
    this.getAllkhachhang();
  }

  addkhachhang() {
    this.khachhangModelobj.tenKH = this.formValue.value.tenKH;
    this.khachhangModelobj.diaChi = this.formValue.value.diaChi;
    this.khachhangModelobj.sdt = this.formValue.value.sdt;
    this.khachhangModelobj.tk = this.formValue.value.tk;
    this.khachhangModelobj.pass = this.formValue.value.pass;
    this.khachhangModelobj.anh = this.formValue.value.anh;
    this.api.addKhachHang(this.khachhangModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin khách hàng thành công');
        this.formValue.reset();
        this.getAllkhachhang();
      })
  }

  getAllkhachhang(){
    this.api.getAllKhachHang().subscribe(res=>{
      this.khachhangs=res;
    })
  }

  openForm() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(item: any) {
    //id tenKH diaChi sdt tk pass anh
    this.showAdd = false;
    this.showUpdate = true;
    this.khachhangModelobj.id = item.id
    this.formValue.controls['tenKH'].setValue(item.tenKH);
    this.formValue.controls['diaChi'].setValue(item.diaChi);
    this.formValue.controls['sdt'].setValue(item.sdt);
    this.formValue.controls['tk'].setValue(item.tk);
    this.formValue.controls['pass'].setValue(item.pass);
    this.formValue.controls['anh'].setValue(item.anh);
  }

  updatekhachhang() {
    this.khachhangModelobj.tenKH = this.formValue.value.tenKH;
    this.khachhangModelobj.diaChi = this.formValue.value.diaChi;
    this.khachhangModelobj.sdt = this.formValue.value.sdt;
    this.khachhangModelobj.tk = this.formValue.value.tk;
    this.khachhangModelobj.pass = this.formValue.value.pass;
    this.khachhangModelobj.anh = this.formValue.value.anh;
    this.api.updateKhachHang(this.khachhangModelobj, this.khachhangModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin khách hàng thành công');
        this.formValue.reset();
        this.getAllkhachhang();
      })
  }

  deletekhachhang(id: number) {
    if (confirm("Bạn có muốn xoá thông tin khách hàng?")) {
      this.api.deleteKhachHang(id).subscribe((res) => {
        this.getAllkhachhang();
      })
    }
  }

}
