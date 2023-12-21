import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  setHolidayModeStatus(isOn: boolean): Promise<void> {
    return this.db.object('holidayMode/status').set(isOn);
  }

  getHolidayModeState(): Observable<any> {
    return this.db.object('holidayMode/status').valueChanges();
  }
}
