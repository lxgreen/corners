
describe("BOARD API", function() {
    var board = new Corners.Board();

    it("should define board object", function() {
        expect(board).toBeDefined();
    });
    it("should define board dimentions", function() {
        expect(board.width).toEqual(8);
        expect(board.height).toEqual(8);
    });
    it("should expose init() method", function(){
        expect(typeof board.init).toBe("function");
    });
    it("should expose getTile() method", function(){
        expect(typeof board.getTile).toBe("function");
    });
    it("should expose setTile() method", function(){
        expect(typeof board.setTile).toBe("function");
    });
    it("should expose pickTile() method", function(){
        expect(typeof board.pickTile).toBe("function");
    });
    it("should expose state() method", function(){
        expect(typeof board.state).toBe("function");
    });
    it("should not expose cells object", function(){
        expect(board.cells).toBeUndefined();
    });
    it("should not expose getCell() method", function(){
        expect(board.getCell).toBeUndefined();
    });
});

describe("board.init() + board.state() functionality", function() {
    var board = new Corners.Board();

    it("should return empty array before init() call", function() {
        expect(board.state()).toEqual([]);
    });

    it("should return 8x8 object {point: {x,y}, tile: null, id:\"cxy\"} array after init() call", function() {
        board.init();

        var state = board.state(),
            col = state[7],
            cell = col[7],
            point = cell.point,
            tile = cell.tile,
            id = cell.id;

        expect(state.length).toEqual(8);
        expect(col.length).toEqual(8);
        expect(point).toEqual(new Corners.Point(7,7));
        expect(tile).toBeNull();
        expect(id).toBe("c77");
    });
});

