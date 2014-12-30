var black = "BLACK",
    white = "WHITE";
var utils = utils || {
    validatePoint: function validatePoint(point, w, h) {
        'use strict';

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
        Board.prototype.init = function init() {
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
                return false;
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
                return false;
            }

            if (!utils.validatePoint(point, this.width, this.height)) {
                return false;
            }

            var color = getColor(point);

            return color;
        };

        // removes and returns checker at point
        Board.prototype.pickChecker = function pickChecher(point) {

            var color = Board.prototype.getChecker(point);

            if (!utils.validateColor(color)) {
                return false;
            }

            resetColor(point);

            return color;

        };

        this.state = function state() {
            return _state;
        };
    },

    Player: function Player(game, color) {
        'use strict';
        this.color = color || "WHITE";
        this.game = game;

        if (!utils.validateColor(this.color)) {
            throw new Error("Invalid Player color '" + this.color + "'");
        }

        if (!this.game || !this.game.validateMove || !this.game.board) {
            throw new Error("Invalid Player Game");
        }

        if (this.color === white) {
            this.game.player1 = this;
        } else {
            this.game.player2 = this;
        }

        Player.prototype.getMove = function getMove() {
            // abstract
            return {
                pointFrom: {
                    x: 0,
                    y: 0
                },
                pointTo: {
                    x: 1,
                    y: 1
                }
            };
        };

        Player.prototype.makeMove = function makeMove() {

            var move = this.getMove();
            return this.game.validateMove(this, move);
        };
    },

    Game: function Game() {
        "use strict";

        this.player1 = null;
        this.player2 = null;
        this.board = new Corners.Board();

        Game.prototype.positionCheckers = function positionCheckers() {
            var success = true,
                i, j,
                checkersInRow = 4,
                checkersRows = 3;

            //                for (i = 0; i < checkersRows; i++) {
            //
            //                }

            return success;
        };

        Game.prototype.init = function init() {
            if(!this.player1 || !this.player2 || this.player1.color !== white || this.player2.color !== black) {
                throw new Error("Game should get valid Players before initialization");
            }

            var success = true;
            success = success && this.board.init();
            success = success && this.positionCheckers();

            return success;
        };

        Game.prototype.validateMove = function validateMove(player, move) {
            var isValid = true;

            return isValid;
        };

        Game.prototype.getValidMoves = function getValidMoves(player) {
            var validMoves = [];

            return validMoves;
        };
    }
};
