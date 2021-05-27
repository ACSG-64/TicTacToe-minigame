import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {gray} from '../../values/colors.json';
import {
  menu_button_label,
  quit_game_button_label,
} from '../../values/strings-de.json';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.gameTitle}>{props.gameTitle}</Text>
      <View style={{flexBasis: '33%'}}>
        {props.withMenu === true && (
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../../images/carehero_logo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.text}>{menu_button_label}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {props.withMenu !== true && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.popToTop()}>
            <Text style={styles.text}>{quit_game_button_label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Open Sans',
    justifyContent: 'space-between',
    marginStart: '2%',
    marginEnd: '2%',
    paddingTop: '0.5%',
    paddingBottom: '0.5%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: 25,
    width: 25,
    marginEnd: 5,
  },
  text: {
    color: gray,
    fontSize: 15,
  },
  gameTitle: {
    color: gray,
    fontSize: 23,
    flexGrow: 2,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  },
};

export default Header;
