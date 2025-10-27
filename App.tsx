import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ARWayfindingScreen from './src/screens/ARWayfindingScreen';
import LandingScreen from './src/screens/LandingScreen';
import GamificationScreen from './src/screens/GamificationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#00a8e8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Aussie Air AR 🦘' }}
          />
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen}
            options={{ title: 'Welcome to Australia' }}
          />
          <Stack.Screen 
            name="ARWayfinding" 
            component={ARWayfindingScreen}
            options={{ title: 'AR Navigation' }}
          />
          <Stack.Screen 
            name="Gamification" 
            component={GamificationScreen}
            options={{ title: 'Aussie Challenges' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});

