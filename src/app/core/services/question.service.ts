// question.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = `${environment.apiUrl}/student/tests`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories/${id}`);
  }

  getQuestions(categoryId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/categories/${categoryId}/questions`);
  }

  submitExam(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submit`, payload);
  }

  getAttempts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/attempts`);
  }
}