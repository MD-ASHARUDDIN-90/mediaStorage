import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider, withTheme} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';

function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

export default withTheme(Main);

AppRegistry.registerComponent(appName, () => Main);
