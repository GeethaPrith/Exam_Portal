import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSigninComponent } from './teacher-signin.component';

describe('TeacherSigninComponent', () => {
  let component: TeacherSigninComponent;
  let fixture: ComponentFixture<TeacherSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
