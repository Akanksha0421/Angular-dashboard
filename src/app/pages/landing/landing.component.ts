import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { CityWidgetComponent } from '../../components/city-widget/city-widget.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, CityWidgetComponent, MapComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  cities: any[] = [];
  constructor(private mockDataService: MockDataService, private router: Router) {}

  onMenuClick() {
    console.log('[LandingComponent] Sidebar menu clicked');
    // Implement sidebar open logic here
  }

  onCityClick(cityId: number) {
    console.log('[LandingComponent] City clicked:', cityId);
    this.router.navigate(['/details', cityId]);
  }

  ngOnInit() {
    this.cities = this.mockDataService.getCities();
    console.log('[LandingComponent] Cities loaded:', this.cities);
  }
}
