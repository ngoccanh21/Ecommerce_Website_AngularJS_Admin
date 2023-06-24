import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CthdbService } from 'src/app/service/cthdb.service';
import { cthdb } from './cthdb.model';

@Component({
  selector: 'app-cthdb',
  templateUrl: './cthdb.component.html',
  styleUrls: ['./cthdb.component.css']
})
export class CthdbComponent implements OnInit {

  cthdbs:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  cthdbModelobj: cthdb = new cthdb();

  userFilter: any = { tenSP: ''};
  total:any;
  page:number=1;

  constructor(private api:CthdbService, private frombuiler: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.frombuiler.group({
      id_hdb: 0,
      id_sp: 0,
      tenSP: [''],
      giaBan: 0,
      soLuong: 0,
      thanhTien: 0,
      anh: [''],
      size: [''],
    })
    this.getAllCTHDB();
    //id_cthdb id_hdb id_sp tenSP giaBan soLuong thanhTien anh size
  }

  getAllCTHDB(){
    this.api.getAllCTHDB().subscribe(res=>{
      this.cthdbs=res;
    })
  }

  openForm() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(item: any) {
    //id_cthdb id_hdb id_sp tenSP giaBan soLuong thanhTien anh size
    this.showAdd = false;
    this.showUpdate = true;
    this.cthdbModelobj.id_cthdb = item.id_cthdb
    this.formValue.controls['id_hdb'].setValue(item.id_hdb);
    this.formValue.controls['id_sp'].setValue(item.id_sp);
    this.formValue.controls['tenSP'].setValue(item.tenSP);
    this.formValue.controls['giaBan'].setValue(item.giaBan);
    this.formValue.controls['soLuong'].setValue(item.soLuong);
    this.formValue.controls['thanhTien'].setValue(item.thanhTien);
    this.formValue.controls['anh'].setValue(item.anh);
    this.formValue.controls['size'].setValue(item.size);
  }

}
