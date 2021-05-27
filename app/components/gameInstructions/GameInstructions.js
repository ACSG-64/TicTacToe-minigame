import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ContentFrame from '../contentFrame/ContentFrame';
import {
  how_to_play_title,
  start_game_button_label,
  back_button_label,
} from '../../values/strings-de.json';
import {gray} from '../../values/colors.json';

const GameInstructions = props => {
  return (
    <View style={{flex: 1}}>
      <ContentFrame noBackground={true}>
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsTitle}>{how_to_play_title}</Text>
          <Text style={styles.instructionsText}>{props.gameInstructions}</Text>
          <Image
            source={require('../../images/nurse_and_patient.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.startSection}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => props.navigation.navigate('Game')}>
            <Image
              source={require('../../images/arrow_icon.png')}
              style={styles.arrowIcon}
            />
            <Text style={styles.startButtonText}>
              {start_game_button_label}
            </Text>
          </TouchableOpacity>
        </View>
      </ContentFrame>
      <TouchableOpacity style={styles.backButton}>
        <Text
          style={[
            styles.backButtonText,
            {
              fontWeight: 'bold',
              fontSize: 20,
              marginRight: 2,
              marginLeft: '2%',
            },
          ]}>
          {'<'}
        </Text>
        <Text style={styles.backButtonText}>{back_button_label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  instructionsSection: {
    backgroundColor: 'rgb(150,217,217)',
    flex: 2,
    flexDirection: 'column',
    alignContent: 'flex-end',
    paddingStart: '10%',
    paddingEnd: '10%',
    justifyContent: 'center',
  },
  instructionsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    color: 'white',
    textAlign: 'center',
    top: 30,
  },
  instructionsText: {
    fontSize: 17,
    fontFamily: 'Open Sans',
    color: 'white',
    textAlign: 'center',
    top: 30,
  },
  image: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    top: 50,
  },
  startSection: {
    flexDirection: 'column',
    alignContent: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    paddingStart: '20%',
    paddingEnd: '20%',
  },
  startButton: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  startButtonText: {
    color: gray,
    fontSize: 16,
  },
  arrowIcon: {
    resizeMode: 'contain',
    height: 16,
    width: 16,
    marginRight: 4,
  },
  backButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgb(224,224,224)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: gray,
  },
};

export default GameInstructions;
