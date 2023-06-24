import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CthdbComponent } from './cthdb.component';

describe('CthdbComponent', () => {
  let component: CthdbComponent;
  let fixture: ComponentFixture<CthdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CthdbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CthdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
