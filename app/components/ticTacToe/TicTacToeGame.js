import React from 'react';
import Board from './Board';
import ContentFrame from '../contentFrame/ContentFrame';
import {Text, Vibration, View} from 'react-native';
import {
  player_x_indicator_label,
  player_o_indicator_label,
  player_turn_indicator_label,
} from '../../values/strings-de.json';

class TicTacToeGame extends React.Component {
  /* Board */
  state = {
    gameBoard: [
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
      {marker: null, strippedCell: null},
    ],
    isPlayerTurn: true,
    computerMovementMode: 1, // When is 1-2 then play a random movement, when is 3-4 then play a smart movement
    gameFinished: false,
    winner: 'N/A',
  };

  board_slices() {
    let board = this.state.gameBoard.slice();
    return {
      firstRow: board.slice(0, 3),
      secondRow: board.slice(3, 6),
      thirdRow: board.slice(6, 9),
      firstColumn: [board[0], board[3], board[6]],
      secondColumn: [board[1], board[4], board[7]],
      thirdColumn: [board[2], board[5], board[8]],
      diagonalLeftToRight: [board[0], board[4], board[8]],
      diagonalRightToLeft: [board[2], board[4], board[6]],
    };
  }

  board_coordinates() {
    return {
      firstRow: [0, 1, 2],
      secondRow: [3, 4, 5],
      thirdRow: [6, 7, 8],
      firstColumn: [0, 3, 6],
      secondColumn: [1, 4, 7],
      thirdColumn: [2, 5, 8],
      diagonalLeftToRight: [0, 4, 8],
      diagonalRightToLeft: [2, 4, 6],
    };
  }

  /* Game commands */
  human_movement(position) {
    let board = this.state.gameBoard.slice();
    if (
      board[position].marker == null &&
      this.state.isPlayerTurn &&
      !this.state.gameFinished
    ) {
      board[position].marker = 'X';
      console.log('Human' + board);
      this.perform_movement('human', board);
      setTimeout(() => {
        this.computer_movement(); // Wait 2 seconds
      }, 2000);
    }
  }

  computer_movement() {
    let movementMode = this.state.computerMovementMode;
    let updatedBoard;
    if (!this.state.gameFinished) {
      if (movementMode === 1 || movementMode === 2) {
        updatedBoard = this.random_computer_movement();
      } else {
        updatedBoard = this.smart_computer_movement();
      }

      this.perform_movement('computer', updatedBoard);
    }
  }

  perform_movement(player, updatedBoard) {
    if (player === 'human') {
      this.setState({
        gameBoard: updatedBoard,
        isPlayerTurn: false,
        computerMovementMode: this.state.computerMovementMode,
        gameFinished: false,
        winner: 'N/A',
      });
    } else {
      let computerMovementMode = this.state.computerMovementMode;
      this.setState({
        gameBoard: updatedBoard,
        isPlayerTurn: true,
        computerMovementMode:
          computerMovementMode === 4 ? 1 : computerMovementMode + 1,
        gameFinished: false,
        winner: 'N/A',
      });
    }

    Vibration.vibrate(100); // Haptic feedback

    // Verify win state
    this.verify_win_state();
  }

  verify_win_state() {
    let boardSlices = this.board_slices();
    let onWinValues = false; // By default we assume no winners

    // When no one wins
    if (this.count_occurrences(this.state.gameBoard, null) === 0) {
      onWinValues = {
        winner: 'N/A',
        updatedBoard: this.state.gameBoard,
      };
    }
    // When a computer wins
    for (let [key, value] of Object.entries(boardSlices)) {
      if (this.count_occurrences(value, 'O') === 3) {
        onWinValues = {
          winner: 'O',
          updatedBoard: this.fill_winner_cells(key),
        };
      } else if (this.count_occurrences(value, 'X') === 3) {
        onWinValues = {
          winner: 'X',
          updatedBoard: this.fill_winner_cells(key),
        };
      }
    }

    // If there is a winner, update the state
    if (onWinValues !== false) {
      this.setState({
        gameBoard: onWinValues.updatedBoard,
        isPlayerTurn: false,
        computerMovementMode: 1,
        gameFinished: true,
        winner: onWinValues.winner,
      });

      Vibration.vibrate([100, 200, 300], true); // Haptic feedback

      setTimeout(() => {
        Vibration.cancel();
        this.props.navigation.navigate('PostGame', {
          winner: onWinValues.winner,
        });
      }, 3000);
    }
  }

  /* Computer play styles */
  random_computer_movement() {
    let board = this.state.gameBoard.slice();
    while (true) {
      let movement = Math.floor(Math.random() * 9);
      if (board[movement].marker === null) {
        board[movement].marker = 'O';
        return board;
      }
    }
  }

