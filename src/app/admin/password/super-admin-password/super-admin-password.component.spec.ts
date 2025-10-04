import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminPasswordComponent } from './super-admin-password.component';

describe('SuperAdminPasswordComponent', () => {
  let component: SuperAdminPasswordComponent;
  let fixture: ComponentFixture<SuperAdminPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
