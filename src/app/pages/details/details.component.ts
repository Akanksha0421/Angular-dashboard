import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgChartsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  cityId: number = 0;
  stacks: any[] = [];
  selectedStackId: number | null = null;
  chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      x: { display: true },
      y: { display: true }
    }
  };
  chartType: 'line' = 'line';
  tableData: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: MockDataService) {}

  ngOnInit() {
    this.cityId = Number(this.route.snapshot.paramMap.get('id'));
    this.stacks = this.dataService.getSidebarStacks(this.cityId);
    if (this.stacks.length > 0) {
      this.selectedStackId = this.stacks[0].id;
      this.updateChartData();
    }
  }

  onStackSelect(stackId: number) {
    this.selectedStackId = stackId;
    this.updateChartData();
  }

  updateChartData() {
    if (this.selectedStackId) {
      const data = this.dataService.getStackChartData(this.selectedStackId);
      this.chartData = {
        labels: data.labels,
        datasets: data.datasets.map((ds: any) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.borderColor,
          fill: ds.fill,
          tension: 0.4,
          pointRadius: 3,
          borderWidth: 2
        }))
      };
      this.tableData = this.dataService.getStackTableData(this.selectedStackId);
    }
  }
}
