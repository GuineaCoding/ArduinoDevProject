// src/app/home/home.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home', // Component's CSS element selector
  templateUrl: './home.page.html', // The HTML template file for this component
  styleUrls: ['./home.page.scss'], // The stylesheet for this component
})

export class HomePage implements OnInit {
  // Object to store the latest sensor readings
  reading = {
    temperature: 0,
    humidity: 0,
    pressure: 0,
    moisture: 0,
    co2: 0,
    pirstate: 0
  };

  private isRefreshing = false; // Flag to indicate if refreshing is in progress
  private refreshEvent: any; // Reference to the refresh event


  constructor(
    private firebaseService: FirebaseService, // Service for Firebase operations
    private router: Router, // Angular Router for navigation
    private afDB: AngularFireDatabase, // AngularFireDatabase for interacting with Firebase Database
    private authService: AuthService // Service for authentication operations
  ) { }

  // ngOnInit lifecycle hook to load data when component initializes
  ngOnInit() {
    this.fetchData(); // Initial data fetch
  }
  fetchData() {
    // Fetching the last sensor reading from Firebase
    this.afDB
      .list('sensorReadings', ref => ref.limitToLast(1)) // Querying the last entry
      .valueChanges() // Listening for changes
      .subscribe((data: any) => { // Subscribing to data changes
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
        }

        else {
          console.log('No data received from Firebase');
        }

        if (this.isRefreshing) {
          this.refreshEvent.target.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.error('Error fetching data:', error);
        if (this.isRefreshing) {
          this.refreshEvent.target.complete();
          this.isRefreshing = false;
        }
      });
  }
  // Method to handle pull-to-refresh action
  doRefresh(event: any) {
    console.log('Begin async operation');
    this.isRefreshing = true; // Set the refreshing flag to true
    this.refreshEvent = event; // Store the refresh event
    this.fetchData(); // Call fetchData which handles data fetching and completing the refresh
  }

  // Function to determine CO2 level color based on value
  getCo2LevelColor(co2: number): string {
    if (co2 < 1000) return 'green'; // Low CO2
    if (co2 >= 1000 && co2 < 2000) return 'yellow'; // Moderate CO2
    return 'red'; // High CO2
  }

  // Function to navigate to a detailed page
  navigateToDetail(page: string) {
    this.router.navigateByUrl('/' + page);
  }
  logout() {
    this.authService.logout();
  }

  // Function to get label for PIR state
  getPirStateLabel(pirState: number): string {
    return pirState === 1 ? 'Motion Was Detected' : 'No Motion Detected';
  }

  // Function to get color based on PIR state
  getPirStateColor(pirState: number): string {
    return pirState === 1 ? 'red' : 'green';
  }
}