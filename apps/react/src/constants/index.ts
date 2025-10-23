// API Configuration
export const API_ENDPOINTS = {
  KEOLIS_BUS: 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr@keolis-rennes/records',
} as const;

// API Query Parameters
export const API_PARAMS = {
  DEFAULT_LIMIT: 20,
  DEFAULT_DESTINATION: 'Chantepie',
} as const;

// App Configuration
export const APP_CONFIG = {
  REFRESH_INTERVAL: 30000, // 30 seconds
  DEBOUNCE_DELAY: 500, // 500ms for form inputs
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'app_theme',
  LAST_SEARCH: 'last_search',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  API: '/api',
  TUTORIALS: '/tutorials',
  TYPESCRIPT: '/typescript',
} as const;