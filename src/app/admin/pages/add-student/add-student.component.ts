import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContact: string;
  emergencyPhone: string;
  course: string;
  semester: string;
  batch: string;
  rollNumber: string;
  admissionDate: string;
  isActive: boolean;
}
@Component({
  selector: 'app-add-student',
  imports: [SharedModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})

export class AddStudentComponent implements OnInit, OnDestroy {
  studentForm!: FormGroup;
  currentStep = 1;
  loading = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  steps = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Emergency Contact' },
    { id: 3, label: 'Academic Info' },
    { id: 4, label: 'Review' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      emergencyContact: ['', [Validators.required]],
      emergencyPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      studentId: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      course: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      admissionDate: ['', [Validators.required]],
      isActive: [true]
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  // Step Navigation
  nextStep(): void {
    if (this.isCurrentStepValid()) {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    } else {
      this.markCurrentStepAsTouched();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'pincode']
          .every(field => this.f[field].valid);
      case 2:
        return ['emergencyContact', 'emergencyPhone'].every(field => this.f[field].valid);
      case 3:
        return ['studentId', 'rollNumber', 'course', 'semester', 'batch', 'admissionDate']
          .every(field => this.f[field].valid);
      case 4:
        return this.studentForm.valid;
      default:
        return true;
    }
  }

  private markCurrentStepAsTouched(): void {
    let fields: string[] = [];
    
    switch (this.currentStep) {
      case 1:
        fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'pincode'];
        break;
      case 2:
        fields = ['emergencyContact', 'emergencyPhone'];
        break;
      case 3:
        fields = ['studentId', 'rollNumber', 'course', 'semester', 'batch', 'admissionDate'];
        break;
    }
    
    fields.forEach(field => {
      this.f[field].markAsTouched();
    });
  }

  // Helper Methods
  getCourseLabel(courseValue: string): string {
    const courses: { [key: string]: string } = {
      'computer-science': 'Computer Science',
      'information-technology': 'Information Technology',
      'mechanical-engineering': 'Mechanical Engineering',
      'electrical-engineering': 'Electrical Engineering',
      'civil-engineering': 'Civil Engineering',
      'electronics-communication': 'Electronics & Communication',
      'business-administration': 'Business Administration',
      'commerce': 'Commerce',
      'arts': 'Arts',
      'science': 'Science'
    };
    return courses[courseValue] || courseValue;
  }

  getSemesterSuffix(semester: string): string {
    const suffixes: { [key: string]: string } = {
      '1': 'st',
      '2': 'nd', 
      '3': 'rd'
    };
    return suffixes[semester] || 'th';
  }

  // Form Actions
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const studentData: StudentData = this.studentForm.value;

    // Here you would call your API service
    // this.studentService.addStudent(studentData).subscribe(...)
    
    // Simulate API call
    setTimeout(() => {
      this.successMessage = 'Student added successfully!';
      this.loading = false;
      
      setTimeout(() => {
        this.router.navigate(['/admin/students']);
      }, 2000);
    }, 2000);
  }

  saveAsDraft(): void {
    this.loading = true;
    
    // Here you would call your API service to save as draft
    // this.studentService.saveDraft(this.studentForm.value).subscribe(...)
    
    // Simulate API call
    setTimeout(() => {
      this.successMessage = 'Draft saved successfully!';
      this.loading = false;
      
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }
}
