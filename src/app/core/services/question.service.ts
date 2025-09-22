import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    private jsonUrl = 'assets/data/questions.json' // json-server base

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.jsonUrl);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.jsonUrl}/${id}`);
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.jsonUrl, question);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.jsonUrl}/${question.id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`);
  }
}
