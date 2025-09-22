import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestionService } from '../../../../core/services/question.service';
import { Question } from '../../../../core/models/question.model'; // <-- import the interface

@Component({
  selector: 'app-exam-page',
  imports: [SharedModule],
  templateUrl: './exam-page.component.html',
  styleUrl: './exam-page.component.scss'
})
export class ExamPageComponent {

  questions: Question[] = [];  // <-- this is your array of questions
  page = 1;
  pageSize = 10;

  constructor(private questionService: QuestionService) {}
  
  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
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

  submitExam() {
    // Logic to handle exam submission
    alert('Exam submitted!');
  }
  
}


  

  


