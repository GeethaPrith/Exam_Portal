// exam-page.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../../core/services/question.service';
import { Question, ExamSubmission } from '../../../../core/models/question.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-page',
  imports: [SharedModule],
  templateUrl: './exam-page.component.html',
  styleUrl: './exam-page.component.scss'
})
export class ExamPageComponent {

  questions: Question[] = [];
  page = 1;
  pageSize = 10;
  categoryId: number = 0;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions(this.categoryId).subscribe({
      next: (data) => {
        this.questions = data.map(q => ({ ...q, selectedAnswer: undefined }));
      },
      error: (err) => console.error('Failed to load questions', err)
    });
  }

  get totalPages() {
    return Math.ceil(this.questions.length / this.pageSize);
  }

  get paginatedQuestions() {
    const start = (this.page - 1) * this.pageSize;
    return this.questions.slice(start, start + this.pageSize);
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  onAnswerChange(questionId: number, optionIndex: number) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.selectedAnswer = optionIndex;
    }
  }

  submitExam() {
    const submission: ExamSubmission = {
      categoryId: this.categoryId,
      answers: this.questions
        .filter(q => q.selectedAnswer !== undefined)
        .map(q => ({
          questionId: q.id,
          selectedOption: q.selectedAnswer!
        }))
    };

    this.questionService.submitExam(submission).subscribe({
      next: (response) => {
        console.log('Exam submitted successfully', response);
        alert('Exam submitted successfully!');
        this.router.navigate(['/dashboard/results']);
      },
      error: (err) => {
        console.error('Failed to submit exam', err);
        alert('Failed to submit exam. Please try again.');
      }
    });
  }
}