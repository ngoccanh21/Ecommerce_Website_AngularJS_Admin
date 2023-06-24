import { Component, OnInit } from '@angular/core';
import { SanphamService } from 'src/app/service/sanpham.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sanpham } from './sanpham.model';
import { LoaisanphamService } from 'src/app/service/loaisanpham.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  sanphams:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  sanphamModelobj: sanpham = new sanpham();

  ckeditorContent: any;
  userFilter: any = { tenSP: ''};

  loaisanphams:any;
  maLoai : any;
  lisds!: any[];

  constructor(private api:SanphamService, private frombuiler: FormBuilder, private apiLoaiSP : LoaisanphamService) { }

  total:any;
  page:number=1;

  // formHeader="Thêm mới sản phẩm";
  // tenSP="";
  // showForm=false;
  //cmonService=api, dataCate=sanphams,

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      maLoai: 0,
      giaBan: 0,
      tenSP: [''],
      soLuong: 0,
      sale: 0,
      anh: [''],
      tinhTrang: [''],
      moTa: [''],
      PhotoFilePath: [''],
    })
    this.getAllSanPham();
    this.getLoaiSP();
  }

  getLoaiSP(){
    this.apiLoaiSP.getAllLoaiSanPham().subscribe(res=>{
      this.loaisanphams=res;
    })
  }

  addsanpham() {
    this.sanphamModelobj.maLoai = this.formValue.value.maLoai;
    this.sanphamModelobj.GiaBan = this.formValue.value.giaBan;
    this.sanphamModelobj.TenSP = this.formValue.value.tenSP;
    this.sanphamModelobj.SoLuong = this.formValue.value.soLuong;
    this.sanphamModelobj.Sale = this.formValue.value.sale;

    this.sanphamModelobj.TinhTrang = this.formValue.value.tinhTrang;
    this.sanphamModelobj.MoTa = this.formValue.value.moTa;

    this.api.addsanpham(this.sanphamModelobj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Thêm mới thông tin sản phấm')
        this.formValue.reset();
        this.getAllSanPham();
      })
  }

  getAllSanPham(){
    this.api.getAllSanPham().subscribe(res=>{
      this.sanphams=res;
    })
    this.api.getAllLoaiSanPham().subscribe(data => {
      this.lisds = data;
      console.log(this.lisds)
    })
  }

  // deleteSanPham(id:number){
  //   this.api.deleteSanPham(id).subscribe(res=>{
  //     this.getAllSanPham();
  //   })
  // }

  openForm() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.sanphamModelobj.id = item.id
    this.formValue.controls['maLoai'].setValue(item.maLoai);
    this.formValue.controls['giaBan'].setValue(item.giaBan);
    this.formValue.controls['tenSP'].setValue(item.tenSP);
    this.formValue.controls['soLuong'].setValue(item.soLuong);
    this.formValue.controls['sale'].setValue(item.sale);
    this.PhotoFilePath = this.api.PhotoUrl + item.anh;
    this.formValue.controls['tinhTrang'].setValue(item.tinhTrang);
    this.formValue.controls['moTa'].setValue(item.moTa);
  }
  
  updatesanpham() {
    this.sanphamModelobj.maLoai = this.formValue.value.maLoai;
    this.sanphamModelobj.GiaBan = this.formValue.value.giaBan;
    this.sanphamModelobj.TenSP = this.formValue.value.tenSP;
    this.sanphamModelobj.SoLuong = this.formValue.value.soLuong;
    this.sanphamModelobj.Sale = this.formValue.value.sale;

    this.sanphamModelobj.TinhTrang = this.formValue.value.tinhTrang;
    this.sanphamModelobj.MoTa = this.formValue.value.moTa;
    this.api.updatesanpham(this.sanphamModelobj, this.sanphamModelobj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Sửa thông tin thành công')
        this.formValue.reset();
        this.getAllSanPham();
      })
  }

  deletesanpham(id: number) {
    if (confirm("Bạn có muốn xoá sản ph?")) {
      this.api.deleteSanPham(id).subscribe((res) => {
        this.getAllSanPham();
      })
    }
  }

  
  PhotoFilePath = 'http://localhost:18058/images/noimage.png';

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.api.UploadPhoto(formData).subscribe((data: any) => {
      this.sanphamModelobj.Anh = data.toString();
      this.PhotoFilePath = this.api.PhotoUrl + this.sanphamModelobj.Anh;
      // console.log(this.PhotoFilePath);
    });
  }
}
