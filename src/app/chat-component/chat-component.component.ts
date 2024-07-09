
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatMessage } from './chat.modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APIService } from '../api.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent {
  messages: ChatMessage[] = [];
  messageContent: string = '';
  selectedMessageId: string | null = null;
  selectedFiles: any[] = [];
  currentIndex: number = 0;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.apiService.getChatMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Error loading messages', error);
      }
    );
  }

  saveMessages(message: ChatMessage) {
    this.apiService.addChatMessage(message).subscribe(
      (response) => {
        console.log('Message saved successfully', response);
      },
      (error) => {
        console.error('Error saving message', error);
      }
    );
  }

  sendTextMessage(event: Event) {
    event.preventDefault();
    if (this.messageContent.trim()) {
      const newMessage: ChatMessage = {
        id: this.generateId(),
        content: this.messageContent,
        type: 'text',
        timestamp: new Date(),
        sender: 'me'
      };
      this.messages.push(newMessage);
      this.saveMessages(newMessage);
      this.messageContent = '';
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedFiles.push({
          name: file.name,
          type: file.type,
          base64: e.target.result
        });
      };

      reader.readAsDataURL(file);
    }

    this.currentIndex = 0; // Reset to the first file
  }

  prevFile() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextFile() {
    if (this.currentIndex < this.selectedFiles.length - 1) {
      this.currentIndex++;
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    if (this.currentIndex >= this.selectedFiles.length) {
      this.currentIndex = this.selectedFiles.length - 1;
    }
  }

  // sendFiles() {
  //   for (const file of this.selectedFiles) {
  //     const newMessage: ChatMessage = {
  //       id: this.generateId(),
  //       content: file.base64,
  //       type: file.type.startsWith('image') ? 'image' : 'video',
  //       timestamp: new Date(),
  //       sender: 'me'
  //     };
  //     this.messages.push(newMessage);
  //     this.saveMessages(newMessage);
  //   }
  //   this.selectedFiles = [];
  //   this.currentIndex = 0;
  // }
  sendFiles() {
    for (const file of this.selectedFiles) {
      const newMessage: ChatMessage = {
        id: this.generateId(),
        content: file.base64,
        type: file.type.startsWith('image') ? 'image' : 'video',
        timestamp: new Date(),
        sender: 'me'
      };
      this.saveMessages(newMessage); // Save message to backend
      this.messages.push(newMessage); // Add message to local array
    }
    this.selectedFiles = [];
    this.currentIndex = 0;
  }
  selectMessage(messageId: string) {
    this.selectedMessageId = messageId;
  }

  deleteMessage() {
    if (this.selectedMessageId) {
      this.messages = this.messages.filter(message => message.id !== this.selectedMessageId);
      this.apiService.deleteChatMessage(this.selectedMessageId).subscribe(
        () => {
          console.log('Message deleted successfully');
        },
        (error) => {
          console.error('Error deleting message', error);
        }
      );
      this.selectedMessageId = null;
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
