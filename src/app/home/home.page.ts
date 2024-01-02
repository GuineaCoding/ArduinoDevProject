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
    this.afDB
      .list('sensorReadings', ref => ref.limitToLast(3)) // Fetching last 3 entries
      .valueChanges()
      .subscribe((data: any[]) => {
        if (data && data.length > 0) {
          // Iterate in reverse to find the most recent complete dataset in case that arduino didn't pushed the data beause of a connection issue.
          for (let i = data.length - 1; i >= 0; i--) {
            const entry = data[i];
            if (entry.temperature !== undefined && entry.humidity !== undefined && entry.pressureKPa !== undefined && 
                entry.moisture !== undefined && entry.co2 !== undefined && entry.pirState !== undefined) {
              // Assign values from the first complete dataset found
              this.reading.temperature = entry.temperature;
              this.reading.humidity = entry.humidity;
              this.reading.pressure = entry.pressureKPa * 10;
              this.reading.moisture = entry.moisture;
              this.reading.co2 = entry.co2;
              this.reading.pirstate = entry.pirState;
              break; // Exit the loop once a complete dataset is found
            }
          }
        } else {
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
    return pirState === 1 ? 'Motion Was Detected' : 'No Motion Was Detected';
  }

  // Function to get color based on PIR state
  getPirStateColor(pirState: number): string {
    return pirState === 1 ? 'red' : 'green';
  }
}