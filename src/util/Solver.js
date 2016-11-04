  /* globals setTimeout */

import CONSTANTS from "./constants";
import updateNeighbors from "./updateNeighbors";
import buildBoard from "../util/buildBoard";

export default class Solver {
  constructor(size, mines) {
    this.size = size;
    this.unexploredMines = mines;
    this.isWon = false;
    this.isLost = false;
    this._board = buildBoard(size, mines);
    this.unopen = size * size;
    this.candidates = [];
    this.cells = [];

    this.unopenCells = [];
    for (let i = 0; i < size; i += 1) {
      this.unopenCells = this.unopenCells.concat(this._board[i]);
    }
  }

  handleClick(x, y) {
    this.clickCell(x, y);
    if (this._board[x][y].value === 0) { // This cell is blank, open cells around
      this.openAround(x, y);
    }

    if (this.unopen === 0) {
      this.isWon = true;
    }
  }

  removeCellFromUnopen(x, y) {
    const cells = this.unopenCells;
    this.unopenCells.some((cell, index) => {
      if (cell.row === x && cell.col === y) {
        cells.splice(index, 1);
        return true;
      }
      return false;
    });
  }

  clickCell(x, y) {
    if (this._board[x][y].isMine) { // Bomb is clicked, game LOST
      this.isLost = true;
      return;
    }

    this.removeCellFromUnopen(x, y);

    if (this._board[x][y].value !== CONSTANTS.UNOPEN) { // This cell has been clicked or marked as bomb
      return;
    }

    this._board[x][y].value = this._board[x][y].bombs;
    this.unopen -= 1;
    this.reduceUnopenAdj(x, y);
  }

  openAround(x, y) {
    const addCell = (cell, a, b) => {
      if (this._board[a][b].value === CONSTANTS.UNOPEN && this.cells.indexOf(this._board[a][b]) < 0) {
        this.cells.push(this._board[a][b]);
      }
    };

    updateNeighbors(this._board[x][y], this.size, addCell);

    while (this.cells.length > 0) {
      const target = this.cells.pop();
      this.handleClick(target.row, target.col);
      if (target.value === 0) {
        updateNeighbors(this._board[target.row][target.col], this.size, addCell);
      }
    }
  }

  reduceUnopenAdj(x, y) {
    const reduceAdj = (cell, a, b) => {
      if (cell.value === CONSTANTS.BOMB) {
        this._board[a][b].markedBombs += 1;
      }
      this._board[a][b].unopenAdj -= 1;
    };
    updateNeighbors(this._board[x][y], this.size, reduceAdj);
  }

  analyze() {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        if (this._board[x][y].value > 0 && this._board[x][y].unopenAdj > 0 &&
          this._board[x][y].value - this._board[x][y].markedBombs === this._board[x][y].unopenAdj) {
          //If the number of unkonwn cells equals the number of unexplored mines, those cells can be marked as mines
          updateNeighbors(this._board[x][y], this.size, this.markBomb.bind(this));
        }
        if (this._board[x][y].value > 0 &&
          this._board[x][y].value === this._board[x][y].markedBombs) {
          // If all surrounding mines are marked, we can open the rest of surrounding cells
          this.openAround(x, y);
        }
      }
    }
  }

  markBomb(cell, a, b) {
    if (this._board[a][b].value === CONSTANTS.UNOPEN) {
      this._board[a][b].value = CONSTANTS.BOMB;
      this.removeCellFromUnopen(a, b);
      this.unopen -= 1;
      this.unexploredMines -= 1;
      this.reduceUnopenAdj(a, b);
    }
  }

  getRandomCell() {
    while (true) { // eslint-disable-line no-constant-condition
      if (this.unopenCells.length === 0) {
        break;
      }

      const random = Math.floor(Math.random() * this.unopenCells.length);
      if (this.unopenCells[random]) {
        return [this.unopenCells[random].row, this.unopenCells[random].col];
      }
    }
    return [];
  }

  solve() {
    return new Promise((resolve) => {
      if (this.unopen === 0 || this.unopenCells.length === 0) {
        return resolve(true);
      }

      const coords = this.getRandomCell();
      this.handleClick(coords[0], coords[1]);

      if (this.isWon) {
        return resolve(true);
      }

      if (this.isLost) {
        return resolve(false);
      }

      this.analyze();

      return setTimeout(() => resolve(this.solve()), 0);
    });
  }
}
