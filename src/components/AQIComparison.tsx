
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAQIColorClass, getAQILevel } from "@/utils/aqiUtils";
import { AirQualityData } from "@/types/airQuality";

interface AQIComparisonProps {
  locations: {
    name: string;
    data: AirQualityData | null;
  }[];
  isLoading: boolean;
}

const AQIComparison = ({ locations, isLoading }: AQIComparisonProps) => {
  if (isLoading) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded"></div>
              ))}
            </div>
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
                    location.data ? getAQIColorClass(location.data.aqi) : 'bg-gray-200'
                  }`}
                >
                  <span className="text-lg font-bold text-white">
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
