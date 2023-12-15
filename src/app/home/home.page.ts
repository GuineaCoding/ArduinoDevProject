// src/app/home/home.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

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
    private afDB: AngularFireDatabase
    
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
  
          // Now assign the values from the latest data
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
  

  turnLedRed() {
    this.firebaseService.setLedColorRed(true);
  }

  turnLedGreen() {
    this.firebaseService.setLedColorRed(false);
  }
  navigateToDetail(page: string) {
    this.router.navigateByUrl('/' + page);
  }
}
