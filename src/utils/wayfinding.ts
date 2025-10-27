import { WayfindingMarker, Location } from '../types';

// Calculate distance between two GPS coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Calculate bearing (direction) between two GPS coordinates
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  const bearing = ((θ * 180) / Math.PI + 360) % 360;

  return bearing;
}

// Filter markers by category
export function filterMarkersByCategory(
  markers: WayfindingMarker[],
  category: WayfindingMarker['category']
): WayfindingMarker[] {
  return markers.filter((marker) => marker.category === category);
}

// Sort markers by distance
export function sortMarkersByDistance(markers: WayfindingMarker[]): WayfindingMarker[] {
  return [...markers].sort((a, b) => a.distance - b.distance);
}

// Get nearby markers within a certain distance
export function getNearbyMarkers(
  markers: WayfindingMarker[],
  maxDistance: number
): WayfindingMarker[] {
  return markers.filter((marker) => marker.distance <= maxDistance);
}

// Generate navigation instructions
export function generateNavigationInstructions(
  marker: WayfindingMarker,
  currentHeading: number
): string {
  const relativeDirection = marker.direction - currentHeading;
  const distance = marker.distance;

  let direction = '';
  if (Math.abs(relativeDirection) < 10) {
    direction = 'straight ahead';
  } else if (relativeDirection > 0 && relativeDirection < 45) {
    direction = 'slightly to your right';
  } else if (relativeDirection >= 45 && relativeDirection < 135) {
    direction = 'to your right';
  } else if (relativeDirection >= 135) {
    direction = 'behind you';
  } else if (relativeDirection < 0 && relativeDirection > -45) {
    direction = 'slightly to your left';
  } else if (relativeDirection <= -45 && relativeDirection > -135) {
    direction = 'to your left';
  }

  if (distance > 1000) {
    return `${marker.name} is ${(distance / 1000).toFixed(1)}km ${direction}`;
  } else {
    return `${marker.name} is ${distance}m ${direction}`;
  }
}

