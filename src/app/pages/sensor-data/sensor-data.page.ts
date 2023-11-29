import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.page.html',
  styleUrls: ['./sensor-data.page.scss'],
})
export class SensorDataPage implements OnInit {
  sensorData$!: Observable<any[]>;

  constructor(private sensorDataService: SensorDataService) {}
  
  ngOnInit() {
    this.sensorData$ = this.sensorDataService.getSensorData(); // Fetch the data
  }
}
