"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

const { width, height } = Dimensions.get("window")

const weekDays = ["S", "S", "M", "T", "W", "T", "F"]

const thoughtPatterns = [
  {
    id: 1,
    label: "Feeling like you're not enough",
    progress: 12,
    colors: ["#3B82F6", "#4F46E5"],
  },
  {
    id: 2,
    label: "Blaming yourself for everything",
    progress: 15,
    colors: ["#8B5CF6", "#7C3AED"],
  },
]

export default function DashboardPage() {
  const [healingProgress] = useState(20)
  const [weeklyHabits] = useState([true, true, true, true, true, true, false])

  const handleJournalNavigation = () => {
    // Navigate to journal page
    console.log("Navigate to journal")
  }

  const handleReframing = () => {
    // Navigate to reframe page
    console.log("Navigate to reframe")
  }

  const handleEmergencyJournal = () => {
    // Navigate to emergency journal page
    console.log("Navigate to emergency journal")
  }

  const handleThoughtPattern = (patternId) => {
    console.log(`Opening full CBT report for pattern ${patternId}`)
  }

  const StarBackground = () => (
    <View style={styles.starContainer}>
      {[...Array(40)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.star,
            {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
            },
          ]}
        />
      ))}
    </View>
  )

  const ProgressBar = ({ progress, colors }) => (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: `${progress}%` }]}
        />
      </View>
    </View>
  )

  return (
    <LinearGradient colors={["#020617", "#1e3a8a", "#020617"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StarBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Status Bar Simulation */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>12:51</Text>
          <View style={styles.statusRight}>
            <View style={styles.signalBars}>
              <View style={[styles.signalBar, styles.signalBarActive]} />
              <View style={[styles.signalBar, styles.signalBarActive]} />
              <View style={[styles.signalBar, styles.signalBarInactive]} />
            </View>
            <View style={styles.battery}>
              <View style={styles.batteryFill} />
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with app logo */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LinearGradient colors={["#1d4ed8", "#3730a3"]} style={styles.appIcon}>
                <Ionicons name="heart" size={20} color="white" />
              </LinearGradient>
              <Text style={styles.appName}>REFRAME</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.streak}>🔥 3</Text>
              <Text style={styles.heart}>💚</Text>
              <Text style={styles.target}>🎯</Text>
            </View>
          </View>

          {/* Healing Journey Progress */}
          <View style={styles.section}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Healing Journey</Text>
              <Text style={styles.progressPercent}>{healingProgress}%</Text>
            </View>
            <View style={styles.mainProgressContainer}>
              <LinearGradient
                colors={["#3B82F6", "#4F46E5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.mainProgressFill, { width: `${healingProgress}%` }]}
              />
            </View>
          </View>

          {/* Weekly Habit Tracker */}
          <View style={styles.section}>
            <View style={styles.weeklyHabits}>
              {weekDays.map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                  <LinearGradient
                    colors={weeklyHabits[index] ? ["#2563EB", "#3730A3"] : ["transparent", "transparent"]}
                    style={[styles.dayCircle, !weeklyHabits[index] && styles.dayCircleInactive]}
                  >
                    <Ionicons
                      name={weeklyHabits[index] ? "checkmark" : "remove"}
                      size={20}
                      color={weeklyHabits[index] ? "white" : "#9CA3AF"}
                    />
                  </LinearGradient>
                  <Text style={styles.dayLabel}>{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Central Healing Element */}
          <View style={styles.centralElement}>
            <View style={styles.centralCircleContainer}>
              <LinearGradient colors={["#475569", "#334155"]} style={styles.centralCircleOuter}>
                <LinearGradient colors={["#2563EB", "#3730A3"]} style={styles.centralCircleInner}>
                  <Ionicons name="heart" size={40} color="white" />
                </LinearGradient>
              </LinearGradient>
            </View>
            <Text style={styles.centralText}>You've been healing for:</Text>
            <Text style={styles.centralDays}>12d</Text>
          </View>

          {/* Reframing Section */}
          <View style={styles.section}>
            <TouchableOpacity onPress={handleReframing} style={styles.reframingButton}>
              <LinearGradient
                colors={["rgba(30, 58, 138, 0.4)", "rgba(15, 118, 110, 0.4)"]}
                style={styles.reframingGradient}
              >
                <View style={styles.reframingContent}>
                  <Text style={styles.reframingEmoji}>🧠</Text>
                  <View style={styles.reframingTextContainer}>
                    <Text style={styles.reframingTitle}>Let's Start Reframing</Text>
                    <Text style={styles.reframingQuote}>"I don't think I'll ever feel okay again."</Text>
                    <Text style={styles.reframingSubtext}>That thought has been heavy... Let's reflect on that.</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEmergencyJournal} style={styles.emergencyButton}>
              <LinearGradient
                colors={["rgba(154, 52, 18, 0.4)", "rgba(153, 27, 27, 0.4)"]}
                style={styles.emergencyGradient}
              >
                <View style={styles.emergencyContent}>
                  <Text style={styles.emergencyEmoji}>🆘</Text>
                  <View style={styles.emergencyTextContainer}>
                    <Text style={styles.emergencyTitle}>Emergency Journal</Text>
                    <Text style={styles.emergencySubtext}>I need someone to talk to</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* CBT Report Snapshot */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Current Thought Patterns</Text>
            <View style={styles.thoughtPatternsContainer}>
              {thoughtPatterns.map((pattern) => (
                <TouchableOpacity
                  key={pattern.id}
                  onPress={() => handleThoughtPattern(pattern.id)}
                  style={styles.thoughtPatternButton}
                >
                  <View style={styles.thoughtPatternHeader}>
                    <Text style={styles.thoughtPatternLabel}>{pattern.label}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                  </View>
                  <View style={styles.thoughtPatternProgress}>
                    <ProgressBar progress={pattern.progress} colors={pattern.colors} />
                    <Text style={styles.thoughtPatternPercent}>{pattern.progress}%</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Navigation Cards */}
          <View style={styles.navigationGrid}>
            <TouchableOpacity onPress={handleJournalNavigation} style={styles.navCard}>
              <LinearGradient
                colors={["rgba(146, 64, 14, 0.3)", "rgba(154, 52, 18, 0.3)"]}
                style={styles.navCardGradient}
              >
                <Ionicons name="book-outline" size={32} color="#F59E0B" />
                <Text style={styles.navCardTitle}>Journal</Text>
                <Text style={styles.navCardSubtitle}>View your entries</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navCard}>
              <LinearGradient
                colors={["rgba(107, 33, 168, 0.3)", "rgba(124, 58, 237, 0.3)"]}
                style={styles.navCardGradient}
              >
                <Ionicons name="chatbubble-outline" size={32} color="#A855F7" />
                <Text style={styles.navCardTitle}>Community</Text>
                <Text style={styles.navCardSubtitle}>Connect with others</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navCard}>
              <LinearGradient
                colors={["rgba(22, 101, 52, 0.3)", "rgba(5, 150, 105, 0.3)"]}
                style={styles.navCardGradient}
              >
                <Ionicons name="menu-outline" size={32} color="#10B981" />
                <Text style={styles.navCardTitle}>Settings</Text>
                <Text style={styles.navCardSubtitle}>Customize your app</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navCard}>
              <LinearGradient
                colors={["rgba(30, 41, 59, 0.3)", "rgba(55, 65, 81, 0.3)"]}
                style={styles.navCardGradient}
              >
                <View style={styles.moreIcon}>
                  <View style={styles.moreIconDot} />
                </View>
                <Text style={styles.navCardTitle}>More</Text>
                <Text style={styles.navCardSubtitle}>Additional features</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation Menu */}
        <View style={styles.bottomNav}>
          <LinearGradient
            colors={["rgba(15, 23, 42, 0.95)", "rgba(15, 23, 42, 0.95)"]}
            style={styles.bottomNavGradient}
          >
            <View style={styles.bottomNavContent}>
              <TouchableOpacity style={styles.bottomNavButton}>
                <Ionicons name="home" size={24} color="#60A5FA" />
                <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleJournalNavigation} style={styles.bottomNavButton}>
                <Ionicons name="book-outline" size={24} color="#9CA3AF" />
                <Text style={styles.bottomNavText}>Journal</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomNavButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#9CA3AF" />
                <Text style={styles.bottomNavText}>Community</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomNavButton}>
                <Ionicons name="menu-outline" size={24} color="#9CA3AF" />
                <Text style={styles.bottomNavText}>Menu</Text>
              </TouchableOpacity>
            </View>

            {/* Home indicator */}
            <View style={styles.homeIndicator}>
              <View style={styles.homeIndicatorBar} />
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  starContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: "absolute",
    width: 4,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 2,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  statusTime: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
  },
  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signalBars: {
    flexDirection: "row",
    gap: 2,
  },
  signalBar: {
    width: 4,
    height: 12,
    borderRadius: 2,
  },
  signalBarActive: {
    backgroundColor: "#D1D5DB",
  },
  signalBarInactive: {
    backgroundColor: "#6B7280",
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 2,
    justifyContent: "center",
    paddingHorizontal: 1,
  },
  batteryFill: {
    flex: 1,
    backgroundColor: "#D1D5DB",
    borderRadius: 1,
    width: "80%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  appIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  streak: {
    color: "#FB923C",
    fontSize: 14,
    fontWeight: "500",
  },
  heart: {
    color: "#34D399",
    fontSize: 14,
  },
  target: {
    color: "#60A5FA",
    fontSize: 14,
  },
  section: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  progressPercent: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "500",
  },
  mainProgressContainer: {
    width: "100%",
    height: 12,
    backgroundColor: "rgba(31, 41, 55, 0.5)",
    borderRadius: 6,
    overflow: "hidden",
  },
  mainProgressFill: {
    height: "100%",
    borderRadius: 6,
  },
  weeklyHabits: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  dayContainer: {
    alignItems: "center",
    gap: 8,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleInactive: {
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  dayLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
  },
  centralElement: {
    alignItems: "center",
    marginBottom: 32,
  },
  centralCircleContainer: {
    marginBottom: 16,
  },
  centralCircleOuter: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  centralCircleInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  centralText: {
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 8,
  },
  centralDays: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  reframingButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  reframingGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(29, 78, 216, 0.5)",
    borderRadius: 16,
  },
  reframingContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  reframingEmoji: {
    fontSize: 24,
  },
  reframingTextContainer: {
    flex: 1,
  },
  reframingTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  reframingQuote: {
    color: "#D1D5DB",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 4,
  },
  reframingSubtext: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  emergencyButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  emergencyGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(194, 65, 12, 0.5)",
    borderRadius: 16,
  },
  emergencyContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  emergencyEmoji: {
    fontSize: 24,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  emergencySubtext: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  sectionTitle: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  thoughtPatternsContainer: {
    gap: 12,
  },
  thoughtPatternButton: {
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.5)",
    borderRadius: 12,
    padding: 16,
  },
  thoughtPatternHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  thoughtPatternLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  thoughtPatternProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  thoughtPatternPercent: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  navigationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  navCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    overflow: "hidden",
  },
  navCardGradient: {
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(55, 65, 81, 0.5)",
    borderRadius: 16,
  },
  navCardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  navCardSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
  },
  moreIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  moreIconDot: {
    width: 24,
    height: 24,
    backgroundColor: "#64748B",
    borderRadius: 12,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavGradient: {
    borderTopWidth: 1,
    borderTopColor: "rgba(55, 65, 81, 0.5)",
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottomNavButton: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  bottomNavText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  bottomNavTextActive: {
    color: "#60A5FA",
    fontWeight: "500",
  },
  homeIndicator: {
    alignItems: "center",
    paddingBottom: 8,
  },
  homeIndicatorBar: {
    width: 128,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 2,
  },
})
