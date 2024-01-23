import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss'
})
export class CreateMessageDialogComponent implements OnInit{
  message: Message;
  maxDate: Date | undefined;

  constructor(
    private readonly ref: MatDialogRef<CreateMessageDialogComponent>,
    private readonly messageService: MessageService
  ) {

    this.message = { id: this.messageService.getNextId() > 0 ? this.messageService.getNextId() : new Date().getTime(), title: '', message: '', attivo: true };
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    this.maxDate = new Date(currentYear, currentMonth, currentDay);
  }

  close(): void {
    this.ref.close(this.message);
  }

}
