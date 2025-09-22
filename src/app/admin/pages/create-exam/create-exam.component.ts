import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

// Define ExamData interface based on examForm structure
export interface ExamData {
  title: string;
  description: string;
  subject: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  startDate: string;
  endDate: string;
  instructions: string;
  shuffleQuestions: boolean;
  allowReview: boolean;
  showResults: boolean;
  
  questions: Array<{
    question: string;
    type: string;
    options: string[];
    correctAnswer: string;
    points: number;
    difficulty: string;
    tags: string[];
  }>;
}
export interface Question {
  id?: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}
@Component({
  selector: 'app-create-exam',
  imports: [SharedModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss'
})
export class CreateExamComponent implements OnInit, OnDestroy {
  examForm!: FormGroup;
  currentStep = 1;
  loading = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Schedule' },
    { id: 3, label: 'Questions' },
    { id: 4, label: 'Preview' }
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
    this.examForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      subject: ['', [Validators.required]],
      duration: [60, [Validators.required, Validators.min(1)]],
      totalMarks: [100, [Validators.required, Validators.min(1)]],
      passingMarks: [40, [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      instructions: [''],
      shuffleQuestions: [false],
      allowReview: [true],
      showResults: [false],
      questions: this.formBuilder.array([])
    });
  }

  get f() {
    return this.examForm.controls;
  }

  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  // Helper used by template to access a question's control
  getQuestionControl(questionIndex: number, controlName: string) {
    const group = this.questions.at(questionIndex);
    return group ? group.get(controlName) : null;
  }

  // Step Navigation
  nextStep(): void {
    if (this.isCurrentStepValid()) {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
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
        return this.f['title'].valid && this.f['subject'].valid && 
               this.f['duration'].valid && this.f['totalMarks'].valid && 
               this.f['passingMarks'].valid;
      case 2:
        return this.f['startDate'].valid && this.f['endDate'].valid;
      case 3:
        return this.questions.length > 0 && this.questions.valid;
      case 4:
        return this.examForm.valid;
      default:
        return true;
    }
  }

  // Question Management
  addQuestion(): void {
    const questionGroup = this.formBuilder.group({
      question: ['', Validators.required],
      type: ['multiple-choice', Validators.required],
      options: this.formBuilder.array([
        this.formBuilder.control(''),
        this.formBuilder.control(''),
        this.formBuilder.control(''),
        this.formBuilder.control('')
      ]),
      correctAnswer: ['', Validators.required],
      points: [1, [Validators.required, Validators.min(1)]],
      difficulty: ['medium'],
      tags: this.formBuilder.array([])
    });

    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getQuestionType(index: number): string {
    return this.questions.at(index).get('type')?.value || 'multiple-choice';
  }

  getQuestionOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  updateOptionValue(questionIndex: number, optionIndex: number, event: any): void {
    const options = this.getQuestionOptions(questionIndex);
    options.at(optionIndex).setValue(event.target.value);
  }

  addOption(questionIndex: number): void {
    const options = this.getQuestionOptions(questionIndex);
    options.push(this.formBuilder.control(''));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getQuestionOptions(questionIndex);
    if (options.length > 2) {
      options.removeAt(optionIndex);
    }
  }

  onQuestionTypeChange(questionIndex: number, event: any): void {
    const questionGroup = this.questions.at(questionIndex);
    const newType = event.target.value;
    
    // Reset options based on question type
    const optionsArray = questionGroup.get('options') as FormArray;
    optionsArray.clear();
    
    if (newType === 'multiple-choice') {
      // Add default 4 options
      for (let i = 0; i < 4; i++) {
        optionsArray.push(this.formBuilder.control(''));
      }
    } else if (newType === 'true-false') {
      // Add True/False options
      optionsArray.push(this.formBuilder.control('True'));
      optionsArray.push(this.formBuilder.control('False'));
    }
    
    // Reset correct answer
    questionGroup.get('correctAnswer')?.setValue('');
  }

  updateQuestionTags(questionIndex: number, event: any): void {
    const tags = event.target.value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
    const tagsArray = this.questions.at(questionIndex).get('tags') as FormArray;
    
    tagsArray.clear();
    tags.forEach((tag: string) => {
      tagsArray.push(this.formBuilder.control(tag));
    });
  }

  // Form Submission
  onSubmit(): void {
    if (this.examForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const examData: ExamData = this.examForm.value;

    // Here you would call your API service
    // this.examService.createExam(examData).subscribe(...)
    
    // Simulate API call
    setTimeout(() => {
      this.successMessage = 'Exam created successfully!';
      this.loading = false;
      
      setTimeout(() => {
        this.router.navigate(['/admin/exams']);
      }, 2000);
    }, 2000);
  }

  saveAsDraft(): void {
    this.loading = true;
    
    // Here you would call your API service to save as draft
    // this.examService.saveDraft(this.examForm.value).subscribe(...)
    
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
    const markRecursively = (group: FormGroup | FormArray) => {
      Object.keys(group.controls).forEach(key => {
        const control = group.get(key);
        if (control instanceof FormGroup || control instanceof FormArray) {
          markRecursively(control);
        } else {
          control?.markAsTouched();
        }
      });
    };

    markRecursively(this.examForm as FormGroup);
  }

  // Return comma-joined tags for a question (used by template)
  getQuestionTagsAsString(questionIndex: number): string {
    const tagsArray = this.questions.at(questionIndex).get('tags') as FormArray;
    if (!tagsArray) return '';
    return tagsArray.controls.map(c => c.value).join(', ');
  }
}

