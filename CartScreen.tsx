import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }: any) {
  const { state, dispatch, cartTotal, cartItemCount } = useCart();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      Alert.alert('Cart Empty', 'Add some items to your cart first!');
      return;
    }
    Alert.alert(
      'Order Placed! 🎉',
      `Your order of ${cartItemCount} item(s) totaling $${cartTotal.toFixed(2)} has been placed.`,
      [{ text: 'OK', onPress: () => dispatch({ type: 'CLEAR_CART' }) }],
    );
  };

  if (state.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven't added anything yet. Explore the INDVA collection!
        </Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home')}
          accessibilityRole="button">
          <Text style={styles.shopButtonText}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button">
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart ({cartItemCount})</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Clear Cart', 'Remove all items?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', onPress: () => dispatch({ type: 'CLEAR_CART' }), style: 'destructive' },
            ])
          }
          accessibilityRole="button"
          accessibilityLabel="Clear cart">
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.itemsList}>
        {state.items.map((item, index) => (
          <View key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} style={styles.cartItem}>
            {/* Product Image Placeholder */}
            <View style={styles.itemImage}>
              <Text style={styles.itemImageText}>INDVA</Text>
            </View>

            {/* Item Details */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.itemMeta}>
                {item.selectedColor.name} • Size {item.selectedSize}
              </Text>
              <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>

              {/* Quantity Controls */}
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: {
                        productId: item.product.id,
                        size: item.selectedSize,
                        colorName: item.selectedColor.name,
                        quantity: item.quantity - 1,
                      },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel="Decrease quantity">
                  <Text style={styles.qtyButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: {
                        productId: item.product.id,
                        size: item.selectedSize,
                        colorName: item.selectedColor.name,
                        quantity: item.quantity + 1,
                      },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel="Increase quantity">
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    dispatch({
                      type: 'REMOVE_FROM_CART',
                      payload: {
                        productId: item.product.id,
                        size: item.selectedSize,
                        colorName: item.selectedColor.name,
                      },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel="Remove from cart">
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, styles.freeShipping]}>
            {cartTotal > 100 ? 'FREE' : '$9.99'}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${(cartTotal + (cartTotal > 100 ? 0 : 9.99)).toFixed(2)}
          </Text>
        </View>

        {cartTotal < 100 && (
          <Text style={styles.freeShippingHint}>
            Add ${(100 - cartTotal).toFixed(2)} more for free shipping! 🚚
          </Text>
        )}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          accessibilityRole="button"
          accessibilityLabel="Proceed to checkout">
          <Text style={styles.checkoutText}>CHECKOUT →</Text>
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
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  clearText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.accentRed,
    fontWeight: '600',
  },
  itemsList: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImageText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '900',
    letterSpacing: 2,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  itemName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  qtyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  removeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.accentRed,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxxl,
    backgroundColor: COLORS.background,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.round,
  },
  shopButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.lg,
    letterSpacing: 1,
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    ...SHADOWS.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  freeShipping: {
    color: COLORS.accentGreen,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  freeShippingHint: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  checkoutButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.round,
    alignItems: 'center',
  },
  checkoutText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: FONTS.sizes.lg,
    letterSpacing: 1,
  },
});
