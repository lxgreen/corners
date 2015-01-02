var black = "BLACK",
    white = "WHITE";

var utils = utils || {
    validatePoint: function validatePoint(point, w, h) {
        'use strict';

        w = w || 8;
        h = h || 8;

        if (w <= 0 || h <= 0) {
            throw new Error("Invalid Board dimensions");
        }

        if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
            return false;
        }
        if (point.x < 0 || point.x >= w || point.y < 0 || point.y >= h) {
            return false;
        }

        return true;
    },
    validateColor: function validateColor(color) {
        'use strict';
        return color === black || color === white;
    }
};
var Corners = Corners || {
    // define board that exposes state object, functions : init(), setChecker(point, checker), pickChecker(point)
    Board: function Board(width, height) {
        'use strict';

        this.width = width || 8;
        this.height = height || 8;

        if (this.width <= 0 || this.height <= 0) {
            throw new Error("Invalid Board dimensions");
        }

        var _state = [],

            initialized = false,

            getColor = function getColor(point) {
                var col = _state[point.x];
                return col[point.y].color;
            },

            setColor = function setColor(point, color) {
                var col = _state[point.x];
                col[point.y].color = color;
            },

            resetColor = function resetColor(point) {
                setColor(point, null);
            };

        // initialize board to empty
        Board.prototype.init = function initBoard() {
            var col, i, j, w, h;
            _state = [];
            for (i = 0, w = this.width; i < w; i += 1) {
                col = [];
                for (j = 0, h = this.height; j < h; j += 1) {
                    col.push({
                        color: null
                    });
                }

                _state.push(col);
            }

            initialized = true;

            return initialized;
        };


        // point : {x, y}, checker = "black" || "white"
        Board.prototype.setChecker = function setChecker(point, color) {
            var x, y, col, occupant;
            // board not initialized
            if (!initialized) {
                throw new Error("Board should be initialized before setChecker call.");
            }
            // invalid params
            if (!utils.validateColor(color) || !utils.validatePoint(point, this.width, this.height)) {
                return false;
            }

            occupant = getColor(point);
            // cell is occupied
            if (occupant === black || occupant === white) {
                return false;
            }
            setColor(point, color);
            return true;
        };

        Board.prototype.getChecker = function getChecker(point) {
            if (!initialized) {
                throw new Error("Board should be initialized before getChecker call.");
            }

            if (!utils.validatePoint(point, this.width, this.height)) {
                return false;
            }

            var color = getColor(point);

            return color;
        };

        // removes and returns checker at point
        Board.prototype.pickChecker = function pickChecher(point) {

            var color = this.getChecker(point);

            if (!utils.validateColor(color)) {
                return false;
            }

            resetColor(point);

            return color;

        };

        Board.prototype.isFreeCell = function isFreeCell(point) {
            if (!utils.validatePoint(point)) {
                throw new Error("Invalid point");
            }
            return !getColor(point);
        };

        Board.prototype.state = function state() {
            return _state;
        };
    },

    Point: function Point(x, y) {
        'use strict';
        this.x = x;
        this.y = y;

        Point.prototype.equalsTo = function equalsToPoint(point) {
            return this.x === point.x &&
                this.y === point.y;
        };
    },

    Move: function Move(pointFrom, pointTo, color) {
        'use strict';
        this.pointFrom = pointFrom;
        this.pointTo = pointTo;
        this.color = color;

        Move.prototype.equalsTo = function equalsToMove(move) {
            return this.pointFrom.equalsTo(move.pointFrom) &&
                this.pointTo.equalsTo(move.pointTo);
        };


    },

    // define base player having color and game
    Player: function Player(game, color) {
        'use strict';
        this.color = color || "WHITE";
        this.game = game;

        if (!utils.validateColor(this.color)) {
            throw new Error("Invalid Player color '" + this.color + "'");
        }

        if (!this.game || !this.game.nextMove || !this.game.board) {
            throw new Error("Invalid Player Game");
        }

        if (this.color === white) {
            this.game.player1 = this;
        } else {
            this.game.player2 = this;
        }

        Player.prototype.makeMove = function makeMove() {
            // abstract
            return new Corners.Move(new Corners.Point(0, 0), new Corners.Point(1, 1), this.color);
        };
    },

    GameState: {
        INIT : "INIT",
        INGAME : "INGAME",
        DRAW : "DRAW",
        PLAYER1WIN : "PLAYER1WIN",
        PLAYER2WIN : "PLAYER2WIN"
    },

    Game: function Game() {
        "use strict";

        this.player1 = null;
        this.player2 = null;
        this.board = new Corners.Board();

        this.state = Corners.GameState.INIT;

        var currentPlayer = null;

        Game.prototype.isAdjacentLegalMove = function isAdjacentLegalMove(move) {
            return move.pointFrom.equalsTo(new Corners.Point(move.pointTo.x - 1, move.pointTo.y)) ||
                move.pointFrom.equalsTo(new Corners.Point(move.pointTo.x + 1, move.pointTo.y)) ||
                move.pointFrom.equalsTo(new Corners.Point(move.pointTo.x, move.pointTo.y - 1)) ||
                move.pointFrom.equalsTo(new Corners.Point(move.pointTo.x, move.pointTo.y + 1));
        };

        Game.prototype.isHopLegalMove = function isHopLegalMove(move) {
            var pointToRight = new Corners.Point(move.pointFrom.x + 1, move.pointFrom.y),
                pointToLeft = new Corners.Point(move.pointFrom.x - 1, move.pointFrom.y),
                pointToUp = new Corners.Point(move.pointFrom.x, move.pointFrom.y - 1),
                pointToDown = new Corners.Point(move.pointFrom.x, move.pointFrom.y + 1),
                pointNextToRight,
                pointNextToLeft,
                pointNextToUp,
                pointNextToDown;


            if (utils.validatePoint(pointToRight, this.board.width, this.board.height) && !this.board.isFreeCell(pointToRight)) {

                pointNextToRight = new Corners.Point(pointToRight.x + 1, pointToRight.y);

                if (utils.validatePoint(pointNextToRight, this.board.width, this.board.height) && this.board.isFreeCell(pointNextToRight)) {
                    return move.pointTo.equalsTo(pointNextToRight) || isHopLegalMove(new Corners.Move(pointNextToRight, move.pointTo, move.color));
                }
            }
            if (utils.validatePoint(pointToLeft, this.board.width, this.board.height) && !this.board.isFreeCell(pointToLeft)) {

                pointNextToLeft = new Corners.Point(pointToLeft.x - 1, pointToLeft.y);

                if (utils.validatePoint(pointNextToLeft, this.board.width, this.board.height) && this.board.isFreeCell(pointNextToLeft)) {
                    return move.pointTo.equalsTo(pointNextToLeft) || isHopLegalMove(new Corners.Move(pointNextToLeft, move.pointTo, move.color));
                }
            }
            if (utils.validatePoint(pointToUp, this.board.width, this.board.height) && !this.board.isFreeCell(pointToUp)) {

                pointNextToUp = new Corners.Point(pointToUp.x, pointToUp.y - 1);

                if (utils.validatePoint(pointNextToUp, this.board.width, this.board.height) && this.board.isFreeCell(pointNextToUp)) {
                    return move.pointTo.equalsTo(pointNextToUp) || isHopLegalMove(new Corners.Move(pointNextToUp, move.pointTo, move.color));
                }
            }
            if (utils.validatePoint(pointToDown, this.board.width, this.board.height) && !this.board.isFreeCell(pointToDown)) {

                pointNextToDown = new Corners.Point(pointToDown.x, pointToDown.y + 1);

                if (utils.validatePoint(pointNextToDown, this.board.width, this.board.height) && this.board.isFreeCell(pointNextToDown)) {
                    return move.pointTo.equalsTo(pointNextToDown) || isHopLegalMove(new Corners.Move(pointNextToDown, move.pointTo, move.color));
                }
            }

            return false;
        };

        Game.prototype.isLegalMove = function isLegalMove(move) {
            var isValid = true;

            isValid = isValid &&
                (this.isAdjacentLegalMove(move) ||
                 this.isHopLegalMove(move));


            return isValid;

        };

        Game.prototype.validateMove = function validateMove(move) {
            var isValid = true;

            isValid = isValid &&
                utils.validateColor(move.color) &&
                utils.validatePoint(move.pointFrom, this.board.width, this.board.height) &&
                utils.validatePoint(move.pointTo, this.board.width, this.board.height);

            isValid = isValid &&
                this.board.getChecker(move.pointFrom) === move.color;

            isValid = isValid &&
                this.board.isFreeCell(move.pointTo);

            isValid = isValid &&
                this.isLegalMove(move);

            return isValid;
        };

        Game.prototype.positionCheckers = function positionCheckers() {
            var success = true,
                i,
                j,
                checkersInRow = 4,
                checkersRows = 3;

            //                for (i = 0; i < checkersRows; i++) {
            //
            //                }

            return success;
        };

        Game.prototype.init = function initGame() {
            if (!this.player1 || !this.player2 || this.player1.color !== white || this.player2.color !== black) {
                throw new Error("Game should get valid Players before initialization");
            }

            var success = true;

            success = success && this.board.init() && this.positionCheckers();

            if (success) {
                currentPlayer = this.player1;
                this.state = Corners.GameState.INGAME;
            }

            return success;
        };

        Game.prototype.nextMove = function nextMove() {

            var success = this.state === Corners.GameState.INGAME,
                move,
                checker;

            if (!success) {
                throw new Error("Game should be initialized before player moves.");
            }

            move = currentPlayer.makeMove();

            success = success && this.validateMove(move);

            if (success) {
                checker = this.board.pickChecker(move.pointFrom);
                this.board.setChecker(move.pointTo, checker);
                currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
            }

            return success;
        };
    }
};
