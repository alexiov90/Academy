import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { map, switchMap } from 'rxjs/operators';
import { CreateMessageDialogComponent } from '../../components/create-message-dialog/create-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(
    private readonly messageService: MessageService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.next('Lista dei messaggi');
    this.messageService.getAll()
      .pipe(
        map((messages: Message[]) => this.messages = messages)
      )
      .subscribe();
  }

  create(): void {
    this.dialog.open(CreateMessageDialogComponent)
      .afterClosed()
      .pipe(
        switchMap((message?: Message) => message ? this.messageService.add(message) : new Observable(sub => sub.complete()))
      )
      .subscribe(
        (message: any) => console.log(`Messaggio creato: ${message.id}`)
      );
  }

}
