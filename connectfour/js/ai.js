var ai = {
    init: function(options){
        this.game_dimensions = options.game_dimensions;
        this.difficulty = options.difficulty;
        return this;
    },
    
    play: function(){
        var col = -1;
        
        switch(this.difficulty) {
            case 'easy':
                var col = Math.floor(Math.random() * (this.game_dimensions['cols']+1));
                break;
            case 'medium':
                break;
            case 'hard':
                break;
        }
        
        return col;
    }
};