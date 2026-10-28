# MovieWatchlist 

A modern, high-performance React Native mobile application for discovering trending films, managing a personalized watchlist and favorites, with full offline-first synchronization and dynamic light/dark theme support.

Built with **React Native CLI**, **Feature-Sliced Design (FSD)** architecture, and strict **Headless UI** principles.

---

## 📱 Features

- **Discover & Browse:**
  - **Trending Carousel:** Top trending movies of the week with animated cards.
  - **Popular Feed:** Infinitely scrollable feed of popular movies.
  - **Rich Movie Details:** High-res backdrops, poster preview, release date, runtime, genres, ratings, and plot synopsis.

- **Advanced Search & Filtering:**
  - Real-time search with debounced TMDB query.
  - Multi-select genre filtering.
  - Filter modal with sorting options (*Popularity, Rating, Release Date*), release year filter, and minimum rating slider.

- **Watchlist & Favorites Management:**
  - Instant optimistic updates with Reanimated bounce micro-animations.
  - Segmented control to switch between **Watchlist** and **Favorites**.
  - Persisted locally with `AsyncStorage`.

- **Offline-First Resilience & Two-Way Sync:**
  - Persistent query caching powered by `@tanstack/react-query` & `@tanstack/query-async-storage-persister`.
  - Offline status bar indicator powered by `@react-native-community/netinfo`.
  - Mutation sync queue with exponential backoff and retry strategy for offline actions.
  - Automatic background synchronization with TMDB Account API upon reconnecting.

- **Theme Customization:**
  - Complete Dark and Light mode support across all screens and components.
  - Seamless color switching powered by NativeWind (Tailwind CSS).
  - Persisted user preference.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Core** | React Native `0.74.5`, TypeScript `5.0.4` |
| **Navigation** | `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs` |
| **Styling** | `NativeWind` (Tailwind CSS `3.3.2`) |
| **Animations** | `react-native-reanimated` (`~3.10.1`) |
| **Server State & Cache** | `@tanstack/react-query` (`^5`), `@tanstack/query-async-storage-persister` |
| **Global State** | `zustand` (`^4.5.4`) |
| **Persistence** | `@react-native-async-storage/async-storage` |
| **Network & API** | `axios` (`^1.7.2`), `@react-native-community/netinfo` |
| **Environment** | `react-native-dotenv` |
| **Icons** | `lucide-react-native`, `react-native-svg` |

---

## Architecture (Feature-Sliced Design)

The project strictly follows **Feature-Sliced Design (FSD)** combined with **Headless UI** principles (zero business logic in `.tsx` files; all handlers, queries, and effects live inside dedicated `model/use<Component>.ts` controller hooks).

```text
src/
├── app/                  # Application providers, root & tab navigation
│   ├── navigation/
│   ├── providers/
│   └── App.tsx
├── screens/              # Screen components composing widgets
│   ├── home/
│   ├── search/
│   ├── movie-details/
│   └── watchlist/
├── widgets/              # Autonomous composite UI blocks
│   ├── home-header/
│   ├── popular-movies-feed/
│   ├── trending-movies-carousel/
│   ├── movie-details-view/
│   ├── saved-movies-board/
│   └── offline-status-bar/
├── features/             # User interactions with business value
│   ├── catalog-filter/
│   ├── genre-filter/
│   ├── search-query/
│   ├── toggle-watchlist/
│   ├── toggle-favorite/
│   ├── switch-theme/
│   └── offline-sync/
├── entities/             # Domain entities and models
│   ├── movie/
│   └── genre/
└── shared/               # Reusable primitives, API client, design tokens
    ├── api/
    ├── config/
    ├── lib/
    └── ui/
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Watchman
- Android Studio & Android SDK (for Android)
- Xcode & CocoaPods (for iOS on macOS)
- A [TMDB (The Movie Database)](https://www.themoviedb.org/) account and API Read Access Token

### 1. Clone the repository

```bash
git clone https://github.com/mklborovets/movie-watchlist.git
cd movie-watchlist
```

### 2. Install dependencies

```bash
npm install
```

For iOS:
```bash
cd ios && pod install && cd ..
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and fill in your TMDB credentials:

```env
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
TMDB_BEARER_TOKEN=your_tmdb_v4_read_access_token_here
TMDB_ACCOUNT_ID=your_tmdb_account_id_here
```

### 4. Run the Application

#### Start Metro Bundler

```bash
npm start
```

#### Run on Android

```bash
npm run android
```

#### Run on iOS

```bash
npm run ios
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `npm start` | Starts the Metro development bundler |
| `android` | `npm run android` | Builds and launches the app on Android |
| `ios` | `npm run ios` | Builds and launches the app on iOS |
| `typecheck` | `npm run typecheck` | Runs TypeScript compiler checks (`tsc --noEmit`) |
| `lint` | `npm run lint` | Runs ESLint analysis across the codebase |
| `test` | `npm test` | Runs Jest unit tests |

---

## License

This project is open-source and available under the MIT License.
