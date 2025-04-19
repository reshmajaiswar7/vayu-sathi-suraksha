
import { AirQualityData, AirQualityForecast, HistoricalAirQuality } from "@/types/airQuality";

// Mock data for Mumbai
const mumbaiData: AirQualityData = {
  aqi: 85,
  pm25: 25.4,
  pm10: 55.2,
  temperature: 32,
  humidity: 74,
  location: "Mumbai, Maharashtra",
  timestamp: new Date().toISOString(),
  windSpeed: 12,
  windDirection: "SW"
};

// Mock data for Odisha
const odishaData: AirQualityData = {
  aqi: 125,
  pm25: 42.8,
  pm10: 88.3,
  temperature: 35,
  humidity: 68,
  location: "Bhubaneswar, Odisha",
  timestamp: new Date().toISOString(),
  windSpeed: 8,
  windDirection: "S"
};

// Mock forecast data
const generateForecastData = (baseAqi: number): AirQualityForecast => {
  const hourly = [];
  const daily = [];
  const now = new Date();
  
  // Generate hourly data for next 24 hours
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const variation = Math.sin(i / 12 * Math.PI) * 20;
    const aqi = Math.max(0, Math.min(300, Math.round(baseAqi + variation)));
    
    hourly.push({
      time: time.toISOString(),
      aqi
    });
  }
  
  // Generate daily data for next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const randomFactor = Math.random() * 20 - 10;
    const aqiMin = Math.max(0, Math.round(baseAqi - 15 + randomFactor));
    const aqiMax = Math.max(0, Math.round(baseAqi + 15 + randomFactor));
    const aqiAvg = Math.round((aqiMin + aqiMax) / 2);
    
    daily.push({
      date: date.toISOString().split('T')[0],
      aqiMin,
      aqiMax,
      aqiAvg
    });
  }
  
  return { hourly, daily };
};

// Mock historical data
const generateHistoricalData = (baseAqi: number, basePm25: number, basePm10: number, baseTemp: number, baseHumidity: number): HistoricalAirQuality => {
  const daily = [];
  const now = new Date();
  
  // Generate data for past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomFactor = Math.random() * 20 - 10;
    
    daily.push({
      date: date.toISOString().split('T')[0],
      aqi: Math.max(0, Math.round(baseAqi + randomFactor)),
      pm25: Math.max(0, Math.round(basePm25 + randomFactor / 3 * 10) / 10),
      pm10: Math.max(0, Math.round(basePm10 + randomFactor / 2 * 10) / 10),
      temperature: Math.round((baseTemp + (Math.random() * 4 - 2)) * 10) / 10,
      humidity: Math.max(0, Math.min(100, Math.round(baseHumidity + randomFactor / 2)))
    });
  }
  
  return { daily };
};

// Get current air quality data for a location
export async function getCurrentAirQuality(location: string): Promise<AirQualityData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data based on location
  if (location.toLowerCase().includes('mumbai')) {
    return { ...mumbaiData, timestamp: new Date().toISOString() };
  } else if (location.toLowerCase().includes('odisha') || location.toLowerCase().includes('bhubaneswar')) {
    return { ...odishaData, timestamp: new Date().toISOString() };
  }
  
  // Default to Mumbai if location not recognized
  return { ...mumbaiData, timestamp: new Date().toISOString() };
}

// Get air quality forecast for a location
export async function getAirQualityForecast(location: string): Promise<AirQualityForecast> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock forecast data based on location
  if (location.toLowerCase().includes('mumbai')) {
    return generateForecastData(mumbaiData.aqi);
  } else if (location.toLowerCase().includes('odisha') || location.toLowerCase().includes('bhubaneswar')) {
    return generateForecastData(odishaData.aqi);
  }
  
  // Default to Mumbai if location not recognized
  return generateForecastData(mumbaiData.aqi);
}

// Get historical air quality data for a location
export async function getHistoricalAirQuality(location: string): Promise<HistoricalAirQuality> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock historical data based on location
  if (location.toLowerCase().includes('mumbai')) {
    return generateHistoricalData(
      mumbaiData.aqi, 
      mumbaiData.pm25, 
      mumbaiData.pm10, 
      mumbaiData.temperature, 
      mumbaiData.humidity
    );
  } else if (location.toLowerCase().includes('odisha') || location.toLowerCase().includes('bhubaneswar')) {
    return generateHistoricalData(
      odishaData.aqi, 
      odishaData.pm25, 
      odishaData.pm10, 
      odishaData.temperature, 
      odishaData.humidity
    );
  }
  
  // Default to Mumbai if location not recognized
  return generateHistoricalData(
    mumbaiData.aqi, 
    mumbaiData.pm25, 
    mumbaiData.pm10, 
    mumbaiData.temperature, 
    mumbaiData.humidity
  );
}
