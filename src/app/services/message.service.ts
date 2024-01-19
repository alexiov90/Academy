import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { MOCK_MESSAGES } from '../mock/mock-messages';
import { Observable, of, throwError } from 'rxjs';

export const DEMO_MESSAGES_STORE = 'demo_messages_store';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  constructor() {
    const stored: string | null = localStorage.getItem(DEMO_MESSAGES_STORE);
    this.messages = stored ? JSON.parse(stored) : this.save(MOCK_MESSAGES);

   }

   getAll(): Observable<Message[]> {
    return of(this.messages);
   }

   get(id: number): Observable<Message>{
    const message = this.messages.find(m => m.id === id);
    return message ? of(message) : throwError(`Messaggio con ${id} non trovato`);
   }

   add(message: Message): Observable<Message>{
    this.messages.push(message);
    this.deleteFromLS();
    this.save(this.messages);
    return of(message);
   }

   remove(id: number): Observable<void>{
    const messageIndex = this.messages.findIndex(m => m.id === id);
    if(messageIndex !== -1){
      this.messages.splice(messageIndex, 1);
      this.deleteFromLS();
      this.save(this.messages);
      return of(undefined);
     }
    return throwError("L'id del messaggio non esiste, cancellazione non avvenuta");
   }

   private save(messages: Message[]){
    localStorage.setItem(DEMO_MESSAGES_STORE, JSON.stringify(messages));
    return messages;
   }

   private deleteFromLS(){
    localStorage.removeItem(DEMO_MESSAGES_STORE);
   }
}
