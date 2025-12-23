import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Image as ExpoImage } from 'expo-image';

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{
    barcode: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    image: string;
    price: string;
    ingredients: string;
    size: string;
  }>();

  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleScanAgain = () => {
    router.push('/scan');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Product Image */}
        {params.image ? (
          <ExpoImage
            source={{ uri: params.image }}
            style={styles.productImage}
            contentFit="contain"
            placeholderContentFit="contain"
          />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: tintColor + '30' }]}>
            <ThemedText style={styles.placeholderText}>No Image Available</ThemedText>
          </View>
        )}

        {/* Product Name */}
        {params.name && (
          <ThemedText type="title" style={[styles.productName, { color: textColor }]}>
            {params.name}
          </ThemedText>
        )}

        {/* Brand */}
        {params.brand && (
          <ThemedText style={[styles.brand, { color: tintColor }]}>
            {params.brand}
          </ThemedText>
        )}

        {/* Category */}
        {params.category && (
          <View style={styles.infoRow}>
            <ThemedText style={[styles.label, { color: textColor }]}>Category:</ThemedText>
            <ThemedText style={[styles.value, { color: textColor }]}>
              {params.category}
            </ThemedText>
          </View>
        )}

        {/* Size */}
        {params.size && (
          <View style={styles.infoRow}>
            <ThemedText style={[styles.label, { color: textColor }]}>Size:</ThemedText>
            <ThemedText style={[styles.value, { color: textColor }]}>{params.size}</ThemedText>
          </View>
        )}

        {/* Price */}
        {params.price && (
          <View style={styles.infoRow}>
            <ThemedText style={[styles.label, { color: textColor }]}>Price:</ThemedText>
            <ThemedText style={[styles.price, { color: tintColor }]}>
              ${params.price}
            </ThemedText>
          </View>
        )}

        {/* Barcode */}
        <View style={styles.infoRow}>
          <ThemedText style={[styles.label, { color: textColor }]}>Barcode:</ThemedText>
          <ThemedText style={[styles.value, { color: textColor }]}>{params.barcode}</ThemedText>
        </View>

        {/* Description */}
        {params.description && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: textColor }]}>
              Description
            </ThemedText>
            <ThemedText style={[styles.description, { color: textColor }]}>
              {params.description}
            </ThemedText>
          </View>
        )}

        {/* Ingredients */}
        {params.ingredients && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: textColor }]}>
              Ingredients
            </ThemedText>
            <ThemedText style={[styles.description, { color: textColor }]}>
              {params.ingredients}
            </ThemedText>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, { backgroundColor: tintColor }]}
          onPress={handleScanAgain}>
          <ThemedText style={styles.buttonText}>Scan Another Product</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleBack}>
          <ThemedText style={[styles.buttonText, { color: textColor }]}>Back</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  placeholderImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  brand: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
    textAlign: 'right',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

