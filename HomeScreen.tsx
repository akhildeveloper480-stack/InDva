import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { MOCK_PRODUCTS, CATEGORIES, Product, Category } from '../constants/data';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const { cartItemCount } = useCart();

  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured);
  const filteredProducts =
    selectedCategory === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.secondary} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>INDVA</Text>
          <Text style={styles.tagline}>Indian Streetwear</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Cart')}
            accessibilityLabel={`Shopping cart with ${cartItemCount} items`}
            accessibilityRole="button">
            <Text style={styles.iconText}>🛒</Text>
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search INDVA collection..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search products"
          />
        </View>

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <Text style={styles.heroPretext}>NEW DROP</Text>
            <Text style={styles.heroTitle}>DESI DRIP{'\n'}COLLECTION</Text>
            <Text style={styles.heroSubtitle}>
              Where Indian heritage meets street culture
            </Text>
            <TouchableOpacity
              style={styles.heroCTA}
              accessibilityRole="button"
              accessibilityLabel="Shop the new collection">
              <Text style={styles.heroCTAText}>SHOP NOW →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroAccent} />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}>
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === 'all' && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory('all')}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedCategory === 'all' }}>
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === 'all' && styles.categoryChipTextActive,
                ]}>
                All
              </Text>
            </TouchableOpacity>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.key && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: selectedCategory === cat.key }}>
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat.key && styles.categoryChipTextActive,
                  ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section */}
        {selectedCategory === 'all' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Featured Drops</Text>
              <TouchableOpacity accessibilityRole="button">
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}>
              {featuredProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.featuredCard}
                  onPress={() => handleProductPress(product)}
                  activeOpacity={0.9}>
                  <View style={styles.featuredImage}>
                    <Text style={styles.featuredImageText}>INDVA</Text>
                  </View>
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text style={styles.featuredPrice}>
                      ${product.price.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Product Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
          </Text>
          <View style={styles.productGrid}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProductPress}
              />
            ))}
          </View>
        </View>

        {/* Brand Story Banner */}
        <View style={styles.brandBanner}>
          <Text style={styles.brandTitle}>THE INDVA STORY</Text>
          <Text style={styles.brandText}>
            Born from the streets of India, INDVA bridges the gap between rich cultural
            heritage and modern street fashion. Every piece tells a story of tradition
            reimagined for the urban jungle.
          </Text>
          <TouchableOpacity style={styles.brandCTA} accessibilityRole="button">
            <Text style={styles.brandCTAText}>OUR STORY →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxxl + 10,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.secondary,
  },
  logo: {
    fontSize: FONTS.sizes.title,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 6,
  },
  tagline: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconText: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.secondary,
  },
  searchInput: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
  },
  heroBanner: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 200,
  },
  heroContent: {
    padding: SPACING.xxl,
    zIndex: 1,
  },
  heroPretext: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    letterSpacing: 4,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  heroTitle: {
    fontSize: FONTS.sizes.hero,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 42,
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
  },
  heroCTA: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.round,
  },
  heroCTAText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
    letterSpacing: 1,
  },
  heroAccent: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
  },
  section: {
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  seeAll: {
    fontSize: FONTS.sizes.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  categoryList: {
    gap: SPACING.sm,
    paddingRight: SPACING.lg,
  },
  categoryChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  categoryChipActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  categoryChipText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryChipTextActive: {
    color: COLORS.white,
  },
  featuredList: {
    gap: SPACING.md,
    paddingRight: SPACING.lg,
  },
  featuredCard: {
    width: width * 0.6,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.card,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 180,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredImageText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '900',
    letterSpacing: 6,
  },
  featuredInfo: {
    padding: SPACING.md,
  },
  featuredName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.primary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandBanner: {
    margin: SPACING.lg,
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.xxxl * 2,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 4,
    marginBottom: SPACING.md,
  },
  brandText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  brandCTA: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.round,
  },
  brandCTAText: {
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
