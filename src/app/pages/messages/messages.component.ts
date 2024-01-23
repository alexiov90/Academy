import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { map, switchMap } from 'rxjs/operators';
import { CreateMessageDialogComponent } from '../../components/create-message-dialog/create-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TitleService } from '../../services/title.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  displayedColumns: string[] = ['email', 'first_name', 'last_name','avatar'];
  dataSource = [];
  messages: Message[] = [];
  posts: any;
  users: any;
  pageSize: any;
  page: any;
  total_pages: any;
  total: any;

  constructor(
    private readonly messageService: MessageService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.next('Lista dei messaggi');
    // this.messageService.getPosts().subscribe(
    //   (response) => {
    //     this.posts = response;
    // },
    //   (error)=>{
    //     console.log(error)
    // });

    this.getUsers(1);
    this.getAllMessages();
  }

  getUsers(event: any){
    this.messageService.getUsers(event.pageIndex + 1).subscribe(
      (response: any) => {
        this.users = response;
        this.page = response.page;
        this.pageSize = response.per_page;
        this.total = response.total;
        this.total_pages = response.total_pages;
        this.dataSource = response.data;
    },
      (error)=>{
        console.log(error)
    });
  }

  create(): void {
    this.dialog.open(CreateMessageDialogComponent)
      .afterClosed()
      .pipe(
        switchMap((message?: Message)  =>
          message ? (this.messageService.add(message)) : new Observable(sub => sub.complete())
        )
      )
      .subscribe(
        (message: any) => {console.log(`Messaggio creato: ${message.id}`); this.getAllMessages()}
      );
  }

  getAllMessages(): void{
    this.messages = [];
    this.messageService.getAll()
      .pipe(
        map((messages: Message[]) => {
          for(let i = 0; i < messages.length; i++){
            if(messages[i].attivo){
              this.messages.push(messages[i]);
            }
          }
        })
      )
      .subscribe();
  }

}
