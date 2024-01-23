import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { MOCK_MESSAGES } from '../mock/mock-messages';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const DEMO_MESSAGES_STORE = 'demo_messages_store';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  private url = 'https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/posts';
  private url2 = 'https://reqres.in/';
  constructor(
    private http: HttpClient
  ) {
    const stored: string | null = localStorage.getItem(DEMO_MESSAGES_STORE);
    this.messages = stored ? JSON.parse(stored) : this.save(MOCK_MESSAGES);

   }

   getPosts() {
    return this.http.get(this.url);
  }

  getUsers(pageNum: number){
    return this.http.get(this.url2 + 'api/users?page=' + pageNum);
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
      this.messages[messageIndex].attivo = false;
      this.deleteFromLS();
      this.save(this.messages);
      return of(undefined);
     }
    return throwError("L'id del messaggio non esiste, cancellazione non avvenuta");
   }

   enable(id: number): Observable<void>{
    const messageIndex = this.messages.findIndex(m => m.id === id);
    if(messageIndex !== -1){
      this.messages[messageIndex].attivo = true;
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

   public getNextId(){
    const messages: string | null = localStorage.getItem(DEMO_MESSAGES_STORE);
    if(messages){
      let myMessages: Message[] = JSON.parse(messages);
      let maxId = 0;
      for(let i = 0; i < myMessages?.length; i++){
        if(myMessages[i].id > maxId){
          maxId = myMessages[i].id;
        }
      }
      maxId += 1;
      return maxId;
    }
    return 0;
   }
}
