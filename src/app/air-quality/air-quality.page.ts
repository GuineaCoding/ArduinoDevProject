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
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.page.html',
  styleUrls: ['./sensor-data.page.scss'],
})
export class SensorDataPage implements OnInit {
  currentCO2?: number;
  currentGasResistance?: number;
  currentVOC?: number;
  sensorDataChart: any;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.fetchSensorDataForTimeFrame('hours', 24, 'day');
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
  
    this.fetchSensorDataForTimeFrame('hours', hours, timeFrame);
  }
  fetchSensorDataForTimeFrame(timeUnit: string, value: number, selectedTimeFrame: string) {
    const observable$ = this.sensorDataService.getSensorDataForLastHours(value);
    observable$.subscribe(data => {
      this.processSensorData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching sensor data:', error);
    });
  }

  processSensorData(data: any[], selectedTimeFrame: string) {
    const validData = data.filter(d => d.co2 && d.gasResistor && d.volatileOrganicCompounds);

    const co2Data = validData.map(d => +d.co2);
    const gasResistanceData = validData.map(d => +d.gasResistor / 1e6);  // Convert Ohms to Megaohms
    const vocData = validData.map(d => +d.volatileOrganicCompounds);

    let labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString(selectedTimeFrame === 'hour' || selectedTimeFrame === 'day' ? 'en-US' : undefined));

    this.setupSensorDataChart(labels, co2Data, gasResistanceData, vocData);
  }
  setupSensorDataChart(labels: string[], co2Data: number[], gasResistanceData: number[], vocData: number[]) {
    const data = {
      labels: labels,
      datasets: [
  
        {
          label: 'CO2 (ppm)',
          data: co2Data, // Assuming you have an array of CO2 data
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Gas Resistance (MΩ)',
          data: gasResistanceData.map(resistance => resistance / 1e6), // Convert ohms to megaohms
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
        {
          label: 'VOC',
          data: vocData, // Assuming you have an array of VOC data
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        }
      ]
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
          text: 'Temperature Over Time'
        }
      }
    };

    const canvas = document.getElementById('sensorDataChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.sensorDataChart) {
        this.sensorDataChart.destroy();
      }
      this.sensorDataChart = new Chart(canvas, {
        type: 'line',
        data: data,
        options: options
      });
    } else {
      console.error('Canvas element not found');
    }
  }


}
