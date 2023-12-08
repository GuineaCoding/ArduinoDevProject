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
  // Existing method for the last 24 hours
  getSensorDataForLastHours(hours: number): Observable<any[]> {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    const cutoffSeconds = Math.floor(cutoff / 1000);
    return this.db.list('sensorReadings', ref => 
      ref.orderByChild('timestamp').startAt(cutoffSeconds)
    ).valueChanges();
  }

  // Method for the last 7 days
  getSensorDataForLastDays(days: number): Observable<any[]> {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const cutoffSeconds = Math.floor(cutoff / 1000);
    return this.db.list('sensorReadings', ref => 
      ref.orderByChild('timestamp').startAt(cutoffSeconds)
    ).valueChanges();
  }

  // Method for a specific month of a specific year
  getSensorDataForMonth(year: number, month: number): Observable<any[]> {
    const start = new Date(year, month - 1, 1).getTime() / 1000; 
    const end = new Date(year, month, 0).getTime() / 1000; 
    return this.db.list('sensorReadings', ref => 
      ref.orderByChild('timestamp').startAt(start).endAt(end)
    ).valueChanges();
  }

  // Method for a specific year
  getSensorDataForYear(year: number): Observable<any[]> {
    const start = new Date(year, 0, 1).getTime() / 1000; 
    const end = new Date(year + 1, 0, 0).getTime() / 1000; 
    return this.db.list('sensorReadings', ref => 
      ref.orderByChild('timestamp').startAt(start).endAt(end)
    ).valueChanges();
  }
}
 