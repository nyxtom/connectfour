describe("while playing a new game", function() {

    beforeEach(function() {
        var dimensions = {'rows': 6, 'cols': 7};
        game.init(dimensions);
    });

    it("with a board 6 x 7, the length should be 42", function() {
        expect(game.board.length).toEqual(42);
    });

    it("should be able to reset to an empty board", function() {
        game.reset();
        for(var i=0; i<game.board.length; i++) {
            var result = game.board[i];
            expect(result).toEqual('');
        }
    });

    it("should have the right bottom for any given column", function() {
        var bottom = game.get_bottom(0);
        expect(bottom).toEqual(35);

        var bottom = game.get_bottom(1);
        expect(bottom).toEqual(36);
    });

    it("should be able to detect play somewhere on the board", function() {
        expect(game.can_play(0)).toEqual(true);
    });

    it("switch turns when a turn is played", function() {
        expect(game.turn).toEqual('black');
        expect(game.play(0)).toEqual(true);
        expect(game.turn).toEqual('red');
    });

    it("should update the last play to the bottom after a turn", function() {
        expect(game.last_play).toEqual(undefined);
        expect(game.play(0)).toEqual(true);
        expect(game.last_play).toEqual(35);
    });

    it("should not allow a play on a full column", function() {
        expect(game.last_play).toEqual(undefined);
        for (var i=0; i < game.dimensions.rows; i++) {
            expect(game.play(0)).toEqual(true);
        }
        expect(game.play(0)).toEqual(false);
        expect(game.last_play).toEqual(0);
    });

    it("should allow to play on all columns", function() {
        for (var i=0; i < game.dimensions.cols; i++) {
            expect(game.play(i)).toEqual(true);
            expect(game.last_play).toEqual(35 + i);
        }
    });

    it("should not be showing anyone winning", function() {
        expect(game.play(5)).toEqual(true);
        expect(game.winning).toEqual('');
    });

    it("should be able to identify a vertical win scenario and deny more plays", function() {
        for(var i=0; i<3;i++) {
            game.play(0);
            game.play(1);
            expect(game.winning).toEqual('');
        }
        expect(game.play(0)).toEqual(true);
        expect(game.winning).toEqual('black');
        expect(game.play(1)).toEqual(false);
    });

    it("should be able to identify a horizontal win scenario and deny more plays", function() {
        for(var i=0; i<3;i++) {
            game.play(i);
            game.play(i);
            expect(game.winning).toEqual('');
        }
        expect(game.play(3)).toEqual(true);
        expect(game.winning).toEqual('black');
        expect(game.play(3)).toEqual(false);
    });

    it("should be able to identify a right-angled diagonal win scenario and deny more plays", function() {
        playfor(0, 4);
        playfor(1, 4);
        game.play(3); // last column, red
        game.play(2); // second to last, black
        game.play(2); // random red, so black can win
        expect(game.play(3)).toEqual(true);
        expect(game.winning).toEqual('black');
        expect(game.play(3)).toEqual(false);
    });

    it("should be able to identify a left-angled diagonal win scenario and deny more plays", function() {
        playfor(0, 4);
        playfor(1, 3);
        game.play(0);
        game.play(1); 
        game.play(0);
        expect(game.play(0)).toEqual(true);
        expect(game.winning).toEqual('red');
        expect(game.play(0)).toEqual(false);
    });

    it("should return no bottom when the game is over (someone one)", function() {
        playfor(0, 4);
        playfor(1, 3);
        game.play(0);
        game.play(1); 
        game.play(0);
        expect(game.get_bottom(0)).toNotEqual(undefined);
        expect(game.play(0)).toEqual(true);
        expect(game.winning).toEqual('red');
        expect(game.get_bottom(0)).toEqual(undefined);
    });

    it("should reset the winner when the game has been reset", function() {
        playfor(0, 4);
        playfor(1, 3);
        game.play(0);
        game.play(1); 
        game.play(0);
        expect(game.play(0)).toEqual(true);
        expect(game.winning).toEqual('red');
        expect(game.get_bottom(0)).toEqual(undefined);
        expect(game.last_play).toNotEqual(undefined);
        game.reset();
        expect(game.winning).toEqual('');
        expect(game.turn).toEqual('black');
        expect(game.get_bottom(0)).toNotEqual(undefined);
        expect(game.last_play).toEqual(undefined);
    });
});

function playfor(offset, x) {
    for (var i=offset; i<x; i++) {
        game.play(i);
    }
}
