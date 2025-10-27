import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { CameraView } from 'expo-camera';
import * as Location from 'expo-location';
import { WayfindingMarker } from '../types';
import ARMarker from '../components/ARMarker';

const MOCK_MARKERS: WayfindingMarker[] = [
  { id: '1', name: 'Gate 42', icon: '✈️', distance: 150, direction: 45, floor: 1, category: 'gate' },
  { id: '2', name: 'Restaurant', icon: '🍽️', distance: 80, direction: 90, floor: 1, category: 'restaurant' },
  { id: '3', name: 'Restroom', icon: '🚻', distance: 50, direction: 0, floor: 0, category: 'restroom' },
  { id: '4', name: 'Shopping', icon: '🛍️', distance: 120, direction: -45, floor: 2, category: 'shop' },
  { id: '5', name: 'Lounge', icon: '🍸', distance: 200, direction: 180, floor: 1, category: 'lounge' },
];

export default function ARWayfindingScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [markers, setMarkers] = useState<WayfindingMarker[]>(MOCK_MARKERS);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await CameraView.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  };

  const startNavigation = (marker: WayfindingMarker) => {
    Alert.alert(
      'Navigate to ' + marker.name,
      `Starting AR navigation. Walk ${marker.distance}m in direction ${marker.direction}°.`,
      [{ text: 'OK', onPress: () => console.log('Navigation started') }]
    );
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageEmoji}>📷</Text>
          <Text style={styles.messageTitle}>Camera Permission Required</Text>
          <Text style={styles.messageText}>
            Please allow camera access to use AR wayfinding features.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* AR Camera View */}
      <CameraView 
        style={styles.camera} 
        facing="back"
      >
        {/* AR Overlay */}
        <View style={styles.overlay}>
          {/* Navigation Arrow Indicator */}
          <View style={styles.compass}>
            <Text style={styles.compassIcon}>🧭</Text>
            <Text style={styles.compassText}>N</Text>
          </View>

          {/* Distance Indicator */}
          <View style={styles.distanceIndicator}>
            <Text style={styles.distanceText}>15m</Text>
            <Text style={styles.distanceLabel}>to Gate 42</Text>
          </View>

          {/* AR Markers Overlay */}
          <View style={styles.markersContainer}>
            {markers.map((marker) => (
              <ARMarker
                key={marker.id}
                marker={marker}
                isSelected={selectedMarker === marker.id}
                onPress={() => handleMarkerPress(marker.id)}
                onNavigate={() => startNavigation(marker)}
              />
            ))}
          </View>
        </View>
      </CameraView>

      {/* Bottom Control Panel */}
      <View style={styles.controlPanel}>
        <View style={styles.selectedMarkerInfo}>
          {selectedMarker && (
            <View style={styles.markerInfo}>
              <Text style={styles.markerIcon}>
                {markers.find(m => m.id === selectedMarker)?.icon}
              </Text>
              <View style={styles.markerDetails}>
                <Text style={styles.markerName}>
                  {markers.find(m => m.id === selectedMarker)?.name}
                </Text>
                <Text style={styles.markerDistance}>
                  {markers.find(m => m.id === selectedMarker)?.distance}m away
                </Text>
              </View>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => {
                  const marker = markers.find(m => m.id === selectedMarker);
                  if (marker) startNavigation(marker);
                }}
              >
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonEmoji}>🎯</Text>
            <Text style={styles.actionButtonText}>Find Gate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonEmoji}>🍔</Text>
            <Text style={styles.actionButtonText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonEmoji}>🛍️</Text>
            <Text style={styles.actionButtonText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonEmoji}>🚻</Text>
            <Text style={styles.actionButtonText}>Restroom</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  compass: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 168, 232, 0.9)',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassIcon: {
    fontSize: 24,
  },
  compassText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  distanceIndicator: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0, 168, 232, 0.9)',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  distanceLabel: {
    fontSize: 10,
    color: '#fff',
  },
  markersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  selectedMarkerInfo: {
    marginBottom: 15,
  },
  markerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 15,
    padding: 15,
  },
  markerDetails: {
    flex: 1,
    marginLeft: 15,
  },
  markerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  markerDistance: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  navigateButton: {
    backgroundColor: '#00a8e8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navigateButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    minWidth: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionButtonText: {
    fontSize: 11,
    color: '#666',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  messageEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

