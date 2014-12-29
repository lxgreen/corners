var board = new Corners.Board();

describe("BOARD API", function() {
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
    it("should expose getChecker() method", function(){
        expect(typeof board.getChecker).toBe("function");
    });
    it("should expose setChecker() method", function(){
        expect(typeof board.setChecker).toBe("function");
    });
    it("should expose pickChecker() method", function(){
        expect(typeof board.pickChecker).toBe("function");
    });
    it("should expose state() method", function(){
        expect(typeof board.state).toBe("function");
    });
    it("should not expose _state object", function(){
        expect(board._state).toBeUndefined();
    });
    it("should not expose getColor() method", function(){
        expect(board.getColor).toBeUndefined();
    });
    it("should not expose setColor() method", function(){
        expect(board.setColor).toBeUndefined();
    });
});

describe("board.init() + board.state() functionality", function() {


    it("should return empty array before init() call", function() {
        board = new Corners.Board(8,8);
        expect(board.state()).toEqual([]);
    });

    it("should return 8x8 object {color : null} array after init() call", function() {
        board.init();
        expect(board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

    });

    it("should return immutable object array after init() call", function() {
        var state = board.state();
        state = 123;
        expect(board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);
    });
});

describe("board.getChecker() + board.setChecker() + board.pickChecker() functionality", function() {
    board.init();
    it("should fail to get checker at {0,0} before setChecker() call", function() {
        expect(board.getChecker({x : 0, y : 0})).toBeFalsy();
    });
    it("should succeed to set WHITE checker at {0,0}", function() {
        expect(board.setChecker({x : 0, y : 0}, "WHITE")).toBeTruthy();
    });
    it("should succeed to get WHITE checker at {0,0} after setChecker() call", function() {
        expect(board.getChecker({x : 0, y : 0})).toBe("WHITE");
    });
    it("should fail to set BLACK checker at {0,0} after setChecker() call", function() {
        expect(board.setChecker({x : 0, y : 0}, "BLACK")).toBeFalsy();
    });
    it("should succeed to pick WHITE checker at {0,0} after setChecker() call", function() {
        expect(board.pickChecker({x : 0, y : 0})).toBe("WHITE");
    });
    it("should fail to get checker at {0,0} after pickChecker() call", function() {
        expect(board.getChecker({x : 0, y : 0})).toBeFalsy();
    });
    it("should succeed to set BLACK checker at {0,0} after pickChecker() call", function() {
        expect(board.setChecker({x : 0, y : 0}, "BLACK")).toBeTruthy();
    });
    it("should succeed to get BLACK checker at {0,0} after setChecker() call", function() {
        expect(board.getChecker({x : 0, y : 0})).toBe("BLACK");
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("UTILS API", function() {
    it("should expose validatePoint() method", function() {
        expect(typeof utils.validatePoint).toBe("function");
    });
    it("should expose validateColor() method", function() {
        expect(typeof utils.validateColor).toBe("function");
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

describe("utils.validateColor functionality", function() {
    it("should validate color 'WHITE'", function() {
        expect(utils.validateColor("WHITE")).toBeTruthy();
    });
    it("should validate color 'BLACK'", function() {
        expect(utils.validateColor("BLACK")).toBeTruthy();
    });
    it("should fail color 'GREEN'", function() {
        expect(utils.validateColor("GREEN")).toBeFalsy();
    });
    it("should fail color ''", function() {
        expect(utils.validateColor("")).toBeFalsy();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("PLAYER API", function() {
    var board = new Corners.Board(),
        whitePlayer = new Corners.Player(board),
        blackPlayer = new Corners.Player(board, "BLACK");

    it("should throw error on invalid board", function() {
        expect(new Corners.Player()).toThrowError();
        expect(new Corners.Player(1)).toThrowError();

    });

    it("should throw error on invalid color", function() {
        expect(new Corners.Player(board, "GREEN")).toThrowError();
    });

    it("should define default Player", function() {
        expect(whitePlayer).toBeDefined();
    });

    it("should expose Player's color", function() {
        expect(whitePlayer.color).toBe("WHITE");
        expect(blackPlayer.color).toBe("BLACK");
    });

    it("should expose Player's board", function() {

        expect(whitePlayer.board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(whitePlayer.board).toEqual(blackPlayer.board);
    });

    it("should expose makeMove()", function() {
        expect(typeof whitePlayer.makeMove).toBe("function");
    });
});

describe("Player.makeMove functionality", function() {
    var board = new Corners.Board(),
        whitePlayer = new Corners.Player(board),
        blackPlayer = new Corners.Player(board, "BLACK");

    whitePlayer.board.setChecker({x : 0, y : 0}, "WHITE");
    whitePlayer.board.setChecker({x : 1, y : 1}, "BLACK");

    it("should fail on wrong point moves", function() {
        expect(whitePlayer.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(whitePlayer.makeMove({x : 3, y : 3}, {x : 4, y : 4})).toBeFalsy();   // empty source
        expect(whitePlayer.makeMove({x : 3, y : -3}, {x : 4, y : 4})).toBeFalsy();  // invalid source
        expect(whitePlayer.makeMove({x : 0, y : 0}, {x : 1, y : 1})).toBeFalsy();   // occupied target
        expect(whitePlayer.makeMove({x : 0, y : 0}, {x : -1, y : 1})).toBeFalsy();  // invalid target

        expect(whitePlayer.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

    });

    it("should fail on wrong color checker moves", function() {
        expect(whitePlayer.makeMove({x : 1, y : 1}, {x : 2, y : 2})).toBeFalsy();   // wrong color
        expect(blackPlayer.makeMove({x : 0, y : 0}, {x : 2, y : 2})).toBeFalsy();   // wrong color
        expect(whitePlayer.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

    });

    it("should succeed on legal moves", function() {
        expect(blackPlayer.makeMove({x : 1, y : 1}, {x : 2, y : 2})).toBeTruthy();
        expect(whitePlayer.makeMove({x : 0, y : 0}, {x : 3, y : 3})).toBeTruthy();
        expect(whitePlayer.board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : "WHITE"},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(blackPlayer.board.state()).toEqual([
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : "WHITE"},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);
    });
});
