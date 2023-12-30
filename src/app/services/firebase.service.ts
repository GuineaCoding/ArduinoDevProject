// Importing necessary modules
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs'; // Observable from RxJS library

// Decorator that marks a class as available to be provided and injected as a dependency
@Injectable({
  providedIn: 'root' // Specifies that the service should be provided in the root injector
})
export class FirebaseService {
  // Constructor for injecting AngularFireDatabase service
  constructor(private db: AngularFireDatabase) {}
  
  setHolidayModeStatus(isOn: boolean): Promise<void> {
    // Sets the 'holidayMode/status' path in the Firebase database to the passed boolean value
    return this.db.object('holidayMode/status').set(isOn);
  }

  getHolidayModeState(): Observable<any> {
    // Returns an observable for the value at 'holidayMode/status' in the Firebase database
    // This observable emits the value whenever it changes in the database
    return this.db.object('holidayMode/status').valueChanges();
  }
}
