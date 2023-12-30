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
  selector: 'app-moisture', // Component selector used in HTML
  templateUrl: './moisture.page.html', // HTML template for the component
  styleUrls: ['./moisture.page.scss'], // Styles for the component
})

// Properties to store current, minimum, and maximum readings
export class MoisturePage implements OnInit {
  currentMoisture?: number;
  minMoisture?: number;
  maxMoisture?: number;
  moistureChart: any; // Property to hold the Chart.js chart instance

  // Constructor with SensorDataService injected for fetching sensor data
  constructor(private sensorDataService: SensorDataService) { }


  // ngOnInit lifecycle hook to fetch initial data
  ngOnInit() {
    this.fetchMoistureDataForTimeFrame('hours', 24, 'day');
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

    this.fetchMoistureDataForTimeFrame('hours', hours, timeFrame);
  }

  // Method to fetch data for a given time frame
  fetchMoistureDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value);

    observable$.subscribe(data => {
      this.processMoistureData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching moisture data:', error);
    });
  }

  // Method to process  pressure data and prepare it for the chart
  processMoistureData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => !isNaN(+d.moisture));
    const moistureLevels = validData.map(d => +d.moisture);

    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }

    if (moistureLevels.length > 0) {
      this.currentMoisture = moistureLevels[moistureLevels.length - 1];
      this.minMoisture = Math.min(...moistureLevels);
      this.maxMoisture = Math.max(...moistureLevels);
    } else {
      this.currentMoisture = 0;
      this.minMoisture = 0;
      this.maxMoisture = 0;
    }

    this.setupMoistureChart(labels, moistureLevels);
  }

  // Method to set up the data chart using Chart.js
  setupMoistureChart(labels: string[], moistureLevels: number[]) {
    const data = {
      labels: labels,
      datasets: [{
        label: 'Moisture Level',
        data: moistureLevels,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
    const options = {
      scales: {
        y: {

        },
        x: {
          time: {
            unit: 'hour' as const,
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
          text: 'Moisture Level Over Time'
        }
      }
    };

    if (this.moistureChart) {
      this.moistureChart.destroy();
    }

    const canvas = document.getElementById('moistureChart') as HTMLCanvasElement;
    if (canvas) {
      canvas.height = 350;

      this.moistureChart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: options
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}
