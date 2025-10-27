import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface TerminalFloor {
  id: string;
  name: string;
  level: string;
  facilities: {
    icon: string;
    name: string;
    count: number;
  }[];
}

const TERMINAL_FLOORS: TerminalFloor[] = [
  {
    id: '1',
    name: 'Level 3 - Departures',
    level: '3',
    facilities: [
      { icon: '✈️', name: 'Check-in', count: 8 },
      { icon: '🛂', name: 'Immigration', count: 12 },
      { icon: '🍔', name: 'Restaurants', count: 5 },
      { icon: '🛍️', name: 'Shopping', count: 15 },
    ],
  },
  {
    id: '2',
    name: 'Level 2 - Services',
    level: '2',
    facilities: [
      { icon: '🛂', name: 'Immigration', count: 8 },
      { icon: '🍔', name: 'Restaurants', count: 3 },
      { icon: '🛍️', name: 'Shopping', count: 8 },
      { icon: '🚻', name: 'Restrooms', count: 12 },
    ],
  },
  {
    id: '3',
    name: 'Level 1 - Arrivals',
    level: '1',
    facilities: [
      { icon: '🏋️', name: 'Baggage Reclaim', count: 6 },
      { icon: '🚕', name: 'Ground Transport', count: 3 },
      { icon: '🚻', name: 'Restrooms', count: 8 },
      { icon: 'ℹ️', name: 'Info Desks', count: 2 },
    ],
  },
];

export default function TerminalMapScreen({ navigation }: any) {
  const [selectedFloor, setSelectedFloor] = useState<TerminalFloor>(TERMINAL_FLOORS[0]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Terminal Map</Text>
          <Text style={styles.subtitle}>Choose a level to explore</Text>
        </View>

        {/* Floor Selector */}
        <View style={styles.floorSelector}>
          {TERMINAL_FLOORS.map((floor) => (
            <TouchableOpacity
              key={floor.id}
              style={[
                styles.floorButton,
                selectedFloor.id === floor.id && styles.floorButtonActive,
              ]}
              onPress={() => setSelectedFloor(floor)}
            >
              <Text
                style={[
                  styles.floorButtonText,
                  selectedFloor.id === floor.id && styles.floorButtonTextActive,
                ]}
              >
                L{floor.level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Floor Info */}
        <View style={styles.floorInfo}>
          <Text style={styles.floorName}>{selectedFloor.name}</Text>
        </View>

        {/* Facilities Grid */}
        <View style={styles.facilitiesGrid}>
          {selectedFloor.facilities.map((facility, index) => (
            <TouchableOpacity
              key={index}
              style={styles.facilityCard}
              onPress={() => {
                navigation.navigate(
                  facility.name === 'Restaurants' ? 'RestaurantDirectory' :
                  facility.name === 'Shopping' ? 'ShoppingDirectory' :
                  'ARWayfinding'
                );
              }}
            >
              <Text style={styles.facilityIcon}>{facility.icon}</Text>
              <Text style={styles.facilityName}>{facility.name}</Text>
              <Text style={styles.facilityCount}>{facility.count} locations</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AR View Button */}
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => navigation.navigate('ARWayfinding')}
        >
          <Text style={styles.arButtonEmoji}>📱</Text>
          <View style={styles.arButtonContent}>
            <Text style={styles.arButtonTitle}>View in AR</Text>
            <Text style={styles.arButtonDescription}>Open camera to see terminal in AR</Text>
          </View>
          <Text style={styles.arButtonArrow}>›</Text>
        </TouchableOpacity>

        {/* Terminal Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🏢 Terminal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Terminal:</Text>
            <Text style={styles.infoValue}>T2 - International Terminal</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gates:</Text>
            <Text style={styles.infoValue}>Gates 1-50</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lounges:</Text>
            <Text style={styles.infoValue}>Qantas Club, Emirates Lounge</Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinks}>
          <TouchableOpacity
            style={styles.quickLink}
            onPress={() => navigation.navigate('ARWayfinding')}
          >
            <Text style={styles.quickLinkEmoji}>🗺️</Text>
            <Text style={styles.quickLinkText}>AR Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkEmoji}>🚻</Text>
            <Text style={styles.quickLinkText}>Restrooms</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink}>
            <Text style={styles.quickLinkEmoji}>ℹ️</Text>
            <Text style={styles.quickLinkText}>Help Desk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00a8e8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  floorSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  floorButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floorButtonActive: {
    backgroundColor: '#00a8e8',
  },
  floorButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  floorButtonTextActive: {
    color: '#fff',
  },
  floorInfo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  facilityCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facilityIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  facilityCount: {
    fontSize: 12,
    color: '#666',
  },
  arButton: {
    backgroundColor: '#00a8e8',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#00a8e8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  arButtonEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  arButtonContent: {
    flex: 1,
  },
  arButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  arButtonDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  arButtonArrow: {
    fontSize: 32,
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickLink: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinkEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
});

