export interface WayfindingMarker {
  id: string;
  name: string;
  icon: string;
  distance: number;
  direction: number;
  floor?: number;
  category: 'gate' | 'restaurant' | 'restroom' | 'shop' | 'lounge' | 'other';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  category: 'navigation' | 'shopping' | 'dining' | 'exploration' | 'achievement';
}

export interface UserStats {
  totalPoints: number;
  badgesEarned: number;
  challengesCompleted: number;
  level: number;
  rank: number;
}

export interface FlightInfo {
  flightNumber: string;
  destination: string;
  gate: string;
  boardingTime: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'closed';
}

export interface Location {
  latitude: number;
  longitude: number;
  floor?: number;
}

export interface ARTarget {
  marker: WayfindingMarker;
  position: {
    x: number;
    y: number;
    z?: number;
  };
}

