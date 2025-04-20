import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AQICard from "@/components/AQICard";
import ClimateStats from "@/components/ClimateStats";
import Recommendations from "@/components/Recommendations";
import Chatbot from "@/components/Chatbot";
import AirQualityChart from "@/components/AirQualityChart";
import AQIForecast from "@/components/AQIForecast";
import AQIComparison from "@/components/AQIComparison";
import { AirQualityData, AirQualityForecast, HistoricalAirQuality } from "@/types/airQuality";
import { getCurrentAirQuality, getAirQualityForecast, getHistoricalAirQuality } from "@/services/airQualityService";

const Index = () => {
  const [location, setLocation] = useState<string>("Mumbai, Maharashtra");
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [forecastData, setForecastData] = useState<AirQualityForecast | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalAirQuality | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isForecastLoading, setIsForecastLoading] = useState<boolean>(true);
  const [isHistoricalLoading, setIsHistoricalLoading] = useState<boolean>(true);
  const [odishaAQData, setOdishaAQData] = useState<AirQualityData | null>(null);

  const fetchData = async (selectedLocation: string) => {
    setIsLoading(true);
    setIsForecastLoading(true);
    setIsHistoricalLoading(true);
    
    try {
      const aqData = await getCurrentAirQuality(selectedLocation);
      setAirQualityData(aqData);
      
      const otherLocation = selectedLocation.includes("Mumbai") ? "Odisha" : "Mumbai";
      const otherData = await getCurrentAirQuality(otherLocation);
      setOdishaAQData(otherData);
      
      const forecast = await getAirQualityForecast(selectedLocation);
      setForecastData(forecast);
      setIsForecastLoading(false);
      
      const historical = await getHistoricalAirQuality(selectedLocation);
      setHistoricalData(historical);
      setIsHistoricalLoading(false);
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      setIsLoading(false);
      setIsForecastLoading(false);
      setIsHistoricalLoading(false);
    }
  };

  useEffect(() => {
    fetchData(location);
    
    const refreshInterval = setInterval(() => {
      fetchData(location);
    }, 15 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [location]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header location={location} onLocationChange={handleLocationChange} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {isLoading || !airQualityData ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-pulse-gentle h-12 w-12 rounded-full bg-skyblue mx-auto mb-4"></div>
              <p className="text-gray-500">Loading air quality data...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-1">
                <AQICard 
                  aqi={airQualityData.aqi} 
                  location={airQualityData.location} 
                  timestamp={airQualityData.timestamp} 
                />
              </div>
              <div className="md:col-span-2">
                <Recommendations aqi={airQualityData.aqi} />
              </div>
            </div>
            
            <div className="mb-6">
              <AQIComparison
                locations={[
                  { name: "Mumbai", data: location.includes("Mumbai") ? airQualityData : odishaAQData },
                  { name: "Odisha", data: location.includes("Odisha") ? airQualityData : odishaAQData }
                ]}
                isLoading={isLoading}
              />
            </div>
            
            <div className="mb-6">
              <ClimateStats data={airQualityData} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                {forecastData && (
                  <AQIForecast forecastData={forecastData} isLoading={isForecastLoading} />
                )}
              </div>
              <div>
                {historicalData && (
                  <AirQualityChart historicalData={historicalData} isLoading={isHistoricalLoading} />
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <Chatbot airQualityData={airQualityData} />
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} VayuMeter. All rights reserved.</p>
            <p className="mt-2">Data displayed is for demonstration purposes only. In a production environment, real-time data from air quality monitoring stations would be used.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
