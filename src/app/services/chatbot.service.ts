import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.post<{ answer: string }>(this.apiUrl, { question });
  }
}
