import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  username? : string;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ){

  }
  ngOnInit(): void {
    this.logout();
  }

  login(): void {
    if (this.username) {
      this.authService.login(this.username)
        .subscribe(
          () => {
            this.snackBar.open(`Benvenuto ${this.username}`);
            this.router.navigate(['/']);
          },
          err => this.snackBar.open(`Accesso non riuscito: ${err}`)
        );
    } else {
      this.snackBar.open('Inserisci un nome ...');
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe(() => this.snackBar.open('Logout effettuato'));
  }

}
