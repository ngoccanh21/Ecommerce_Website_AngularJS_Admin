import { Component, OnInit } from '@angular/core';
import { LoaisanphamService } from 'src/app/service/loaisanpham.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loaisanpham } from './loaisanpham.model';

@Component({
  selector: 'app-loaisanpham',
  templateUrl: './loaisanpham.component.html',
  styleUrls: ['./loaisanpham.component.css']
})
export class LoaisanphamComponent implements OnInit {

  
  loaisanphams:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  loaisanphamModelobj: loaisanpham = new loaisanpham();
  
  ckeditorContent: any;
  userFilter: any = { tenLoai: '' };
  
  constructor(private api:LoaisanphamService, private frombuiler: FormBuilder) { }
  total:any;
  page:number=1;


  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      tenLoai: [''],
      anh: [''],
      PhotoFilePath: [''],
    })
    this.getAllLoaiSanPham();
  }

  addLoaisanpham() {
    this.loaisanphamModelobj.TenLoai = this.formValue.value.tenLoai;
    // this.loaisanphamModelobj.Anh = this.formValue.value.anh;



    this.api.addLoaisanpham(this.loaisanphamModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin sản phấm')
        this.formValue.reset();
        this.getAllLoaiSanPham();
      })
  }

  getAllLoaiSanPham(){
    this.api.getAllLoaiSanPham().subscribe(res=>{
      this.loaisanphams=res;
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
    this.loaisanphamModelobj.id = item.id
    this.formValue.controls['tenLoai'].setValue(item.tenLoai);
    // this.formValue.controls['anh'].setValue(item.anh);
    this.PhotoFilePath = this.api.PhotoUrl + item.anh;
  }

  updateloaisanpham() {
    this.loaisanphamModelobj.TenLoai = this.formValue.value.tenLoai;
    // this.loaisanphamModelobj.Anh = this.formValue.value.anh;
    this.api.updateLoaisanpham(this.loaisanphamModelobj, this.loaisanphamModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin loại sản phẩm thành công')
        this.formValue.reset();
        this.getAllLoaiSanPham();
      })
  }

  deleteloaisanpham(id: number) {
    if (confirm("Bạn có muốn xoá thông tin loại sản phẩm")) {
      this.api.deleteLoaiSanPham(id).subscribe((res) => {
        this.getAllLoaiSanPham();
      })
    }
  }

  PhotoFilePath = 'http://localhost:18058/images/noimage.png';
  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.loaisanphamModelobj.Anh = data.toString();
      this.PhotoFilePath = this.api.PhotoUrl + this.loaisanphamModelobj.Anh;
      // console.log(this.PhotoFilePath);
    });
  }


}
