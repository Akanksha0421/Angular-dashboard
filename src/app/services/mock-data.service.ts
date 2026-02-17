import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  getCities(): City[] {
    return [
      {
        id: 1,
        name: 'New York',
        forecastValue: '1,200,000',
        forecastPercent: 12.5,
        chartData: [100, 120, 130, 125, 140, 150, 160, 170, 180, 190],
        position: [40.7128, -74.0060]
      },
      {
        id: 2,
        name: 'London',
        forecastValue: '950,000',
        forecastPercent: 8.2,
        chartData: [90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
        position: [51.5074, -0.1278]
      },
      {
        id: 3,
        name: 'Tokyo',
        forecastValue: '1,500,000',
        forecastPercent: 15.1,
        chartData: [110, 115, 120, 130, 140, 150, 160, 170, 180, 200],
        position: [35.6895, 139.6917]
      },
      {
        id: 4,
        name: 'Paris',
        forecastValue: '800,000',
        forecastPercent: 6.7,
        chartData: [80, 85, 90, 95, 100, 110, 120, 130, 140, 150],
        position: [48.8566, 2.3522]
      },
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartData: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
        position: [-33.8688, 151.2093]
      }
    ];
  }

  getSidebarStacks(cityId: number) {
    // Return mock stacks for a city
    return [
      { id: 101, name: 'Sample Stack 1', status: 'BACKLOG', forecastStab: '↓', forecastAcc: '↑' },
      { id: 102, name: 'Sample Stack 2', status: 'PENDING', forecastStab: '↑', forecastAcc: '↑' },
      { id: 103, name: 'Sample Stack 3', status: 'FINAL SIGN-OFF', forecastStab: '↓', forecastAcc: '↓' },
      { id: 104, name: 'Sample Stack 4', status: 'BACKLOG', forecastStab: '↑', forecastAcc: '↓' },
    ];
  }

  getStackChartData(stackId: number) {
    // Return mock chart data for a stack
    return {
      labels: ['Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
      datasets: [
        { label: 'Historical', data: [744038, 670100, 640250, 670000, 671100, 712033, 705500, 719123, 0, 0, 0, 0], borderColor: '#FFD600', fill: false },
        { label: 'AI Forecast', data: [0, 0, 0, 0, 0, 0, 670100, 719123, 750000, 780000, 800000, 820000], borderColor: '#00BFFF', fill: false },
        { label: 'Final Forecast', data: [0, 0, 0, 0, 0, 0, 671100, 712033, 705500, 719123, 730000, 740000], borderColor: '#FF4081', fill: false },
        { label: 'Prev Qtr Final', data: [0, 0, 0, 0, 0, 0, 640250, 670000, 671100, 712033, 705500, 719123], borderColor: '#8BC34A', fill: false }
      ]
    };
  }

  getStackTableData(stackId: number) {
    // Return mock table data for a stack
    return [
      { label: 'Data 1', values: [744038, 670100, 640250, 670000, 671100, 712033, 705500, 719123, 750000, 780000, 800000, 820000] },
      { label: 'Data 2', values: [410623, 455754, 536564, 474411, 501124, 513751, 550004, 545455, 600000, 620000, 640000, 660000] },
      { label: 'Data 3', values: [744038, 670100, 640250, 670000, 671100, 712033, 705500, 719123, 750000, 780000, 800000, 820000] }
    ];
  }
}