describe("board.getTile() + board.setTile() + board.pickTile() functionality", function() {
    var board = new Corners.Board(),
        tile00 = new Corners.Tile("imageMock", "t00"),
        tile11 = new Corners.Tile("imageMock", "t11");

    board.init();

    it("should get null tile at {7, 7} before setTile() call", function() {
        expect(board.getTile(7, 7)).toBeNull();
    });
    it("should succeed to set tile00 at {7, 7}", function() {
        expect(board.setTile(7, 7, tile00)).toBeTruthy();
    });
    it("should succeed to get tile at {7, 7} after setTile() call", function() {
        expect(board.getTile(7, 7)).toEqual(tile00);
    });
    it("should fail to set tile at {7, 7} after setTile() call", function() {
        expect(board.setTile(7, 7, tile11)).toBeFalsy();
    });
    it("should succeed to pick tile from {7, 7} after setTile() call", function() {
        expect(board.pickTile(7, 7)).toEqual(tile00);
    });
    it("should fail to get tile at {7, 7} after pickTile() call", function() {
        expect(board.getTile(7, 7)).toBeNull();
    });
    it("should succeed to set tile at 7, 7} after pickTile() call", function() {
        expect(board.setTile(7, 7, tile11)).toBeTruthy();
    });
    it("should succeed to get tile at {7, 7} after setTile() call", function() {
        expect(board.getTile(7, 7)).toEqual(tile11);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("UTILS API", function() {
    it("should expose validatePoint() method", function() {
        expect(typeof utils.validatePoint).toBe("function");
    });
    it("should expose validateId() method", function() {
        expect(typeof utils.validateId).toBe("function");
    });
    it("should expose validateCell() method", function() {
        expect(typeof utils.validateCell).toBe("function");
    });
    it("should expose validateTile() method", function() {
        expect(typeof utils.validateTile).toBe("function");
    });
    it("should expose validateImage() method", function() {
        expect(typeof utils.validateImage).toBe("function");
    });
});

describe("utils.validatePoint functionality", function() {
    it("should validate point {x : 5, y : 0} vs 8x8", function() {
        expect(utils.validatePoint({x : 5, y : 0}, 8, 8)).toBeTruthy();
    });
    it("should fail point {x : -5, y : 5}  vs 8x8", function() {
        expect(utils.validatePoint({x : -5, y : 5}, 8, 8)).toBeFalsy();
    });
    it("should fail point {x : 5, y : 8}  vs 8x8", function() {
        expect(utils.validatePoint({x : 5, y : 8}, 8, 8)).toBeFalsy();
    });
});

describe("utils.validateId functionality", function() {
    it("should validate id 'c00'", function() {
        expect(utils.validateId("c00")).toBeTruthy();
    });
    it("should validate id 't77'", function() {
        expect(utils.validateId("t77")).toBeTruthy();
    });
    it("should fail id '-5'", function() {
        expect(utils.validateId("-5")).toBeFalsy();
    });
    it("should fail id ''", function() {
        expect(utils.validateId("")).toBeFalsy();
    });
});

describe("utils.validateCell functionality", function() {
    it("should validate cell { id : \"c00\", tile : null, point : {0, 0} }", function() {
        var cell = new Corners.Cell(new Corners.Point(0, 0));
        expect(utils.validateCell(cell)).toBeTruthy();
    });
    it("should validate cell { id : \"c77\", tile : { id : 't00', image : mock}, point : {7, 7} }", function() {
        var cell = new Corners.Cell(new Corners.Point(7, 7));
        cell.tile = new Corners.Tile("mockImage", "t00");
        expect(utils.validateCell(cell)).toBeTruthy();
    });
    it("should fail cell with id '-5'", function() {
        var cell = new Corners.Cell(new Corners.Point(0, 0));
        cell.id = -5;
        expect(utils.validateCell(cell)).toBeFalsy();
    });
    it("should fail null cell", function() {
        expect(utils.validateCell(null)).toBeFalsy();
    });
});

describe("utils.validateTile functionality", function() {
});

describe("utils.validateImage functionality", function() {
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("PLAYER API", function() {
    var agame = new Corners.Game(),
        whitePlayer = new Corners.Player(agame),
        blackPlayer = new Corners.Player(agame, "BLACK");

    it("should throw error on invalid game", function() {
        expect(function(){var p = new Corners.Player(); }).toThrow(new Error("Invalid player name"));
    });

    it("should define default Player", function() {
        expect(whitePlayer).toBeDefined();
    });

    it("should expose Player's color", function() {
        expect(whitePlayer.color).toBe("WHITE");
        expect(blackPlayer.color).toBe("BLACK");
    });

    it("should expose Player's game and its players", function() {
        expect(whitePlayer.game).toBeDefined();
        expect(whitePlayer.game.player1).toEqual(whitePlayer);
        expect(whitePlayer.game.player2).toEqual(blackPlayer);
        expect(blackPlayer.game.player1).toEqual(whitePlayer);
        expect(blackPlayer.game.player2).toEqual(blackPlayer);
    });

    it("should expose makeMove()", function() {
        expect(typeof whitePlayer.makeMove).toBe("function");
    });
});

describe("Player.makeMove functionality", function() {


    var TestPlayer = function TestPlayer(game, color) {
        this.game = game;
        this.color = color;

        TestPlayer.prototype = new Corners.Player(game, color);

        TestPlayer.prototype.constructor = TestPlayer;

        TestPlayer.prototype.makeMove = function makeMove() {
            if(this.color === "WHITE") {
                return new Corners.Move(new Corners.Point(0, 0), new Corners.Point(0, 2), this.color);
            } else {
                return new Corners.Move(new Corners.Point(0, 1), new Corners.Point(1,1), this.color);
            }
        };

    };

    var thegame = new Corners.Game(),
        whiteTestPlayer = new TestPlayer(thegame),
        blackTestPlayer = new TestPlayer(thegame, "BLACK");

        thegame.init();
        thegame.board.setTile({x : 0, y : 0}, "WHITE");
        thegame.board.setTile({x : 0, y : 1}, "BLACK");


    it("should succeed on correct moves and fail on wrong moves", function() {
        expect(thegame.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(thegame.nextMove()).toBeTruthy();    // white 0,0 => 0,2

        expect(thegame.board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(thegame.nextMove()).toBeTruthy();    // black 0,1 => 1,1

        expect(thegame.board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);
    });
});
