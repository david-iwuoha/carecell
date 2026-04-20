import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Switch,
  Alert,
  Modal
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ onNavigate }) => {
  const [isDark, setIsDark] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of CareCell?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          onPress: () => onNavigate('signin'), // Ensure 'signin' matches your navigation state key
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header Card */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
             <Image 
               source={require('../assets/icon/pic.png')} // Restored consistent avatar from HomeScreen
               style={styles.profileAvatar} 
             />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Owoade Opeyemi</Text>
            <Text style={styles.profileRole}>Parent/Guardian Account</Text>
            <View style={styles.genotypeBadge}>
              <Text style={styles.genotypeText}>Genotype: SS</Text>
            </View>
          </View>
        </View>

        {/* Section: App Controls */}
        <Text style={styles.sectionHeader}>App Controls</Text>
        <View style={styles.menuCard}>
          <MenuRow icon="user-edit" label="Edit Profile" type="fa5" />
          <Divider />
          <MenuRow icon="lock" label="Change Password" type="feather" />
          <Divider />
          <MenuRow icon="shield" label="App Permissions" type="feather" isLast />
        </View>

        {/* Section: Personal Details */}
        <Text style={styles.sectionHeader}>Personal Details</Text>
        <View style={styles.menuCard}>
          <DetailRow icon="phone" label="Phone" value="08107522288" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="mail" label="Email" value="owoadeopeyemi11@gmail.com" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="map-pin" label="Location" value="Lagos, Nigeria" color="#FCA5A5" />
          <Divider />
          <DetailRow icon="alert-circle" label="Emergency Contact" value="Aleje Sultan" subValue="09024269995" color="#FCA5A5" isLast />
        </View>

        {/* Section: Health Settings */}
        <Text style={styles.sectionHeader}>Health Settings</Text>
        <View style={styles.menuCard}>
          <ToggleRow icon="water" label="Hydration Reminders" sub="Daily water intake alerts" color="#3B82F6" initialValue={true} />
          <Divider />
          <ToggleRow icon="pill" label="Medication Reminders" sub="Med schedule alerts" color="#F87171" initialValue={true} />
          <Divider />
          <ToggleRow icon="alert" label="Crisis Alerts" sub="Environmental triggers" color="#EF4444" initialValue={true} isLast />
        </View>

        {/* Section: General Settings */}
        <Text style={styles.sectionHeader}>General Settings</Text>
        <View style={styles.menuCard}>
          <MenuRow icon="bell" label="Notifications" type="feather" />
          <Divider />
          <View style={styles.row}>
            <View style={[styles.iconBox, {backgroundColor: '#F3F4F6'}]}>
              <Feather name="moon" size={18} color="#4B5563" />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch value={isDark} onValueChange={setIsDark} />
          </View>
          <Divider />
          {/* About CareCell Row */}
          <TouchableOpacity style={styles.row} onPress={() => setAboutVisible(true)}>
            <View style={[styles.iconBox, {backgroundColor: '#F3F4F6'}]}>
              <Feather name="info" size={18} color="#4B5563" />
            </View>
            <Text style={styles.rowLabel}>About CareCell</Text>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#B22222" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerBrand}>Your Data is Secure</Text>
        <Text style={styles.footerDetail}>Health data is encrypted end-to-end.</Text>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* --- ABOUT CARECELL MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={aboutVisible}
        onRequestClose={() => setAboutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModal}>
            <View style={styles.aboutHeader}>
                <Ionicons name="shield-checkmark" size={40} color="#B22222" />
                <Text style={styles.aboutTitle}>CareCell</Text>
                <Text style={styles.versionTag}>Demo Version 1.0</Text>
            </View>
            <Text style={styles.aboutText}>
              CareCell is a specialized health companion designed to empower individuals living with Sickle Cell Disease. 
              {"\n\n"}
              This application is currently a <Text style={{fontFamily: 'Brand-Bold'}}>Demo Version</Text> created for research and development purposes. It will be updated with more advanced predictive features and genomic insights soon.
            </Text>
            <TouchableOpacity 
              style={styles.closeAboutBtn} 
              onPress={() => setAboutVisible(false)}
            >
              <Text style={styles.closeAboutBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// --- Sub-Components ---
const MenuRow = ({ icon, label, type, isLast, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={[styles.iconBox, {backgroundColor: '#F3F4F6'}]}>
      {type === 'fa5' ? <FontAwesome5 name={icon} size={16} color="#4B5563" /> : <Feather name={icon} size={18} color="#4B5563" />}
    </View>
    <Text style={styles.rowLabel}>{label}</Text>
    <Feather name="chevron-right" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

const DetailRow = ({ icon, label, value, subValue, color, isLast }) => (
  <View style={styles.row}>
    <View style={[styles.iconBox, {backgroundColor: color + '20'}]}>
      <Feather name={icon} size={18} color="#B22222" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
      {subValue && <Text style={styles.detailSubValue}>{subValue}</Text>}
    </View>
  </View>
);

const ToggleRow = ({ icon, label, sub, color, initialValue }) => {
    const [enabled, setEnabled] = React.useState(initialValue);
    return (
        <View style={styles.row}>
            <View style={[styles.iconBox, {backgroundColor: color + '20'}]}>
                <MaterialCommunityIcons name={icon} size={20} color={color} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowSubLabel}>{sub}</Text>
            </View>
            <Switch value={enabled} onValueChange={setEnabled} trackColor={{ true: '#B22222' }} />
        </View>
    );
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20 },
  
  profileHeaderCard: { backgroundColor: '#B22222', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  avatarContainer: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 4, borderRadius: 40 },
  profileAvatar: { width: 70, height: 70, borderRadius: 35 },
  profileInfo: { marginLeft: 15 },
  profileName: { color: '#FFF', fontSize: 18, fontFamily: 'Brand-Bold' },
  profileRole: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 8 },
  genotypeBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  genotypeText: { color: '#FFF', fontSize: 11, fontFamily: 'Brand-Bold' },

  sectionHeader: { fontSize: 14, fontFamily: 'Brand-Bold', color: '#6B7280', marginBottom: 10, marginLeft: 5 },
  menuCard: { backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 15, marginBottom: 20, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rowLabel: { flex: 1, fontSize: 14, color: '#1F2937', fontFamily: 'Brand-Medium' },
  rowSubLabel: { fontSize: 11, color: '#9CA3AF' },
  divider: { height: 1, backgroundColor: '#F3F4F6' },

  detailLabel: { fontSize: 11, color: '#9CA3AF' },
  detailValue: { fontSize: 14, color: '#1F2937', fontFamily: 'Brand-Medium' },
  detailSubValue: { fontSize: 12, color: '#6B7280' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEE2E2', padding: 18, borderRadius: 16, marginTop: 10 },
  logoutText: { color: '#B22222', fontFamily: 'Brand-Bold', marginLeft: 10 },
  footerBrand: { textAlign: 'center', color: '#1F2937', fontFamily: 'Brand-Bold', marginTop: 30 },
  footerDetail: { textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginBottom: 10 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  aboutModal: { backgroundColor: '#FFF', borderRadius: 25, padding: 25, width: '100%', alignItems: 'center' },
  aboutHeader: { alignItems: 'center', marginBottom: 20 },
  aboutTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#4B3F3F', marginTop: 10 },
  versionTag: { fontSize: 12, color: '#B22222', fontFamily: 'Brand-Medium' },
  aboutText: { fontSize: 14, color: '#6B5E5E', textAlign: 'center', lineHeight: 22, marginBottom: 25 },
  closeAboutBtn: { backgroundColor: '#B22222', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 12 },
  closeAboutBtnText: { color: '#FFF', fontFamily: 'Brand-Bold', fontSize: 16 }
});

export default ProfileScreen;