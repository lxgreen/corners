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

    validateTile: function validateTile(tile, isNullable) {
        'use strict';
        if (tile !== null) { // it's possible to have null tile
            return utils.validateId(tile.id);
        } else {
            return !!isNullable;
        }
    },

    validateCell: function validateCell(cell) {
        'use strict';
        return !!cell && utils.validateId(cell.id) && utils.validatePoint(cell.point) && utils.validateTile(cell.tile, true);
    },

    validateId: function validateId(id) {
        'use strict';
        var isValid = !!id && (typeof id === "string"), idNum, num;

        if (isValid) {
            idNum = id.replace("c", "").replace("t", "");
            num = parseInt(idNum, 8);   //OCTAL!
            isValid = isValid && !isNaN(num) && (num >= 0) && (num < 64);
        }

        return isValid;
    },

    iterator: function (collection) {
        'use strict';
        var index = 0;

        if (!collection || !collection.length) {
            return null;
        } else {
            return {
                next: function () {
                    if (index++ < collection.length) {
                        return collection[index];
                    } else {
                        return null;
                    }
                },

                previous: function () {
                    if (index-- >= 0) {
                        return collection[index];
                    } else {
                        return null;
                    }
                },

                start: function () {
                    index = 0;
                    return collection[0];
                },

                end: function () {
                    return index === collection.length;
                }
            };
        }
    },

    BOARD_PATTERN : "   0  1  2  3  4  5  6  7\n  ╔══╦══╦══╦══╦══╦══╦══╦══╗\n 0║00║01║02║03║04║05║06║07║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 1║10║11║12║13║14║15║16║17║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 2║20║21║22║23║24║25║26║27║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 3║30║31║32║33║34║35║36║37║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 4║40║41║42║43║44║45║46║47║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 5║50║51║52║53║54║55║56║57║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 6║60║61║62║63║64║65║66║67║\n  ╠══╬══╬══╬══╬══╬══╬══╬══╣\n 7║70║71║72║73║74║75║76║77║\n  ╚══╩══╩══╩══╩══╩══╩══╩══╝"
};


