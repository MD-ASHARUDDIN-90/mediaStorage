import React from 'react';
import Navigation from './app/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {persistor, store} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

function App({theme}: any): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.primary}
          />
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default withTheme(App);
