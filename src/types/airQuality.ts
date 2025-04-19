
// Air Quality Types
export type AQILevel = 'good' | 'moderate' | 'unhealthy' | 'veryunhealthy';

export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  location: string;
  timestamp: string;
  windSpeed?: number;
  windDirection?: string;
}

export interface AirQualityForecast {
  hourly: {
    time: string;
    aqi: number;
  }[];
  daily: {
    date: string;
    aqiMin: number;
    aqiMax: number;
    aqiAvg: number;
  }[];
}

export interface HistoricalAirQuality {
  daily: {
    date: string;
    aqi: number;
    pm25: number;
    pm10: number;
    temperature: number;
    humidity: number;
  }[];
}

export interface AQIRecommendation {
  level: AQILevel;
  generalAdvice: string;
  sensitiveGroupsAdvice?: string;
  outdoorActivities: string;
  masks: boolean;
  windows: 'open' | 'closed';
  airPurifier: boolean;
}
