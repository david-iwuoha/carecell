import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, 
  TextInput, Dimensions, Modal, SafeAreaView 
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- ARTICLE DATA ---
const ALL_ARTICLES = [
  {
    id: '1',
    category: 'Infants',
    title: 'Newborn Care & Crisis Signs',
    tag: 'INFANT CARE',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=400&auto=format&fit=crop',
    content: `Caring for an infant with SCD requires vigilance. \n\nKey Focus Areas:\n• Hydration: Infants need frequent breastfeeding or formula to keep blood flowing smoothly.\n• Fever: Any temperature above 38°C (101°F) is a medical emergency. Do not wait; go to the ER.\n• Penicillin: Usually started by 2 months old to prevent life-threatening infections.\n• Dactylitis: Watch for swelling in tiny hands and feet—this is often the first sign of a pain crisis in babies.`
  },
  {
    id: '2',
    category: 'Adults',
    title: 'Managing Careers with SCD',
    tag: 'ADULT LIVING',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    content: `Adults living with SCD face unique challenges in the workplace.\n\nTips for Success:\n• Pace Yourself: Avoid extreme physical exertion or long hours without breaks.\n• Hydration at Work: Always keep a 1L water bottle on your desk.\n• Disclosure: You aren't legally required to share your genotype, but informing HR about the need for occasional "sickle cell days" can help manage expectations.\n• Mental Health: Chronic pain is tiring. Seek support groups to stay resilient.`
  },
  {
    id: '3',
    category: 'Nutrition',
    title: 'Superfoods for Blood Health',
    tag: 'DIET',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop',
    content: `Your diet plays a role in how your body handles anemia.\n\nEssential Nutrients:\n• Folate (B9): Found in spinach, beans, and oranges. It helps build new red blood cells.\n• Hydration: The #1 rule. Water prevents cells from "clumping" together.\n• Limit Iron: Unless prescribed, avoid high-iron supplements. SCD patients often have enough iron from frequent transfusions; too much can damage organs.`
  },
  {
    id: '4',
    category: 'Genotype',
    title: 'The AS, SS, AA Breakdown',
    tag: 'GENETICS',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=400&auto=format&fit=crop',
    content: `Understanding your genes is the key to breaking the cycle.\n\nCompatibility Guide:\n• AA + AS: 50% chance of AA, 50% chance of AS. No child will have SCD.\n• AS + AS: 25% chance of AA, 50% chance of AS, and 25% chance of SS (SCD).\n• AS + SS: 50% chance of AS (Trait), 50% chance of SS (Disease).\n\nKnowledge is power. Test early before making lifelong commitments.`
  }
];

