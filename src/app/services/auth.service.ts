// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


// Injectable decorator mraks the class as one that paritcipates in the dependency injection syste
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,  private router: Router, private loadingController: LoadingController  ) {}

  // Method for logging in a user with email and password
  login(email: string, password: string) {
    // Returns a promise that resolves with user credentials after successful login
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Method to get the current authenticated user
  getUser() {
    // authState is an observable of the authentication state
    // The pipe and map operator are used to transform the emitted value
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Logging out...',
      spinner: 'circles'
    });
    // Presenting the loading indicator
    await loading.present();

    try {
      // Attempting to sign out the user
      await this.afAuth.signOut();
      await loading.dismiss(); // Dismiss the loading indicator on success
      this.router.navigateByUrl('/login');  // Navigate to the login page after successful logout
      // Attempting to sign out the user
    } catch (error) {
      // Catch block for handling errors during logout
      await loading.dismiss();
      console.error('Error during logout:', error);
      
    }
  }
  // Method for initiating a password reset for a given email
  resetPassword(email: string) {
     // Returns a promise that resolves when the password reset email is sent
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
