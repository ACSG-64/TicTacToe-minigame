import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ContentFrame from '../contentFrame/ContentFrame';
import {
  winner_results_label,
  tie_results_label,
  new_game_button_label,
} from '../../values/strings-de.json';
import {
  gray,
  brownTransparent,
  cyanTransparent,
} from '../../values/colors.json';

const PostGameScreen = props => {
  const winner = props.route.params.winner;
  let winnerIcon = null;
  if (winner === 'X') {
    winnerIcon = require('../../images/x_piece.png');
  } else if (winner === 'O') {
    winnerIcon = require('../../images/o_piece.png');
  }

  return (
    <ContentFrame>
      <View style={styles.content}>
        <View style={[styles.centerContent, {flex: 3}]}>
          {winner !== 'N/A' && (
            <Image source={winnerIcon} style={styles.winnerIcon} />
          )}
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 18}]}>
            {winner !== 'N/A' ? winner_results_label : tie_results_label}
          </Text>
        </View>
        <View
          style={[
            styles.centerContent,
            {
              flex: 1,
              backgroundColor:
                winner === 'X' ? brownTransparent : cyanTransparent,
            },
          ]}>
          <TouchableOpacity
            onPress={() => props.navigation.popToTop()}
            style={styles.button}>
            <Text style={styles.text}>{new_game_button_label}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContentFrame>
  );
};

const styles = {
  content: {
    width: '100%',
    height: '100%',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerIcon: {
    resizeMode: 'contain',
    height: '50%',
    margin: '2%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,

    paddingStart: '4%',
    paddingEnd: '4%',
    paddingTop: '1%',
    paddingBottom: '1%',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  text: {
    fontFamily: 'Open Sans',
    color: gray,
  },
};

export default PostGameScreen;
