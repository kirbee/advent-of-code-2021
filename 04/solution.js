import { readInput } from '../utils.js';

const exampleInput = await readInput('./04/exampleInput.txt');
const givenInput = await readInput('./04/givenInput.txt');

class BingoBoard {
  constructor() {
    this.rows = [];
  }

  // Each item is an object
  // {
  //   value: int
  //   hasBeenChosen: bool
  //   row: int
  //   col: int
  // }
  addRow = (arr) => {
    const rowIndex = this.rows.length;
    const newRow = arr.map((item, index) => ({
      value: item,
      hasBeenChosen: false,
      row: rowIndex,
      col: index,
    }));
    this.rows.push(newRow);
  };

  getColumns = () => {
    const indexArray = this.rows[0].map((_, index) => index);
    return indexArray.map((index) => {
      return this.rows.map((row) => row[index]);
    });
  };

  markBoard = (number) =>
    this.getFlattened().forEach((item) => {
      if (item.value === number) {
        item.isMarked = true;
      }
    });

  getRows = () => this.rows;

  isWinner = () => this.checkRows() || this.checkColumns();

  getFlattened = () => Array.prototype.concat.apply([], this.rows);

  checkRows = (input = this.rows) => {
    return (
      input
        .map((rows) => rows.reduce((acc, rowItem) => rowItem.isMarked && acc, true))
        .filter((item) => item).length > 0
    );
  };

  // DEBUGGING
  printBoard = () => {
    this.rows.forEach((row) =>
      console.log(
        ...row.map((item) => {
          const { value } = item;
          const numberString = value < 10 ? ` ${value}` : value;
          if (item.isMarked) {
            return ['\x1b[1m', numberString, '\x1b[0m'].join('');
          } else {
            return numberString;
          }
        })
      )
    );
    console.log('\n');
  };

  checkColumns = () => this.checkRows(this.getColumns());

  sumOfUnmarkedNumbers = () =>
    this.getFlattened()
      .filter((item) => !item.isMarked)
      .reduce((acc, item) => acc + item.value, 0);
}

const parseInput = (input) => {
  const [drawOrderUnparsed, ...boardsUnparsed] = input;
  const drawOrder = drawOrderUnparsed.split(',').map((i) => parseInt(i, 10));

  const boards = [];

  let currentBoard;
  for (let i = 0; i < boardsUnparsed.length; i++) {
    const currentRow = boardsUnparsed[i].trim();
    if (currentRow) {
      currentBoard.addRow(currentRow.split(/[ ]+/).map((i) => parseInt(i, 10)));
    } else {
      if (currentBoard) {
        boards.push(currentBoard);
      }
      currentBoard = new BingoBoard();
    }
  }
  boards.push(currentBoard);

  return { drawOrder, boards };
};

const partOneSolution = (input) => {
  const { drawOrder, boards } = parseInput(input);

  let lastNumberCalled;
  let winningBoard;

  for (let i = 0; i < drawOrder.length; i++) {
    boards.forEach((board) => board.markBoard(drawOrder[i]));
    const result = boards
      .map((board, index) => (board.isWinner() ? index : null))
      .filter((item) => item !== null);
    if (result.length) {
      lastNumberCalled = drawOrder[i];
      winningBoard = boards[result[0]];
      break;
    }
  }

  return lastNumberCalled * winningBoard.sumOfUnmarkedNumbers();
};

const partTwoSolution = (input) => {
  const { drawOrder, boards } = parseInput(input);

  let lastNumberCalled;
  let losingBoard;

  for (let i = 0; i < drawOrder.length; i++) {
    boards.forEach((board) => board.markBoard(drawOrder[i]));
    const result = boards.map((board, index) => (board.isWinner() ? index : null));
    const numWinners = result.filter((item) => item !== null).length;

    if (numWinners === boards.length - 1) {
      losingBoard = boards[result.findIndex((board) => board === null)];
    }
    if (numWinners === boards.length) {
      lastNumberCalled = drawOrder[i];
      break;
    }
  }

  return lastNumberCalled * losingBoard.sumOfUnmarkedNumbers();
};

console.log('Part one solution:', partOneSolution(givenInput));
console.log('Part two solution:', partTwoSolution(givenInput));
