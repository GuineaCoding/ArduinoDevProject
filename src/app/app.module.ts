import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase Imports
import { AngularFireModule } from '@angular/fire/compat'; // Firebase Core
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Firebase Auth
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Firebase Realtime Database
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging'; // Firebase Messaging
import { environment } from '../environments/environment'; // Firebase Configuration
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import FirebaseService
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase with config
    AngularFireAuthModule, // Firebase Authentication
    AngularFireDatabaseModule, // Firebase Realtime Database
    AngularFireMessagingModule, // Firebase Messaging
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseService // Provide FirebaseService here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
