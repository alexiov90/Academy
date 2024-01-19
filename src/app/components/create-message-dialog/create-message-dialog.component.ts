import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrl: './create-message-dialog.component.scss'
})
export class CreateMessageDialogComponent implements OnInit{
  message: Message;

  constructor(
    private readonly ref: MatDialogRef<CreateMessageDialogComponent>
  ) {
    this.message = { id: new Date().getTime(), title: '', message: '' };
  }

  ngOnInit(): void {
  }

  close(): void {
    this.ref.close(this.message);
  }

}
