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
	                setColor(point, "");
	            };

            this.width = width;
            this.height = height;

            // initialize board to empty
            Board.prototype.init = function init() {
                var col, i, j;
                for (i = 0; i < width; ++i) {
                    col = [];
                    for (j = 0; j < height; ++j) {
                        col.push({ color : null });
                    }

                    _state.push(col);
                }
                initialized = true;
            };


            // point : {x, y}, checker = "black" || "white"
            Board.prototype.setChecker = function setChecker(point, color) {
                var x, y, col, occupant;
                // board not initialized
                if (!initialized) {
                    return false;
                }
                // invalid params
                if (!utils.validateColor(color) || !utils.validatePoint(point)) {
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

                if (!utils.validatePoint(point)) {
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
        }
	};
