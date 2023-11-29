import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html', // ensure this points to the correct HTML file
  styleUrls: ['./signup.page.scss']
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signup() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigateByUrl('/home'); // Navigate to the home page after successful signup
    } catch (error) {
      console.error(error); // Handle signup error
    }
  }
}
