import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function LandingScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🦘</Text>
          <Text style={styles.title}>G'day, Mate!</Text>
          <Text style={styles.subtitle}>
            Welcome to Aussie Air AR - Your Personal Airport Guide
          </Text>
        </View>

        {/* Airport Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5+</Text>
            <Text style={styles.statLabel}>Terminals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>200+</Text>
            <Text style={styles.statLabel}>Shops & Restaurants</Text>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          
          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => navigation.navigate('ARWayfinding')}
          >
            <Text style={styles.linkEmoji}>🗺️</Text>
            <View style={styles.linkTextContainer}>
              <Text style={styles.linkTitle}>AR Wayfinding</Text>
              <Text style={styles.linkDescription}>
                Find your way using augmented reality
              </Text>
            </View>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard}
            onPress={() => navigation.navigate('Gamification')}
          >
            <Text style={styles.linkEmoji}>🎮</Text>
            <View style={styles.linkTextContainer}>
              <Text style={styles.linkTitle}>Aussie Challenges</Text>
              <Text style={styles.linkDescription}>
                Complete fun tasks and earn rewards
              </Text>
            </View>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkCard}>
            <Text style={styles.linkEmoji}>🍔</Text>
            <View style={styles.linkTextContainer}>
              <Text style={styles.linkTitle}>Dining Options</Text>
              <Text style={styles.linkDescription}>
                Discover nearby restaurants and cafes
              </Text>
            </View>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📍</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Real-time Navigation</Text>
              <Text style={styles.featureDescription}>
                Get step-by-step directions to your gate, lounge, or amenities
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🎯</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Interactive Maps</Text>
              <Text style={styles.featureDescription}>
                Explore the airport with interactive 3D AR models
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔄</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Flight Updates</Text>
              <Text style={styles.featureDescription}>
                Receive instant notifications about delays and gate changes
              </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
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
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00a8e8',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
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
  linkCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  linkTextContainer: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  linkDescription: {
    fontSize: 12,
    color: '#666',
  },
  linkArrow: {
    fontSize: 24,
    color: '#00a8e8',
  },
  featureItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