  smart_computer_movement() {
    let boardSlices = this.board_slices();

    let updatedBoard = this.computer_movement_to_win(boardSlices);
    if (updatedBoard !== false) {
      return updatedBoard;
    }
    updatedBoard = this.computer_movement_to_block(boardSlices);
    if (updatedBoard !== false) {
      return updatedBoard;
    }
    updatedBoard = this.simple_computer_movement(boardSlices);
    if (updatedBoard !== false) {
      return updatedBoard;
    }

    return false;
  }

  // Computer smart movements types
  computer_movement_to_win(boardSlices) {
    for (let [key, value] of Object.entries(boardSlices)) {
      if (
        this.count_occurrences(value, 'O') === 2 &&
        this.count_occurrences(value, null) === 1
      ) {
        const cellToMark = this.cell_to_mark_index(key, value);

        let board = this.state.gameBoard.slice();
        board[cellToMark].marker = 'O';

        return board;
      }
    }
    return false;
  }

  computer_movement_to_block(boardSlices) {
    for (let [key, value] of Object.entries(boardSlices)) {
      if (
        this.count_occurrences(value, 'X') === 2 &&
        this.count_occurrences(value, null) === 1
      ) {
        const cellToMark = this.cell_to_mark_index(key, value);

        let board = this.state.gameBoard.slice();
        board[cellToMark].marker = 'O';

        return board;
      }
    }
    return false;
  }

  count_occurrences(array, value) {
    return array.reduce((a, v) => (v.marker === value ? a + 1 : a), 0);
  }

  cell_to_mark_index(arraySliceName, arrayToInspect, valueToFind = null) {
    let boardCoordinates = this.board_coordinates();

    let cellInBlankIndex = arrayToInspect.findIndex(element => {
      if (element.marker === valueToFind) {
        return true;
      }
    });

    return boardCoordinates[arraySliceName][cellInBlankIndex];
  }

  simple_computer_movement() {
    let board = this.state.gameBoard.slice();

    // Center square
    if (board[4].marker === null) {
      board[4].marker = 'O';
      return board;
    }
    // One of the four corner squares
    let boardCornersCoordinates = [0, 2, 6, 8];
    for (let i = 0; i < boardCornersCoordinates.length; i++) {
      if (board[i].marker === null) {
        board[i].marker = 'O';
        return board;
      }
    }
    // Or one of the four side squares.
    let boardSidesCoordinates = [1, 3, 5, 7];
    for (let i = 0; i < boardSidesCoordinates.length; i++) {
      if (board[i].marker === null) {
        board[i].marker = 'O';
        return board;
      }
    }

    return false;
  }

  /* On win, update board */
  fill_winner_cells(lineDirection) {
    let board = this.state.gameBoard.slice();
    let boardCoordinates = this.board_coordinates();

    let winnerLineDirection;
    if (
      lineDirection === 'firstRow' ||
      lineDirection === 'secondRow' ||
      lineDirection === 'thirdRow'
    ) {
      winnerLineDirection = 0;
    } else if (lineDirection === 'diagonalLeftToRight') {
      winnerLineDirection = 45;
    } else if (lineDirection === 'diagonalRightToLeft') {
      winnerLineDirection = 135;
    } else {
      winnerLineDirection = 90;
    }

    let boardCoordinatesToFill = boardCoordinates[lineDirection];
    for (let i = 0; i < boardCoordinatesToFill.length; i++) {
      let coordinate = boardCoordinatesToFill[i];
      board[coordinate].strippedCell = winnerLineDirection;
    }

    return board;
  }

  render() {
    const gameBoard = this.state.gameBoard;
    return (
      <View style={{flex: 1}}>
        <ContentFrame>
          <Board
            cellValues={gameBoard}
            onCellPress={position => this.human_movement(position)}
          />
        </ContentFrame>
        <View style={styles.indicator}>
          <Text style={styles.indicatorsText}>{player_x_indicator_label}</Text>
          <Text style={styles.indicatorsText}>{player_o_indicator_label}</Text>
          <Text style={styles.currentPlayerIndicator}>
            {player_turn_indicator_label.replace(
              '{PLAYER}',
              this.state.isPlayerTurn ? 'X' : 'O',
            )}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  indicator: {
    position: 'absolute',
    top: 25,
    backgroundColor: 'rgba(176,203,199,0.9)',
    paddingLeft: 25,
    paddingEnd: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  indicatorsText: {
    color: 'rgb(103,103,103)',
    fontSize: 12,
  },
  currentPlayerIndicator: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255,255,255,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 15,
  },
};

export default TicTacToeGame;
