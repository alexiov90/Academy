import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, catchError, map, Observable } from 'rxjs';
import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { TitleService } from '../../services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMessageDialogComponent } from '../../components/create-message-dialog/create-message-dialog.component';

@Component({
  selector: 'app-hidden-messages',
  templateUrl: './hidden-messages.component.html',
  styleUrl: './hidden-messages.component.scss'
})
export class HiddenMessagesComponent {

  messages: Message[] = [];

  constructor(
    private readonly messageService: MessageService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.next('Lista dei messaggi nascosti');
    this.getAllDeletedMessages();
  }



  getAllDeletedMessages(): void{
    this.messages = [];
    this.messageService.getAll()
      .pipe(
        map((messages: Message[]) => {
          for(let i = 0; i < messages.length; i++){
            if(!messages[i].attivo){
              this.messages.push(messages[i]);
            }
          }
        })
      )
      .subscribe();
  }

}
