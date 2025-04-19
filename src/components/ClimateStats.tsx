
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplet } from "lucide-react";
import { AirQualityData } from "@/types/airQuality";

interface ClimateStatsProps {
  data: AirQualityData;
}

const ClimateStats = ({ data }: ClimateStatsProps) => {
  const { pm25, pm10, temperature, humidity } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="stat-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-gray-500">Temperature</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-2xl font-bold">{temperature}°C</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="stat-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-gray-500">Humidity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center">
            <Droplet className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-2xl font-bold">{humidity}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="stat-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-gray-500">PM2.5</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">
              2.5
            </div>
            <span className="text-2xl font-bold">{pm25} µg/m³</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="stat-card">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base font-medium text-gray-500">PM10</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">
              10
            </div>
            <span className="text-2xl font-bold">{pm10} µg/m³</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClimateStats;
