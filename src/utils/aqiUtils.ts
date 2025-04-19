
import { AQILevel, AQIRecommendation } from "@/types/airQuality";

// Determine AQI level based on AQI value
export function getAQILevel(aqi: number): AQILevel {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy';
  return 'veryunhealthy';
}

// Get recommendations based on AQI level
export function getRecommendations(aqi: number): AQIRecommendation {
  const level = getAQILevel(aqi);
  
  const recommendations: Record<AQILevel, AQIRecommendation> = {
    good: {
      level: 'good',
      generalAdvice: 'Air quality is good. Enjoy outdoor activities!',
      outdoorActivities: 'All outdoor activities are safe.',
      masks: false,
      windows: 'open',
      airPurifier: false
    },
    moderate: {
      level: 'moderate',
      generalAdvice: 'Air quality is acceptable for most individuals.',
      sensitiveGroupsAdvice: 'People with respiratory conditions should limit prolonged outdoor exertion.',
      outdoorActivities: 'Most outdoor activities are safe, but take breaks if you feel tired.',
      masks: false,
      windows: 'open',
      airPurifier: false
    },
    unhealthy: {
      level: 'unhealthy',
      generalAdvice: 'Air quality is unhealthy. Reduce outdoor activities.',
      sensitiveGroupsAdvice: 'Elderly, children, and those with respiratory issues should stay indoors.',
      outdoorActivities: 'Avoid strenuous outdoor activities. Short exposure is okay.',
      masks: true,
      windows: 'closed',
      airPurifier: true
    },
    veryunhealthy: {
      level: 'veryunhealthy',
      generalAdvice: 'Air quality is very unhealthy. Avoid outdoor activities.',
      sensitiveGroupsAdvice: 'Everyone, especially sensitive groups, should stay indoors.',
      outdoorActivities: 'Avoid all outdoor activities if possible.',
      masks: true,
      windows: 'closed',
      airPurifier: true
    }
  };
  
  return recommendations[level];
}

// Get color class based on AQI level
export function getAQIColorClass(aqi: number): string {
  const level = getAQILevel(aqi);
  return `aqi-indicator-${level}`;
}

// Get formatted AQI text with interpretation
export function getAQIText(aqi: number): string {
  const level = getAQILevel(aqi);
  
  const levelText: Record<AQILevel, string> = {
    good: 'Good',
    moderate: 'Moderate',
    unhealthy: 'Unhealthy',
    veryunhealthy: 'Very Unhealthy'
  };
  
  return `${aqi} - ${levelText[level]}`;
}
