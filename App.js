import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomBarNavigator from './src/navigators/BottomBarNavigator';
import StackNavigator from './src/navigators/StackNavigator';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigators/AppNavigator';

export default function App() {
  return (
   <Provider store={store}>
<AppNavigator />
   </Provider>
  );
}


