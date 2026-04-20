import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Animated, 
  Easing,
  Dimensions
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const RAMMMonitorScreen = ({ onBack }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isAlert, setIsAlert] = useState(false); 
  const [status, setStatus] = useState("Ready"); 
  const waveAnim = useRef(new Animated.Value(0)).current;

  // --- BACKEND INTEGRATION ---
  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(async () => {
        try {
          const response = await fetch('https://c8xtrrj1-3000.uks1.devtunnels.ms/api/ramm/monitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              intensity: Math.random() * 10, 
              baseline: 5 
            }),
          });
          
          const data = await response.json();
          
          if (data.alert) {
            setIsAlert(true);
            setStatus("CRITICAL: " + data.status);
          } else {
            setIsAlert(false);
            setStatus("Monitoring...");
          }
        } catch (err) {
          console.error("Backend unreachable:", err);
          setStatus("Connection Error");
        }
      }, 2000);
    } else {
      setIsAlert(false);
      setStatus("Ready");
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  // --- ANIMATION LOGIC ---
  useEffect(() => {
    if (isMonitoring) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      waveAnim.stopAnimation();
      waveAnim.setValue(0);
    }
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={28} color="#B22222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RAMM System</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Status Section */}
      <View style={styles.statusBox}>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: isAlert ? '#EF4444' : (isMonitoring ? '#22C55E' : '#9CA3AF') }
        ]} />
        <Text style={[styles.statusText, isAlert && { color: '#EF4444' }]}>{status}</Text>
      </View>

      {/* Monitor Area - Optimized for Screen Fit */}
      <View style={styles.monitorArea}>
        <View style={styles.waveContainer}>
          <Animated.View 
            style={[
              styles.waveCircle, 
              { 
                backgroundColor: isAlert ? '#FEE2E2' : '#E0F2FE',
                transform: [{ scale: waveAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.25]
                }) }],
                opacity: waveAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7]
                })
              }
            ]} 
          />
          <MaterialCommunityIcons 
            name={isAlert ? "alert-circle-outline" : "baby-face-outline"} 
            size={SCREEN_HEIGHT < 700 ? 60 : 80} 
            color={isAlert ? "#EF4444" : (isMonitoring ? "#B22222" : "#94A3B8")} 
          />
        </View>
        <Text style={styles.hintText}>
          {isMonitoring 
            ? (isAlert ? "Respiratory distress detected!" : "Analyzing acoustic patterns...") 
            : "Place device near infant and press start"}
        </Text>
      </View>

      {/* Control Panel - Moved up and centered */}
      <View style={styles.controls}>
        <View style={styles.infoRow}>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>BREATHS/MIN</Text>
                <Text style={styles.infoValue}>{isMonitoring ? "28" : "--"}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>SIGNAL</Text>
                <Text style={[styles.infoValue, isAlert && {color: '#EF4444'}]}>
                  {isMonitoring ? (isAlert ? "Check App" : "Strong") : "--"}
                </Text>
            </View>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.mainBtn, isMonitoring ? styles.stopBtn : styles.startBtn]} 
          onPress={toggleMonitoring}
        >
          <Text style={styles.btnText}>{isMonitoring ? "STOP MONITORING" : "START SESSION"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#B22222' },
  backBtn: { padding: 4 },
  statusBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
  statusIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statusText: { fontSize: 14, color: '#6B7280', fontFamily: 'Brand-Medium' },
  
  monitorArea: { 
    flex: 1.5, // Takes up more space to push controls up
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  waveContainer: { 
    width: 220, 
    height: 220, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  waveCircle: { position: 'absolute', width: 180, height: 180, borderRadius: 90 },
  hintText: { 
    marginTop: 20, 
    color: '#94A3B8', 
    fontSize: 13, 
    textAlign: 'center', 
    paddingHorizontal: 50,
    lineHeight: 18
  },

  controls: { 
    flex: 1, // Balanced flex to pull button up from the bottom
    paddingHorizontal: 30, 
    paddingTop: 35, 
    paddingBottom: 40, // Increased bottom padding for safer "up" placement
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    elevation: 15, 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowRadius: 15,
    justifyContent: 'flex-start' // Aligns content to top of white box
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 25 
  },
  infoItem: { alignItems: 'center' },
  infoLabel: { fontSize: 11, color: '#9CA3AF', marginBottom: 4, fontFamily: 'Brand-Medium', letterSpacing: 0.5 },
  infoValue: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  
  mainBtn: { 
    height: 58, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    // Adding shadow for better UI depth
    shadowColor: '#B22222',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 }
  },
  startBtn: { backgroundColor: '#B22222' },
  stopBtn: { backgroundColor: '#1F2937', shadowColor: '#000' },
  btnText: { color: '#FFF', fontSize: 16, fontFamily: 'Brand-Bold', letterSpacing: 0.5 }
});

export default RAMMMonitorScreen;