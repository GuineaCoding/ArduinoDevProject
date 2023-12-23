// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,  private router: Router, private loadingController: LoadingController  ) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Logging out...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      await this.afAuth.signOut();
      await loading.dismiss();
      this.router.navigateByUrl('/login');
    } catch (error) {
      await loading.dismiss();
      console.error('Error during logout:', error);
      
    }
  }
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
