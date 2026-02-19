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
        chartDataValue: [100, 120, 110, 140, 130, 170, 160, 180, 150, 190],
        chartDataPercent: [10, 13, 11, 15, 12, 17, 14, 19, 13, 18],
        position: [40.7128, -74.0060]
      },
      {
        id: 2,
        name: 'London',
        forecastValue: '950,000',
        forecastPercent: 8.2,
        chartDataValue: [90, 92, 95, 100, 120, 110, 130, 120, 140, 135],
        chartDataPercent: [8, 8.2, 8.5, 8.1, 8.7, 8.3, 8.9, 8.4, 9, 8.6],
        position: [51.5074, -0.1278]
      },
      {
        id: 3,
        name: 'Tokyo',
        forecastValue: '1,500,000',
        forecastPercent: 15.1,
        chartDataValue: [110, 130, 120, 140, 160, 150, 170, 180, 200, 190],
        chartDataPercent: [12, 14, 13, 15, 16, 15, 17, 18, 21, 20],
        position: [35.6895, 139.6917]
      },
      {
        id: 4,
        name: 'Paris',
        forecastValue: '800,000',
        forecastPercent: 6.7,
        chartDataValue: [80, 100, 90, 110, 100, 120, 110, 130, 120, 140],
        chartDataPercent: [6, 6.5, 6.2, 7, 6.4, 7.2, 6.6, 7.4, 6.8, 7.6],
        position: [48.8566, 2.3522]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
      ,
      {
        id: 5,
        name: 'Sydney',
        forecastValue: '700,000',
        forecastPercent: 5.3,
        chartDataValue: [70, 80, 75, 90, 85, 100, 95, 110, 105, 115],
        chartDataPercent: [5, 5.2, 5.1, 5.4, 5.3, 5.6, 5.5, 5.8, 5.7, 5.9],
        position: [-33.8688, 151.2093]
      }
    ];
  }

  getSidebarStacks(cityId: number) {
    // Return more realistic mock stacks for a city
    const stacks = [];
    for (let i = 1; i <= 12; i++) {
      stacks.push({
        id: 100 + i,
        name: `Sample Stack ${i}`,
        status: i <= 7 ? 'BACKLOG' : (i <= 10 ? 'PENDING' : 'FINAL SIGN-OFF'),
        forecastStab: i % 2 === 0 ? '↑' : '↓',
        forecastAcc: i % 3 === 0 ? '↓' : '↑',
        forecastValue: (700000 + i * 10000).toLocaleString(),
        forecastPercent: 5 + i * 0.7
      });
    }
    return stacks;
  }

  getStackChartData(stackId: number) {
    // Return different mock chart data for each stackId for demo
    const baseLabels = ['Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'];
    // Use stackId to generate different data
    const offset = (stackId % 4) * 10000;
    return {
      labels: baseLabels,
      datasets: [
        { label: 'Historical', data: [744038, 670100, 640250, 670000, 671100, 712033, 705500, 719123, 0, 0, 0, 0].map(v => v + offset), borderColor: '#FFD600', fill: false },
        { label: 'AI Forecast', data: [0, 0, 0, 0, 0, 0, 670100, 719123, 750000, 780000, 800000, 820000].map(v => v + offset), borderColor: '#00BFFF', fill: false },
        { label: 'Final Forecast', data: [0, 0, 0, 0, 0, 0, 671100, 712033, 705500, 719123, 730000, 740000].map(v => v + offset), borderColor: '#FF4081', fill: false },
        { label: 'Prev Qtr Final', data: [0, 0, 0, 0, 0, 0, 640250, 670000, 671100, 712033, 705500, 719123].map(v => v + offset), borderColor: '#8BC34A', fill: false }
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