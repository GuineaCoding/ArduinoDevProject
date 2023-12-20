import { Component, OnInit } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, TimeScale, TimeSeriesScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { SensorDataService } from '../services/sensor-data.service';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, TimeScale, TimeSeriesScale);

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  currentpirState?: number; 
  securityChart: any;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.fetchSecurityDataForTimeFrame('hours', 24, 'day');
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
  
    this.fetchSecurityDataForTimeFrame('hours', hours, timeFrame);
  }

  fetchSecurityDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    this.sensorDataService.getSensorDataForLastHours(value).subscribe(data => {
      this.processSecurityData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching security data:', error);
    });
  }

  processSecurityData(data: any[], selectedTimeFrame: string) {
    // Example processing logic
    const securityData = data.map(d => d.pirState); 

    let labels = data.map(d => new Date(d.timestamp * 1000).toLocaleString());

 
    this.currentpirState = securityData.length > 0 ? securityData[securityData.length - 1] : null;

    this.setupSecurityChart(labels, securityData);
  }

  setupSecurityChart(labels: string[], securityData: number[]) {
    // Setup your chart here
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
    }
  }
}
