import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TicTacToeGame from '../components/ticTacToe/TicTacToeGame';
import GameInstructions from '../components/gameInstructions/GameInstructions';
import PostGameScreen from '../components/ticTacToe/PostGameScreen';
import Header from '../components/header/Header';
import {tic_tac_toe_instructions} from '../values/strings-de.json';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="Instructions"
        options={{
          header: props => (
            <Header withMenu={true} gameTitle={'TicTacToe'} {...props} />
          ),
        }}>
        {props => (
          <GameInstructions
            gameInstructions={tic_tac_toe_instructions}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Game"
        options={{
          header: props => (
            <Header withMenu={false} gameTitle={'TicTacToe'} {...props} />
          ),
        }}
        component={TicTacToeGame}
      />
      <Stack.Screen
        name="PostGame"
        options={{
          header: props => (
            <Header withMenu={false} gameTitle={'TicTacToe'} {...props} />
          ),
        }}
        component={PostGameScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
