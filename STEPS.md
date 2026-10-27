Нижче наведено повний архітектурний план, правила написання чистого коду, стек із перевіреними версіями та покроковий план комітів.

---

## 1. Технічний стек та версії (Безконфліктна конфігурація)

Щоб уникнути проблем із білдом на iOS (CocoaPods / Xcode) та Android (Gradle), а також конфліктів Babel між Reanimated та NativeWind, фіксуємо перевірену зв'язку:

* **React Native CLI:** `0.74.5` (стабільна версія з класичною архітектурою за замовчуванням, де ідеально працюють усі нативні бібліотеки та Reanimated Shared Transitions).
* **Стилізація:** `nativewind@^2.0.11` + `tailwindcss@3.3.2` (версія 2.x вимагає лише один рядок у `babel.config.js`, не конфліктує з Metro і підтримує перемикання теми `dark`/`light` через хук NativeWind).
* **Анімації:** `react-native-reanimated@~3.10.0` (підтримує Layout Animations, `useAnimatedStyle` та `sharedTransitionTag`).
* **Навігація:** `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-screens`, `react-native-safe-area-context`.
* **Стейт та Офлайн-кеш:**
* `zustand` + `@react-native-async-storage/async-storage`
* `@tanstack/react-query@^5` + `@tanstack/query-async-storage-persister` + `@tanstack/react-query-persist-client`
* `@react-native-community/netinfo` (відстеження інтернету та автоматичний запуск черги синхронізації).


* **API та Env:** `axios`, `react-native-dotenv` (працює через JS/Babel без потреби переналаштовувати схеми в Xcode та `build.gradle`).
* **Іконки:** `lucide-react-native` + `react-native-svg` (працює без ручного лінкування шрифтів у `Info.plist` та `android/app/src/main/assets/fonts`).

---

## 2. Правила чистого коду (Clean Code & Architecture Rules)

1. **Жодних коментарів та емодзі:** У коді заборонені однорядкові (`//`), багаторядкові (`/* */`) коментарі, JSDoc та будь-які емодзі (навіть у текстах помилок чи логах). Назви змінних, хуків і функцій мають самі пояснювати свою суть.
2. **Повне розділення UI та Логіки (Headless UI):**
* `.tsx` файли відповідають **виключно за JSX-розмітку та стилізацію**.
* Заборонено писати `useEffect`, `useMemo`, `useCallback`, виклики `useQuery`, селектори стору або умови фільтрації масивів безпосередньо в `.tsx` компоненті.
* Вся логіка виноситься в сусідній хук `model/use<ComponentName>.ts`. Компонент викликає лише один свій контролер-хук і деструктуризує готові пропси/обробники.


3. **Сувора ієрархія імпортів FSD:**
* Напрямок імпортів: `app` ➔ `screens` ➔ `widgets` ➔ `features` ➔ `entities` ➔ `shared`.
* Заборонені крос-імпорти на одному шарі (наприклад, `features/search-movies` не може імпортувати `features/filter-by-genre`). Їхня взаємодія відбувається на рівні `widgets` або `screens`.
* Кожен слайс має `index.ts` (Public API). Заборонено імпортувати внутрішні файли слайсу в обхід `index.ts`.


4. **Типізація та Мапінг даних:**
* Заборонено використовувати `any` або `@ts-ignore`.
* Відповіді від TMDB типізуються як `DTO` (наприклад, `MovieDto` з `poster_path`, `release_date`).
* На клієнті використовується чиста доменна модель `Movie` (`posterUrl`, `releaseYear`, `rating`), яку формують чисті функції-мапери в `entities/movie/lib/mapMovieDto.ts`.


5. **Іменування та структура файлів:**
* Компоненти — `PascalCase.tsx`.
* Хуки — `useCamelCase.ts`.
* Типи, константи, стори — `camelCase.ts`.
* Path-аліаси через `@/` (`@/app/...`, `@/screens/...`, `@/widgets/...`, `@/features/...`, `@/entities/...`, `@/shared/...`).



---

## 3. Повна структура проекту (FSD)

