import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.requestPermission();
  }

  private requestPermission() {
    const firebaseApp = initializeApp({
      
    });

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, { vapidKey: 'apiKey' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
          
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token. ', err);
        
      });
  }
}
