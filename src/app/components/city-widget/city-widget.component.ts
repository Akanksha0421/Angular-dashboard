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
      tooltip: { enabled: true }
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
      // Add a straight forecast line at the last value
      this.lineChartDataValue.datasets[1].data = valueData.length ? Array(valueData.length).fill(valueData[valueData.length - 1]) : [];

      // For percent chart
      const percentData = this.city.chartDataPercent || [];
      this.lineChartDataPercent.labels = this.city.chartLabelsPercent || Array(percentData.length).fill('');
      this.lineChartDataPercent.datasets[0].data = percentData;
      // Add a straight forecast line at the last value
      this.lineChartDataPercent.datasets[1].data = percentData.length ? Array(percentData.length).fill(percentData[percentData.length - 1]) : [];
    }
  }

  onWidgetClick() {
    this.cityClick.emit(this.city.id);
  }
}
