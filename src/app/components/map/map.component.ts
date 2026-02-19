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

  ngAfterViewInit() {                                        //latitude,longitude,zoomlevel                                 
    this.map = L.map(this.mapContainer.nativeElement).setView([15, -75], 3);
    // Theme: Use CartoDB Dark Matter for a dark map background
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
     
    }).addTo(this.map);
    //loop through each city in array
    this.cities.forEach((city, idx) => {
      // Custom circle marker with city number
      const iconHtml = `<div style="
        background: linear-gradient(135deg, #00bfff 60%, #00ffb3 100%);
        border-radius: 50%;
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        color: #fff; font-weight: bold; font-size: 1.1rem;
        border: 2.5px solid #fff; box-shadow: 0 0 8px #00bfff99;
      ">${idx + 1}</div>`;
      const customIcon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
      });
      //add marker to map
      const marker = L.marker(city.position as L.LatLngExpression, { icon: customIcon }).addTo(this.map);
      //add tooltip
      marker.bindTooltip(`<b>${city.name}</b><br>Forecast: ${city.forecastValue}<br>Percent: ${city.forecastPercent}%`, { direction: 'top' });
    });
    // TODO: Add smooth zoom-in animation on load
  }
}
