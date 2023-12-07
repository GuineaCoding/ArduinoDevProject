import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private db: AngularFireDatabase) {}

  getSensorData(): Observable<any[]> {
    return this.db.list('sensorReadings').valueChanges();
  }
}
