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
        game.reset();
    },

    get_players: function() {
        var players = $("input[name=playerone], input[name=playertwo]");
        this.player_one = players[0].value;
        this.player_two = players[1].value;
    },
};


var layout = {
    selector: 'ul.board',
    setup: function(width, height) {
        /// Simply generates the layout board 
        /// given the width and height of the 
        /// board to create (width * height list items).
        var container = $(this.selector).parent();
        container.html("");
        for (var i=0; i<height; i++) {
            var content = "<ul class='board'>" + repeat("<li><span></span></li>", width) + "</ul>";
            container.append(content);
        }
    },
};


// Start by initializing the board layout
$(document).ready(function() {
    board.init();

    $("a.close").click(function() {
        $("#modal").fadeOut();
        $(".overlay").fadeOut();
    });
});
