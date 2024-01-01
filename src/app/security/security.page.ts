import { Component, OnInit } from '@angular/core';
// Importing Chart.js components required for creating the chart
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adapter for date functionality in Chart.js
import { SensorDataService } from '../services/sensor-data.service';
import { FirebaseService } from '../services/firebase.service';

// Registering Chart.js components to be used in creating the chart
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, TimeScale, TimeSeriesScale);

@Component({
  selector: 'app-security', // Component selector used in HTML
  templateUrl: './security.page.html', // HTML template for the component
  styleUrls: ['./security.page.scss'], // Styles for the component
})


// Properties to store current readings
export class SecurityPage implements OnInit {
  currentpirState?: number;
  securityChart: any; // Property to hold the Chart.js chart instance
  holidayMode!: boolean;

  private isRefreshing = false;
  private refreshEvent: any;
  
  // Constructor with SensorDataService injected for fetching sensor data
  constructor(private sensorDataService: SensorDataService,
    private firebaseService: FirebaseService,) { }

  // ngOnInit lifecycle hook to fetch initial data
  ngOnInit() {
    this.fetchSecurityDataForTimeFrame('hours', 24, 'day');
    this.firebaseService.getHolidayModeState().subscribe(state => {
      this.holidayMode = !!state; // Update based on Firebase
    });
  }

  // Method to update the time frame of data being displayed
  updateTimeFrame(eventDetail: any) {
    const timeFrame = eventDetail.value;
    let hours;
    switch (timeFrame) {
      case 'hour':
        hours = 1;
        break;
      case 'day':
        hours = 24;
        break;
      case 'week':
        hours = 24 * 7;
        break;
      case 'month':
        hours = 24 * 30;
        break;
      case 'year':
        hours = 24 * 365;
        break;
      default:
        console.error('Invalid time frame specified: ', timeFrame);
        return;
    }

    this.fetchSecurityDataForTimeFrame('hours', hours, timeFrame);
  }

  doRefresh(event: any) {
    this.isRefreshing = true;
    this.refreshEvent = event;
    this.fetchSecurityDataForTimeFrame('hours', 24, 'day'); 
  }
  // Method to fetch data for a given time frame
  fetchSecurityDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    this.sensorDataService.getSensorDataForLastHours(value).subscribe(data => {
      this.processSecurityData(data, selectedTimeFrame);
      console.log(data);
      if (this.isRefreshing) {
        this.refreshEvent.target.complete();
        this.isRefreshing = false;
      }

    }, error => {
      console.error('Error fetching security data:', error);
      if (this.isRefreshing) {
        this.refreshEvent.target.complete();
        this.isRefreshing = false;
      }
    });
  }

  // Method to process  data and prepare it for the chart
  processSecurityData(data: any[], selectedTimeFrame: string) {

    const securityData = data.map(d => d.pirState);

    let labels = data.map(d => new Date(d.timestamp * 1000).toLocaleString());


    this.currentpirState = securityData.length > 0 ? securityData[securityData.length - 1] : null;

    this.setupSecurityChart(labels, securityData);
  }

  // Method to set up the data chart using Chart.js
  setupSecurityChart(labels: string[], securityData: number[]) {
    // Setup chart here
    const data = {
      labels: labels,
      datasets: [{
        label: 'Security Status',
        data: securityData,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {},
        x: {
          time: {
            unit: 'hour'
          },
          title: {
            display: true,
            text: 'Time'
          },
          ticks: {
            minRotation: 90,
            maxRotation: 90
          },
        }
      },
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Security Status Over Time' }
      }
    };

    const canvas = document.getElementById('pirStateChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.securityChart) {
        this.securityChart.destroy();
      }
      this.securityChart = new Chart(canvas, { type: 'line', data: data, options: options });
    } else {
      console.error('Canvas element not found');
    };

  }
  toggleHolidayMode() {
    this.firebaseService.setHolidayModeStatus(this.holidayMode);
  };
  turnHolidayModeOn() {
    this.firebaseService.setHolidayModeStatus(true);
    this.holidayMode = true;
  };
  turnHolidayModeOff() {
    this.firebaseService.setHolidayModeStatus(false);
  };
};