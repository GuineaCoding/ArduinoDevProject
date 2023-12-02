// src/app/home/home.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    // Initialization logic here
  }

  turnLedRed() {
    this.firebaseService.setLedColorRed(true);
  }

  turnLedGreen() {
    this.firebaseService.setLedColorRed(false);
  }
}
