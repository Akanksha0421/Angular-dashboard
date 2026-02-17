export interface City {
  id: number;
  name: string;
  forecastValue: string;
  forecastPercent: number;
  chartDataValue: number[];
  chartDataPercent: number[];
  chartLabelsValue?: string[];
  chartLabelsPercent?: string[];
  position: [number, number]; // [lat, lng]
}