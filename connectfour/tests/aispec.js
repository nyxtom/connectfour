describe("artificial intelligence", function() {
    beforeEach(function() {
        this.options = {
            game_dimensions : {'rows': 6, 'cols': 7},
            difficulty : 'easy'
        };
        ai.init(this.options);
    });
    
    it("should play a piece", function(){
        expect(ai.play()).toBeDefined();
    });
    
    it("should move somewhere on the board", function(){
        var move_loc = ai.play();
        expect(move_loc).toBeGreaterThan(-1);
        expect(move_loc).toBeLessThan(this.options.game_dimensions['cols']+1);
    });
});