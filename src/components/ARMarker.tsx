import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { WayfindingMarker } from '../types';

interface ARMarkerProps {
  marker: WayfindingMarker;
  isSelected: boolean;
  onPress: () => void;
  onNavigate: () => void;
}

export default function ARMarker({ marker, isSelected, onPress, onNavigate }: ARMarkerProps) {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0.3));

  useEffect(() => {
    // Pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow animation for selected marker
    if (isSelected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isSelected, pulseAnim, glowAnim]);

  return (
    <Animated.View
      style={[
        styles.marker,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.markerButton}>
        <Text style={styles.markerIconText}>{marker.icon}</Text>
        {isSelected && (
          <Animated.View 
            style={[
              styles.markerLabel,
              { opacity: glowAnim }
            ]}
          >
            <Text style={styles.markerLabelText}>{marker.name}</Text>
            <Text style={styles.markerLabelDistance}>{marker.distance}m • Floor {marker.floor || 1}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  marker: {
    margin: 10,
  },
  markerButton: {
    alignItems: 'center',
  },
  markerIconText: {
    fontSize: 50,
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  markerLabel: {
    backgroundColor: 'rgba(0, 168, 232, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 8,
    minWidth: 120,
  },
  markerLabelText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  markerLabelDistance: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
});

