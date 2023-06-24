import { Component, OnInit } from '@angular/core';
import { TintucService } from 'src/app/service/tintuc.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tintuc } from './tintuc.model';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {

  tintucs:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  tintucModelobj: tintuc = new tintuc();

  total:any;
  page:number=1;
  userFilter: any = { tieuDe: ''};

  constructor(private api:TintucService, private frombuiler: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      tieuDe: [''],
      noiDung1: [''],
      noiDung2: [''],
      ngayTao: [''],
      anh: [''],
      anh2: [''],
      PhotoFilePath: [''],
      PhotoFilePath2: [''],
    })
    this.getAllTinTuc();
  }

  addtintuc() {
    this.tintucModelobj.TieuDe = this.formValue.value.tieuDe;
    this.tintucModelobj.NoiDung1 = this.formValue.value.noiDung1;
    this.tintucModelobj.NoiDung2 = this.formValue.value.noiDung2;
    this.tintucModelobj.NgayTao = this.formValue.value.ngayTao;
    // this.tintucModelobj.Anh = this.formValue.value.anh;
    // this.tintucModelobj.Anh2 = this.formValue.value.anh2;



    this.api.addTinTuc(this.tintucModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin sản phấm')
        this.formValue.reset();
        this.getAllTinTuc();
      })
  }

  getAllTinTuc(){
    this.api.getAllTinTuc().subscribe(res=>{
      this.tintucs=res;
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
    this.tintucModelobj.id = item.id
    this.formValue.controls['tieuDe'].setValue(item.tieuDe);
    this.formValue.controls['noiDung1'].setValue(item.noiDung1);
    this.formValue.controls['noiDung2'].setValue(item.noiDung2);
    this.formValue.controls['ngayTao'].setValue(item.ngayTao);
    this.PhotoFilePath = this.api.PhotoUrl + item.anh;
    this.PhotoFilePath2 = this.api.PhotoUrl + item.anh2;
    // this.formValue.controls['anh'].setValue(item.anh);
    // this.formValue.controls['anh2'].setValue(item.anh2);
  }

  updatetintuc() {
    this.tintucModelobj.TieuDe = this.formValue.value.tieuDe;
    this.tintucModelobj.NoiDung1 = this.formValue.value.noiDung1;
    this.tintucModelobj.NoiDung2 = this.formValue.value.noiDung2;
    this.tintucModelobj.NgayTao = this.formValue.value.ngayTao;
    // this.tintucModelobj.Anh = this.formValue.value.anh;
    // this.tintucModelobj.Anh2 = this.formValue.value.anh2;
    this.api.updateTinTuc(this.tintucModelobj, this.tintucModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin tin tức thành công')
        this.formValue.reset();
        this.getAllTinTuc();
      })
  }

  deletetintuc(id: number) {
    if (confirm("Bạn có muốn xoá thông tin tin tức")) {
      this.api.deleteTinTuc(id).subscribe((res) => {
        this.getAllTinTuc();
      })
    }
  }

  PhotoFilePath = 'http://localhost:18058/images/noimage.png';
  PhotoFilePath2 = 'http://localhost:18058/images/noimage.png';

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.tintucModelobj.Anh = data.toString();
      this.PhotoFilePath = this.api.PhotoUrl + this.tintucModelobj.Anh;
      // console.log(this.PhotoFilePath);
    });
  }

  uploadPhoto2(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.tintucModelobj.Anh2 = data.toString();
      this.PhotoFilePath2 = this.api.PhotoUrl + this.tintucModelobj.Anh2;
      // console.log(this.PhotoFilePath);
    });
  }

}
