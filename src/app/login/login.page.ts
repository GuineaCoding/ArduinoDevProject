// src/app/login/login.page.ts

// Importing required modules and components
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Firebase authentication service
import { Router } from '@angular/router'; // Angular Router for navigation
import { AlertController, LoadingController } from '@ionic/angular'; // Ionic UI components
import { AuthService } from '../services/auth.service'; // Custom authentication service
import { NavController } from '@ionic/angular'; // Ionic's navigation controller

// Component decorator providing metadata for the component
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  // Properties for email and password
  email: string = '';
  password: string = '';

  // Constructor to inject dependencies
  constructor(
    private afAuth: AngularFireAuth, // Injects AngularFireAuth for Firebase authentication
    private router: Router, // Injects Angular Router for page navigation
    private authService: AuthService, // Injects custom AuthService
    private alertController: AlertController, // Injects AlertController for showing alerts
    private loadingController: LoadingController, // Injects LoadingController for showing loading indicators
    private navCtrl: NavController, // Injects NavController for navigation control
  ) { }

  // function for login
  async login() {
    // Creating and presenting a loading indicator
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      // Attempting to sign in using email and password
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      await loading.dismiss();
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      // Catch block for handling login errors
      await loading.dismiss();
      this.showErrorAlert();
      console.error(error);
    }
  }

  async showErrorAlert() {
    // Creating an alert for login failure
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Incorrect email or password. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
  // Function to navigate to the sign-up page
  goToSignUpPage() {
    this.router.navigateByUrl('/signup');
  }

  // Function for forgot password flow
  async forgotPassword() {
    // Creating an alert for password reset
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
