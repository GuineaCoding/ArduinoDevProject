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
  selector: 'app-air-quality', 
  templateUrl: './air-quality.page.html', 
  styleUrls: ['./air-quality.page.scss'], 
})
export class AirQualityPage implements OnInit { 
  currentCO2?: number;
  currentGasResistance?: number;
  currentVOC?: number;
  airQualityChart: any; 

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
      console.log('data1',data)
      this.processSensorData(data, selectedTimeFrame);
    }, error => {
      console.error('Error fetching sensor data:', error);
    });
  }
  
  processSensorData(data: any[], selectedTimeFrame: string) {
   
    const validData = data.filter(d => !isNaN(+d.co2) && !isNaN(+d.gasResistor) && !isNaN(+d.volatileOrganicCompounds));
  console.log('validData',validData)
    const co2Data = validData.map(d => +d.co2 / 1000);
    const gasResistanceData = validData.map(d => +d.gasResistor / 1e6);
    const vocData = validData.map(d => +d.volatileOrganicCompounds);
    console.log('vocData', vocData)
  
    let labels;
    if (selectedTimeFrame === 'hour' || selectedTimeFrame === 'day') {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleTimeString());
    } else {
      labels = validData.map(d => new Date(d.timestamp * 1000).toLocaleString());
    }
  
    if (co2Data.length > 0) {
      this.currentCO2 = co2Data[co2Data.length - 1];
    }
    if (gasResistanceData.length > 0) {
      this.currentGasResistance = gasResistanceData[gasResistanceData.length - 1];
    }
    if (vocData.length > 0) {
      this.currentVOC = vocData[vocData.length - 1];
    } else {
      this.currentVOC = 0; 
      this.currentGasResistance = 0; 
      this.currentCO2 = 0; 
    }
  
    this.setupSensorDataChart(labels, co2Data, gasResistanceData, vocData);
  }
  


  setupSensorDataChart(labels: string[], co2Data: number[], gasResistanceData: number[], vocData: number[]) {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'CO2 (ppm)',
          data: co2Data,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Gas Resistance (MΩ)',
          data: gasResistanceData, 
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
        {
          label: 'VOC',
          data: vocData,
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

    const canvas = document.getElementById('airQualityChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.airQualityChart) {
        this.airQualityChart.destroy();
      }
      this.airQualityChart = new Chart(canvas, {
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