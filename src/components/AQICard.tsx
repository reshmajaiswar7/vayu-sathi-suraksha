
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAQIColorClass, getAQIText } from "@/utils/aqiUtils";

interface AQICardProps {
  aqi: number;
  location: string;
  timestamp: string;
}

const AQICard = ({ aqi, location, timestamp }: AQICardProps) => {
  const colorClass = getAQIColorClass(aqi);
  const aqiText = getAQIText(aqi);
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="overflow-hidden border-t-4 animate-fade-in hover:shadow-md transition-shadow duration-300">
      <div className={`h-1 ${colorClass}`} />
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Air Quality Index</span>
          <span className="text-sm font-normal text-gray-500">Updated: {formattedTime}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center pt-4 pb-6">
          <div className={`${colorClass} aqi-indicator w-32 h-32 mb-4`}>
            <span className="text-4xl font-bold">{aqi}</span>
          </div>
          <p className="text-lg font-medium">{aqiText}</p>
          <p className="text-sm text-gray-500 mt-2">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AQICard;
