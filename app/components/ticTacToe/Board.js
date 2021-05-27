import React from 'react';
import {View} from 'react-native';
import Cell from './Cell';

class Board extends React.Component {
  renderCell(position) {
    return (
      <Cell
        cellValue={this.props.cellValues[position]}
        onCellPress={() => this.props.onCellPress(position)}
      />
    );
  }

  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
        </View>
        <View style={styles.row}>
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
        </View>
        <View style={styles.row}>
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </View>
      </View>
    );
  }
}

const styles = {
  board: {
    overflow: 'hidden',
    backgroundColor: 'black',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    margin: 0,
  },
};

export default Board;
