import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleScanPress = () => {
    router.push('/scan');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}>
          Beauty Scan
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}>
          Scan barcodes to discover beauty product details
        </ThemedText>

        <TouchableOpacity
          style={[styles.scanButton, { backgroundColor: tintColor }]}
          onPress={handleScanPress}>
          <ThemedText style={styles.scanButtonText}>📷 Scan Product</ThemedText>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <ThemedText style={[styles.infoTitle, { color: textColor }]}>
            How it works:
          </ThemedText>
          <View style={styles.infoItem}>
            <ThemedText style={[styles.infoNumber, { color: tintColor }]}>1</ThemedText>
            <ThemedText style={[styles.infoText, { color: textColor }]}>
              Tap the scan button
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={[styles.infoNumber, { color: tintColor }]}>2</ThemedText>
            <ThemedText style={[styles.infoText, { color: textColor }]}>
              Point your camera at the product barcode
            </ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={[styles.infoNumber, { color: tintColor }]}>3</ThemedText>
            <ThemedText style={[styles.infoText, { color: textColor }]}>
              View detailed product information
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  scanButton: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  infoContainer: {
    width: '100%',
    maxWidth: 400,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 182, 193, 0.2)',
    textAlign: 'center',
    lineHeight: 40,
    marginRight: 16,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
});
