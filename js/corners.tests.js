var board = new Corners.Board(8,8);

describe("board basic API", function() {
    it("should define board object", function() {
        expect(board).toBeDefined();
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

describe("utils basic API", function() {
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
