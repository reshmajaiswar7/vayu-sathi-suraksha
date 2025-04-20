
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAQIColorClass, getAQILevel } from "@/utils/aqiUtils";
import { AirQualityData } from "@/types/airQuality";
import { Skeleton } from "@/components/ui/skeleton";

interface AQIComparisonProps {
  locations: {
    name: string;
    data: AirQualityData | null;
  }[];
  isLoading: boolean;
}

const AQIComparison = ({ locations, isLoading }: AQIComparisonProps) => {
  const getAQIBackgroundColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-[#78C35D]'; // Good
    if (aqi <= 100) return 'bg-[#FEF7CD] text-gray-800'; // Moderate
    if (aqi <= 150) return 'bg-[#FEC6A1] text-gray-800'; // Unhealthy
    return 'bg-[#ea384c]'; // Very Unhealthy
  };

  if (isLoading) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">AQI Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">AQI Comparison</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    location.data 
                      ? getAQIBackgroundColor(location.data.aqi)
                      : 'bg-gray-200'
                  } text-white`}
                >
                  <span className="text-lg font-bold">
                    {location.data?.aqi || '-'}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  {location.data && (
                    <p className="text-sm text-gray-500">
                      Level: {getAQILevel(location.data.aqi)}
                    </p>
                  )}
                </div>
              </div>
              {location.data && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Updated: {new Date(location.data.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AQIComparison;
