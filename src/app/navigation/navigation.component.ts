import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TitleService } from '../services/title.service';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  title: any;
  user?: string;
  constructor(
    private readonly titleService: TitleService,
    private readonly ref: ChangeDetectorRef,
    private readonly authService: AuthenticationService
  ){  }

  ngOnInit(): void {
    this.user = this.authService.getAuthentication()?.username;
    this.titleService.title.pipe(map(title =>{
      this.title = title
      this.ref.detectChanges();
    })).subscribe();
  }

}
