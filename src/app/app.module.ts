import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessageDetailComponent } from './pages/message-detail/message-detail.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateMessageDialogComponent } from './components/create-message-dialog/create-message-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { HiddenMessagesComponent } from './pages/hidden-messages/hidden-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MessagesComponent,
    MessageDetailComponent,
    CreateMessageDialogComponent,
    LoginComponent,
    HiddenMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
