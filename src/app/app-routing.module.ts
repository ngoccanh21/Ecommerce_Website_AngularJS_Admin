import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CthdbComponent } from './components/admin/cthdb/cthdb.component';
import { KhachhangComponent } from './components/admin/khachhang/khachhang.component';
import { LoaisanphamComponent } from './components/admin/loaisanpham/loaisanpham.component';
import { NhacungcapComponent } from './components/admin/nhacungcap/nhacungcap.component';
import { NhanvienComponent } from './components/admin/nhanvien/nhanvien.component';
import { SanphamComponent } from './components/admin/sanpham/sanpham.component';
import { TintucComponent } from './components/admin/tintuc/tintuc.component';

const routes: Routes = [
  {path:'sanpham',component:SanphamComponent},
  {path:'loaisanpham',component:LoaisanphamComponent},
  {path:'tintuc',component:TintucComponent},
  {path:'nhacungcap',component:NhacungcapComponent},
  {path:'nhanvien',component:NhanvienComponent},
  {path:'khachhang',component:KhachhangComponent},
  {path:'cthdb',component:CthdbComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