```text
src/
├── app/
│   ├── navigation/
│   │   ├── model/
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── RootNavigator.tsx
│   │       └── MainTabNavigator.tsx
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── OfflineSyncProvider.tsx
│   └── App.tsx
│
├── screens/
│   ├── home/
│   │   ├── model/
│   │   │   └── useHomeScreen.ts
│   │   ├── ui/
│   │   │   └── HomeScreen.tsx
│   │   └── index.ts
│   ├── search/
│   │   ├── model/
│   │   │   └── useSearchScreen.ts
│   │   ├── ui/
│   │   │   └── SearchScreen.tsx
│   │   └── index.ts
│   ├── movie-details/
│   │   ├── model/
│   │   │   └── useMovieDetailsScreen.ts
│   │   ├── ui/
│   │   │   └── MovieDetailsScreen.tsx
│   │   └── index.ts
│   └── watchlist/
│       ├── model/
│       │   └── useWatchlistScreen.ts
│       ├── ui/
│       │   └── WatchlistScreen.tsx
│       └── index.ts
│
├── widgets/
│   ├── home-header/
│   │   ├── ui/
│   │   │   └── HomeHeader.tsx
│   │   └── index.ts
│   ├── trending-movies-carousel/
│   │   ├── model/
│   │   │   └── useTrendingMoviesCarousel.ts
│   │   ├── ui/
│   │   │   └── TrendingMoviesCarousel.tsx
│   │   └── index.ts
│   ├── popular-movies-feed/
│   │   ├── model/
│   │   │   └── usePopularMoviesFeed.ts
│   │   ├── ui/
│   │   │   └── PopularMoviesFeed.tsx
│   │   └── index.ts
│   ├── search-catalog/
│   │   ├── model/
│   │   │   └── useSearchCatalog.ts
│   │   ├── ui/
│   │   │   └── SearchCatalog.tsx
│   │   └── index.ts
│   ├── movie-details-view/
│   │   ├── model/
│   │   │   └── useMovieDetailsView.ts
│   │   ├── ui/
│   │   │   └── MovieDetailsView.tsx
│   │   └── index.ts
│   ├── saved-movies-board/
│   │   ├── model/
│   │   │   └── useSavedMoviesBoard.ts
│   │   ├── ui/
│   │   │   └── SavedMoviesBoard.tsx
│   │   └── index.ts
│   └── offline-status-bar/
│       ├── model/
│       │   └── useOfflineStatusBar.ts
│       ├── ui/
│       │   └── OfflineStatusBar.tsx
│       └── index.ts
│
├── features/
│   ├── search-query/
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   └── useSearchInput.ts
│   │   ├── ui/
│   │   │   └── SearchInputBar.tsx
│   │   └── index.ts
│   ├── genre-filter/
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   └── useGenreFilter.ts
│   │   ├── ui/
│   │   │   └── GenreFilterList.tsx
│   │   └── index.ts
│   ├── toggle-watchlist/
│   │   ├── model/
│   │   │   └── useToggleWatchlist.ts
│   │   ├── ui/
│   │   │   └── WatchlistButton.tsx
│   │   └── index.ts
│   ├── toggle-favorite/
│   │   ├── model/
│   │   │   └── useToggleFavorite.ts
│   │   ├── ui/
│   │   │   └── FavoriteButton.tsx
│   │   └── index.ts
│   ├── switch-theme/
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   └── useSwitchTheme.ts
│   │   ├── ui/
│   │   │   └── ThemeToggleButton.tsx
│   │   └── index.ts
│   └── offline-sync/
│       ├── model/
│       │   ├── syncQueueStore.ts
│       │   └── useOfflineSyncManager.ts
│       └── index.ts
│
├── entities/
│   ├── movie/
│   │   ├── api/
│   │   │   ├── movieApi.ts
│   │   │   └── movieQueries.ts
│   │   ├── lib/
│   │   │   └── mapMovieDto.ts
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   ├── savedMoviesStore.ts
│   │   │   └── useMovieCardAnimation.ts
│   │   ├── ui/
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieHorizontalCard.tsx
│   │   │   └── MovieCardSkeleton.tsx
│   │   └── index.ts
│   └── genre/
│       ├── api/
│       │   ├── genreApi.ts
│       │   └── genreQueries.ts
│       ├── model/
│       │   └── types.ts
│       ├── ui/
│       │   └── GenreBadge.tsx
│       └── index.ts
│
└── shared/
    ├── api/
    │   ├── httpClient.ts
    │   └── tmdbAccountApi.ts
    ├── config/
    │   ├── env.ts
    │   ├── constants.ts
    │   └── queryClient.ts
    ├── lib/
    │   ├── storage/
    │   │   └── asyncStorageAdapter.ts
    │   ├── network/
    │   │   └── useNetworkStatus.ts
    │   └── hooks/
    │       └── useDebounce.ts
    └── ui/
        ├── ScreenContainer.tsx
        ├── SkeletonBlock.tsx
        ├── EmptyStateView.tsx
        ├── ErrorStateView.tsx
        ├── SegmentedControl.tsx
        ├── IconButton.tsx
        └── index.ts

```

---

## 4. Як працює Офлайн-база та Синхронізація (Варіант А)

1. **Локальне сховище стану (`savedMoviesStore` у `entities/movie`):**
* Зберігає в `AsyncStorage` два списки об'єктів `Movie`: `watchlist` та `favorites`.
* Коли користувач натискає кнопку додавання/видалення (навіть без інтернету), стор оновлюється **миттєво** (Optimistic Local Update).


2. **Черга синхронізації (`syncQueueStore` у `features/offline-sync`):**
* Кожна дія (`ADD_WATCHLIST`, `REMOVE_WATCHLIST`, `ADD_FAVORITE`, `REMOVE_FAVORITE` з `movieId` та `timestamp`) записується в `syncQueueStore` (також персиститься в `AsyncStorage`).
* Якщо користувач офлайн додав і одразу видалив один і той самий фільм, черга дедуплікує/перезаписує операцію за `movieId`, щоб не ганяти зайві запити.


