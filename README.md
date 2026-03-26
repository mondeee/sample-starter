# expo-starter 🚀

A personal starter template for React Native projects built with Expo. Comes pre-configured with routing, state management, styling, data fetching, and commonly used libraries so you can skip the boilerplate and start building immediately.

---

## Tech Stack

| Category | Library |
|---|---|
| Framework | Expo ~54 / React Native 0.81 |
| Routing | Expo Router ~6 (file-based) |
| Styling | NativeWind v4 + Tailwind CSS |
| State Management | Zustand v5 |
| Data Fetching | TanStack React Query v5 + Axios |
| List Rendering | Shopify FlashList |
| Animations | React Native Reanimated v4 |
| Storage | AsyncStorage |
| Icons | @expo/vector-icons |
| Language | TypeScript |

---

## Project Structure

```
├── app/              # File-based routes (Expo Router)
├── components/       # Reusable UI components
├── constants/        # App-wide constants
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and shared logic
├── providers/        # Context and app-level providers
├── store/            # Zustand state stores
├── assets/images/    # Static image assets
└── scripts/          # Project scripts (e.g. reset)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for quick testing) or Android/iOS emulator

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/mondeee/sample-starter.git
   cd sample-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required values in `.env`.

4. Start the development server:
   ```bash
   npx expo start
   ```

---

## Running the App

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator |
| `npm run web` | Run in browser |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset to blank app structure |

> **Note:** `reset-project` moves the starter code to `app-example/` and gives you a clean `app/` directory to build from.

---

## Environment Variables

Copy `.env.example` to `.env` and configure the required values before running the app.

---

## License

Private — not intended for public distribution.
