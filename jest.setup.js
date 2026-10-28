const ReactNative = require('react-native');

require('react-native-reanimated/mock');

Object.defineProperty(ReactNative, 'Keyboard', {
  configurable: true,
  enumerable: true,
  value: {
    addListener: jest.fn(() => ({remove: jest.fn()})),
    removeListener: jest.fn(),
    dismiss: jest.fn(),
    isVisible: jest.fn(() => false),
  },
});

Object.defineProperty(ReactNative, 'BackHandler', {
  configurable: true,
  enumerable: true,
  value: {
    addEventListener: jest.fn(() => ({remove: jest.fn()})),
    removeEventListener: jest.fn(),
    exitApp: jest.fn(),
  },
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock'),
);

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.mock(
  '@react-navigation/bottom-tabs/lib/commonjs/views/BottomTabBar',
  () => {
    const React = require('react');
    const {View} = require('react-native');
    return {
      __esModule: true,
      default: props => React.createElement(View, props),
      getTabBarHeight: () => 49,
    };
  },
);

jest.mock('@react-navigation/bottom-tabs/src/views/BottomTabBar', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: props => React.createElement(View, props),
    getTabBarHeight: () => 49,
  };
});
