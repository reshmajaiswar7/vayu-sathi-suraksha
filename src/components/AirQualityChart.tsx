
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoricalAirQuality } from "@/types/airQuality";
import { getAQIColorClass } from "@/utils/aqiUtils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts";

interface AirQualityChartProps {
  historicalData: HistoricalAirQuality;
  isLoading: boolean;
}

const AirQualityChart = ({ historicalData, isLoading }: AirQualityChartProps) => {
  const [timeRange, setTimeRange] = useState<"7days" | "14days" | "30days">("7days");
  
  // Filter data based on selected time range
  const filteredData = (() => {
    if (timeRange === "7days") {
      return historicalData.daily.slice(-7);
    } else if (timeRange === "14days") {
      return historicalData.daily.slice(-14);
    } else {
      return historicalData.daily;
    }
  })();
  
  // Format data for charts
  const formattedData = filteredData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    aqi: day.aqi,
    pm25: day.pm25,
    pm10: day.pm10,
    temperature: day.temperature,
    humidity: day.humidity
  }));
  
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#78C35D";
    if (aqi <= 100) return "#FEF7CD";
    if (aqi <= 150) return "#FEC6A1";
    return "#ea384c";
  };
  
  const getAQIGradient = () => {
    return (
      <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#33C3F0" stopOpacity={0.2} />
      </linearGradient>
    );
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl">Air Quality Trends</CardTitle>
          <div className="flex">
            <TabsList>
              <TabsTrigger 
                value="7days" 
                onClick={() => setTimeRange("7days")}
                className={timeRange === "7days" ? "bg-primary text-white" : ""}
              >
                7 Days
              </TabsTrigger>
              <TabsTrigger 
                value="14days" 
                onClick={() => setTimeRange("14days")}
                className={timeRange === "14days" ? "bg-primary text-white" : ""}
              >
                14 Days
              </TabsTrigger>
              <TabsTrigger 
                value="30days" 
                onClick={() => setTimeRange("30days")}
                className={timeRange === "30days" ? "bg-primary text-white" : ""}
              >
                30 Days
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
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
          <Tabs defaultValue="aqi">
            <TabsList className="mb-4">
              <TabsTrigger value="aqi">AQI</TabsTrigger>
              <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aqi" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      {getAQIGradient()}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      formatter={(value: number) => [`AQI: ${value}`, 'Air Quality Index']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aqi" 
                      stroke="#33C3F0" 
                      fillOpacity={1}
                      fill="url(#aqiGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="pollutants" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="pm25" 
                      name="PM2.5" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pm10" 
                      name="PM10" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weather" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis 
                      yAxisId="temp" 
                      tick={{ fontSize: 12 }}
                      domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <YAxis 
                      yAxisId="humidity" 
                      orientation="right" 
                      tick={{ fontSize: 12 }}
                      domain={[0, 100]}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      name="Temperature (°C)" 
                      stroke="#ff7300" 
                      yAxisId="temp"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      name="Humidity (%)" 
                      stroke="#0ea5e9" 
                      yAxisId="humidity"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AirQualityChart;
