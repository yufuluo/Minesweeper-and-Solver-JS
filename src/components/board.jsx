import Cell from "./cell";
import buildBoard from "../util/buildBoard";
import CONSTANTS from "../util/constants";
import Solver from "../util/Solver";
import updateNeighbors from "../util/updateNeighbors";

window._MINESWEEPER = {};
let SOLVER;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLost: false,
      isWon: false
    };
    SOLVER = window._MINESWEEPER.SOLVER = new Solver(props.size, props.mines);
    this.board = buildBoard(props.size, props.mines);
    this.unopen = props.size * props.size;
    this.cells = [];
  }

  handleLost() {
    this.setState({isLost: true});
    window._MINESWEEPER.isLost = true;
  }

  handleClick(cell) {
    this.clickCell(cell);

    if (cell.props.isMine) {
      return this.handleLost();
    }

    if (cell.props.bombs === 0) {
       this.openAround(cell);
    }

    if (this.unopen === this.props.mines) {
      this.setState({isWon: true});
      window._MINESWEEPER.isWon = true;
      return this._renderMessage();
    }
  }

  clickCell(cell) {
    if (cell.isClicked) {
      return;
    }

    cell.isClicked = true;
    this.unopen--;

    let image = CONSTANTS.image.blank;
    if (!cell.props.isMine) {
      image = CONSTANTS.image.bombs[cell.props.bombs];
    } else {
      image = CONSTANTS.image.explodedBomb;
    }

    cell.setState({
      img: image
    });
  }

  openAround(cell) {
    this.cells.push(cell);
    const addCells = (curr, a, b) => {
      if (!this.refs[`${a}-${b}`].isClicked && this.cells.indexOf(this.refs[`${a}-${b}`])) {
        this.cells.push(this.refs[`${a}-${b}`])
      }
    };
    while (this.cells.length > 0) {
      const curr = this.cells.pop();
      this.clickCell(curr);
      if (curr.props.bombs === 0) {
        updateNeighbors(curr.props, this.props.size, addCells);
      }
    }
  }

   _renderMessage() {
    if (this.state.isWon) {
      return <div className="message">Congratulations! You have won the game!</div>
    } 
    if (this.state.isLost) {
      return <div className="message">Mmmm... Would you like to try again?</div>
    }
  }

  _renderCells() {
    return this.board.map((rows) => (
      <tr>
        {rows.map((node) => (
          <Cell isLost={this.state.isLost} 
            isWon={this.state.isWon} 
            ref={`${node.row}-${node.col}`}
            id={`${node.row}-${node.col}`}
            row={node.row}
            col={node.col}
            bombs={node.bombs}
            isMine={node.isMine}
            handleClick={this.handleClick.bind(this)}
          />
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <div className="borad_Panel">
        <div className="message_box">
          {this._renderMessage()}
        </div>
        <table>
          {this._renderCells()}
        </table>
      </div>
    );
  }
}
