import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🦘</Text>
          <Text style={styles.heroTitle}>Aussie Air AR</Text>
          <Text style={styles.heroSubtitle}>
            Your Personal Airport Assistant
          </Text>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Landing')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Start Your Journey</Text>
          <Text style={styles.primaryButtonEmoji}>🚀</Text>
        </TouchableOpacity>

        {/* Feature Cards */}
        <View style={styles.featuresGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('ARWayfinding')}
          >
            <Text style={styles.featureEmoji}>🗺️</Text>
            <Text style={styles.featureCardTitle}>AR Navigation</Text>
            <Text style={styles.featureCardDescription}>
              Find your way with augmented reality
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('Gamification')}
          >
            <Text style={styles.featureEmoji}>🎮</Text>
            <Text style={styles.featureCardTitle}>Aussie Challenges</Text>
            <Text style={styles.featureCardDescription}>
              Earn badges and rewards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureEmoji}>📅</Text>
            <Text style={styles.featureCardTitle}>Flight Info</Text>
            <Text style={styles.featureCardDescription}>
              Track your flight status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🛍️</Text>
            <Text style={styles.featureCardTitle}>Shopping</Text>
            <Text style={styles.featureCardDescription}>
              Discover shops & deals
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Airport Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>120+</Text>
              <Text style={styles.statLabel}>Destinations</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>45M</Text>
              <Text style={styles.statLabel}>Passengers/yr</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>4.5★</Text>
              <Text style={styles.statLabel}>Customer Rating</Text>
            </View>
          </View>
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
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#00a8e8',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#00a8e8',
    borderRadius: 25,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#00a8e8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  primaryButtonEmoji: {
    fontSize: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  featureEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureCardDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  statsSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00a8e8',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
  },
});

