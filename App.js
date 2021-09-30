import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { store } from './app/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Card, { CARD_STATE } from './components/Card/Card';
import FieldGame from './components/FieldGame/FieldGame';
import {loadCardInfos} from "./components/FieldGame/fieldGameSlice";

// store.dispatch(loadCardInfos());

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={FieldGame}>
              {/* {() => <Card state = {CARD_STATE.FRONT}/>} */}
              {/* {() => <FieldGame />} */}
            </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
