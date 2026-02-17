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

  public lineChartData: ChartConfiguration<'line'>['data'] = {
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
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    if (this.city) {
      this.lineChartData.labels = this.city.chartLabels || Array(this.city.chartData.length).fill('');
      this.lineChartData.datasets[0].data = this.city.chartData;
    }
  }

  onWidgetClick() {
    this.cityClick.emit(this.city.id);
  }
}
