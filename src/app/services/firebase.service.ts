import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  setLedColorRed(isRed: boolean) {
    return this.db.object('ledCommand/red').set(isRed);
  }
}