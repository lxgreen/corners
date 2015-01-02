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
    var agame = new Corners.Game(),
        whitePlayer = new Corners.Player(agame),
        blackPlayer = new Corners.Player(agame, "BLACK");

    it("should throw error on invalid game", function() {
        expect(function(){var p = new Corners.Player(); }).toThrow(new Error("Invalid Player Game"));
        expect(function(){var p = new Corners.Player(123); }).toThrow(new Error("Invalid Player Game"));

    });

    it("should throw error on invalid color", function() {
        expect(function(){var p = new Corners.Player(agame, "GREEN"); }).toThrow(new Error("Invalid Player color 'GREEN'"));
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
                return new Corners.Move(new Corners.Point(0, 0), new Corners.Point(0, 1), this.color);
            } else {
                return new Corners.Move(new Corners.Point(1, 1), new Corners.Point(2, 2), this.color);
            }
        };

    };

    var thegame = new Corners.Game(),
        whiteTestPlayer = new TestPlayer(thegame),
        blackTestPlayer = new TestPlayer(thegame, "BLACK");

        thegame.init();
        thegame.board.setChecker({x : 0, y : 0}, "WHITE");
        thegame.board.setChecker({x : 1, y : 1}, "BLACK");


    it("should succeed on correct moves", function() {
        expect(thegame.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(thegame.nextMove()).toBeTruthy();    // white 0,0 => 0,1

        expect(thegame.board.state()).toEqual([
            [{color : null},{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

    });

    it("should fail on wrong moves", function() {
        expect(thegame.board.state()).toEqual([
            [{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

        expect(thegame.nextMove()).toBeFalsy();    // black 1,1 => 2,2

        expect(thegame.board.state()).toEqual([
            [{color : null},{color : "WHITE"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : "BLACK"},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}],
            [{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null},{color : null}]
        ]);

    });
});
