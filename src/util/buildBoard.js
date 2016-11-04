import updateNeighbors from "./updateNeighbors";
import CONSTANTS from "./constants";

const generateRandom = (n, m) => {
  const random = [];
  let i = m;
  while (i > 0) {
    const curr = Math.ceil(Math.random() * n * n) - 1;
    if (random.indexOf(curr) < 0) {
      random.push(curr);
      i -= 1;
    }
  }
  return random;
};

const generateBoard = (n, m) => {
  const random = generateRandom(n, m);
  const board = [];
  for (let i = 0; i < n; i += 1) {
    const row = [];
    for (let j = 0; j < n; j += 1) {
      const node = {
        row: i,
        col: j,
        bombs: 0,
        value: CONSTANTS.UNOPEN,
        unopenAdj: 0,
        markedBombs: 0,
        isMine: false
      };
      if (random.indexOf(i * n + j) >= 0) {
        node.isMine = true;
      }
      row.push(node);
    }
    board.push(row);
  }
  return board;
};

const buildBoard = (n, m) => {
  const board = generateBoard(n, m);
  const countBombs = (node, a, b) => {
    node.unopenAdj += 1;
    if (board[a][b].isMine) {
      node.bombs++;
    }
  };
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const node = board[i][j];
      updateNeighbors(node, n, countBombs);
    }
  }
  return board;
};

export default buildBoard;
