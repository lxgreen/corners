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
    it("should validate cell { id : \"c77\", tile : { id : 't00'}, point : {7, 7} }", function() {
        var cell = new Corners.Cell(new Corners.Point(7, 7));
        cell.tile = new Corners.Tile("t00");
        expect(utils.validateCell(cell)).toBeTruthy();
    });

    it("should fail null cell", function() {
        expect(utils.validateCell(null)).toBeFalsy();
    });
});

describe("utils.validateTile functionality", function() {
    it("should validate tile { id : \"t00\" }", function() {
        var tile = new Corners.Tile("t00");
        expect(utils.validateTile(tile)).toBeTruthy();
    });

    it("should fail tile without id", function() {
        var tile = new Corners.Tile();
        expect(utils.validateTile(tile)).toBeFalsy();
    });

    it("should fail null tile", function() {
        expect(utils.validateTile(null)).toBeFalsy();
    });
});

describe("utils.iterator functionality", function() {
    var collection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it("should iterate through collection", function() {
        var it = utils.iterator(collection),
            i = 0,
            sum = 0;

        for(i = it.start(); !it.end(); i = it.next()) {
            sum += i;
        }

        expect(sum).toEqual(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    it("should not expose private properties", function(){
        expect(board.h).toBeUndefined();
        expect(board.w).toBeUndefined();
        expect(board.height).toEqual(8);
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
        tile00 = new Corners.Tile("t00"),
        tile11 = new Corners.Tile("t11");

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("PLAYER API", function() {
    var agame = new Corners.Game(),
        whitePlayer = new Corners.Player("p1"),
        blackPlayer = new Corners.Player("p2");

    it("should define player", function() {
        expect(whitePlayer).toBeDefined();
    });

    it("should expose player's name", function() {
        expect(whitePlayer.name).toBe("p1");
        expect(blackPlayer.name).toBe("p2");
    });

    it("should throw error on invalid name", function() {
        expect(function(){var p = new Corners.Player(); }).toThrow(new Error("Invalid player name"));
    });

    it("should expose makeMove()", function() {
        expect(typeof whitePlayer.makeMove).toBe("function");
    });

    it("should expose addTile()", function() {
        expect(typeof whitePlayer.addTile).toBe("function");
    });

    it("should expose tiles", function() {
        expect(whitePlayer.tiles).toBeDefined();

    });
});

describe("Player.makeMove functionality", function() {
    var player1 = new Corners.Player("p1"),
        player2 = new Corners.Player("p2"),
        game = new Corners.Game(),
        ui = this.document;

    game.init();
    game.start(player1, player2, ui);


});
