
import { AirQualityData } from "@/types/airQuality";
import { getAQILevel, getRecommendations } from "@/utils/aqiUtils";

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Generate a response based on the user's question and current air quality data
export async function generateChatbotResponse(
  userMessage: string,
  airQualityData: AirQualityData
): Promise<string> {
  const message = userMessage.toLowerCase();
  const { aqi, pm25, pm10, temperature, humidity, location } = airQualityData;
  const aqiLevel = getAQILevel(aqi);
  const recommendations = getRecommendations(aqi);

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Handle greetings
  if (message.match(/^(hello|hi|hey|greetings).*/)) {
    return `Hello! I'm VayuMeter Assistant. I can help you with information about air quality and climate conditions in ${location}. How can I assist you today?`;
  }

  // Handle AQI related questions
  if (message.includes('aqi') || message.includes('air quality') || message.includes('air pollution')) {
    if (message.includes('what') || message.includes('current')) {
      return `The current Air Quality Index (AQI) in ${location} is ${aqi}, which is considered ${aqiLevel.toUpperCase()}. ${recommendations.generalAdvice}`;
    }

    if (message.includes('mean') || message.includes('explain')) {
      return `AQI or Air Quality Index is a measure for reporting air quality. It tells you how clean or polluted the air is, and what associated health effects might be of concern. The AQI focuses on health effects you may experience within a few hours or days after breathing polluted air. AQI values below 50 are considered good, 51-100 moderate, 101-150 unhealthy for sensitive groups, and above 151 unhealthy for everyone.`;
    }

    if (message.includes('harmful') || message.includes('health') || message.includes('safe')) {
      return `The current AQI in ${location} is ${aqi} (${aqiLevel.toUpperCase()}). ${recommendations.generalAdvice} ${recommendations.sensitiveGroupsAdvice || ''}`;
    }
    
    return `The Air Quality Index (AQI) in ${location} is currently ${aqi}, which is ${aqiLevel.toUpperCase()}. ${recommendations.generalAdvice}`;
  }

  // Handle PM2.5 related questions
  if (message.includes('pm2.5') || message.includes('pm 2.5') || message.includes('fine particles')) {
    if (message.includes('what') || message.includes('mean') || message.includes('explain')) {
      return `PM2.5 refers to particulate matter that is 2.5 micrometers or smaller in diameter. These tiny particles can penetrate deep into your lungs and even enter your bloodstream. They come from sources like vehicle emissions, industrial processes, and wildfires. Long-term exposure to PM2.5 can cause respiratory issues, heart disease, and other health problems.`;
    }
    
    return `The current PM2.5 concentration in ${location} is ${pm25} µg/m³. For context, the WHO recommends that PM2.5 not exceed 15 µg/m³ (annual average) or 45 µg/m³ (24-hour average).`;
  }

  // Handle PM10 related questions
  if (message.includes('pm10') || message.includes('pm 10') || message.includes('coarse particles')) {
    if (message.includes('what') || message.includes('mean') || message.includes('explain')) {
      return `PM10 refers to particulate matter that is 10 micrometers or smaller in diameter. These particles include dust, pollen, and mold. While not as harmful as PM2.5 because they're larger and don't penetrate as deeply into the lungs, they can still cause respiratory issues, especially for people with conditions like asthma.`;
    }
    
    return `The current PM10 concentration in ${location} is ${pm10} µg/m³. For context, the WHO recommends that PM10 not exceed 45 µg/m³ (annual average) or 75 µg/m³ (24-hour average).`;
  }

  // Handle temperature related questions
  if (message.includes('temperature') || message.includes('hot') || message.includes('cold') || message.includes('warm')) {
    let tempDescription = "moderate";
    if (temperature > 35) tempDescription = "very hot";
    else if (temperature > 30) tempDescription = "hot";
    else if (temperature < 15) tempDescription = "cold";
    else if (temperature < 20) tempDescription = "cool";
    
    return `The current temperature in ${location} is ${temperature}°C, which is considered ${tempDescription} for this region. ${temperature > 30 ? "Remember to stay hydrated and avoid prolonged exposure to direct sunlight." : ""}`;
  }

  // Handle humidity related questions
  if (message.includes('humidity') || message.includes('moist') || message.includes('dry')) {
    let humidityDescription = "moderate";
    if (humidity > 80) humidityDescription = "very high";
    else if (humidity > 70) humidityDescription = "high";
    else if (humidity < 30) humidityDescription = "very low";
    else if (humidity < 40) humidityDescription = "low";
    
    return `The current humidity in ${location} is ${humidity}%, which is ${humidityDescription}. ${humidity > 70 ? "High humidity can make hot temperatures feel even hotter and may cause discomfort." : humidity < 30 ? "Low humidity can cause skin dryness and respiratory discomfort. Consider using a humidifier indoors." : ""}`;
  }

  // Handle recommendation related questions
  if (message.includes('recommend') || message.includes('advice') || message.includes('should i') || message.includes('what to do')) {
    if (message.includes('mask') || message.includes('respirator')) {
      return `Based on the current AQI of ${aqi} (${aqiLevel.toUpperCase()}) in ${location}, ${recommendations.masks ? "wearing a mask outdoors is recommended, especially if you have respiratory issues or are in a sensitive group." : "masks are not necessary for most people, but those with respiratory conditions may still want to take precautions."}`;
    }
    
    if (message.includes('window') || message.includes('ventilation')) {
      return `With the current air quality (AQI ${aqi}) in ${location}, it's ${recommendations.windows === 'open' ? "generally safe to keep windows open for ventilation." : "recommended to keep windows closed to prevent outdoor pollutants from entering your home. Consider using air conditioning if available."}`;
    }
    
    if (message.includes('outdoor') || message.includes('outside') || message.includes('exercise')) {
      return `Regarding outdoor activities in ${location} with the current AQI of ${aqi} (${aqiLevel.toUpperCase()}): ${recommendations.outdoorActivities}`;
    }
    
    if (message.includes('purifier') || message.includes('air filter')) {
      return `Based on the current air quality in ${location} (AQI ${aqi}), ${recommendations.airPurifier ? "using an air purifier indoors is recommended to reduce exposure to indoor pollutants." : "an air purifier is not essential but could still be beneficial, especially if you have allergies or respiratory conditions."}`;
    }
    
    return `For the current conditions in ${location} (AQI ${aqi}, ${temperature}°C, ${humidity}% humidity): ${recommendations.generalAdvice} ${recommendations.sensitiveGroupsAdvice || ''} ${recommendations.outdoorActivities} ${recommendations.masks ? "Consider wearing a mask outdoors, especially if you have respiratory issues." : ""} It's recommended to ${recommendations.windows === 'open' ? "keep windows open for ventilation." : "keep windows closed to prevent outdoor pollutants from entering your home."}`;
  }

  // Handle location related questions
  if (message.includes('where') || message.includes('location')) {
    return `I'm currently providing air quality and climate information for ${location}. If you'd like to check another location in Mumbai or Odisha, you can select it from the location dropdown on the main dashboard.`;
  }

  // Handle time related questions
  if (message.includes('when') || message.includes('time') || message.includes('updated')) {
    const timestamp = new Date(airQualityData.timestamp);
    return `The air quality data for ${location} was last updated on ${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}.`;
  }

  // General response for unrecognized queries
  return `I'm here to help with air quality and climate information for ${location}. You can ask me about current AQI, PM2.5, PM10, temperature, humidity, or get recommendations for outdoor activities and health precautions. If you have a specific question, please feel free to ask.`;
}
