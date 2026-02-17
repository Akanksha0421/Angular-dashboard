import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path for Angular build
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() cities: any[] = [];
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: L.Map;

  ngAfterViewInit() {
    this.map = L.map(this.mapContainer.nativeElement).setView([15, -75], 3);
    // Use CartoDB Dark Matter for a dark map background
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO'
    }).addTo(this.map);
    this.cities.forEach(city => {
      const marker = L.marker(city.position as L.LatLngExpression).addTo(this.map);
      marker.bindTooltip(`<b>${city.name}</b><br>Forecast: ${city.forecastValue}<br>Percent: ${city.forecastPercent}%`, { direction: 'top' });
    });
    // TODO: Add smooth zoom-in animation on load
  }
}
