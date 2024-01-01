import { Component, OnInit } from '@angular/core';
import {
  // Importing Chart.js components required for creating the chart
  Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adapter for date functionality in Chart.js
import { SensorDataService } from '../services/sensor-data.service';

// Registering Chart.js components to be used in creating the chart
Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
);

@Component({
  selector: 'app-pressure', // Component selector used in HTML
  templateUrl: './pressure.page.html', // HTML template for the component
  styleUrls: ['./pressure.page.scss'], // Styles for the component
})

// Properties to store current, minimum, and maximum readings
export class PressurePage implements OnInit {
  currentPressure?: number;
  minPressure?: number;
  maxPressure?: number;
  pressureChart: any;

  private isRefreshing = false;
  private refreshEvent: any;


  // Constructor with SensorDataService injected for fetching sensor data
  constructor(private sensorDataService: SensorDataService) { }

  // ngOnInit lifecycle hook to fetch initial data
  ngOnInit() {
    this.fetchPressureDataForTimeFrame('hours', 24, 'day');
  };

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

    this.fetchPressureDataForTimeFrame('hours', hours, timeFrame);
  }

  // Method to fetch data for a given time frame
  doRefresh(event: any) {
    this.isRefreshing = true;
    this.refreshEvent = event;
    this.fetchPressureDataForTimeFrame('hours', 24, 'day'); 
  }

  fetchPressureDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value);
    observable$.subscribe(data => {
      this.processPressureData(data, selectedTimeFrame);
      console.log(data);
      // Complete the refresh action after data is processed
      if (this.isRefreshing) {
        this.refreshEvent.target.complete();
        this.isRefreshing = false;
      }

    }, error => {
      console.error('Error fetching pressure data:', error);

      // Complete the refresh action also in case of an error
      if (this.isRefreshing) {
        this.refreshEvent.target.complete();
        this.isRefreshing = false;
      }
    });
  }

  // Method to process  data and prepare it for the chart
  processPressureData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => !isNaN(+d.pressureKPa));
    const pressures = validData.map(d => +d.pressureKPa * 10);  // Convert from kPa to hPa

    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }

    if (pressures.length > 0) {
      this.currentPressure = pressures[pressures.length - 1];
      this.minPressure = Math.min(...pressures);
      this.maxPressure = Math.max(...pressures);
    } else {
      this.currentPressure = 0;
      this.minPressure = 0;
      this.maxPressure = 0;
    }

    this.setupPressureChart(labels, pressures);
  }

  // Method to set up the data chart using Chart.js
  setupPressureChart(labels: string[], pressures: number[]) {
    const data = {
      labels: labels,
      datasets: [{
        label: 'Pressure',
        data: pressures,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          // you can add options for y-axis if needed
        },
        x: {
          time: {
            unit: 'hour',
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
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Pressure Over Time (hPa)'
        }
      }
    };

    if (this.pressureChart) {
      this.pressureChart.destroy();
    }

    const canvas = document.getElementById('pressureChart') as HTMLCanvasElement;
    if (canvas) {
      this.pressureChart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: options
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}
