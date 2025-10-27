import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  destination: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'closed' | 'last-call';
  scheduledTime: string;
  estimatedTime: string;
  gate: string;
  terminal: string;
  boardingTime: string;
  delay: number;
}

const MOCK_FLIGHT: Flight = {
  id: '1',
  flightNumber: 'QF123',
  airline: 'Qantas',
  destination: 'Sydney → Melbourne',
  status: 'on-time',
  scheduledTime: '14:30',
  estimatedTime: '14:30',
  gate: 'Gate 42',
  terminal: 'T2',
  boardingTime: '14:00',
  delay: 0,
};

export default function FlightInfoScreen({ navigation }: any) {
  const [flight, setFlight] = useState<Flight>(MOCK_FLIGHT);
  const [refreshing, setRefreshing] = useState(false);
  const [timeUntilBoarding, setTimeUntilBoarding] = useState('');

  useEffect(() => {
    const calculateTimeUntilBoarding = () => {
      const now = new Date();
      const [hours, minutes] = flight.boardingTime.split(':');
      const boarding = new Date(now);
      boarding.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      if (boarding <= now) {
        setTimeUntilBoarding('Now boarding');
        return;
      }
      
      const diff = boarding.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilBoarding(`${hoursLeft}h ${minutesLeft}m until boarding`);
    };

    calculateTimeUntilBoarding();
    const interval = setInterval(calculateTimeUntilBoarding, 60000);
    
    return () => clearInterval(interval);
  }, [flight.boardingTime]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Updated', 'Flight information refreshed');
    }, 1000);
  };

  const getStatusColor = (status: Flight['status']) => {
    switch (status) {
      case 'on-time':
        return '#4caf50';
      case 'delayed':
        return '#ff9800';
      case 'boarding':
        return '#2196f3';
      case 'last-call':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusEmoji = (status: Flight['status']) => {
    switch (status) {
      case 'on-time':
        return '✅';
      case 'delayed':
        return '⏰';
      case 'boarding':
        return '🛄';
      case 'last-call':
        return '⏰';
      default:
        return '✈️';
    }
  };

  const navigateToGate = () => {
    Alert.alert(
      'Navigate to Gate',
      `Starting AR navigation to ${flight.gate}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Navigate', onPress: () => navigation.navigate('ARWayfinding') },
      ]
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        {/* Flight Header */}
        <View style={styles.flightHeader}>
          <View style={styles.flightNumberRow}>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
              <Text style={styles.statusEmoji}>{getStatusEmoji(flight.status)}</Text>
              <Text style={styles.statusText}>{flight.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.airline}>{flight.airline}</Text>
          <Text style={styles.destination}>{flight.destination}</Text>
        </View>

        {/* Time Until Boarding */}
        <View style={styles.countdownCard}>
          <Text style={styles.countdownEmoji}>⏳</Text>
          <Text style={styles.countdownText}>{timeUntilBoarding}</Text>
          <Text style={styles.boardingTimeLabel}>Boarding: {flight.boardingTime}</Text>
        </View>

        {/* Flight Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Gate</Text>
            <Text style={styles.detailValue}>{flight.gate}</Text>
            <TouchableOpacity 
              style={styles.navigateButton}
              onPress={navigateToGate}
            >
              <Text style={styles.navigateButtonText}>Navigate →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Terminal</Text>
            <Text style={styles.detailValue}>{flight.terminal}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Scheduled</Text>
            <Text style={styles.detailValue}>{flight.scheduledTime}</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Estimated</Text>
            <Text style={[styles.detailValue, flight.status === 'delayed' && styles.delayedTime]}>
              {flight.estimatedTime}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={navigateToGate}
          >
            <Text style={styles.actionEmoji}>🗺️</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>AR Wayfinding</Text>
              <Text style={styles.actionDescription}>Navigate to gate with AR</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>📋</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Terminal Map</Text>
              <Text style={styles.actionDescription}>View airport layout</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🚻</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Nearby Restrooms</Text>
              <Text style={styles.actionDescription}>Find closest facilities</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Important Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>ℹ️ Important Information</Text>
          <Text style={styles.infoText}>
            • Please arrive at the gate 30 minutes before boarding
          </Text>
          <Text style={styles.infoText}>
            • Gate closes 15 minutes before departure
          </Text>
          <Text style={styles.infoText}>
            • Enable push notifications for gate changes
          </Text>
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
  flightHeader: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  flightNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flightNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#00a8e8',
    marginRight: 15,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  airline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  destination: {
    fontSize: 18,
    color: '#666',
  },
  countdownCard: {
    backgroundColor: '#00a8e8',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  countdownEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  boardingTimeLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  delayedTime: {
    color: '#ff9800',
  },
  navigateButton: {
    backgroundColor: '#00a8e8',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
  },
  actionArrow: {
    fontSize: 28,
    color: '#00a8e8',
  },
  infoCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});

