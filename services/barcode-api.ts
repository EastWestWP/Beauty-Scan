/**
 * Barcode API Service for Beauty Products
 * Optimized for beauty, cosmetics, skincare, and personal care products
 * Uses real, working APIs for product lookup:
 * 1. UPC Item DB API (free tier, no API key required) - Best for beauty products
 * 2. Open Beauty Facts API (free, no API key required) - Beauty product database
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
 * Check if a product category is beauty-related
 */
function isBeautyProduct(category: string | undefined): boolean {
  if (!category) return false;
  const beautyKeywords = [
    'beauty',
    'cosmetic',
    'makeup',
    'skincare',
    'personal care',
    'fragrance',
    'perfume',
    'hair care',
    'nail',
    'lip',
    'face',
    'eye',
    'mascara',
    'foundation',
    'concealer',
    'moisturizer',
    'serum',
    'cleanser',
    'toner',
    'sunscreen',
    'shampoo',
    'conditioner',
  ];
  const lowerCategory = category.toLowerCase();
  return beautyKeywords.some((keyword) => lowerCategory.includes(keyword));
}

/**
 * Fetch beauty product details from barcode
 * Prioritizes APIs with better beauty product coverage
 * Documentation: Optimized for beauty, cosmetics, and personal care products
 */
export async function fetchProductByBarcode(barcode: string): Promise<Product | null> {
  try {
    // Remove any non-numeric characters
    const cleanBarcode = barcode.replace(/\D/g, '');

    if (!cleanBarcode || cleanBarcode.length < 8) {
      throw new Error('Invalid barcode format');
    }

    // Try UPC Item DB first (better for beauty products, includes cosmetics)
    const upcProduct = await fetchProductFromUPCItemDB(cleanBarcode);
    if (upcProduct && isBeautyProduct(upcProduct.category)) {
      return upcProduct;
    }

    // If UPC Item DB found a product (even if not clearly beauty), return it
    // as it's likely to be accurate for USA beauty products
    if (upcProduct) {
      return upcProduct;
    }

    // Fallback to Open Beauty Facts (beauty product database)
    return await fetchProductFromOpenBeautyFacts(cleanBarcode);
  } catch (error) {
    console.error('Error fetching beauty product:', error);
    return null;
  }
}

/**
 * Primary API: UPC Item DB (real, free API)
 * Excellent coverage for beauty and cosmetics products in USA
 * Free tier: 100 requests/day, no API key required
 * Documentation: https://www.upcitemdb.com/api
 */
async function fetchProductFromUPCItemDB(barcode: string): Promise<Product | null> {
  try {
    // UPC Item DB free API endpoint (real, working API)
    // Best for USA beauty products
    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`,
      {
        headers: {
          'User-Agent': 'Beauty-Scan/1.0.0 (Beauty Product Store)',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.code === 'OK' && data.items && data.items.length > 0) {
      const item = data.items[0];
      
      // Extract size/volume from title or description if available
      const sizeMatch = item.title?.match(/(\d+\.?\d*)\s*(oz|fl oz|ml|g|kg|lb)/i) || 
                       item.description?.match(/(\d+\.?\d*)\s*(oz|fl oz|ml|g|kg|lb)/i);
      const size = sizeMatch ? `${sizeMatch[1]} ${sizeMatch[2]}` : undefined;

      return {
        barcode: barcode,
        name: item.title,
        brand: item.brand,
        category: item.category,
        description: item.description,
        image: item.images?.[0] || item.images,
        price: item.offers?.[0]?.price || item.lowest_recorded_price,
        size: size,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching from UPC Item DB:', error);
    return null;
  }
}

/**
 * Fallback API: Open Beauty Facts (real, free API)
 * Specialized database for beauty and personal care products
 * Free, no API key required
 * Documentation: https://world.openbeautyfacts.org/
 */
async function fetchProductFromOpenBeautyFacts(barcode: string): Promise<Product | null> {
  try {
    // Open Beauty Facts API endpoint (real, free, beauty products only)
    const response = await fetch(
      `https://world.openbeautyfacts.org/api/v0/product/${barcode}.json`,
      {
        headers: {
          'User-Agent': 'Beauty-Scan/1.0.0 (Beauty Product Store)',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      return {
        barcode: barcode,
        name: product.product_name || product.product_name_en || product.abbreviated_product_name,
        brand: product.brands || product.brand_owner || product.brands_tags?.[0],
        category: product.categories || product.categories_tags?.[0] || product.categories_hierarchy?.[0],
        description: product.generic_name || product.product_name || product.product_name_en,
        image: product.image_url || product.image_front_url || product.image_front_small_url || product.images?.front?.display?.url,
        ingredients: product.ingredients_text || product.ingredients_text_en || product.ingredients_text_with_allergens,
        size: product.quantity || product.net_weight || 
              (product.net_weight_value ? `${product.net_weight_value} ${product.net_weight_unit || ''}`.trim() : undefined),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching from Open Beauty Facts:', error);
    return null;
  }
}

