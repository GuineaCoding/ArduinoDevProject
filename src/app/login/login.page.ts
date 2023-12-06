// src/app/login/login.page.ts

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.showErrorAlert();
      console.error(error);
    }
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Incorrect email or password. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToSignUpPage() {
    this.router.navigateByUrl('/signup');
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs: [{ name: 'email', type: 'email', placeholder: 'Your email address' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reset',
          handler: data => {
            this.authService.resetPassword(data.email).then(() => {
              console.log('Password reset email sent');
            }).catch(error => {
              console.error('Error sending password reset email:', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
