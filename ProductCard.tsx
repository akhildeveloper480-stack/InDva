import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Product } from '../constants/data';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { isInWishlist, dispatch } = useCart();
  const wishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, $${product.price}${
        !product.inStock ? ', sold out' : ''
      }`}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>INDVA</Text>
          <Text style={styles.placeholderSubtext}>{product.category.toUpperCase()}</Text>
        </View>

        {/* Badges */}
        <View style={styles.badgeContainer}>
          {product.isNew && (
            <View style={[styles.badge, styles.newBadge]}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}
          {hasDiscount && (
            <View style={[styles.badge, styles.saleBadge]}>
              <Text style={styles.badgeText}>-{discountPercent}%</Text>
            </View>
          )}
          {!product.inStock && (
            <View style={[styles.badge, styles.soldOutBadge]}>
              <Text style={styles.badgeText}>SOLD OUT</Text>
            </View>
          )}
        </View>

        {/* Wishlist Button */}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
          accessibilityLabel={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          accessibilityRole="button">
          <Text style={[styles.heartIcon, wishlisted && styles.heartActive]}>
            {wishlisted ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>${product.originalPrice!.toFixed(2)}</Text>
          )}
        </View>

        {/* Color Swatches */}
        <View style={styles.swatchRow}>
          {product.colors.map(color => (
            <View
              key={color.name}
              style={[styles.swatch, { backgroundColor: color.hex }]}
              accessibilityLabel={color.name}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 4,
  },
  placeholderSubtext: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.gray,
    letterSpacing: 2,
    marginTop: 4,
  },
  badgeContainer: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    gap: 4,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  newBadge: {
    backgroundColor: COLORS.primary,
  },
  saleBadge: {
    backgroundColor: COLORS.accentRed,
  },
  soldOutBadge: {
    backgroundColor: COLORS.darkGray,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  wishlistButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  heartIcon: {
    fontSize: 18,
    color: COLORS.gray,
  },
  heartActive: {
    color: COLORS.accentRed,
  },
  info: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  star: {
    fontSize: 12,
    color: COLORS.accent,
    marginRight: 2,
  },
  rating: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  price: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  originalPrice: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 6,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
});
