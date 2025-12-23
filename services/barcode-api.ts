/**
 * Barcode API Service
 * Uses Open Product Data API (free, no API key required)
 * Alternative: Can be switched to other APIs like barcodelookup.com
 */

export interface Product {
  barcode: string;
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  image?: string;
  price?: string;
  ingredients?: string;
  size?: string;
}

/**
 * Fetch product details from barcode using Open Product Data API
 * This is a free API that doesn't require authentication
 */
export async function fetchProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    // Remove any non-numeric characters
    const cleanBarcode = barcode.replace(/\D/g, '');

    if (!cleanBarcode || cleanBarcode.length < 8) {
      throw new Error('Invalid barcode format');
    }

    // Try Open Product Data API (free, no key required)
    // This API works with UPC, EAN, and other barcode formats
    const response = await fetch(
      `https://world.openproductdata.org/api/v0/product/${cleanBarcode}.json`
    );

    if (!response.ok) {
      // If Open Product Data doesn't have it, try alternative free API
      return await fetchProductAlternative(cleanBarcode);
    }

    const data = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      return {
        barcode: cleanBarcode,
        name: product.product_name || product.product_name_en || product.abbreviated_product_name,
        brand: product.brands || product.brand_owner,
        category: product.categories || product.categories_tags?.[0],
        description: product.generic_name || product.product_name,
        image: product.image_url || product.image_front_url || product.image_front_small_url,
        ingredients: product.ingredients_text || product.ingredients_text_en,
        size: product.quantity || product.net_weight,
      };
    }

    // Fallback to alternative API
    return await fetchProductAlternative(cleanBarcode);
  } catch (error) {
    console.error('Error fetching product:', error);
    // Try alternative API as fallback
    return await fetchProductAlternative(barcode.replace(/\D/g, ''));
  }
}

/**
 * Alternative API fallback using a free barcode lookup service
 * This uses a simple HTTP endpoint that returns product data
 */
async function fetchProductAlternative(barcode: string): Promise<Product | null> {
  try {
    // Using a free barcode lookup API endpoint
    // Note: This is a mock/example - you may want to use a real API service
    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.code === 'OK' && data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        barcode: barcode,
        name: item.title,
        brand: item.brand,
        category: item.category,
        description: item.description,
        image: item.images?.[0],
        price: item.offers?.[0]?.price,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching from alternative API:', error);
    return null;
  }
}

