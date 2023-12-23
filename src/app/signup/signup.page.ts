import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html', // ensure this points to the correct HTML file
  styleUrls: ['./signup.page.scss']
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private loadingController: LoadingController) {}

  async signup() {
    const loading = await this.loadingController.create({
      message: 'Signing up...',
      spinner: 'circles' // You can choose other spinner types
    });
    await loading.present();
  
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      await loading.dismiss(); 
      this.router.navigateByUrl('/home'); // Navigate to the home page after successful signup
    } catch (error) {
      await loading.dismiss(); 
      console.error(error); 
    }
  }
  
}
