import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message';
import { ActivatedRoute, Router } from '@angular/router';
import { MOCK_MESSAGES } from '../../mock/mock-messages';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent implements OnInit {
  message?: Message;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly titleService: TitleService
  ){}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params=> this.messageService.get(+params['id'])),
      catchError(err=> {
        this.router.navigate(['/']);
        alert(err);
        throw err;
      }),
      map((message: Message) => {
        this.message = message
        this.titleService.title.next(`Messaggio ${this.message?.id}`)
      })
    ).subscribe();

  }

  delete(message:Message):void{
    this.messageService.remove(message.id).subscribe(()=>{
      console.log(`${message.title} rimosso!`);
      this.router.navigate(['/']);
    },
    err => console.error(err));
  }
}
