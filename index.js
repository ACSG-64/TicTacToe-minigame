/**
 * @format
 */

import {AppRegistry, View} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import Header from './app/components/header/Header';
import GameInstructions from './app/components/gameInstructions/GameInstructions';
import TicTacToeGame from './app/components/ticTacToe/TicTacToeGame';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigation/TicTacToeNavigaton';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
