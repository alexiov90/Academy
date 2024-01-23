import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MessageDetailComponent } from './pages/message-detail/message-detail.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './services/guards/authentication.guard';
import { HiddenMessagesComponent } from './pages/hidden-messages/hidden-messages.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'',
    component: NavigationComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path:'',
        component: MessagesComponent
      },
      {
        path:'message/:id',
        component: MessageDetailComponent
      },
      {
        path: 'hidden-messages',
        component: HiddenMessagesComponent
      },
      {
        path:'hidden-messages/:id',
        component: MessageDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
