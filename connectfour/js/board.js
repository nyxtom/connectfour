var board = {
    init: function() {
        this.container = $(layout.selector);
        this.dimensions = this.dimensions();
        layout.setup(this.dimensions.cols, this.dimensions.rows);
    },

    dimensions: function() {
        /// Simply grabs the initial col/rows of the board
        var cols = this.container.attr('cols');
        var rows  = this.container.attr('rows');
        var length = cols * rows;
        return {'cols': cols, 'rows': rows, 'length': length};
    },

    new_game: function() {
    },

    reset: function() {
    },

    get_players: function() {
    },
};


var layout = {
    selector: 'ul.board',
    setup: function(width, height) {
        /// Simply generates the layout board 
        /// given the width and height of the 
        /// board to create (width * height list items).
        var container = $(this.selector);
        var content = repeat("<li></li>", width * height);
        container.html(content);
    },
};


// Start by initializing the board layout
$(document).ready(function() {
    board.init();
});
