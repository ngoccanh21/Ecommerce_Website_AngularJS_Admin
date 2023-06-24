import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/admin/header/header.component';
import { MenuLeftComponent } from './components/admin/menu-left/menu-left.component';
import { SanphamComponent } from './components/admin/sanpham/sanpham.component';
import { LoaisanphamComponent } from './components/admin/loaisanpham/loaisanpham.component';
import { TintucComponent } from './components/admin/tintuc/tintuc.component';
import { NhacungcapComponent } from './components/admin/nhacungcap/nhacungcap.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NhanvienComponent } from './components/admin/nhanvien/nhanvien.component';
import { KhachhangComponent } from './components/admin/khachhang/khachhang.component';
import { CthdbComponent } from './components/admin/cthdb/cthdb.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLeftComponent,
    SanphamComponent,
    LoaisanphamComponent,
    TintucComponent,
    NhacungcapComponent,
    NhanvienComponent,
    KhachhangComponent,
    CthdbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2FilterPipeModule,
    CKEditorModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
