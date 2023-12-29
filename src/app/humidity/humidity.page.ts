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
  selector: 'app-humidity', // Component selector used in HTML
  templateUrl: './humidity.page.html', // HTML template for the component
  styleUrls: ['./humidity.page.scss'], // Styles for the component
})

// Properties to store current, minimum, and maximum readings
export class HumidityPage implements OnInit {
  currentHumidity?: number;
  minHumidity?: number;
  maxHumidity?: number;
  humidityChart: any;

// Constructor with SensorDataService injected for fetching sensor data
  constructor(private sensorDataService: SensorDataService) { }

// ngOnInit lifecycle hook to fetch initial data
  ngOnInit() {
    this.fetchHumidityDataForTimeFrame('hours', 24, 'day');
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
  
    this.fetchHumidityDataForTimeFrame('hours', hours, timeFrame);
  }
  
  // Method to fetch data for a given time frame
  fetchHumidityDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value); 
    observable$.subscribe(data => {
      this.processHumidityData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching humidity data:', error);
    });
  }

  // Method to process  data and prepare it for the chart
  processHumidityData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => !isNaN(+d.humidity));
    const humidities = validData.map(d => +d.humidity);

    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }

    if (humidities.length > 0) {
      this.currentHumidity = humidities[humidities.length - 1];
      this.minHumidity = Math.min(...humidities);
      this.maxHumidity = Math.max(...humidities);
    } else {
      this.currentHumidity = 0;
      this.minHumidity = 0;
      this.maxHumidity = 0;
    }

    this.setupHumidityChart(labels, humidities);
  }

   // Method to set up the data chart using Chart.js
  setupHumidityChart(labels: string[], humidities: number[]) {
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'Humidity',
        data: humidities,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',  
        borderColor: 'rgba(54, 162, 235, 1)',      
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
            // Set rotation angles here
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

    if (this.humidityChart) {
      this.humidityChart.destroy();
    }
    
    const canvas = document.getElementById('humidityChart') as HTMLCanvasElement;
    if (canvas) {
      canvas.height = 400;

      this.humidityChart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: options
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}
