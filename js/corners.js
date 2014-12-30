var black = "BLACK", white = "WHITE";
var utils = utils || {
    validatePoint : function validatePoint(point, w, h) {
        'use strict';

        if (!point.hasOwnProperty("x") || !point.hasOwnProperty("y")) {
            return false;
        }
        if (point.x < 0 || point.x >= w || point.y < 0 || point.y >= h) {
            return false;
        }

        return true;
    },
    validateColor : function validateColor(color) {
        'use strict';
        return color === black || color === white;
    }
};
var Corners = Corners || {
        // define board that exposes state object, functions : init(), setChecker(point, checker), pickChecker(point)
        Board : function Board(width, height) {
            'use strict';

            this.width = width || 8;
            this.height = height || 8;

            if(this.width <= 0 || this.height <= 0) {
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
                for (i = 0, w = this.width; i < w; ++i) {
                    col = [];
                    for (j = 0, h = this.height; j < h; ++j) {
                        col.push({ color : null });
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
        Player : function Player(board, color) {
            'use strict';
            this.color = color || "WHITE";
            this.board = board;

            if (!utils.validateColor(this.color)) {
                throw new Error("Invalid Player color '" + this.color + "'");
            }

            if (!this.board || !this.board.init()) {
                throw new Error("Invalid Player board");
            }

            this.board.playerName = "lxgreen " + this.color;

            Player.prototype.makeMove = function makeMove(pointFrom, pointTo) {

                var checker = board.getChecker(pointFrom);

                if (checker !== this.color) {
                    return false;
                }

                if (!board.setChecker(pointTo, checker)) {
                    return false;
                }

                return board.pickChecker(pointFrom);


            };
        }
	};
