import React from 'react';
import {ImageBackground, View} from 'react-native';

const ContentFrame = props => {
  if (props.noBackground === true) {
    return <View style={styles.frame}>{props.children}</View>;
  } else {
    return (
      <View style={styles.frame}>
        <ImageBackground
          source={require('../../images/gradient_background.jpg')}
          style={styles.image}>
          <View style={styles.content}>{props.children}</View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = {
  frame: {
    flex: 1,
    flexDirection: 'column',
    marginTop: '0.5%',
    marginBottom: '1%',
    marginStart: '2%',
    marginEnd: '2%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ContentFrame;
