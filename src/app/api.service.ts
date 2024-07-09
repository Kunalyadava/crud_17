import { Injectable } from '@angular/core';
import { env } from '../../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat-component/chat.modal';



@Injectable({
  providedIn: 'root'
})
export class APIService {
  API_URL: string = env.API
  API: string = 'http://localhost:3000/data'
  CHAT: string = 'http://localhost:3000/chat'
  constructor(private http: HttpClient) { }
  createUser(data: any) {
    return this.http.post<any>(`${this.API_URL}/User`, data)
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/User`,)
  }
  updateUser(data: any, id: any) {
    return this.http.patch(`${this.API_URL}/User/${id}`, data)
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.API_URL}/User/${id}`)
  }
  getUser(id: any) {
    return this.http.get(`${this.API_URL}/User/${id}`)
  }
  Adduser(data: any) {
    return this.http.post(`${this.API}`, data)
  }
  // addChatMessage(data: any): Observable<ChatMessage> {
  //   return this.http.post<ChatMessage>(`${this.API_URL}`, data);
  // }

  addChatMessage(data: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.CHAT}`, data);
  }

  getChatMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.CHAT}`);
  }

  deleteChatMessage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.CHAT}/${id}`);
  }
  
}
