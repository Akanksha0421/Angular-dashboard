import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
// Register the annotation plugin globally
Chart.register(annotationPlugin);
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgChartsModule, NavbarComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  dataExpanded: boolean[] = [true, false, false];
    onMenuClick() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  cityId: number = 0;
  stacks: any[] = [];
  selectedStackId: number | null = null;
  chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#fff', font: { size: 15 } }
      },
      tooltip: { enabled: true },
      annotation: {
        annotations: {
          historicalBox: {
            type: 'box',
            xMin: 0,
            xMax: 6.5,
            backgroundColor: 'rgba(0, 191, 255, 0.07)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'HISTORICAL',
              position: 'center',
              color: '#fff',
              font: { size: 16, weight: 'bold' }
            }
          },
          forecastBox: {
            type: 'box',
            xMin: 6.5,
            xMax: 11.5,
            backgroundColor: 'rgba(0, 255, 179, 0.07)',
            borderWidth: 0,
            label: {
              display: true,
              content: 'FORECAST',
              position: 'center',
              color: '#fff',
              font: { size: 16, weight: 'bold' }
            }
          },
          splitLine: {
            type: 'line',
            xMin: 6.5,
            xMax: 6.5,
            borderColor: '#fff',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: false
            }
          }
        }
      } as any // TypeScript workaround for annotation plugin
    },
    layout: { padding: 20 },
    scales: {
      x: {
        display: true,
        ticks: { color: '#fff', font: { size: 13 } },
        grid: { color: '#22384d' }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'CONSUMPTION (FT, THOUSANDS)',
          color: '#fff',
          font: { size: 15, weight: 'bold' }
        },
        ticks: { color: '#fff', stepSize: 100000 },
        grid: { color: '#22384d' }
      }
    }
  };
  chartType: 'line' = 'line';
  tableData: any[] = [];
  sidebarOpen = false;

  constructor(private route: ActivatedRoute, private dataService: MockDataService, private router: Router) {}
  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.cityId = Number(this.route.snapshot.paramMap.get('id'));
    this.stacks = this.dataService.getSidebarStacks(this.cityId);
    if (this.stacks.length > 0) {
      this.selectedStackId = this.stacks[0].id;
      this.updateChartData();
    }
    this.sidebarOpen = false;
  }

  onStackSelect(stackId: number) {
    this.selectedStackId = stackId;
    this.updateChartData();
  }

  onSidebarBack() {
    this.sidebarOpen = false;
  }
  get selectedStack() {
    return this.stacks.find(s => s.id === this.selectedStackId) || null;
  }
  updateChartData() {
    if (this.selectedStackId) {
      const data = this.dataService.getStackChartData(this.selectedStackId);
      this.chartData = {
        labels: data.labels,
        datasets: data.datasets.map((ds: any, idx: number) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.borderColor,
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          borderWidth: 2,
          borderDash: ds.label === 'AI Forecast' || ds.label === 'Final Forecast' || ds.label === 'Prev Qtr Final' ? [6, 6] : [],
        }))
      };
      this.tableData = this.dataService.getStackTableData(this.selectedStackId);
    }
  }
}
