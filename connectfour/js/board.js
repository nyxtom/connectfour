var board = {
    init: function() {
        this.container = $(layout.selector);
        this.dimensions = this.dimensions();
        layout.setup(this.dimensions.cols, this.dimensions.rows);
    },

    dimensions: function() {
        /// Simply grabs the initial col/rows of the board
        var cols = parseInt(this.container.attr('cols'));
        var rows  = parseInt(this.container.attr('rows'));
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
    get_index: function(item) {
        var listItem = $(item);
        var parent = listItem.parent().children('li');
        return parent.index(listItem);
    },
    get_bottom: function(item) {
        var index = this.get_index(item);
        return game.get_bottom(index);
    },
    prompt: function() {
        var text = 'New game?';
        if (game.winning != '') {
            text = game.winning + ' won! Play again?';
        }
        if (confirm(text)) {
            game.reset();
            this.clear();
        }
    },
    clear: function() {
        $("ul.board li span").removeClass();
    },
};


// Start by initializing the board layout
$(document).ready(function() {
    board.init();
    game.init(board.dimensions);
    layout.prompt();

    // Handle modal closes
    $("a.close").click(function() {
        $("#modal").fadeOut();
        $(".overlay").fadeOut();
    });

    // Handle board mouse movements to show where 
    // a possible placement/move can be made
    $("ul.board li").hover(function() {
        var bottom = layout.get_bottom(this);
        if (bottom != undefined) {
            $($("ul.board li span")[bottom]).addClass(game.turn + "_hover");
        }
    }, function() {
        var bottom = layout.get_bottom(this);
        if (bottom != undefined) {
            $($("ul.board li span")[bottom]).removeClass(game.turn + "_hover");
        }
    });

    // Handle actual move placement
    $("ul.board li").click(function() {
        var index = layout.get_index(this);
        var bottom = game.get_bottom(index);
        if (bottom != undefined) {
            $($("ul.board li span")[bottom]).addClass(game.turn);
            game.play(index);
            if (game.winning != '') {
                layout.prompt();
            }
        }
    });
});
