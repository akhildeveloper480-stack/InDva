import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Product, Size, ColorOption } from '../constants/data';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }: any) {
  const { product } = route.params as { product: Product };
  const { dispatch, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);

  const wishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Select Size', 'Please choose a size before adding to cart.');
      return;
    }
    if (!product.inStock) {
      Alert.alert('Sold Out', 'This item is currently out of stock. Add to wishlist to get notified!');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, size: selectedSize, color: selectedColor },
    });
    Alert.alert('Added to Cart! 🛒', `${product.name} (${selectedSize}) added to your cart.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id })}
          style={styles.wishlistBtn}
          accessibilityRole="button"
          accessibilityLabel={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Text style={[styles.heartIcon, wishlisted && styles.heartActive]}>
            {wishlisted ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.imageLogo}>INDVA</Text>
          <Text style={styles.imageCategory}>{product.category.toUpperCase()}</Text>
          {!product.inStock && (
            <View style={styles.soldOutOverlay}>
              <Text style={styles.soldOutText}>SOLD OUT</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Tags */}
          <View style={styles.tagRow}>
            {product.isNew && (
              <View style={styles.newTag}>
                <Text style={styles.tagText}>NEW</Text>
              </View>
            )}
            {hasDiscount && (
              <View style={styles.saleTag}>
                <Text style={styles.tagText}>SALE</Text>
              </View>
            )}
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </Text>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>
                ${product.originalPrice!.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Color Selection */}
          <Text style={styles.optionLabel}>Color: {selectedColor.name}</Text>
          <View style={styles.colorRow}>
            {product.colors.map(color => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.hex },
                  selectedColor.name === color.name && styles.colorSelected,
                ]}
                onPress={() => setSelectedColor(color)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${color.name}`}
                accessibilityState={{ selected: selectedColor.name === color.name }}
              />
            ))}
          </View>

          {/* Size Selection */}
          <Text style={styles.optionLabel}>
            Size: {selectedSize || 'Select a size'}
          </Text>
          <View style={styles.sizeRow}>
            {product.sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.sizeSelected,
                ]}
                onPress={() => setSelectedSize(size)}
                accessibilityRole="button"
                accessibilityLabel={`Size ${size}`}
                accessibilityState={{ selected: selectedSize === size }}>
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Product Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Material</Text>
              <Text style={styles.detailValue}>Premium Cotton</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fit</Text>
              <Text style={styles.detailValue}>Relaxed / Oversized</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Care</Text>
              <Text style={styles.detailValue}>Machine Wash Cold</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>SKU</Text>
              <Text style={styles.detailValue}>{product.id.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Total</Text>
          <Text style={styles.bottomPriceValue}>${product.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
          accessibilityRole="button"
          accessibilityLabel={product.inStock ? 'Add to cart' : 'Sold out'}>
          <Text style={styles.addToCartText}>
            {product.inStock ? 'ADD TO CART' : 'SOLD OUT'}
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: COLORS.background,
    zIndex: 10,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  wishlistBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 26,
    color: COLORS.gray,
  },
  heartActive: {
    color: COLORS.accentRed,
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageLogo: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 8,
  },
  imageCategory: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray,
    letterSpacing: 4,
    marginTop: SPACING.sm,
  },
  soldOutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldOutText: {
    fontSize: FONTS.sizes.title,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 6,
  },
  infoContainer: {
    padding: SPACING.xl,
  },
  tagRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  newTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  saleTag: {
    backgroundColor: COLORS.accentRed,
    paddingHorizontal: SPACING.md,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  tagText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  productName: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  stars: {
    fontSize: 16,
    color: COLORS.accent,
    marginRight: SPACING.sm,
  },
  ratingText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  price: {
    fontSize: FONTS.sizes.title,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  originalPrice: {
    fontSize: FONTS.sizes.xl,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.xxl,
  },
  optionLabel: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  colorRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xxl,
    flexWrap: 'wrap',
  },
  sizeOption: {
    minWidth: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SPACING.md,
  },
  sizeSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
  },
  sizeText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sizeTextSelected: {
    color: COLORS.white,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.xl,
  },
  detailsTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    ...SHADOWS.medium,
  },
  bottomPrice: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  bottomPriceValue: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.round,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
  addToCartText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: FONTS.sizes.lg,
    letterSpacing: 1,
  },
});
