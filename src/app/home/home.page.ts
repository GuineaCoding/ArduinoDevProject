// src/app/home/home.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  reading = {
    temperature: 0,
    humidity: 0,
    pressure: 0,
    moisture: 0,
    co2: 0,
    pirstate: 0
  };

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private afDB: AngularFireDatabase,
    private authService: AuthService
    
  ) {}

  ngOnInit() {
    this.afDB
      .list('sensorReadings', ref => ref.limitToLast(1))
      .valueChanges()
      .subscribe((data: any) => {
        console.log('Data from Firebase:', data);
        if (data) {
          // Get the latest timestamp key
          const latestTimestamp = Math.max(...Object.keys(data).map(Number));
          const latestData = data[latestTimestamp];
  
          // assign the values from the latest data
          this.reading.temperature = latestData.temperature;
          this.reading.humidity = latestData.humidity;
          this.reading.pressure = latestData.pressureKPa * 10;
          this.reading.moisture = latestData.moisture;
          this.reading.co2 = latestData.co2;
          this.reading.pirstate = latestData.pirState;
        } else {
          console.log('No data received from Firebase');
        }
      });
  }

  getCo2LevelColor(co2: number): string {
    if (co2 < 1000) return 'green'; // Low CO2
    if (co2 >= 1000 && co2 < 2000) return 'yellow'; // Moderate CO2
    return 'red'; // High CO2
  }

  navigateToDetail(page: string) {
    this.router.navigateByUrl('/' + page);
  }
  logout() {
    this.authService.logout();
  }
  getPirStateLabel(pirState: number): string {
    return pirState === 1 ? 'Motion Detected' : 'No Motion Detected';
  }

  getPirStateColor(pirState: number): string {
    return pirState === 1 ? 'red' : 'green';
  }
}
