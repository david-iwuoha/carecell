import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import "dotenv/config";

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ onNavigate }) => {
  const [waterCups, setWaterCups] = useState(4);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isTypingEffect, setIsTypingEffect] = useState(false);
  
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: "Hi Opeyemi! I'm your health companion. How are you feeling today?" }
  ]);

  const scrollViewRef = useRef();
  const totalGoal = 8;

  useEffect(() => {
    if (chatVisible) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [chatHistory, isAiLoading]);

  const typeMessage = (fullText) => {
    setIsTypingEffect(true);
    let currentText = "";
    let index = 0;
    setChatHistory(prev => [...prev, { role: 'ai', content: "" }]);

    const interval = setInterval(() => {
      currentText += fullText[index];
      setChatHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = currentText;
        return updated;
      });
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setIsTypingEffect(false);
      }
    }, 15);
  };

  const triggerMoodAiResponse = (moodLabel) => {
    setChatVisible(true);
    const moodPrompt = `SYSTEM_EVENT: The user clicked the ${moodLabel} mood emoji. Their water intake is ${waterCups}/${totalGoal} cups. Acknowledge their mood and give a 1-sentence hydration tip based on their current progress.`;
    sendMessageToAi(moodPrompt, true);
  };

  const sendMessageToAi = async (userText, isAutomated = false) => {
    if (!userText && chatHistory.length > 1) return;
    const currentInput = userText || `The user has drank ${waterCups} cups of water today. Give a quick supportive tip.`;
    
    if (userText && !isAutomated) {
      setChatHistory(prev => [...prev, { role: 'user', content: userText }]);
      setChatMessage("");
    }

    setIsAiLoading(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.EXPO_PUBLIC_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", 
          messages: [
            {
              role: "system",
              content: "You are a supportive Sickle Cell health companion. Carecell was brought to life by a team of 6 hardworking student researchers and biologists. The team lead, Iwuoha David, is a student at the university of lagos. CRITICAL: Never give medical prescriptions. If asked for medical help, tell the user to consult their doctor. Always be encouraging."
            },
            { role: "user", content: currentInput }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (response.ok && data.choices && data.choices.length > 0) {
        const aiReply = data.choices[0].message.content;
        setIsAiLoading(false);
        typeMessage(aiReply);
      } else {
        setChatHistory(prev => [...prev, { role: 'ai', content: "I'm having a little trouble thinking right now." }]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', content: "I couldn't reach the AI. Stay hydrated!" }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const addWater = () => {
    if (waterCups < totalGoal) {
      setWaterCups(prev => prev + 1);
    } else {
      Alert.alert("Goal Reached!", "You've hit your 8-cup goal. Stay consistent!");
    }
  };

  const handleForgotYesterday = () => {
    Alert.alert("Recovery Log", "How many cups did you drink yesterday?", [
      { text: "2 Cups", onPress: () => console.log("Logged 2 for yesterday") },
      { text: "4 Cups", onPress: () => console.log("Logged 4 for yesterday") },
      { text: "6+ Cups", onPress: () => console.log("Logged 6 for yesterday") },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF5E6" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Opeyemi</Text>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={12} color="#6B5E5E" />
              <Text style={styles.locationText}>Lagos, Nigeria</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationToggle}>
               <View style={styles.toggleTrack}>
                  <Feather name="bell" size={18} color="#6B5E5E" />
                  <View style={styles.bellDot} />
               </View>
               <Image source={require('../assets/icon/pic.png')} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Health Status Card */}
        <View style={styles.healthStatusCard}>
          <View style={styles.healthStatusHeader}>
            <Text style={styles.healthStatusTitle}>Today's Health Status</Text>
            <Feather name="alert-triangle" size={18} color="#FFF" />
          </View>
          <View style={styles.riskBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.riskText}>Crisis Risk: Low</Text>
          </View>
          <View style={styles.hydrationAlert}>
            <Ionicons name="water-outline" size={20} color="#3B82F6" />
            <Text style={styles.hydrationAlertText}>
              Hydration was low yesterday. Drink 2 cups this morning to stay ahead.
            </Text>
          </View>
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.crisisButton} onPress={() => onNavigate('crisishelp')}>
            <View style={styles.crisisIconCircle}>
              <MaterialCommunityIcons name="alert-octagon-outline" size={22} color="#dfd2d2" />
            </View>
            <Text style={styles.crisisButtonText}>CRISIS HELP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logPainButton} onPress={() => onNavigate('logpain')}>
            <View style={styles.plusCircle}>
              <Feather name="plus" size={22} color="#FFF" />
            </View>
            <Text style={styles.logPainText}>Log New Pain Episode</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Tracker */}
        <View style={styles.moodSection}>
          <Text style={styles.sectionLabel}>How are you feeling?</Text>
          <View style={styles.moodContainer}>
            {[{ e: '😎', l: 'Great' }, { e: '😟', l: 'Good', active: true }, { e: '😐', l: 'Okay' }, { e: '😔', l: 'Low' }].map((item, i) => (
              <TouchableOpacity key={i} style={[styles.moodItem, item.active && styles.moodItemActive]} onPress={() => triggerMoodAiResponse(item.l)}>
                <Text style={styles.moodEmoji}>{item.e}</Text>
                <Text style={styles.moodLabel}>{item.l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statCard} onPress={addWater} activeOpacity={0.7}>
            <View style={[styles.statIconCircle, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="water" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statTitle}>Water Intake</Text>
            <Text style={styles.statValue}>{waterCups} <Text style={styles.statSubValue}>/{totalGoal} cups</Text></Text>
            <View style={styles.waterProgress}>
               {[...Array(totalGoal)].map((_, i) => (
                 <View key={i} style={[styles.progressSegment, i < waterCups && styles.segmentActive]} />
               ))}
            </View>
            <TouchableOpacity onPress={handleForgotYesterday} style={styles.forgotButton}>
               <Text style={styles.forgotText}>Forgot to log yesterday?</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="moon" size={20} color="#A855F7" />
            </View>
            <Text style={styles.statTitle}>Sleep</Text>
            <Text style={styles.statValue}>7 <Text style={styles.statSubValue}>hours</Text></Text>
          </View>
        </View>

        {/* AI Insights Section */}
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <TouchableOpacity style={styles.insightCard} onPress={() => { setChatVisible(true); sendMessageToAi(); }}>
          <View style={[styles.insightIconBox, { backgroundColor: '#EAB308' }]}>
            <Ionicons name="sparkles" size={24} color="#FFF" />
          </View>
          <View style={styles.insightTextContent}>
            <Text style={styles.insightCardTitle}>Personalized Chat</Text>
            <Text style={styles.insightCardSub}>Tap to chat with your health companion.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.insightCard, { marginBottom: 24 }]}>
          <View style={[styles.insightIconBox, { backgroundColor: '#F97316' }]}>
            <MaterialCommunityIcons name="dna" size={24} color="#FFF" />
          </View>
          <View style={styles.insightTextContent}>
            <Text style={styles.insightCardTitle}>Learn about your genes</Text>
            <Text style={styles.insightCardSub}>Understanding your genotype better.</Text>
          </View>
        </TouchableOpacity>

        {/* Report and Trends Section */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.reportTrendCard} onPress={() => onNavigate('healthreport')}>
            <View style={styles.trendIconCircle}>
              <Feather name="book-open" size={20} color="#FFF" />
            </View>
            <Text style={styles.reportTrendText}>Health Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportTrendCard} onPress={() => onNavigate('trends')}>
            <View style={styles.trendIconCircle}>
              <MaterialCommunityIcons name="trending-up" size={22} color="#FFF" />
            </View>
            <Text style={styles.reportTrendText}>View Trends</Text>
          </TouchableOpacity>
        </View>

        {/* --- SMART TOOLS SECTION (Moved to Bottom) --- */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Smart Tools</Text>
        <View style={styles.rammCard}>
            <View style={styles.rammInfoRow}>
                <View style={styles.rammIconCircle}>
                    <MaterialCommunityIcons name="pulse" size={24} color="#B22222" />
                </View>
                <View>
                    <Text style={styles.rammMainTitle}>Infant Rest Monitor</Text>
                    <Text style={styles.rammStatusText}>Status: Off</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.rammStartBtn}
                onPress={() => onNavigate('ramm_monitor')}
            >
                <Text style={styles.rammBtnText}>Start Monitoring</Text>
            </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* --- AI CHAT MODAL --- */}
      <Modal animationType="slide" transparent={true} visible={chatVisible} onRequestClose={() => setChatVisible(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.chatContainer}>
            <View style={styles.chatHeader}>
              <View style={styles.chatHeaderTitle}>
                <Ionicons name="sparkles" size={20} color="#B22222" />
                <Text style={styles.chatTitleText}>CareCell AI</Text>
              </View>
              <TouchableOpacity onPress={() => setChatVisible(false)}>
                <Feather name="x" size={24} color="#6B5E5E" />
              </TouchableOpacity>
            </View>
            <ScrollView ref={scrollViewRef} style={styles.chatBody} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={styles.warningBox}>
                <Feather name="info" size={14} color="#854d0e" />
                <Text style={styles.warningText}>AI assistant provides general support and hydration tips. Not a medical substitute.</Text>
              </View>
              {chatHistory.map((msg, index) => (
                <View key={index} style={[styles.messageBubble, msg.role === 'ai' ? styles.aiBubble : styles.userBubble]}>
                  <Text style={[styles.chatText, msg.role === 'user' && { color: '#FFF' }]}>{msg.content}</Text>
                </View>
              ))}
              {isAiLoading && (
                <View style={styles.typingContainer}>
                  <View style={styles.aiBubble}><ActivityIndicator size="small" color="#B22222" /></View>
                  <Text style={styles.typingLabel}>CareCell AI is typing...</Text>
                </View>
              )}
            </ScrollView>
            <View style={styles.inputArea}>
              <TextInput style={styles.chatInput} placeholder="Ask me anything..." value={chatMessage} onChangeText={setChatMessage} />
              <TouchableOpacity style={styles.sendButton} onPress={() => sendMessageToAi(chatMessage)} disabled={isAiLoading || !chatMessage.trim()}>
                <Ionicons name="send" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <TouchableOpacity style={styles.floatingAiButton} onPress={() => { setChatVisible(true); sendMessageToAi(); }}>
        <Ionicons name="sparkles" size={25} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 20 },
  greeting: { fontSize: 20, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 12, color: '#6B5E5E', marginLeft: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationToggle: { flexDirection: 'row', backgroundColor: '#FFF', padding: 4, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  toggleTrack: { paddingHorizontal: 12, position: 'relative' },
  bellDot: { width: 6, height: 6, backgroundColor: '#EAB308', borderRadius: 3, position: 'absolute', top: 0, right: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  healthStatusCard: { backgroundColor: '#B22222', borderRadius: 20, padding: 16, marginBottom: 20 },
  healthStatusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  healthStatusTitle: { color: '#FFF', fontSize: 16, fontFamily: 'Brand-Bold' },
  riskBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginVertical: 10 },
  greenDot: { width: 8, height: 8, backgroundColor: '#22C55E', borderRadius: 4, marginRight: 6 },
  riskText: { color: '#FFF', fontSize: 10, fontFamily: 'Brand-Medium' },
  hydrationAlert: { backgroundColor: '#FFF', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center' },
  hydrationAlertText: { flex: 1, fontSize: 11, color: '#4B3F3F', marginLeft: 10, lineHeight: 16 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  crisisButton: { flex: 1, backgroundColor: '#B22222', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  crisisIconCircle: { backgroundColor: '#FFF', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  crisisButtonText: { color: '#FFF', fontSize: 11, fontFamily: 'Brand-Bold' },
  logPainButton: { flex: 1.2, backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#FEE2E2', flexDirection: 'row', alignItems: 'center' },
  plusCircle: { backgroundColor: '#B22222', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  logPainText: { color: '#B22222', fontSize: 11, fontFamily: 'Brand-Bold' },
  moodSection: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 20 },
  sectionLabel: { fontSize: 12, color: '#6B5E5E', marginBottom: 12 },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem: { alignItems: 'center', padding: 10, borderRadius: 12, backgroundColor: '#F9FAFB', width: '22%' },
  moodItemActive: { borderWidth: 1, borderColor: '#B22222', backgroundColor: '#FFF' },
  moodEmoji: { fontSize: 24, marginBottom: 4 },
  moodLabel: { fontSize: 11, color: '#6B5E5E' },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 16 },
  statIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statTitle: { fontSize: 12, color: '#6B5E5E', marginBottom: 4 },
  statValue: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  statSubValue: { fontSize: 12, color: '#9CA3AF' },
  waterProgress: { flexDirection: 'row', gap: 4, marginTop: 10 },
  progressSegment: { height: 6, flex: 1, backgroundColor: '#E5E7EB', borderRadius: 3 },
  segmentActive: { backgroundColor: '#3B82F6' },
  forgotButton: { marginTop: 12 },
  forgotText: { fontSize: 10, color: '#3B82F6', fontFamily: 'Brand-Medium', textDecorationLine: 'underline' },
  
  // RAMM CARD STYLES
  rammCard: { backgroundColor: '#FEF3C7', borderRadius: 24, padding: 20, marginBottom: 25 },
  rammInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  rammIconCircle: { backgroundColor: '#FFF', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rammMainTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937' },
  rammStatusText: { fontSize: 12, color: '#6B7280' },
  rammStartBtn: { backgroundColor: '#B22222', borderRadius: 20, paddingVertical: 15, alignItems: 'center' },
  rammBtnText: { color: '#FFF', fontFamily: 'Brand-Bold', fontSize: 15 },

  sectionTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 12 },
  insightCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  insightIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  insightTextContent: { flex: 1 },
  insightCardTitle: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#1F2937' },
  insightCardSub: { fontSize: 11, color: '#6B5E5E', marginTop: 2 },
  reportTrendCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center' },
  trendIconCircle: { backgroundColor: '#B22222', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  reportTrendText: { fontSize: 13, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  floatingAiButton: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#B22222', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  chatContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: height * 0.7, padding: 20 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  chatHeaderTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chatTitleText: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#4B3F3F' },
  chatBody: { flex: 1 },
  warningBox: { flexDirection: 'row', backgroundColor: '#fefce8', padding: 10, borderRadius: 10, marginBottom: 15, gap: 8 },
  warningText: { fontSize: 11, color: '#854d0e', flex: 1 },
  messageBubble: { padding: 15, borderRadius: 20, marginBottom: 10, maxWidth: '85%' },
  aiBubble: { backgroundColor: '#F3F4F6', alignSelf: 'flex-start' },
  userBubble: { backgroundColor: '#B22222', alignSelf: 'flex-end' },
  chatText: { color: '#4B3F3F', fontSize: 14 },
  typingContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  typingLabel: { fontSize: 12, color: '#9CA3AF' },
  inputArea: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  chatInput: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 25, paddingHorizontal: 20, height: 50 },
  sendButton: { backgroundColor: '#B22222', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;