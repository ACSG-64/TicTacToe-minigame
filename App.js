import {NavigationContainer} from '@react-navigation/native';
import Navigator from './app/navigation/TicTacToeNavigaton';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