3. **Менеджер синхронізації (`useOfflineSyncManager`):**
* Підписаний на `@react-native-community/netinfo`.
* Коли інтернет є одразу — виконує запит до TMDB Account API (`POST /account/{account_id}/watchlist` або `/favorite`) і видаляє виконане завдання з черги.
* Коли інтернету немає — завдання чекають у `AsyncStorage` (навіть якщо закрити апку).
* Як тільки `isConnected && isInternetReachable` стає `true`: вмикається статус `isSyncing = true`, черга послідовно відправляється на сервер, а після завершення підтягуються свіжі дані списків та оновлюються метадані фільмів.


4. **Офлайн-кеш запитів (`PersistQueryClientProvider`):**
* Усі запити `Popular`, `Trending`, `Genres` та вже відкриті `MovieDetails` автоматично зберігаються в `AsyncStorage` через персистер TanStack Query. Без інтернету апка повноцінно показує закешований каталог.



---

## 5. Історія комітів (12 логічних етапів)

Ми будемо рухатися строго по одному коміту. Після кожного коміту я даватиму повний код усіх файлів етапу та пояснення: **що зроблено**, **з чим зв'язано** та **як це працює**, після чого чекатиму твого дозволу на перехід далі.

| № | Назва коміту | Зміст етапу |
| --- | --- | --- |
| **1** | `chore: initialize project, configure fsd aliases, nativewind and env` | Ініціалізація пакетів (`package.json`), налаштування TypeScript path aliases (`@/*`), Babel (`nativewind`, `react-native-dotenv`, `reanimated`), Tailwind конфігу, `.env.example` та `.gitignore`. |
| **2** | `feat(shared): setup http client, storage adapter, network monitor and query client` | Шар `shared/config`, `shared/lib`, `shared/api`: Axios з Bearer-інтерсептором, обгортка `AsyncStorage`, `useDebounce`, `useNetworkStatus` (`NetInfo`) та конфігурація `QueryClient` з AsyncStorage-персистером. |
| **3** | `feat(shared): create base headless ui components and theme store` | Шар `shared/ui` (`ScreenContainer`, `SkeletonBlock` на Reanimated, `EmptyStateView`, `ErrorStateView`, `SegmentedControl`, `IconButton`) + фіча `features/switch-theme` (Zustand + NativeWind Dark/Light mode). |
| **4** | `feat(entities): implement genre and movie entities with dto mappers and queries` | Шар `entities/genre` та `entities/movie`: строгі типи DTO та Domain, чисті мапери, запити до TMDB (`popular`, `trending`, `search`, `discover`, `details`, `genres`), `useInfiniteQuery` хуки. |
| **5** | `feat(entities): build animated movie cards and skeleton loaders` | UI-компоненти `MovieCard`, `MovieHorizontalCard`, `MovieCardSkeleton`, `GenreBadge` та хук `useMovieCardAnimation` (Reanimated press spring, fade-in layout animations, shared transition tags). |
| **6** | `feat(offline-sync): implement persistent saved movies store and offline sync queue` | Стор збережених фільмів (`watchlist` і `favorites`), черга офлайн-мутацій (`syncQueueStore`), сервіс синхронізації з TMDB Account API та віджет `OfflineStatusBar`. |
| **7** | `feat(features): add toggle watchlist and toggle favorite interactive features` | Фічі `features/toggle-watchlist` та `features/toggle-favorite`: хуки з оптимістичним оновленням локального стору, постановкою в офлайн-чергу та анімовані кнопки. |
| **8** | `feat(home): implement home screen with trending carousel, popular infinite feed and pull-to-refresh` | Віджети `HomeHeader`, `TrendingMoviesCarousel`, `PopularMoviesFeed` (з `onEndReached` пагінацією та `RefreshControl`) та екран `HomeScreen`. |
| **9** | `feat(search): implement search input, genre filter and infinite search catalog` | Фічі `features/search-query`, `features/genre-filter`, віджет `SearchCatalog` (комбінована логіка пошуку та фільтрації за жанрами, стани loading/error/empty) та екран `SearchScreen`. |
| **10** | `feat(movie-details): implement movie details screen with animated header and actions` | Віджет `MovieDetailsView` (паралакс/анімація постера, жанри, рейтинг, дата релізу, опис, кнопки Watchlist і Favorite) та екран `MovieDetailsScreen`. |
| **11** | `feat(watchlist): implement saved movies screen with watchlist and favorites tabs` | Віджет `SavedMoviesBoard` (перемикач `Watchlist / Favorites`, офлайн-доступ, швидке видалення з анімацією, empty state) та екран `WatchlistScreen`. |
| **12** | `feat(app): assemble root navigation, bottom tabs and global providers` | Шар `app/`: `RootNavigator`, `MainTabNavigator`, `AppProviders`, точка входу `App.tsx` та фінальна перевірка запуску на iOS та Android. |

---

Підтверджуй, якщо все влаштовує, і я одразу видаю **Коміт №1** з усіма конфігураційними файлами та командами для розгортання проекту!