
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertCircle } from "lucide-react";
import { AQIRecommendation } from "@/types/airQuality";
import { getRecommendations } from "@/utils/aqiUtils";

interface RecommendationsProps {
  aqi: number;
}

const Recommendations = ({ aqi }: RecommendationsProps) => {
  const recommendations: AQIRecommendation = getRecommendations(aqi);
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-softgreen">
        <div className="flex items-center">
          <Alert className="h-5 w-5 mr-2 text-green-700" />
          <CardTitle className="text-xl font-semibold text-green-800">Health Recommendations</CardTitle>
        </div>
        <CardDescription>
          Based on current air quality conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">General Advice</h3>
            <p className="text-gray-700 mt-1">{recommendations.generalAdvice}</p>
          </div>
          
          {recommendations.sensitiveGroupsAdvice && (
            <div>
              <h3 className="text-lg font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                Sensitive Groups
              </h3>
              <p className="text-gray-700 mt-1">{recommendations.sensitiveGroupsAdvice}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Outdoor Activities</h4>
              <p className="text-gray-700 mt-1">{recommendations.outdoorActivities}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Indoor Recommendations</h4>
              <ul className="text-gray-700 mt-1 space-y-2">
                <li className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${recommendations.windows === 'open' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                  Keep windows {recommendations.windows}
                </li>
                <li className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${recommendations.masks ? 'bg-red-500' : 'bg-green-500'} mr-2`}></span>
                  {recommendations.masks ? 'Wear masks outdoors' : 'Masks not necessary'}
                </li>
                <li className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${recommendations.airPurifier ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></span>
                  {recommendations.airPurifier ? 'Use air purifier if available' : 'Air purifier optional'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
