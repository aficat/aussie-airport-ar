import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  icon: string;
  floor: string;
  terminal: string;
  rating: number;
  priceRange: string;
  openingHours: string;
  distance: number;
  dietaryOptions: string[];
}

const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'The Local',
    cuisine: 'Modern Australian',
    icon: '🍽️',
    floor: 'Level 3',
    terminal: 'T2',
    rating: 4.5,
    priceRange: '$$',
    openingHours: '5:00 AM - 10:00 PM',
    distance: 50,
    dietaryOptions: ['Vegetarian', 'Gluten-free'],
  },
  {
    id: '2',
    name: 'Coffee Culture',
    cuisine: 'Café',
    icon: '☕',
    floor: 'Level 2',
    terminal: 'T2',
    rating: 4.3,
    priceRange: '$',
    openingHours: 'Open 24/7',
    distance: 80,
    dietaryOptions: ['Vegetarian', 'Vegan'],
  },
  {
    id: '3',
    name: 'Skyline Bistro',
    cuisine: 'International',
    icon: '🍔',
    floor: 'Level 3',
    terminal: 'T2',
    rating: 4.7,
    priceRange: '$$$',
    openingHours: '6:00 AM - 11:00 PM',
    distance: 120,
    dietaryOptions: ['Halal', 'Vegetarian'],
  },
  {
    id: '4',
    name: 'Quick Bites',
    cuisine: 'Fast Food',
    icon: '🍕',
    floor: 'Level 2',
    terminal: 'T2',
    rating: 4.0,
    priceRange: '$',
    openingHours: 'Open 24/7',
    distance: 60,
    dietaryOptions: ['Vegetarian'],
  },
  {
    id: '5',
    name: 'Fresh & Healthy',
    cuisine: 'Salads & Smoothies',
    icon: '🥗',
    floor: 'Level 3',
    terminal: 'T2',
    rating: 4.6,
    priceRange: '$$',
    openingHours: '5:00 AM - 9:00 PM',
    distance: 90,
    dietaryOptions: ['Vegan', 'Gluten-free', 'Vegetarian'],
  },
  {
    id: '6',
    name: 'The Wine Bar',
    cuisine: 'Wine & Tapas',
    icon: '🍷',
    floor: 'Level 2',
    terminal: 'T2',
    rating: 4.8,
    priceRange: '$$$',
    openingHours: '11:00 AM - 11:00 PM',
    distance: 150,
    dietaryOptions: ['Vegetarian'],
  },
];

export default function RestaurantDirectoryScreen({ navigation }: any) {
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const dietaryFilters = ['All', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-free'];

  const filteredRestaurants = selectedDiet && selectedDiet !== 'All'
    ? RESTAURANTS.filter(r => r.dietaryOptions.includes(selectedDiet))
    : RESTAURANTS;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🍽️ Dining Options</Text>
          <Text style={styles.subtitle}>{RESTAURANTS.length} restaurants available</Text>
        </View>

        {/* Dietary Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {dietaryFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedDiet === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedDiet(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedDiet === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Restaurants List */}
        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => {
              navigation.navigate('ARWayfinding');
            }}
          >
            <Text style={styles.restaurantIcon}>{restaurant.icon}</Text>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.price}>{restaurant.priceRange}</Text>
              </View>
              <View style={styles.restaurantDetails}>
                <Text style={styles.detail}>{restaurant.floor}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.detail}>{restaurant.distance}m away</Text>
              </View>
              {restaurant.dietaryOptions.length > 0 && (
                <View style={styles.dietaryTags}>
                  {restaurant.dietaryOptions.map((diet, idx) => (
                    <View key={idx} style={styles.dietaryTag}>
                      <Text style={styles.dietaryTagText}>{diet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* View in AR Button */}
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => navigation.navigate('ARWayfinding')}
        >
          <Text style={styles.arButtonText}>🗺️ View Restaurants in AR</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
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
  filters: {
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#00a8e8',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  restaurantIcon: {
    fontSize: 50,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rating: {
    fontSize: 13,
    color: '#ff9800',
    marginRight: 15,
  },
  price: {
    fontSize: 13,
    color: '#4caf50',
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
  separator: {
    fontSize: 12,
    color: '#ccc',
    marginHorizontal: 8,
  },
  dietaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  dietaryTag: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginTop: 4,
  },
  dietaryTagText: {
    fontSize: 10,
    color: '#4caf50',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 28,
    color: '#00a8e8',
    marginLeft: 10,
  },
  arButton: {
    backgroundColor: '#00a8e8',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#00a8e8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  arButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

