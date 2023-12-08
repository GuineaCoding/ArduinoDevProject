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
    this.fetchTemperatureDataForTimeFrame('hours', 24);
  }

  updateTimeFrame(timeFrame: string) {
    let value;
    switch (timeFrame) {
      case 'hour':
        value = 1;
        break;
      case 'day':
        value = 24;
        break;
      case 'week':
        value = 24 * 7;
        break;
      case 'month':
        value = 24 * 30; 
        break;
      case 'year':
        value = 24 * 365; 
        break;
    }

    // this.fetchTemperatureDataForTimeFrame(timeFrame, value);
  }

  fetchTemperatureDataForTimeFrame(timeFrame: string, value: number | { year: number, month?: number }) {
    let observable$;

    if (timeFrame === 'hours') {
      observable$ = this.sensorDataService.getSensorDataForLastHours(value as number);
    } else if (timeFrame === 'days') {
      observable$ = this.sensorDataService.getSensorDataForLastDays(value as number);
    } else if (timeFrame === 'month') {
      observable$ = this.sensorDataService.getSensorDataForMonth((value as { year: number, month: number }).year, (value as { year: number, month: number }).month);
    } else if (timeFrame === 'year') {
      observable$ = this.sensorDataService.getSensorDataForYear((value as { year: number }).year);
    } else {
      console.error('Invalid time frame specified');
      return;
    }

    observable$.subscribe(data => {
      console.log("Fetched data:", data); // Log for debugging
      this.processTemperatureData(data);
    }, error => {
      console.error('Error fetching temperature data:', error);
    });
  }

  processTemperatureData(data: any[]) {
    // Filter the data to remove entries with invalid or non-numeric temperatures
    const validData = data.filter(d => !isNaN(+d.temperature));
  
    // filtered data to temperatures and labels
    const temperatures = validData.map(d => +d.temperature);
    const labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
  
    if (temperatures.length > 0) {
      this.currentTemperature = temperatures[temperatures.length - 1];
      this.minTemperature = Math.min(...temperatures);
      this.maxTemperature = Math.max(...temperatures);
    }
    console.log("Filtered data:", validData);
    console.log("Processed temperatures:", temperatures);
    console.log("Labels for chart:", labels);
  
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