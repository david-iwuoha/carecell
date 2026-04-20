import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from "react-native-gifted-charts";

const { width } = Dimensions.get('window');

const InsightsScreen = ({ onNavigate }) => { // Added onNavigate prop here
  // --- SOPHISTICATED DATA SETS ---
  const painData = [
    {value: 2, label: 'Mon', dataPointText: '2'}, 
    {value: 5, label: 'Tue', dataPointText: '5'}, 
    {value: 3, label: 'Wed', dataPointText: '3'}, 
    {value: 1, label: 'Thu', dataPointText: '1'}, 
    {value: 2, label: 'Fri', dataPointText: '2'}, 
    {value: 4, label: 'Sat', dataPointText: '4'}, 
    {value: 3, label: 'Sun', dataPointText: '3'}
  ];

  const hydrationData = [
    {value: 6, label: 'M'}, {value: 8, label: 'T'}, {value: 7, label: 'W'}, 
    {value: 9, label: 'T'}, {value: 6, label: 'F'}, {value: 7, label: 'S'}, {value: 8, label: 'S'}
  ];
  
  const painCompareData = [
    {value: 3, label: 'M'}, {value: 1, label: 'T'}, {value: 2, label: 'W'}, 
    {value: 1, label: 'T'}, {value: 4, label: 'F'}, {value: 2, label: 'S'}, {value: 1, label: 'S'}
  ];

  const moodData = [
    {value: 8, label: 'M', frontColor: '#EAB308', topLabelComponent: () => <Text style={styles.barLabel}>😊</Text>}, 
    {value: 6, label: 'T', frontColor: '#F59E0B', topLabelComponent: () => <Text style={styles.barLabel}>😐</Text>}, 
    {value: 9, label: 'W', frontColor: '#EAB308', topLabelComponent: () => <Text style={styles.barLabel}>🤩</Text>}, 
    {value: 10, label: 'T', frontColor: '#EAB308', topLabelComponent: () => <Text style={styles.barLabel}>🤩</Text>},
    {value: 5, label: 'F', frontColor: '#B22222', topLabelComponent: () => <Text style={styles.barLabel}>😔</Text>}
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Health Insights</Text>
          <Text style={styles.headerSubtitle}>Weekly Analytics & Patterns</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Toggle & Metrics */}
        <View style={styles.toggleContainer}>
           <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
              <Text style={styles.activeToggleText}>Week</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.toggleBtn}>
              <Text style={styles.toggleText}>Month</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.metricsRow}>
           <MetricCard icon="tint" label="Avg Pain" value="2.1" color="#B22222" />
           <MetricCard icon="water" label="Avg Water" value="6.4" color="#3B82F6" />
           <MetricCard icon="bed" label="Avg Sleep" value="7.1h" color="#A855F7" />
        </View>

        {/* 1. PAIN TREND */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Pain Intensity (0-10)</Text>
          <LineChart
            data={painData}
            curved
            initialSpacing={20}
            textColor1="#B22222"
            dataPointsHeight={10}
            dataPointsWidth={10}
            dataPointsColor="#B22222"
            thickness={3}
            color="#B22222"
            rulesType="dash"
            rulesColor="#E5E7EB"
            yAxisColor="#E5E7EB"
            xAxisColor="#E5E7EB"
            yAxisTextStyle={{color: '#9CA3AF', fontSize: 10}}
            stepValue={2}
            maxValue={10}
            noOfSections={5}
            areaChart
            startFillColor="rgba(178, 34, 34, 0.3)"
            endFillColor="rgba(178, 34, 34, 0.01)"
            pointerConfig={{
                pointerStripColor: '#B22222',
                pointerStripWidth: 2,
                pointerColor: '#B22222',
                radius: 6,
                pointerLabelComponent: items => (
                  <View style={styles.pointerLabel}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{items[0].value}</Text>
                  </View>
                ),
            }}
            width={width - 100}
          />
        </View>

        {/* 2. CORRELATION CHART */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeaderRow}>
             <Text style={styles.chartTitle}>Hydration vs Pain Correlation</Text>
             <View style={styles.legend}>
                <View style={[styles.dot, {backgroundColor: '#3B82F6'}]} /><Text style={styles.legendText}>H2O</Text>
                <View style={[styles.dot, {backgroundColor: '#B22222', marginLeft: 8}]} /><Text style={styles.legendText}>Pain</Text>
             </View>
          </View>
          <LineChart
            data={hydrationData}
            data2={painCompareData}
            curved
            hideDataPoints
            thickness={3}
            color="#3B82F6"
            color2="#B22222"
            stepValue={2}
            maxValue={10}
            noOfSections={5}
            rulesColor="#F3F4F6"
            yAxisTextStyle={{color: '#9CA3AF', fontSize: 10}}
            width={width - 100}
          />
        </View>

        {/* 3. MOOD BARS */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Wellness & Mood</Text>
          <BarChart
            data={moodData}
            barWidth={25}
            spacing={20}
            roundedTop
            hideRules={false}
            rulesType="solid"
            rulesColor="#F3F4F6"
            yAxisThickness={1}
            yAxisColor="#F3F4F6"
            yAxisTextStyle={{color: '#9CA3AF', fontSize: 10}}
            noOfSections={5}
            maxValue={10}
            width={width - 100}
          />
        </View>

        {/* AI Insight Card */}
        <View style={styles.aiCard}>
           <View style={styles.aiHeader}>
              <MaterialCommunityIcons name="auto-fix" size={20} color="#B22222" />
              <Text style={styles.aiTitle}>Smart Observation</Text>
           </View>
           <Text style={styles.aiText}>
             Your pain levels spiked on <Text style={{fontWeight: 'bold'}}>Friday</Text> when your hydration was at its lowest (6 cups). 
             Increasing water intake on busy days might reduce this trend.
           </Text>
        </View>

        {/* RE-ADDED NAVIGATION BUTTON */}
        <TouchableOpacity 
          style={styles.updateButton} 
          
        >
          <Text style={styles.updateButtonText}>Update Hematology Data</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const MetricCard = ({ icon, label, value, color }) => (
  <View style={styles.metricCard}>
    <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
       <FontAwesome5 name={icon} size={14} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  header: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontFamily: 'Brand-Bold', color: '#B22222' },
  headerSubtitle: { fontSize: 14, color: '#6B5E5E', fontFamily: 'Brand-Regular' },
  scrollContent: { padding: 20 },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 15, padding: 5, marginBottom: 25 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeToggle: { backgroundColor: '#FFF', elevation: 3 },
  activeToggleText: { fontFamily: 'Brand-Bold', color: '#B22222' },
  toggleText: { color: '#6B5E5E', fontFamily: 'Brand-Medium' },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  metricCard: { width: '30%', backgroundColor: '#FFF', paddingVertical: 20, borderRadius: 24, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  metricValue: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#1F2937' },
  metricLabel: { fontSize: 11, color: '#9CA3AF', fontFamily: 'Brand-Medium' },
  chartCard: { backgroundColor: '#FFF', borderRadius: 28, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05 },
  chartTitle: { fontSize: 15, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 20 },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  legend: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, marginLeft: 6, color: '#6B5E5E', fontFamily: 'Brand-Medium' },
  barLabel: { fontSize: 14, marginBottom: 5 },
  pointerLabel: { backgroundColor: '#B22222', padding: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 30 },
  aiCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, borderLeftWidth: 6, borderLeftColor: '#B22222', elevation: 3 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aiTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937', marginLeft: 10 },
  aiText: { fontSize: 14, color: '#4B3F3F', lineHeight: 22, fontFamily: 'Brand-Regular' },
  updateButton: { backgroundColor: '#B22222', borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 25 }, // Added marginTop for spacing
  updateButtonText: { color: '#FFF', fontFamily: 'Brand-Bold', fontSize: 16 }
});

export default InsightsScreen;