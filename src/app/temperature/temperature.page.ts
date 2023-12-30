import { Component, OnInit } from '@angular/core';
import {
    // Importing Chart.js components required for creating the chart
  Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';  // Import the date adapter
import { SensorDataService } from '../services/sensor-data.service';

// Registering Chart.js components to be used in creating the chart
Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
);

@Component({
  selector: 'app-temperature', // Component selector used in HTML
  templateUrl: './temperature.page.html', // HTML template for the component
  styleUrls: ['./temperature.page.scss'], // Styles for the component
})

// Properties to store current, minimum, and maximum readings
export class TemperaturePage implements OnInit {
  currentTemperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  temperatureChart: any;

  private isRefreshing = false;
  private refreshEvent: any;

  // Constructor with SensorDataService injected for fetching sensor data
  constructor(private sensorDataService: SensorDataService) { }

    // ngOnInit lifecycle hook to fetch initial data
  ngOnInit() {
    this.fetchTemperatureDataForTimeFrame('hours', 24, 'day');
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
        hours = 24 * 30; // Approximate
        break;
      case 'year':
        hours = 24 * 365; // Approximate
        break;
      default:
        console.error('Invalid time frame specified: ', timeFrame);
        return;
    }
  
    this.fetchTemperatureDataForTimeFrame('hours', hours, timeFrame);
  }

  doRefresh(event: any) {
    this.isRefreshing = true;
    this.refreshEvent = event;
    this.fetchTemperatureDataForTimeFrame('hours', 24, 'day'); 
  }
  
// Method to fetch data for a given time frame
fetchTemperatureDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
  const observable$ = this.sensorDataService.getSensorDataForLastHours(value);
  observable$.subscribe(data => {
    console.log(data);
    this.processTemperatureData(data, selectedTimeFrame);

    if (this.isRefreshing) {
      this.refreshEvent.target.complete();
      this.isRefreshing = false;
    }

  }, error => {
    console.error('Error fetching temperature data:', error);
    if (this.isRefreshing) {
      this.refreshEvent.target.complete();
      this.isRefreshing = false;
    }
  });
}

  // Method to process  data and prepare it for the chart
  processTemperatureData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => !isNaN(+d.temperature));
    const temperatures = validData.map(d => +d.temperature);
  
    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }
  
    if (temperatures.length > 0) {
      this.currentTemperature = temperatures[temperatures.length - 1];
      this.minTemperature = Math.min(...temperatures);
      this.maxTemperature = Math.max(...temperatures);
    } else {
      
      this.currentTemperature = 0; 
      this.minTemperature = 0; 
      this.maxTemperature = 0; 
    }
  
    this.setupTemperatureChart(labels, temperatures);
  }

   // Method to set up the data chart using Chart.js
  setupTemperatureChart(labels: string[], temperatures: number[]) {
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Temperature',
        data: temperatures,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
    console.log('Chart Data 111:', data);  // Log the chart data
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
          text: 'Temperature Over Time'
        }
      }
    };

    if (this.temperatureChart) {
      this.temperatureChart.destroy(); 
    }
    
    const canvas = document.getElementById('temperatureChart') as HTMLCanvasElement;
    if (canvas) {
      canvas.height = 400;  
      this.temperatureChart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: options
      });
    } else {
      console.error('Canvas element not found');
    }
    console.log("Chart data object:", data);
    console.log("Chart options object:", options);
  }
}