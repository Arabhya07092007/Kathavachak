/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import AppContainer from './src/navigation/stack-navigators/appContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      //'`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider using `numColumns` with `FlatList` instead.',
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
      // 'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
      // 'source.uri should not be an empty string',
      // 'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
      // 'Called stopObserving with existing subscriptions.',
      // '`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.'
    ]);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppContainer></AppContainer>
    </GestureHandlerRootView>
  );
};

export default App;
