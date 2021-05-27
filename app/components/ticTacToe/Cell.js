import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {brown, cyan} from '../../values/colors.json';

class Cell extends React.Component {
  state = {heightAndWidth: this.get_dimensions()};

  get_dimensions() {
    return Dimensions.get('window').height < Dimensions.get('window').width
      ? Dimensions.get('window').height
      : Dimensions.get('window').width;
  }

  constructor() {
    super();
    this.animated_figure_scale = new Animated.Value(0.5);
    this.animated_line_opacity = new Animated.Value(0);
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({heightAndWidth: this.get_dimensions()});
    });
  }

  componentDidUpdate() {
    if (this.props.cellValue.marker !== null) {
      this.animateFigure();
    }
    if (this.props.cellValue.strippedCell !== null) {
      this.animateLine();
    }
  }

  animateFigure = () => {
    Animated.spring(this.animated_figure_scale, {
      toValue: 1,
      friction: 2,
      tension: 150,
      useNativeDriver: true,
    }).start();
  };

  animateLine = () => {
    Animated.timing(this.animated_line_opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const marker = this.props.cellValue.marker;
    const strippedCell = this.props.cellValue.strippedCell;
    let iconMarker = require('../../images/null_picece.png');
    if (marker === 'X') {
      iconMarker = require('../../images/x_piece.png');
    } else if (marker === 'O') {
      iconMarker = require('../../images/o_piece.png');
    }

    return (
      <TouchableWithoutFeedback
        disabled={marker !== null}
        onPress={this.props.onCellPress}>
        <View
          style={[
            styles.container,
            {
              height: this.state.heightAndWidth / 3 - 25,
              width: this.state.heightAndWidth / 3 - 25,
            },
          ]}>
          <Animated.Image
            style={[
              styles.image,
              {transform: [{scale: this.animated_figure_scale}]},
            ]}
            source={iconMarker}
          />
          {strippedCell != null && (
            <View style={styles.line_container}>
              <Animated.View
                style={[
                  styles.line,
                  {
                    transform: [{rotate: `${strippedCell}deg`}],
                    backgroundColor: marker === 'X' ? brown : cyan,
                    opacity: this.animated_line_opacity.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [0, 1, 0, 1],
                    }),
                  },
                ]}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    margin: 0,
  },
  image: {
    padding: 5,
    maxWidth: '80%',
    maxHeight: '80%',
  },
  line_container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  line: {
    width: '150%',
    flexGrow: 0.05,
    flexShrink: 0,
    flexBasis: 1,
  },
};

export default Cell;
