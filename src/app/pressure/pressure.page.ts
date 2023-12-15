import { Component, OnInit } from '@angular/core';
import {
  Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { SensorDataService } from '../services/sensor-data.service';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, TimeScale, TimeSeriesScale
);

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.page.html',
  styleUrls: ['./pressure.page.scss'],
})
export class PressurePage implements OnInit {
  currentPressure?: number;
  minPressure?: number;
  maxPressure?: number;
  pressureChart: any;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.fetchPressureDataForTimeFrame('hours', 24, 'day');
  }

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
  
  fetchPressureDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value);
    observable$.subscribe(data => {
      this.processPressureData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching pressure data:', error);
    });
  }

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
      canvas.height = 300;
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
