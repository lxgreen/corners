Corners.UIPlayer = function UIPlayer(game, color) {
        this.game = game;
        this.color = color;

        Corners.UIPlayer.prototype = new Corners.Player(game, color);

        Corners.UIPlayer.prototype.constructor = UIPlayer;

        Corners.UIPlayer.prototype.makeMove = function makeUIMove() {

        };

    };