var Corners = Corners || {
    // define board that exposes state object, functions : init(), setTile(point, tile), pickTile(point)
    Board: function Board(w, h) {
        'use strict';

        var width = w || 8,
            height = h || 8,
            movesCount = 0,
            cells = [],
            initialized = false,

            getCell = function getCell(x, y) {
                var col = cells[x];
                return col[y];
            };

        if (this.width <= 0 || this.height <= 0) {
            throw new Error("Invalid Board dimensions");
        }

        Object.defineProperties(this, {
            "width": {
                "get": function () { return width; }
            },
            "height": {
                "get": function () { return height; }
            },
            "movesCount": {
                "get": function () { return movesCount; }
            }
        });

        // initialize board to empty
        Board.prototype.init = function initBoard() {
            var col, i, j, w, h, point;
            cells = [];
            for (i = 0, w = this.width; i < w; i += 1) {
                col = [];
                for (j = 0, h = this.height; j < h; j += 1) {
                    point = new Corners.Point(i, j);
                    col.push(new Corners.Cell(point));
                }

                cells.push(col);
            }

            initialized = true;

            return initialized;
        };

        Board.prototype.setTile = function setTile(x, y, tile) {


            var col,
                occupant,
                cell,
                point;

            if (utils.validatePoint(x) && utils.validateTile(y) && typeof tile === "undefined") {
                tile = y;
                point = x;
                x = point.x;
                y = point.y;
            }

            // board not initialized
            if (!initialized) {
                throw new Error("Board should be initialized before setTile call");
            }

            cell = getCell(x, y);

            // invalid params
            if (!utils.validateTile(tile, true) || !utils.validateCell(cell)) {
                return false;
            }

            occupant = cell.tile;

            // cell is occupied
            if (occupant !== null) {
                return false;
            }

            cell.tile = tile;

            return true;
        };


        Board.prototype.getTile = function getTile(x, y) {

            var cell, point;

            if (utils.validatePoint(x) && typeof y === "undefined") {
                point = x;
                x = point.x;
                y = point.y;
            }

            if (!initialized) {
                throw new Error("Board should be initialized before getTile call");
            }

            cell = getCell(x, y);

            if (!utils.validateCell(cell)) {
                return false;
            }

            return cell.tile;
        };

        // removes and returns tile at point
        Board.prototype.pickTile = function pickTile(x, y) {

            var cell, point, tile;

            if (utils.validatePoint(x) && typeof y === "undefined") {
                point = x;
                x = point.x;
                y = point.y;
            }

            tile = this.getTile(x, y);

            if (!utils.validateTile(tile)) {
                return false;
            }

            cell = getCell(x, y);

            cell.tile = null;

            return tile;

        };

        Board.prototype.isFreeCell = function isFreeCell(x, y) {

            var point;

            if (utils.validatePoint(x) && typeof y === "undefined") {
                point = x;
                x = point.x;
                y = point.y;
            }

            point = new Corners.Point(x, y);
            if (!utils.validatePoint(point)) {
                throw new Error("Invalid point");
            }
            return !getCell(point);
        };

        Board.prototype.state = function state() {
            return cells;
        };

        Board.prototype.makeMove = function boardMakeMove(move) {
            this.movesCount += 1;
            var tile = this.pickTile(move.pointFrom);
            this.setTile(move.pointTo, tile);
            this.log();
        };

        Board.prototype.toString = function boardToString() {
            var i,
                j,
                col,
                result = utils.BOARD_PATTERN;
            for (i = 0; i < 8; i += 1) {
                col = cells[i];
                for (j = 0; j < 8; j += 1) {
                    result = result.replace(j + "" + i, col[j].tile === null ? "  " : col[j].tile.id.replace("t", ""));
                }
            }

            return result;
        };

        Board.prototype.log = function boardLog() {
            console.group("MOVE " + this.movesCount);
            console.log(this.toString());
            console.groupEnd();
        };
    },

    Cell: function Cell(point) {
        'use strict';

        if (!utils.validatePoint(point)) {
            throw new Error("Invalid Cell point");
        }
        var p = point,
            id = "c" + point.x + point.y;

        this.tile = null;

        Object.defineProperties(this, {
            "point": {
                "get": function () { return p; }
            },
            "id": {
                "get": function () { return id; }
            }
        });

        Cell.prototype.isFree = function isFreeCell() {
            return this.tile === null;
        };

        Cell.prototype.setTile = function setCellTile(tile) {
            if (utils.validateTile(tile)) {
                this.tile = tile;
            }
        };
    },

    Point: function Point(x, y) {
        'use strict';
        var xCoord = x,
            yCoord = y;

        Object.defineProperties(this, {
            "x": {
                "get": function () { return x; }
            },
            "y": {
                "get": function () { return y; }
            }
        });

        Point.prototype.equalsTo = function equalsToPoint(point) {
            return this.x === point.x &&
                this.y === point.y;
        };
    },

    Move: function Move(pointFrom, pointTo, tile) {
        'use strict';

        if (!utils.validateTile(tile) || !utils.validatePoint(pointFrom) || !utils.validatePoint(pointTo)) {
            throw new Error("Invalid move params");
        }

        var pFrom = pointFrom,
            pTo = pointTo,
            t = tile;

        Object.defineProperties(this, {
            "pointFrom": {
                "get": function () { return pFrom; }
            },
            "pointTo": {
                "get": function () { return pTo; }
            },
            "tile": {
                "get": function () { return t; }
            }
        });

        Move.prototype.equalsTo = function equalsToMove(move) {
            return this.pointFrom.equalsTo(move.pointFrom) &&
                this.pointTo.equalsTo(move.pointTo);
        };


    },

    Tile: function Tile(id) {
        'use strict';

        this.image = null;
        var identificator = id;

        Object.defineProperties(this, {
            "id": {
                "get": function () { return identificator; }
            }
        });
    },

    // define base player having name and tiles
    Player: function Player(name) {
        'use strict';

        if (!name || name === "") {
            throw new Error("Invalid player name");
        }

        var n = name.toString(),
            tiles = [];

        Object.defineProperties(this, {
            "name": {
                "get": function () { return n; }
            },

            "tiles": {
                "get": function () { return tiles; }
            }
        });

        Player.prototype.addTile = function addPlayerTile(tile) {
            if (!utils.validateTile(tile)) {
                throw new Error("Invalid player tile");
            }
            tiles.push(tile);
        };

        Player.prototype.makeMove = function makeMove() {
            // abstract
            return new Corners.Move(new Corners.Point(0, 0), new Corners.Point(1, 1), tiles[0]);
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

        var player1 = null,
            player2 = null,
            ui = null,
            board = new Corners.Board(),
            state = Corners.GameState.INIT,
            currentPlayer = null;

        Object.defineProperties(this, {
            "board": {
                "get": function () { return board; }
            },
            "state": {
                "get": function () { return state; }
            },
            "player1": {
                "get": function () { return player1; }
            },
            "player2": {
                "get": function () { return player2; }
            },
            "ui": {
                "get": function () { return ui; }
            }
        });


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
                !move.pointFrom.equalsTo(move.pointTo);

            isValid = isValid &&
                (this.isAdjacentLegalMove(move) ||
                 this.isHopLegalMove(move));
            return isValid;
        };

        Game.prototype.validateMove = function validateMove(move) {
            var isValid = true,
                tile = this.board.getTile(move.pointFrom);

            isValid = isValid &&
                 tile.id === move.tile.id;

            isValid = isValid &&
                this.board.isFreeCell(move.pointTo);

            isValid = isValid &&
                this.isLegalMove(move);

            return isValid;
        };

        // TODO UPDATE
        Game.prototype.positionTiles = function positionTiles(tiles) {
            var success = true,
                i,
                j,
                tilesInRow = 3,
                tilesRows = 4;

            if (this.state !== Corners.GameState.INIT) {
                throw new Error("positionTiles() should be called within game initialization only");
            }

            for (i = 0; i < tilesRows; i += 1) {
                for (j = 0; j < tilesInRow; j += 1) {
                    success = success && this.board.setTile(new Corners.Point(i, j), Corners.GameColor.WHITE) &&
                        this.board.setTile(new Corners.Point(this.board.width - 1 - i, this.board.height - 1 - j), Corners.GameColor.BLACK);
                }
            }

            if (success) {
                this.board.log();
            }

            return success;
        };

        // TODO UPDATE
        Game.prototype.isOver = function gameIsOver() {
            var whiteWin = true,
                blackWin = true,
                i,
                j,
                tilesInRow = 3,
                tilesRows = 4;


            if (this.state !== Corners.GameState.INGAME) {
                throw new Error("isOver() should be called within game in progress only");
            }

            // TODO UPDATE
            for (i = 0; i < tilesRows; i += 1) {
                for (j = 0; j < tilesInRow; j += 1) {
                    blackWin = blackWin && this.board.getTile(new Corners.Point(i, j)) === Corners.GameColor.BLACK;
                    whiteWin = whiteWin && this.board.getTile(new Corners.Point(this.board.width - 1 - i, this.board.height - 1 - j)) === Corners.GameColor.WHITE;
                    if (!blackWin && !whiteWin) {
                        break;
                    }
                }
                if (!blackWin && !whiteWin) {
                    break;
                }
            }

            // TODO: bug in case of player1 completes the game, and player2 has 1 move to complete
            if (whiteWin) {
                if (blackWin) {
                    this.state = Corners.GameState.DRAW;
                } else {
                    this.state = Corners.GameState.PLAYER1WIN;
                }
            } else if (blackWin) {
                this.state = Corners.GameState.PLAYER2WIN;
            }

            return this.state !== Corners.GameState.INGAME;
        };

        Game.prototype.init = function initGame() {
            if (!this.ui || !this.player1 || !this.player2) {
                throw new Error("Game should get valid Players and UI element before initialization");
            }

            var success = true;

            success = success && this.board.init() && this.positionTiles(this.player1.tiles) && this.positionTiles(this.player2.tiles);

            if (success) {
                currentPlayer = this.player1;
                this.state = Corners.GameState.INGAME;
            }

            return success;
        };

        Game.prototype.nextMove = function nextMove() {

            var success = this.state === Corners.GameState.INGAME,
                move;

            if (!success) {
                throw new Error("Game should be initialized before player moves");
            }

            move = currentPlayer.makeMove();

            success = success && this.validateMove(move);

            if (success) {
                this.board.makeMove(move);
                currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
            }

            return success;
        };

        Game.prototype.start = function gameStart(player1, player2, ui) {
            this.player1 = player1;
            this.player2 = player2;
            this.ui = ui;

            this.init();

            var gameStarted,
                gameOver,
                gameMove;

            gameStarted = new CustomEvent("gameStarted", {
                detail: {
                    player1 : this.player1,
                    player2 : this.player2
                },
                bubbles: true,
                cancelable: false
            });

            this.ui.dispatchEvent(gameStarted);

            while (!this.isOver()) {
                if (this.nextMove()) {
                    gameMove = new CustomEvent("gameMove", {
                        detail : {
                            board : this.board.state(),
                            player : currentPlayer,
                            moveCount : this.board.movesCount
                        },
                        bubbles: true,
                        cancelable: false
                    });

                    this.ui.dispatchEvent(gameMove);
                }
                if (this.nextMove()) {
                    gameMove = new CustomEvent("gameMove", {
                        detail : {
                            board : this.board.state(),
                            player : currentPlayer,
                            moveCount : this.board.movesCount
                        },
                        bubbles: true,
                        cancelable: false
                    });

                    this.ui.dispatchEvent(gameMove);
                }

            }

            gameOver = new CustomEvent("gameOver", {
                detail : {
                    gameState : this.state
                },
                bubbles: true,
                cancelable: false
            });

            this.ui.dispatchEvent(gameOver);

        };
    }
};
