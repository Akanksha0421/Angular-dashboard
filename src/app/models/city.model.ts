export interface City {
  id: number;
  name: string;
  forecastValue: string;
  forecastPercent: number;
  chartData: number[];
  position: [number, number]; // [lat, lng]
}