const EducationScreen = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 0, name: 'All', icon: 'apps', color: '#6B5E5E' },
    { id: 1, name: 'Infants', icon: 'baby-face-outline', color: '#3B82F6' },
    { id: 2, name: 'Adults', icon: 'account-group', color: '#10B981' },
    { id: 3, name: 'Nutrition', icon: 'food-apple-outline', color: '#F59E0B' },
    { id: 4, name: 'Genotype', icon: 'dna', color: '#B22222' },
  ];

  // Logic to filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Knowledge Hub</Text>
          <Text style={styles.headerSubtitle}>Verified info for every age and stage.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search symptoms or advice..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryItem}
              onPress={() => setActiveCategory(cat.name)}
            >
              <View style={[
                styles.categoryIconCircle, 
                { backgroundColor: activeCategory === cat.name ? cat.color : cat.color + '20' }
              ]}>
                <MaterialCommunityIcons 
                  name={cat.icon} 
                  size={24} 
                  color={activeCategory === cat.name ? '#FFF' : cat.color} 
                />
              </View>
              <Text style={[
                styles.categoryLabel, 
                activeCategory === cat.name && { color: cat.color, fontFamily: 'Brand-Bold' }
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dynamic Resource Library */}
        <Text style={styles.sectionTitle}>
          {activeCategory === 'All' ? 'Essential Reading' : `${activeCategory} Resources`}
        </Text>
        
        <View style={styles.resourceGrid}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <TouchableOpacity 
                key={article.id} 
                style={styles.resourceCard}
                onPress={() => setSelectedArticle(article)}
              >
                <Image source={{ uri: article.image }} style={styles.resourceImage} />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceTag}>{article.tag}</Text>
                  <Text style={styles.resourceTitle} numberOfLines={2}>{article.title}</Text>
                  <View style={styles.readTime}>
                    <Feather name="clock" size={12} color="#9CA3AF" />
                    <Text style={styles.readTimeText}>{article.readTime} read</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>No articles found for "{searchQuery}"</Text>
          )}
        </View>

        <View style={styles.mythBox}>
          <View style={styles.mythHeader}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#B22222" />
            <Text style={styles.mythTitle}>Did you know?</Text>
          </View>
          <Text style={styles.mythStatement}>"Drinking water is the cheapest 'medicine' for sickle cell."</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* --- ARTICLE POP-UP MODAL --- */}
      <Modal
        visible={!!selectedArticle}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedArticle(null)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedArticle(null)}>
                <Ionicons name="close-circle" size={32} color="#B22222" />
              </TouchableOpacity>
              <Text style={styles.modalCategoryText}>{selectedArticle?.tag}</Text>
              <View style={{ width: 32 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <Image source={{ uri: selectedArticle?.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedArticle?.title}</Text>
              <View style={styles.modalDivider} />
              <Text style={styles.modalContentText}>{selectedArticle?.content}</Text>
              
              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={() => setSelectedArticle(null)}
              >
                <Text style={styles.closeBtnText}>I've Read This</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F1' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 20, marginTop: 10 },
  headerTitle: { fontSize: 24, fontFamily: 'Brand-Bold', color: '#B22222' },
  headerSubtitle: { fontSize: 14, color: '#6B5E5E', marginTop: 4, fontFamily: 'Brand-Regular' },
  searchContainer: { 
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 15, 
    paddingHorizontal: 15, height: 50, alignItems: 'center', marginBottom: 25,
    borderWidth: 1, borderColor: '#F3F4F6', elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 10, fontFamily: 'Brand-Medium', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontFamily: 'Brand-Bold', color: '#1F2937', marginBottom: 15 },
  categoryRow: { marginBottom: 25 },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  categoryIconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryLabel: { fontSize: 12, fontFamily: 'Brand-Medium', color: '#4B3F3F' },
  resourceGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  resourceCard: { width: (width - 55) / 2, backgroundColor: '#FFF', borderRadius: 16, marginBottom: 20, overflow: 'hidden', elevation: 2 },
  resourceImage: { width: '100%', height: 100 },
  resourceInfo: { padding: 12 },
  resourceTag: { fontSize: 9, color: '#B22222', fontFamily: 'Brand-Bold', marginBottom: 4 },
  resourceTitle: { fontSize: 13, fontFamily: 'Brand-Bold', color: '#1F2937', height: 40 },
  readTime: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  readTimeText: { fontSize: 10, color: '#9CA3AF', marginLeft: 4 },
  noResults: { width: '100%', textAlign: 'center', marginTop: 20, color: '#9CA3AF', fontFamily: 'Brand-Medium' },
  mythBox: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, borderLeftWidth: 5, borderLeftColor: '#B22222', elevation: 2 },
  mythHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  mythTitle: { fontSize: 16, fontFamily: 'Brand-Bold', color: '#B22222', marginLeft: 8 },
  mythStatement: { fontSize: 14, fontFamily: 'Brand-Medium', color: '#4B3F3F', fontStyle: 'italic' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: height * 0.85 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  modalCategoryText: { fontFamily: 'Brand-Bold', color: '#9CA3AF', letterSpacing: 1 },
  modalBody: { padding: 20 },
  modalImage: { width: '100%', height: 200, borderRadius: 20, marginBottom: 20 },
  modalTitle: { fontSize: 22, fontFamily: 'Brand-Bold', color: '#1F2937' },
  modalDivider: { height: 2, backgroundColor: '#B22222', width: 40, marginVertical: 15 },
  modalContentText: { fontSize: 16, color: '#4B3F3F', lineHeight: 24, fontFamily: 'Brand-Regular' },
  closeBtn: { backgroundColor: '#B22222', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  closeBtnText: { color: '#FFF', fontFamily: 'Brand-Bold', fontSize: 16 }
});

export default EducationScreen;