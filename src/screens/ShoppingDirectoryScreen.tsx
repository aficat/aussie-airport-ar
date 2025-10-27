import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface Shop {
  id: string;
  name: string;
  category: string;
  icon: string;
  floor: string;
  terminal: string;
  distance: number;
  openHours: string;
  features: string[];
}

const SHOPS: Shop[] = [
  {
    id: '1',
    name: 'Duty Free Paradise',
    category: 'Duty Free',
    icon: '🎁',
    floor: 'Level 2',
    terminal: 'T2',
    distance: 100,
    openHours: 'Open 24/7',
    features: ['Perfumes', 'Alcohol', 'Electronics'],
  },
  {
    id: '2',
    name: 'Tech Hub',
    category: 'Electronics',
    icon: '📱',
    floor: 'Level 3',
    terminal: 'T2',
    distance: 120,
    openHours: '5:00 AM - 11:00 PM',
    features: ['Phones', 'Laptops', 'Accessories'],
  },
  {
    id: '3',
    name: 'Fashion Boutique',
    category: 'Fashion',
    icon: '👔',
    floor: 'Level 2',
    terminal: 'T2',
    distance: 80,
    openHours: '6:00 AM - 10:00 PM',
    features: ['Clothing', 'Shoes', 'Accessories'],
  },
  {
    id: '4',
    name: 'Aussie Souvenirs',
    category: 'Gifts',
    icon: '🦘',
    floor: 'Level 3',
    terminal: 'T2',
    distance: 150,
    openHours: 'Open 24/7',
    features: ['Opals', 'Aussie Gifts', 'Postcards'],
  },
  {
    id: '5',
    name: 'Bookworm',
    category: 'Books',
    icon: '📚',
    floor: 'Level 2',
    terminal: 'T2',
    distance: 90,
    openHours: '5:00 AM - 10:00 PM',
    features: ['Books', 'Magazines', 'Newspapers'],
  },
  {
    id: '6',
    name: 'Sweet Treats',
    category: 'Confectionery',
    icon: '🍭',
    floor: 'Level 2',
    terminal: 'T2',
    distance: 70,
    openHours: 'Open 24/7',
    features: ['Chocolates', 'Candies', 'Snacks'],
  },
  {
    id: '7',
    name: 'Jewelry Store',
    category: 'Jewelry',
    icon: '💍',
    floor: 'Level 3',
    terminal: 'T2',
    distance: 130,
    openHours: '6:00 AM - 11:00 PM',
    features: ['Watches', 'Jewelry', 'Gemstones'],
  },
  {
    id: '8',
    name: 'Health & Beauty',
    category: 'Beauty',
    icon: '💄',
    floor: 'Level 2',
    terminal: 'T2',
    distance: 60,
    openHours: '5:00 AM - 10:00 PM',
    features: ['Cosmetics', 'Skincare', 'Fragrances'],
  },
];

const CATEGORIES = ['All', 'Duty Free', 'Electronics', 'Fashion', 'Gifts', 'Beauty'];

export default function ShoppingDirectoryScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredShops = selectedCategory === 'All'
    ? SHOPS
    : SHOPS.filter(shop => shop.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🛍️ Shopping</Text>
          <Text style={styles.subtitle}>{SHOPS.length} stores available</Text>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Shops List */}
        {filteredShops.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={styles.shopCard}
            onPress={() => navigation.navigate('ARWayfinding')}
          >
            <Text style={styles.shopIcon}>{shop.icon}</Text>
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopCategory}>{shop.category}</Text>
              <View style={styles.shopDetails}>
                <Text style={styles.detail}>{shop.floor}</Text>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.detail}>{shop.distance}m away</Text>
              </View>
              <View style={styles.featuresContainer}>
                {shop.features.slice(0, 3).map((feature, idx) => (
                  <View key={idx} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Special Offers Section */}
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>🎉 Special Offers</Text>
          
          <View style={styles.offerCard}>
            <Text style={styles.offerEmoji}>💎</Text>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Duty Free - 15% Off</Text>
              <Text style={styles.offerDescription}>Selected perfumes and cosmetics</Text>
              <Text style={styles.offerValid}>Valid until end of month</Text>
            </View>
          </View>

          <View style={styles.offerCard}>
            <Text style={styles.offerEmoji}>☕</Text>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Buy 2 Get 1 Free</Text>
              <Text style={styles.offerDescription}>Aussie souvenirs and gifts</Text>
              <Text style={styles.offerValid}>Today only</Text>
            </View>
          </View>
        </View>

        {/* View in AR Button */}
        <TouchableOpacity
          style={styles.arButton}
          onPress={() => navigation.navigate('ARWayfinding')}
        >
          <Text style={styles.arButtonText}>🗺️ View Shops in AR</Text>
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
  shopCard: {
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
  shopIcon: {
    fontSize: 50,
    marginRight: 15,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  shopCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  shopDetails: {
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginTop: 4,
  },
  featureText: {
    fontSize: 10,
    color: '#00a8e8',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 28,
    color: '#00a8e8',
    marginLeft: 10,
  },
  offersSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  offerCard: {
    backgroundColor: '#fff3cd',
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
  offerEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  offerValid: {
    fontSize: 11,
    color: '#ff9800',
    fontWeight: '600',
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

