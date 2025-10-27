import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  completed: boolean;
  progress: number;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export default function GamificationScreen({ navigation }: any) {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first AR navigation',
      icon: '🚀',
      points: 50,
      completed: false,
      progress: 0,
    },
    {
      id: '2',
      title: 'Explorer',
      description: 'Visit 5 different locations',
      icon: '🗺️',
      points: 100,
      completed: false,
      progress: 3,
    },
    {
      id: '3',
      title: 'Foodie',
      description: 'Dine at 3 restaurants',
      icon: '🍽️',
      points: 75,
      completed: false,
      progress: 1,
    },
    {
      id: '4',
      title: 'Shopaholic',
      description: 'Make a purchase at the duty-free',
      icon: '💳',
      points: 100,
      completed: true,
      progress: 1,
    },
    {
      id: '5',
      title: 'Time Master',
      description: 'Check in with 15 minutes to spare',
      icon: '⏰',
      points: 150,
      completed: false,
      progress: 0,
    },
    {
      id: '6',
      title: 'Aussie Buddy',
      description: 'Complete 10 challenges',
      icon: '🦘',
      points: 200,
      completed: false,
      progress: 4,
    },
  ]);

  const badges: Badge[] = [
    { id: '1', name: 'Welcome Aussie', icon: '🦘', description: 'Started your journey', earned: true },
    { id: '2', name: 'First Flight', icon: '✈️', description: 'Navigated to your gate', earned: true },
    { id: '3', name: 'Food Lover', icon: '🍔', description: 'Visited 3 restaurants', earned: false },
    { id: '4', name: 'Duty-Free Hero', icon: '💎', description: 'Made a purchase', earned: true },
    { id: '5', name: 'AR Master', icon: '🥽', description: 'Used AR 10 times', earned: false },
    { id: '6', name: 'Aussie Legend', icon: '🏆', description: 'Completed all challenges', earned: false },
  ];

  const earnedBadges = badges.filter(b => b.earned).length;
  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);
  const completionRate = (challenges.filter(c => c.completed).length / challenges.length) * 100;

  const handleChallengePress = (challenge: Challenge) => {
    if (challenge.completed) {
      Alert.alert('Challenge Completed!', `You earned ${challenge.points} points! 🎉`);
      return;
    }

    if (challenge.progress > 0) {
      Alert.alert(
        challenge.title,
        `${challenge.description}\n\nProgress: ${challenge.progress}/${challenge.progress + 2}\nReward: ${challenge.points} points`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Start Challenge', 
            onPress: () => {
              Alert.alert('Challenge Started!', 'Good luck! 🍀');
            }
          },
        ]
      );
    } else {
      Alert.alert(
        challenge.title,
        `${challenge.description}\n\nReward: ${challenge.points} points`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Start Challenge', 
            onPress: () => {
              Alert.alert('Challenge Started!', 'Good luck! 🍀');
            }
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Stats Header */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{earnedBadges}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{Math.round(completionRate)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Your Journey</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionRate}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Level 1 Explorer • {challenges.filter(c => c.completed).length}/{challenges.length} Challenges
          </Text>
        </View>

        {/* Challenges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Challenges 🎯</Text>
          {challenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={[
                styles.challengeCard,
                challenge.completed && styles.challengeCardCompleted
              ]}
              onPress={() => handleChallengePress(challenge)}
            >
              <Text style={styles.challengeIcon}>{challenge.icon}</Text>
              <View style={styles.challengeContent}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                {!challenge.completed && challenge.progress > 0 && (
                  <View style={styles.progressRow}>
                    <View style={styles.miniProgressBar}>
                      <View style={[styles.miniProgressFill, { 
                        width: `${(challenge.progress / (challenge.progress + 2)) * 100}%` 
                      }]} />
                    </View>
                    <Text style={styles.progressText}>{challenge.progress} done</Text>
                  </View>
                )}
              </View>
              <View style={styles.challengePoints}>
                <Text style={styles.challengePointsText}>{challenge.points}</Text>
                <Text style={styles.challengePointsLabel}>pts</Text>
              </View>
              {challenge.completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges & Achievements 🏆</Text>
          <View style={styles.badgesGrid}>
            {badges.map((badge) => (
              <View 
                key={badge.id} 
                style={[
                  styles.badgeCard,
                  badge.earned && styles.badgeCardEarned
                ]}
              >
                <Text style={[
                  styles.badgeIcon,
                  !badge.earned && styles.badgeIconLocked
                ]}>
                  {badge.icon}
                </Text>
                <Text style={[
                  styles.badgeName,
                  !badge.earned && styles.badgeNameLocked
                ]}>
                  {badge.name}
                </Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard 📊</Text>
          <View style={styles.leaderboardCard}>
            <View style={styles.leaderboardRank}>
              <Text style={styles.rankEmoji}>🥇</Text>
              <View style={styles.rankInfo}>
                <Text style={styles.rankName}>You</Text>
                <Text style={styles.rankScore}>1,250 pts</Text>
              </View>
            </View>
            <View style={styles.leaderboardStats}>
              <Text style={styles.rankLabel}>Current Rank</Text>
              <Text style={styles.rankNumber}>#42</Text>
            </View>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.rewardsCard}>
          <Text style={styles.rewardsTitle}>🎁 Today's Rewards</Text>
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>☕</Text>
              <Text style={styles.rewardText}>Free Coffee</Text>
              <Text style={styles.rewardPoints}>250 pts</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>🎟️</Text>
              <Text style={styles.rewardText}>Lounge Access</Text>
              <Text style={styles.rewardPoints}>500 pts</Text>
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
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00a8e8',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00a8e8',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeCardCompleted: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#00a8e8',
  },
  challengeIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 12,
    color: '#666',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  miniProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: '#00a8e8',
  },
  challengePoints: {
    alignItems: 'center',
    marginLeft: 12,
  },
  challengePointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a8e8',
  },
  challengePointsLabel: {
    fontSize: 10,
    color: '#666',
  },
  checkmark: {
    fontSize: 24,
    color: '#4caf50',
    marginLeft: 10,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeCardEarned: {
    backgroundColor: '#fff3cd',
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  badgeIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  badgeIconLocked: {
    opacity: 0.3,
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#999',
  },
  badgeDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  leaderboardCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardRank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rankEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  rankScore: {
    fontSize: 14,
    color: '#00a8e8',
    fontWeight: '600',
  },
  leaderboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  rankLabel: {
    fontSize: 14,
    color: '#666',
  },
  rankNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00a8e8',
  },
  rewardsCard: {
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
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardItem: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rewardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  rewardPoints: {
    fontSize: 11,
    color: '#666',
  },
});

