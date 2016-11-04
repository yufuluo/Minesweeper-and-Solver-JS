import Board from "./board";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 10,
      mines: 10,
      time: 0,
      win: 0,
      game: 0,
      message: ""
    };
  }

  _renderBoard() {
    const placeholder = this.refs.boardPlaceholder;
    placeholder.innerHTML = "";
    ReactDOM.render(<Board size={this.state.size} mines={this.state.mines} />, placeholder);
  }

  componentDidMount() {
    this._renderBoard();
  }

  handleChangeSize(event) {
    this.setState({size: event.target.value});
  }

  handleChangeMines(event) {
    this.setState({mines: event.target.value});
  }

  handleSetBoard() {
    this._renderBoard();
  }

  handleSolve(times) {
    this.setState({ message: "Solving, please wait.", time: 0, win: 0, game: 0 });
    const startTime = Date.now();

    const getTime = () => `${(Date.now() - startTime) / 1000} seconds.`;

    const solveHelper = (times) => {
      if (times > 0) {
        return Promise.resolve(window._MINESWEEPER.SOLVER.solve())
          .then((result) => {
            this.setState({ game: this.state.game + 1, time: getTime() });
            if (result) {
              this.setState({ win: this.state.win + 1 });
            }
            this.handleSetBoard();
          })
          .then(() => {
            setTimeout(() => {
              solveHelper(times - 1);
            }, 0);
          });
      } else {
        this.setState({
          time: getTime(),
          message: ""
        });
        return Promise.resolve();
      }
    };

    solveHelper(times);
  }

  render() {
    return (
      <div className="board">
        <div className="conctroller">
          <div className="container">
            <span>Grid Size:</span>
            <input type="number" value={this.state.size} min="1" onChange={this.handleChangeSize.bind(this)}/>
            <span>Mines Number:</span>
            <input type="number" value={this.state.mines} min="1" onChange={this.handleChangeMines.bind(this)}/>
            <button type="button" onClick={this.handleSetBoard.bind(this)}>Set Board!</button>
            <button type="button" onClick={() => this.handleSolve.call(this, 100000)}>Solve it!</button>
            <span>Won {this.state.win} / {this.state.game}, time taken: {this.state.time}</span>
            <div className="message">{this.state.message}</div>
          </div>
        </div>
        <div ref="boardPlaceholder" />
      </div>
    );
  }
}
