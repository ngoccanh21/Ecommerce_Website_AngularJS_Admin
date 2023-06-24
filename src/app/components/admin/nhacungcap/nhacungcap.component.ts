import { Component, OnInit } from '@angular/core';
import { NhacungcapService } from 'src/app/service/nhacungcap.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nhacungcap } from './nhacungcap.model';

@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhacungcapComponent implements OnInit {

  nhacungcaps:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  nhacungcapModelobj: nhacungcap = new nhacungcap();

  constructor(private api:NhacungcapService, private frombuiler: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      tenNCC: [''],
      diaChi: [''],
      sdt: [''],
      email: ['']
    })
    this.getAllNhaCungCap();
  }

  addnhacungcap() {
    this.nhacungcapModelobj.TenNCC = this.formValue.value.tenNCC;
    this.nhacungcapModelobj.DiaChi = this.formValue.value.diaChi;
    this.nhacungcapModelobj.SDT = this.formValue.value.sdt;
    this.nhacungcapModelobj.Email = this.formValue.value.email;
    this.api.addNCC(this.nhacungcapModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin sản phấm')
        this.formValue.reset();
        this.getAllNhaCungCap();
      })
  }

  getAllNhaCungCap(){
    this.api.getAllNCC().subscribe(res=>{
      this.nhacungcaps=res;
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
    this.nhacungcapModelobj.id = item.id
    this.formValue.controls['tenNCC'].setValue(item.tenNCC);
    this.formValue.controls['diaChi'].setValue(item.diaChi);
    this.formValue.controls['sdt'].setValue(item.sdt);
    this.formValue.controls['email'].setValue(item.email);
  }

  updatencc() {
    this.nhacungcapModelobj.TenNCC = this.formValue.value.tenNCC;
    this.nhacungcapModelobj.DiaChi = this.formValue.value.diaChi;
    this.nhacungcapModelobj.SDT = this.formValue.value.sdt;
    this.nhacungcapModelobj.Email = this.formValue.value.email;
    this.api.updateNCC(this.nhacungcapModelobj, this.nhacungcapModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin tin tức thành công')
        this.formValue.reset();
        this.getAllNhaCungCap();
      })
  }

  deletencc(id: number) {
    if (confirm("Bạn có muốn xoá thông tin tin tức")) {
      this.api.deleteNCC(id).subscribe((res) => {
        this.getAllNhaCungCap();
      })
    }
  }

}
