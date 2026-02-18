import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { CityWidgetComponent } from '../../components/city-widget/city-widget.component';
import { MapComponent } from '../../components/map/map.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, CityWidgetComponent, MapComponent, SidebarComponent, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  cities: any[] = [];
  sidebarOpen = false;
  stacks: any[] = [];
  selectedStackId: number | null = null;
  actionItemCount: number = 0;
  widgetAlignment: 'left' | 'right' | 'top' | 'bottom' = 'top'; // default alignment

  constructor(private mockDataService: MockDataService, private router: Router) {}

  onMenuClick() {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('[LandingComponent] Sidebar menu clicked, open:', this.sidebarOpen);
  }

  onSidebarBack() {
    this.sidebarOpen = false;
  }

  onStackSelect(stackId: number) {
    this.selectedStackId = stackId;
    // Optionally, do something when a stack is selected
  }

  onCityClick(cityId: number) {
    // Navigate to details page for the selected city
    this.router.navigate(['/details', cityId]);
  }

  ngOnInit() {
    this.cities = this.mockDataService.getCities();
    this.stacks = this.mockDataService.getSidebarStacks(1); // Use city 1 or any default
    if (this.stacks.length > 0) {
      this.selectedStackId = this.stacks[0].id;
    }
    // Count stacks in BACKLOG as action items
    this.actionItemCount = this.stacks.filter(s => s.status === 'BACKLOG').length;
    console.log('[LandingComponent] Cities loaded:', this.cities);
  }
}
