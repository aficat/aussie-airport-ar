# Aussie Airport AR 🦘

A modern, friendly Augmented Reality wayfinding app for Australian airports built with React Native and Expo.

## Features

### 🗺️ AR Wayfinding
- Real-time AR navigation with camera overlay
- Interactive 3D markers for gates, restaurants, restrooms, and shops
- Distance and direction indicators
- Compass for orientation

### 🎮 Gamification
- Complete challenges to earn points and badges
- Track your progress through the airport
- Leaderboard to compete with other travelers
- Earn rewards like free coffee or lounge access

### 📱 Interactive Features
- Flight information and updates
- Terminal maps and amenities
- Restaurant and shopping directories
- Friendly Australian-themed design

## Tech Stack

- **Framework**: React Native with Expo
- **AR**: Expo Camera API with AR overlays
- **Navigation**: React Navigation
- **Location**: Expo Location
- **3D Graphics**: Three.js + Expo GL (ready for expansion)
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- Physical device for AR testing (recommended)

### Installation

1. Clone the repository:
```bash
cd aussie-airport-ar
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your device:
- Scan the QR code with Expo Go app (iOS/Android)
- Or press `i` for iOS simulator
- Or press `a` for Android emulator

### Building

For iOS:
```bash
eas build --platform ios
```

For Android:
```bash
eas build --platform android
```

## Project Structure

```
aussie-airport-ar/
├── src/
│   └── screens/
│       ├── HomeScreen.tsx          # Main landing page
│       ├── LandingScreen.tsx       # Welcome screen
│       ├── ARWayfindingScreen.tsx  # AR navigation
│       └── GamificationScreen.tsx  # Challenges & badges
├── App.tsx                         # App entry point
├── package.json                   # Dependencies
├── app.json                       # Expo configuration
└── README.md                      # This file
```

## Features in Detail

### AR Wayfinding
- Point your camera to see AR markers for nearby locations
- Tap markers to get details and start navigation
- See real-time distance and direction indicators
- Find gates, restaurants, restrooms, lounges, and shops

### Gamification
- Complete daily challenges
- Earn points for activities like visiting restaurants, shopping, or using AR features
- Collect badges for achievements
- Redeem points for airport perks

### Design Philosophy
- **Friendly**: Warm, welcoming design with Australian iconography (kangaroos, koalas)
- **Modern**: Clean UI with smooth animations
- **Helpful**: Clear navigation and intuitive UX
- **Accessible**: High contrast, readable fonts, clear call-to-actions

## Future Enhancements

- [ ] Real 3D AR models with Three.js
- [ ] Indoor positioning system integration
- [ ] Live flight information API
- [ ] Push notifications for gate changes
- [ ] Social features (share location with travel companions)
- [ ] Accessibility improvements (voice navigation, haptics)
- [ ] Multi-language support
- [ ] Cloud sync for progress and preferences

## Permissions

The app requires:
- **Camera**: For AR functionality
- **Location**: For accurate wayfinding (when integrated with actual positioning)

## Contributing

This is a demonstration project showcasing modern AR capabilities in React Native.

## License

MIT

## Acknowledgments

- Australian airport experiences
- Modern AR/VR design patterns
- React Native community

---

Made with 💙 in Australia

