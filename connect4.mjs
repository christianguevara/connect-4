/**
Connect4

Connect4 is a game where two players take turns placing a token on columns that drop to the bottom.
When a player forms 4 of his tokens in a line - horizontally, vertically,or diagonally - the player wins.

[Visualization](https://i.ebayimg.com/images/g/DzMAAOSwSjxj6m0e/s-l1600.jpg)

Implement Connect 4 with the class below.
*/

export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;
export const BOARD_SIZE = 7;
export const SLOTS_TO_WIN = 4;

export class Connect4 {
  board;
  currentPlayer;
  winner;

  constructor() {
    // ❌ Same array reference to all positions in the first array
    // this.board = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(""));

    // Init the board
    this.board = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(""));
    this.currentPlayer = PLAYER_ONE;
  }

  play(col) {
    if (this.winner) {
      console.log("Winner: " + this.winner);
      return;
    }

    if (this.isBoardFull()) {
      console.log("Game ended in a draw!");
      return;
    }
    // Not
    if (col < 0 || col >= BOARD_SIZE) {
      console.log("Invalid column");
      return;
    }

    // Check if column is full
    if (this.board[0][col] !== "") {
      console.log("Column is full");
      return;
    }
    // A: start from the end of the col, and go up until an empty slot is found
    // B: start from the top of the col, and go until you find a non-empty slot and then put the thing in the previous slot
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      const valueAtPos = this.board[row][col];

      // If slot is empty, put a value and break
      if (!valueAtPos) {
        this.board[row][col] = this.currentPlayer;
        this.checkWinner(row, col);
        break;
      }
    }

    // After making a move and checking winner, check for draw
    if (this.isBoardFull()) {
      console.log("Game ended in a draw!");
      return;
    }

    this.currentPlayer =
      this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
  }

  hasAllNeededSlots(arr) {
    let consecutiveCount = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === this.currentPlayer) {
        consecutiveCount++;
        if (consecutiveCount === SLOTS_TO_WIN) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }

    return consecutiveCount === SLOTS_TO_WIN;
  }

  checkWinner(row, col) {
    if (this.winner) {
      console.log("Winner: " + this.winner);
      return;
    }
    // Options:
    // 1. Iterate all rows horizontally and vertically and diagonally x2, total 4 double loops -> Bad Idea
    // 2. Don't need to iterate all, just the closest to the current position when the slot is filled
    //    a. all horizontal in that row, all vertical in that col, and diagonally from ltr and rtl -> No double loops but still not performant
    //    b. Since it's connect 4, from the recently inserted position 3 to one side and 3 to the other for all the posibilities
    const horizontals = [];
    const verticals = [];
    const diagonalLTR = [];
    const diagonalRTL = [];

    const offset = SLOTS_TO_WIN - 1;
    for (
      // Negative offset because we want to start "to the left" and move "to the right"
      // Is the same for every direction, left and right transforms to up and down, but you get the idea
      let currentOffset = -offset;
      currentOffset <= offset;
      currentOffset++
    ) {
      horizontals.push(this.board[row][col + currentOffset]);
      if (row + currentOffset > 0 && row + currentOffset < BOARD_SIZE) {
        verticals.push(this.board[row + currentOffset][col]);
        diagonalLTR.push(this.board[row + currentOffset][col + currentOffset]);
        diagonalRTL.push(this.board[row + currentOffset][col - currentOffset]);
      }
    }

    if (
      this.hasAllNeededSlots(horizontals) ||
      this.hasAllNeededSlots(verticals) ||
      this.hasAllNeededSlots(diagonalLTR) ||
      this.hasAllNeededSlots(diagonalRTL)
    ) {
      this.winner = this.currentPlayer;
      console.log("Winner: " + this.winner);
      return;
    }
  }

  checkWinnerWithMiniMatrix(row, col) {
    // Discarded will involve iterate on a mini matrix, but still O(n^2)
    const newRowStart = row - SLOTS_TO_WIN;
    const newColStart = col - SLOTS_TO_WIN;
    const newRowEnd = row + SLOTS_TO_WIN;
    const newColEnd = col + SLOTS_TO_WIN;

    const arrToCheckStartPos = [
      newRowStart <= 0 ? 0 : newRowStart,
      newColStart <= 0 ? 0 : newColStart,
    ];

    const arrToCheckEndPos = [
      newRowEnd <= 0 ? 0 : newRowEnd,
      newColEnd <= 0 ? 0 : newColEnd,
    ];

    const horizontals = [];
    const verticals = [];
    const diagonalLTR = [];
    const diagonalRTL = [];

    for (
      let hCol = arrToCheckStartPos[0];
      hCol <= arrToCheckEndPos[0];
      hCol++
    ) {
      horizontals.push(this.board[(row, hCol)]);
    }
  }

  print() {
    console.table(this.board);
  }

  isBoardFull() {
    // Check the "top" of the board
    return this.board[0].every((cell) => cell !== "");
  }
}

const game = new Connect4();
// Test Vertical 1
// game.play(0);
// game.play(1);
// game.play(0);
// game.play(1);
// game.play(0);
// game.play(1);
// game.play(0);

// Test Horizontal 1
// game.play(0);
// game.play(0);
// game.play(1);
// game.play(1);
// game.play(2);
// game.play(2);
// game.play(3);

// Test Diagonal RTL
// game.play(0);
// game.play(1);
// game.play(1);
// game.play(1);
// game.play(2);
// game.play(2);
// game.play(2);
// game.play(3);
// game.play(3);
// game.play(3);
// game.play(3);

// Test Diagonal LTR
// game.play(0);
// game.play(0);
// game.play(0);
// game.play(1);
// game.play(0);
// game.play(1);
// game.play(1);
// game.play(1);
// game.play(3);
// game.play(2);
// game.play(2);

game.print();
