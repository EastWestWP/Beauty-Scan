# Beauty Scan 📷

A beautiful barcode scanning app for USA beauty products, built with Expo and React Native. Scan product barcodes to instantly view detailed product information including name, brand, category, ingredients, and more.

## Features

- 📷 **Barcode Scanning**: Scan product barcodes using your device's camera
- 🎨 **Baby Pink Theme**: Beautiful, modern UI with a baby pink color scheme
- 📦 **Product Details**: View comprehensive product information including:
  - Product name and brand
  - Category and size
  - Price information
  - Ingredients list
  - Product images
- 🔍 **Multiple Barcode Formats**: Supports EAN-13, EAN-8, UPC-A, UPC-E, Code128, and Code39
- 🌐 **Free API Integration**: Uses free third-party APIs for product data lookup
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- ⚡ **TypeScript**: Fully typed for better development experience

## Get started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- For camera functionality, you'll need a **development build** (camera doesn't work in Expo Go)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start
```

### Running the App

**Important**: The camera feature requires a development build. Expo Go does not support native camera modules.

#### Option 1: Development Build (Recommended)

Create a development build to test camera functionality:

```bash
npm run development-builds
```

Or manually:

```bash
# For iOS
npx eas build --profile development --platform ios

# For Android
npx eas build --profile development --platform android
```

#### Option 2: Local Development

For local development without camera:

```bash
npm run start
```

Then choose:
- [an Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [an iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) (limited - camera won't work)

### Using the App

1. **Home Screen**: Tap the "📷 Scan Product" button
2. **Scan Screen**: Point your camera at a product barcode
3. **Product Details**: View comprehensive product information
4. **Scan Again**: Tap "Scan Another Product" to continue scanning

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Home screen with scan button
│   └── _layout.tsx        # Tab navigation layout
├── scan.tsx               # Barcode scanner screen
├── product-details.tsx    # Product information display
└── _layout.tsx            # Root layout

services/
└── barcode-api.ts         # API service for product lookup

constants/
└── theme.ts               # Baby pink theme colors
```

## API Integration

The app uses free third-party APIs optimized for beauty products:

- **Primary**: UPC Item DB API (free tier, 100 requests/day) - Excellent coverage for USA beauty and cosmetics products
- **Fallback**: Open Beauty Facts API (free, no API key) - Specialized database for beauty and personal care products

Both APIs are real, working services that provide accurate product information including:
- Product names and brands
- Categories (beauty, cosmetics, skincare, etc.)
- Product images
- Ingredients lists
- Size/volume information
- Pricing data

You can modify the API service in `services/barcode-api.ts` to use different providers if needed.

## Technology Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Camera**: expo-camera
- **UI**: React Native with custom themed components
- **Image Handling**: expo-image

## Workflows

This project is configured to use [EAS Workflows](https://docs.expo.dev/eas/workflows/get-started/) to automate some development and release processes. These commands are set up in [`package.json`](./package.json) and can be run using NPM scripts in your terminal.

### Previews

Run `npm run draft` to [publish a preview update](https://docs.expo.dev/eas/workflows/examples/publish-preview-update/) of your project, which can be viewed in Expo Go or in a development build.

### Development Builds

Run `npm run development-builds` to [create a development build](https://docs.expo.dev/eas/workflows/examples/create-development-builds/). Note - you'll need to follow the [Prerequisites](https://docs.expo.dev/eas/workflows/examples/create-development-builds/#prerequisites) to ensure you have the correct emulator setup on your machine.

### Production Deployments

Run `npm run deploy` to [deploy to production](https://docs.expo.dev/eas/workflows/examples/deploy-to-production/). Note - you'll need to follow the [Prerequisites](https://docs.expo.dev/eas/workflows/examples/deploy-to-production/#prerequisites) to ensure you're set up to submit to the Apple and Google stores.

## Hosting

Expo offers hosting for websites and API functions via EAS Hosting. See the [Getting Started](https://docs.expo.dev/eas/hosting/get-started/) guide to learn more.


## Development

### Code Style

- **TypeScript**: All code is written in TypeScript with strict type checking
- **Theming**: Uses a baby pink color scheme defined in `constants/theme.ts`
- **Components**: Reusable themed components in `components/` directory

### Adding Features

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Linting

Run the linter to check for code issues:

```bash
npm run lint
```

## Troubleshooting

### Camera Not Working

If the camera doesn't work, make sure you're using a **development build**, not Expo Go. Camera permissions are automatically requested when you first open the scan screen.

### Product Not Found

If a product isn't found after scanning:
- The barcode might not be in the database
- Try scanning again with better lighting
- Ensure the barcode is clearly visible and not damaged

### Build Issues

If you encounter build errors:
- Clear cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Expo SDK version compatibility

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Expo Camera documentation](https://docs.expo.dev/versions/latest/sdk/camera/): Learn about camera and barcode scanning

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
