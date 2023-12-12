import { Component, OnInit } from '@angular/core';
import {
  Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';  // Import the date adapter
import { SensorDataService } from '../services/sensor-data.service';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
);

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
})
export class TemperaturePage implements OnInit {
  currentTemperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  temperatureChart: any;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.fetchTemperatureDataForTimeFrame('hours', 24, 'day');
  }

  updateTimeFrame(timeFrame: string) {
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
        console.error('Invalid time frame specified');
        return;
    }     
   
    this.fetchTemperatureDataForTimeFrame('hours', hours, timeFrame);
  }
  

  fetchTemperatureDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value);
    observable$.subscribe(data => {
      this.processTemperatureData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching temperature data:', error);
    });
  }

  processTemperatureData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => !isNaN(+d.temperature));
    const temperatures = validData.map(d => +d.temperature);
  
    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }
  
    this.currentTemperature = temperatures[temperatures.length - 1];
    this.minTemperature = Math.min(...temperatures);
    this.maxTemperature = Math.max(...temperatures);
  
    this.setupTemperatureChart(labels, temperatures);
  }
  

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
          beginAtZero: true
        },
        x: {
          type: 'time' as const, 
          time: {
            unit: 'hour' as const, 
          },
          title: {
            display: true,
            text: 'Time'
          }
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
      this.temperatureChart = new Chart(canvas, {
        type: 'line',
        data: data
      
      });
    } else {
      console.error('Canvas element not found');
    }
    console.log("Chart data object:", data);
    console.log("Chart options object:", options);
  }

  
}