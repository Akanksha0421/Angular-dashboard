import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-city-widget',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './city-widget.component.html',
  styleUrl: './city-widget.component.scss'
})
export class CityWidgetComponent {

  @Input() city: any;
  @Output() cityClick = new EventEmitter<number>();

  // Utility to abbreviate numbers (e.g., 1200000 -> 1.2M)
  abbreviateNumber(value: number | string): string {
    if (typeof value === 'string') value = parseFloat(value.replace(/[^\d.]/g, ''));
    if (isNaN(value)) return '';
    if (value >= 1e12) return (value / 1e12).toFixed(1) + 'T';
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toString();
  }

  get formattedForecastValue(): string {
    if (!this.city) return '';
    // Always show $ sign as in design
    return '$' + this.abbreviateNumber(this.city.forecastValue);
  }

  get percentArrow(): {arrow: string, color: string} {
    if (!this.city) return {arrow: '', color: ''};
    // Up for >=0, down for <0
    const up = this.city.forecastPercent >= 0;
    return {
      arrow: up ? '▲' : '▼',
      color: up ? '#00ffb3' : '#ff4d4f'
    };
  }

  public lineChartDataValue: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0,191,255,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        borderDash: [6, 4], // dotted line
      },
      {
        data: [],
        borderColor: '#00bfff',
        borderWidth: 1,
        borderDash: [], // solid line
        fill: false,
        pointRadius: 0,
        tension: 0,
        backgroundColor: 'rgba(0,0,0,0)',
      }
    ]
  };
  public lineChartDataPercent: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: '#00ffb3',
        backgroundColor: 'rgba(0,255,179,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        borderDash: [6, 4], // dotted line
      },
      {
        data: [],
        borderColor: '#00ffb3',
        borderWidth: 1,
        borderDash: [], // solid line
        fill: false,
        pointRadius: 0,
        tension: 0,
        backgroundColor: 'rgba(0,0,0,0)',
      }
    ]
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          labelPointStyle: () => ({
            pointStyle: 'circle',
            rotation: 0
          })
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
        pointStyle: 'circle',
        backgroundColor: '#fff',
        borderColor: '#00bfff',
        borderWidth: 2
      }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };
  public lineChartType: 'line' = 'line';


  ngOnInit() {
    this.updateCharts();
  }

  ngOnChanges() {
    this.updateCharts();
  }

  private updateCharts() {
    if (this.city) {
      // For value chart
      const valueData = this.city.chartDataValue || [];
      this.lineChartDataValue.labels = this.city.chartLabelsValue || Array(valueData.length).fill('');
      this.lineChartDataValue.datasets[0].data = valueData;
      this.lineChartDataValue.datasets[0].borderWidth = 1.5;
      this.lineChartDataValue.datasets[0].backgroundColor = 'rgba(0,191,255,0.10)';
      // Add a straight forecast line at the last value
      this.lineChartDataValue.datasets[1].data = valueData.length ? Array(valueData.length).fill(valueData[valueData.length - 1]) : [];
      this.lineChartDataValue.datasets[1].borderWidth = 1;
      // For percent chart
      const percentData = this.city.chartDataPercent || [];
      this.lineChartDataPercent.labels = this.city.chartLabelsPercent || Array(percentData.length).fill('');
      this.lineChartDataPercent.datasets[0].data = percentData;
      this.lineChartDataPercent.datasets[0].borderWidth = 1.5;
      this.lineChartDataPercent.datasets[0].backgroundColor = 'rgba(0,255,179,0.10)';
      this.lineChartDataPercent.datasets[1].data = percentData.length ? Array(percentData.length).fill(percentData[percentData.length - 1]) : [];
      this.lineChartDataPercent.datasets[1].borderWidth = 1;
    }
  }

  onWidgetClick() {
    this.cityClick.emit(this.city.id);
  }
}
