/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Baby pink theme colors
const tintColorLight = '#FFB6C1'; // Light pink
const tintColorDark = '#FFB6C1'; // Baby pink for dark mode too

export const Colors = {
  light: {
    text: '#2D1B2E', // Dark purple-gray for contrast
    background: '#FFF0F5', // Lavender blush (very light pink)
    tint: tintColorLight,
    icon: '#C8A2C8', // Light purple
    tabIconDefault: '#C8A2C8',
    tabIconSelected: '#FF69B4', // Hot pink for selected
  },
  dark: {
    text: '#FFF0F5', // Light pink text
    background: '#2D1B2E', // Dark purple-gray background
    tint: tintColorDark,
    icon: '#C8A2C8', // Light purple
    tabIconDefault: '#C8A2C8',
    tabIconSelected: '#FFB6C1', // Baby pink for selected
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
