import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthGuard} from './guards/auth.guard';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './core/header/header.component';
import { PinboardsComponent } from './pages/pinboards/pinboards.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {HttpClientModule} from "@angular/common/http";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import { DeletePinboardDialogComponent } from './core/delete-pinboard-dialog/delete-pinboard-dialog.component';

const config = environment.config;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PinboardsComponent,
    LandingPageComponent,
    DeletePinboardDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
