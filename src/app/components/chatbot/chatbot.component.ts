import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages = [
    { from: 'IA', text: 'Hola 👋 ¿Planeamos tu finde con Shippers?' }
  ];

  constructor(private chat: ChatbotService) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  send() {
    if (!this.userInput.trim()) return;

    const question = this.userInput;
    this.messages.push({ from: 'Tú', text: question });
    this.userInput = '';

    this.chat.ask(question).subscribe(res => {
      this.messages.push({ from: 'IA', text: res.answer });
    });
  }
}
