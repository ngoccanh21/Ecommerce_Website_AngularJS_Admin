import { Component, OnInit } from '@angular/core';
import { NhanvienService } from 'src/app/service/nhanvien.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nhanvien } from './nhanvien.model';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {

  nhanviens:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  nhanvienModelobj: nhanvien = new nhanvien();

  constructor(private api:NhanvienService, private frombuiler: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      ngaySinh: [''],
      sdt: [''],
      tenNV: [''],
      gt: [''],
      queQuan: [''],
      email: [''],
      capbac: ['']
    })
    this.getAllNhanVien();
  }

  addnhanvien() {
    this.nhanvienModelobj.NgaySinh = this.formValue.value.ngaySinh;
    this.nhanvienModelobj.SDT = this.formValue.value.sdt;
    this.nhanvienModelobj.TenNV = this.formValue.value.tenNV;
    this.nhanvienModelobj.GT = this.formValue.value.gt;
    this.nhanvienModelobj.QueQuan = this.formValue.value.queQuan;
    this.nhanvienModelobj.Email = this.formValue.value.email;
    this.nhanvienModelobj.capbac = this.formValue.value.capbac;
    this.api.addNhanVien(this.nhanvienModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin nhân viên thành công');
        this.formValue.reset();
        this.getAllNhanVien();
      })
  }

  getAllNhanVien(){
    this.api.getAllNhanVien().subscribe(res=>{
      this.nhanviens=res;
    })
  }

  openForm() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.nhanvienModelobj.id = item.id
    this.formValue.controls['ngaySinh'].setValue(item.ngaySinh);
    this.formValue.controls['sdt'].setValue(item.sdt);
    this.formValue.controls['tenNV'].setValue(item.tenNV);
    this.formValue.controls['gt'].setValue(item.gt);
    this.formValue.controls['queQuan'].setValue(item.queQuan);
    this.formValue.controls['email'].setValue(item.email);
    this.formValue.controls['capbac'].setValue(item.capbac);
  }

  updatenhanvien() {
    this.nhanvienModelobj.NgaySinh = this.formValue.value.ngaySinh;
    this.nhanvienModelobj.SDT = this.formValue.value.sdt;
    this.nhanvienModelobj.TenNV = this.formValue.value.tenNV;
    this.nhanvienModelobj.GT = this.formValue.value.gt;
    this.nhanvienModelobj.QueQuan = this.formValue.value.queQuan;
    this.nhanvienModelobj.Email = this.formValue.value.email;
    this.nhanvienModelobj.capbac = this.formValue.value.capbac;
    this.api.updateNhanVien(this.nhanvienModelobj, this.nhanvienModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin nhân viên thành công');
        this.formValue.reset();
        this.getAllNhanVien();
      })
  }

  deletenhanvien(id: number) {
    if (confirm("Bạn có muốn xoá thông tin nhân viên")) {
      this.api.deleteNhanVien(id).subscribe((res) => {
        this.getAllNhanVien();
      })
    }
  }

}
