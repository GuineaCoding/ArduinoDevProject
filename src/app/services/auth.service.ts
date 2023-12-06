// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    return this.afAuth.signOut();
  }
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
