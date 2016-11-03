/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	ReactDOM.render(React.createElement(_app2.default, null), document.getElementById("js-content"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _board = __webpack_require__(2);

	var _board2 = _interopRequireDefault(_board);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

	    _this.state = {
	      size: 10,
	      mines: 10,
	      time: 0,
	      win: 0,
	      game: 0,
	      message: ""
	    };
	    return _this;
	  }

	  App.prototype._renderBoard = function _renderBoard() {
	    var placeholder = this.refs.boardPlaceholder;
	    placeholder.innerHTML = "";
	    ReactDOM.render(React.createElement(_board2.default, { size: this.state.size, mines: this.state.mines }), placeholder);
	  };

	  App.prototype.componentDidMount = function componentDidMount() {
	    this._renderBoard();
	  };

	  App.prototype.handleChangeSize = function handleChangeSize(event) {
	    this.setState({ size: event.target.value });
	  };

	  App.prototype.handleChangeMines = function handleChangeMines(event) {
	    this.setState({ mines: event.target.value });
	  };

	  App.prototype.handleSetBoard = function handleSetBoard() {
	    this._renderBoard();
	  };

	  App.prototype.handleSolve = function handleSolve(times) {
	    var _this2 = this;

	    this.setState({ message: "Solving, please wait.", time: 0, win: 0, game: 0 });
	    var startTime = Date.now();

	    var getTime = function getTime() {
	      return (Date.now() - startTime) / 1000 + " seconds.";
	    };

	    var solveHelper = function solveHelper(times) {
	      if (times > 0) {
	        return Promise.resolve(window._MINESWEEPER.SOLVER.solve()).then(function (result) {
	          _this2.setState({ game: _this2.state.game + 1, time: getTime() });
	          if (result) {
	            _this2.setState({ win: _this2.state.win + 1 });
	          }
	          _this2.handleSetBoard();
	        }).then(function () {
	          setTimeout(function () {
	            solveHelper(times - 1);
	          }, 0);
	        });
	      } else {
	        _this2.setState({
	          time: getTime(),
	          message: ""
	        });
	        return Promise.resolve();
	      }
	    };

	    solveHelper(times);
	  };

	  App.prototype.render = function render() {
	    var _this3 = this;

	    return React.createElement(
	      "div",
	      { className: "board" },
	      React.createElement(
	        "div",
	        { className: "conctroller" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          React.createElement(
	            "span",
	            null,
	            "Grid Size:"
	          ),
	          React.createElement("input", { type: "number", value: this.state.size, min: "1", onChange: this.handleChangeSize.bind(this) }),
	          React.createElement(
	            "span",
	            null,
	            "Mines Number:"
	          ),
	          React.createElement("input", { type: "number", value: this.state.mines, min: "1", onChange: this.handleChangeMines.bind(this) }),
	          React.createElement(
	            "button",
	            { type: "button", onClick: this.handleSetBoard.bind(this) },
	            "Set Board!"
	          ),
	          React.createElement(
	            "button",
	            { type: "button", onClick: function onClick() {
	                return _this3.handleSolve.call(_this3, 100000);
	              } },
	            "Solve it!"
	          ),
	          React.createElement(
	            "span",
	            null,
	            "Won ",
	            this.state.win,
	            " / ",
	            this.state.game,
	            ", time taken: ",
	            this.state.time
	          ),
	          React.createElement(
	            "div",
	            { className: "message" },
	            this.state.message
	          )
	        )
	      ),
	      React.createElement("div", { ref: "boardPlaceholder" })
	    );
	  };

	  return App;
	}(React.Component);

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _cell = __webpack_require__(3);

	var _cell2 = _interopRequireDefault(_cell);

	var _buildBoard = __webpack_require__(5);

	var _buildBoard2 = _interopRequireDefault(_buildBoard);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _Solver = __webpack_require__(7);

	var _Solver2 = _interopRequireDefault(_Solver);

	var _updateNeighbors = __webpack_require__(6);

	var _updateNeighbors2 = _interopRequireDefault(_updateNeighbors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	window._MINESWEEPER = {};
	var SOLVER = void 0;

	var Board = function (_React$Component) {
	  _inherits(Board, _React$Component);

	  function Board(props) {
	    _classCallCheck(this, Board);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.state = {
	      isLost: false,
	      isWon: false
	    };
	    SOLVER = window._MINESWEEPER.SOLVER = new _Solver2.default(props.size, props.mines);
	    _this.board = (0, _buildBoard2.default)(props.size, props.mines);
	    _this.unopen = props.size * props.size;
	    _this.cells = [];
	    return _this;
	  }

	  Board.prototype.handleLost = function handleLost() {
	    this.setState({ isLost: true });
	    window._MINESWEEPER.isLost = true;
	  };

	  Board.prototype.handleClick = function handleClick(cell) {
	    this.clickCell(cell);

	    if (cell.props.isMine) {
	      return this.handleLost();
	    }

	    if (cell.props.bombs === 0) {
	      this.openAround(cell);
	    }

	    if (this.unopen === this.props.mines) {
	      this.setState({ isWon: true });
	      window._MINESWEEPER.isWon = true;
	      return this._renderMessage();
	    }
	  };

	  Board.prototype.clickCell = function clickCell(cell) {
	    if (cell.isClicked) {
	      return;
	    }

	    cell.isClicked = true;
	    this.unopen--;

	    var image = _constants2.default.image.blank;
	    if (!cell.props.isMine) {
	      image = _constants2.default.image.bombs[cell.props.bombs];
	    } else {
	      image = _constants2.default.image.explodedBomb;
	    }

	    cell.setState({
	      img: image
	    });
	  };

	  Board.prototype.openAround = function openAround(cell) {
	    var _this2 = this;

	    this.cells.push(cell);
	    var addCells = function addCells(curr, a, b) {
	      if (!_this2.refs[a + "-" + b].isClicked && _this2.cells.indexOf(_this2.refs[a + "-" + b])) {
	        _this2.cells.push(_this2.refs[a + "-" + b]);
	      }
	    };
	    while (this.cells.length > 0) {
	      var curr = this.cells.pop();
	      this.clickCell(curr);
	      if (curr.props.bombs === 0) {
	        (0, _updateNeighbors2.default)(curr.props, this.props.size, addCells);
	      }
	    }
	  };

	  Board.prototype._renderMessage = function _renderMessage() {
	    if (this.state.isWon) {
	      return React.createElement(
	        "div",
	        { className: "message" },
	        "Congratulations! You have won the game!"
	      );
	    }
	    if (this.state.isLost) {
	      return React.createElement(
	        "div",
	        { className: "message" },
	        "Mmmm... Would you like to try again?"
	      );
	    }
	  };

	  Board.prototype._renderCells = function _renderCells() {
	    var _this3 = this;

	    return this.board.map(function (rows) {
	      return React.createElement(
	        "tr",
	        null,
	        rows.map(function (node) {
	          return React.createElement(_cell2.default, { isLost: _this3.state.isLost,
	            isWon: _this3.state.isWon,
	            ref: node.row + "-" + node.col,
	            id: node.row + "-" + node.col,
	            row: node.row,
	            col: node.col,
	            bombs: node.bombs,
	            isMine: node.isMine,
	            handleClick: _this3.handleClick.bind(_this3)
	          });
	        })
	      );
	    });
	  };

	  Board.prototype.render = function render() {
	    return React.createElement(
	      "div",
	      { className: "borad_Panel" },
	      React.createElement(
	        "div",
	        { className: "message_box" },
	        this._renderMessage()
	      ),
	      React.createElement(
	        "table",
	        null,
	        this._renderCells()
	      )
	    );
	  };

	  return Board;
	}(React.Component);

	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Cell = function (_React$Component) {
	  _inherits(Cell, _React$Component);

	  function Cell(props) {
	    _classCallCheck(this, Cell);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.state = {
	      img: _constants2.default.image.blank
	    };
	    return _this;
	  }

	  Cell.prototype._renderCell = function _renderCell() {
	    var _this2 = this;

	    return React.createElement("img", { id: this.props.id, src: this.state.img, onClick: function onClick() {
	        return _this2.props.handleClick(_this2);
	      } });
	  };

	  Cell.prototype._renderEnd = function _renderEnd() {
	    if (this.props.isLost && !this.isClicked && this.props.isMine) {
	      return React.createElement("img", { id: this.props.id, src: _constants2.default.image.exposedBomb });
	    }
	    return React.createElement("img", { id: this.props.id, src: this.state.img });
	  };

	  Cell.prototype.render = function render() {
	    return React.createElement(
	      "td",
	      null,
	      this.props.isLost || this.props.isWon ? this._renderEnd() : this._renderCell()
	    );
	  };

	  return Cell;
	}(React.Component);

	exports.default = Cell;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = {
	  image: {
	    blank: "http://i.imgur.com/HM1e3Tbb.jpg",
	    pressed: "http://i.imgur.com/bGT8xGEb.jpg",
	    exposedBomb: "http://i.imgur.com/pTJ8Swhb.jpg",
	    explodedBomb: "http://i.imgur.com/UFmXprFb.jpg",
	    flag: "http://i.imgur.com/nLPvW15b.jpg",
	    // Index is # of adjacent bombs
	    bombs: ["http://i.imgur.com/Flqdqi1b.jpg", // 0
	    "http://i.imgur.com/bM8oExob.jpg", // 1
	    "http://i.imgur.com/bQKSbqYb.jpg", // 2
	    "http://i.imgur.com/5jNcEeVb.jpg", // 3
	    "http://i.imgur.com/BnxjHgHb.jpg", // 4
	    "http://i.imgur.com/RaFrMYcb.jpg", // 5
	    "http://i.imgur.com/GlwQOy0b.jpg", // 6
	    "http://i.imgur.com/8ngsVa8b.jpg", // 7
	    "http://i.imgur.com/lJ8P1wab.jpg" // 8
	    ]
	  },
	  UNOPEN: "X",
	  BOMB: "B"
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _updateNeighbors = __webpack_require__(6);

	var _updateNeighbors2 = _interopRequireDefault(_updateNeighbors);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var generateRandom = function generateRandom(n, m) {
	  var random = [];
	  var i = m;
	  while (i > 0) {
	    var curr = Math.ceil(Math.random() * n * n) - 1;
	    if (random.indexOf(curr) < 0) {
	      random.push(curr);
	      i -= 1;
	    }
	  }
	  return random;
	};

	var generateBoard = function generateBoard(n, m) {
	  var random = generateRandom(n, m);
	  var board = [];
	  for (var i = 0; i < n; i += 1) {
	    var row = [];
	    for (var j = 0; j < n; j += 1) {
	      var node = {
	        row: i,
	        col: j,
	        bombs: 0,
	        value: _constants2.default.UNOPEN,
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

	var buildBoard = function buildBoard(n, m) {
	  var board = generateBoard(n, m);
	  var countBombs = function countBombs(node, a, b) {
	    node.unopenAdj += 1;
	    if (board[a][b].isMine) {
	      node.bombs++;
	    }
	  };
	  for (var i = 0; i < n; i += 1) {
	    for (var j = 0; j < n; j += 1) {
	      var node = board[i][j];
	      (0, _updateNeighbors2.default)(node, n, countBombs);
	    }
	  }
	  return board;
	};

	exports.default = buildBoard;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var updateNeighbors = function updateNeighbors(node, n, func) {
	  var x = node.row;
	  var y = node.col;
	  if (x > 0 && y > 0) {
	    func(node, x - 1, y - 1);
	  }
	  if (x > 0) {
	    func(node, x - 1, y);
	  }
	  if (x > 0 && y < n - 1) {
	    func(node, x - 1, y + 1);
	  }
	  if (y > 0) {
	    func(node, x, y - 1);
	  }
	  if (y < n - 1) {
	    func(node, x, y + 1);
	  }
	  if (x < n - 1 && y > 0) {
	    func(node, x + 1, y - 1);
	  }
	  if (x < n - 1) {
	    func(node, x + 1, y);
	  }
	  if (x < n - 1 && y < n - 1) {
	    func(node, x + 1, y + 1);
	  }
	};

	exports.default = updateNeighbors;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _updateNeighbors = __webpack_require__(6);

	var _updateNeighbors2 = _interopRequireDefault(_updateNeighbors);

	var _buildBoard = __webpack_require__(5);

	var _buildBoard2 = _interopRequireDefault(_buildBoard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* globals setTimeout */

	var Solver = function () {
	  function Solver(size, mines) {
	    _classCallCheck(this, Solver);

	    this.size = size;
	    this.unexploredMines = mines;
	    this.isWon = false;
	    this.isLost = false;
	    this._board = (0, _buildBoard2.default)(size, mines);
	    this.unopen = size * size;
	    this.candidates = [];
	    this.cells = [];

	    this.unopenCells = [];
	    for (var i = 0; i < size; i += 1) {
	      this.unopenCells = this.unopenCells.concat(this._board[i]);
	    }
	  }

	  Solver.prototype.handleClick = function handleClick(x, y) {
	    this.clickCell(x, y);
	    if (this._board[x][y].value === 0) {
	      // This cell is blank, open cells around
	      this.openAround(x, y);
	    }

	    if (this.unopen === 0) {
	      this.isWon = true;
	    }
	  };

	  Solver.prototype.removeCellFromUnopen = function removeCellFromUnopen(x, y) {
	    var cells = this.unopenCells;
	    this.unopenCells.some(function (cell, index) {
	      if (cell.row === x && cell.col === y) {
	        cells.splice(index, 1);
	        return true;
	      }
	      return false;
	    });
	  };

	  Solver.prototype.clickCell = function clickCell(x, y) {
	    if (this._board[x][y].isMine) {
	      // Bomb is clicked, game LOST
	      this.isLost = true;
	      return;
	    }

	    this.removeCellFromUnopen(x, y);

	    if (this._board[x][y].value !== _constants2.default.UNOPEN) {
	      // This cell has been clicked or marked as bomb
	      return;
	    }

	    this._board[x][y].value = this._board[x][y].bombs;
	    this.unopen -= 1;
	    this.reduceUnopenAdj(x, y);
	  };

	  Solver.prototype.openAround = function openAround(x, y) {
	    var _this = this;

	    var addCell = function addCell(cell, a, b) {
	      if (_this._board[a][b].value === _constants2.default.UNOPEN && _this.cells.indexOf(_this._board[a][b]) < 0) {
	        _this.cells.push(_this._board[a][b]);
	      }
	    };

	    (0, _updateNeighbors2.default)(this._board[x][y], this.size, addCell);

	    while (this.cells.length > 0) {
	      var target = this.cells.pop();
	      this.handleClick(target.row, target.col);
	      if (target.value === 0) {
	        (0, _updateNeighbors2.default)(this._board[target.row][target.col], this.size, addCell);
	      }
	    }
	  };

	  Solver.prototype.reduceUnopenAdj = function reduceUnopenAdj(x, y) {
	    var _this2 = this;

	    var reduceAdj = function reduceAdj(cell, a, b) {
	      if (cell.value === _constants2.default.BOMB) {
	        _this2._board[a][b].markedBombs += 1;
	      }
	      _this2._board[a][b].unopenAdj -= 1;
	    };
	    (0, _updateNeighbors2.default)(this._board[x][y], this.size, reduceAdj);
	  };

	  Solver.prototype.analyze = function analyze() {
	    for (var x = 0; x < this.size; x += 1) {
	      for (var y = 0; y < this.size; y += 1) {
	        if (this._board[x][y].value > 0 && this._board[x][y].unopenAdj > 0 && this._board[x][y].value - this._board[x][y].markedBombs === this._board[x][y].unopenAdj) {
	          //If the number of unkonwn cells equals the number of unexplored mines, those cells can be marked as mines
	          (0, _updateNeighbors2.default)(this._board[x][y], this.size, this.markBomb.bind(this));
	        }
	        if (this._board[x][y].value > 0 && this._board[x][y].value === this._board[x][y].markedBombs) {
	          // If all surrounding mines are marked, we can open the rest of surrounding cells
	          this.openAround(x, y);
	        }
	      }
	    }
	  };

	  Solver.prototype.markBomb = function markBomb(cell, a, b) {
	    if (this._board[a][b].value === _constants2.default.UNOPEN) {
	      this._board[a][b].value = _constants2.default.BOMB;
	      this.removeCellFromUnopen(a, b);
	      this.unopen -= 1;
	      this.unexploredMines -= 1;
	      this.reduceUnopenAdj(a, b);
	    }
	  };

	  Solver.prototype.getRandomCell = function getRandomCell() {
	    while (true) {
	      // eslint-disable-line no-constant-condition
	      if (this.unopenCells.length === 0) {
	        break;
	      }

	      var random = Math.floor(Math.random() * this.unopenCells.length);
	      if (this.unopenCells[random]) {
	        return [this.unopenCells[random].row, this.unopenCells[random].col];
	      }
	    }
	    return [];
	  };

	  Solver.prototype.solve = function solve() {
	    var _this3 = this;

	    return new Promise(function (resolve) {
	      if (_this3.unopen === 0 || _this3.unopenCells.length === 0) {
	        return resolve(true);
	      }

	      var coords = _this3.getRandomCell();
	      _this3.handleClick(coords[0], coords[1]);

	      if (_this3.isWon) {
	        return resolve(true);
	      }

	      if (_this3.isLost) {
	        return resolve(false);
	      }

	      _this3.analyze();

	      return setTimeout(function () {
	        return resolve(_this3.solve());
	      }, 0);
	    });
	  };

	  return Solver;
	}();

	exports.default = Solver;

/***/ }
/******/ ]);