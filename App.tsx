/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigation} from './src/navigations';
import {AppColors} from './src/assets';
import {Provider} from 'react-redux';
import {store} from './src/states';
import {ModalProvider} from './src/components';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : AppColors.white,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaProvider>
        <Provider store={store}>
          <RootNavigation />
          <ModalProvider />
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
