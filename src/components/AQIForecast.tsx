
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AirQualityForecast } from "@/types/airQuality";
import { getAQIColorClass } from "@/utils/aqiUtils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AQIForecastProps {
  forecastData: AirQualityForecast;
  isLoading: boolean;
}

const AQIForecast = ({ forecastData, isLoading }: AQIForecastProps) => {
  // Format hourly data for charts
  const formattedHourlyData = forecastData.hourly.map(hour => {
    const date = new Date(hour.time);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
      aqi: hour.aqi,
      colorClass: getAQIColorClass(hour.aqi)
    };
  });
  
  // Format daily data for charts
  const formattedDailyData = forecastData.daily.map(day => {
    const date = new Date(day.date);
    return {
      date: date.toLocaleDateString([], { weekday: 'short' }),
      min: day.aqiMin,
      max: day.aqiMax,
      avg: day.aqiAvg,
      colorClass: getAQIColorClass(day.aqiAvg)
    };
  });
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">AQI Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
              <div className="h-40 w-full bg-gray-100 rounded"></div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="hourly">
            <TabsList className="mb-4">
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hourly" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={formattedHourlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#33C3F0" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => [`AQI: ${value}`, 'Air Quality Index']} />
                    <Area 
                      type="monotone" 
                      dataKey="aqi" 
                      stroke="#33C3F0" 
                      fillOpacity={1}
                      fill="url(#hourlyGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm text-gray-500 text-center mt-2">Next 24 hours forecast</div>
            </TabsContent>
            
            <TabsContent value="daily" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formattedDailyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="avg" name="Average AQI" fill="#33C3F0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm text-gray-500 text-center mt-2">7-day forecast</div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AQIForecast;
