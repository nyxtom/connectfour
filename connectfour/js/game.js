var game = {
    init: function(dimensions) {
        this.board = [];
        this.dimensions = dimensions;
        this.toggle_turn();
        this.reset();
        this.last_play = undefined;
        this.turn = 'black';
        this.winning = '';
    },

    reset: function() {
        for(var i=0; i<this.dimensions.rows*this.dimensions.cols; i++) {
            this.board[i] = '';
        }
        this.winning = '';
        this.toggle_turn();
        this.last_play = undefined;
    },

    toggle_turn: function() {
        if (this.turn == 'black')
            this.turn = 'red';
        else
            this.turn = 'black';
    },

    check: function(xd, yd) {
        /// Continually checks for the min_consecutive values
        /// using both the given x/y deltas and their negatives
        /// which allows for checks to the left and right (on horizontal checks)
        /// or up and down vertical checks until an empty value is found
        /// thus breaking the check chain.
        var done = false;
        var reversed = false;
        var reverse = false;
        var consecutive = 0;
        var current = this.last_play;
        var check = this.board[current];
        while (!done) {
            // Does the check meet the requirements and is it in bounds
            if (this.board[current] == check) {
                consecutive += 1;
                if (consecutive == 4)
                    return true;
                reverse = false;
            }
            else {
                reverse = true;
            }

            // Use the velocity to increase first in the initial direction
                // 1. check if the current column x is the last column
            if ((xd > 0 && ((current + 1) % (this.dimensions.cols) == 0)) || 
                // 2. check if the current column x is the first column
                (xd < 0 && (current % this.dimensions.cols == 0)) ||
                // 3. check if the current row is the last row
                (yd > 0 && ((current + (yd * this.dimensions.cols)) > this.board.length)) ||
                // 4. check if the current row is the first row
                (yd < 0 && ((current + (yd * this.dimensions.cols)) < 0))) {
                reverse = true;
            }

            if (reverse) {
                if (reversed) {
                    done = true;
                    break;
                }
                else {
                    reversed = true;

                    // Reverse should start from the original point
                    current = this.last_play;
                    xd *= -1;
                    yd *= -1;
                }
            }
            current = current + xd + (yd * this.dimensions.cols);
        }

        return false;
    },

    check_winner: function() {
        /// Determine the winner using the different win patterns
        if (this.check(0, 1) || this.check(1, 1) || 
            this.check(1, 0) || this.check(1, -1))
            this.winning = this.turn;
    },

    can_play: function(col) {
        /// Determines whether or not the column is available for a move
        var bottom = this.get_bottom(col);
        return bottom != undefined;
    },

    get_bottom: function(col) {
        /// Returns the index where the next available slot is 
        /// empty for the given column parameter.
        var bottom = undefined;
        if (this.winning == '' && col >= 0 && col < this.dimensions.cols) {
            var last_check = (this.board.length - (this.dimensions.cols - (col + 1)));
            for (var i=col; i <= last_check; i+=this.dimensions.cols) {
                if (this.board[i] == '')
                    bottom = i;
            }
        }

        return bottom;
    },

    play: function(col) {
        /// Plays on the given column by placing the item to the very 
        /// bottom on the stack on the board (last empty row in column)

        if (this.winning != '')
            return false;

        if (col >= this.dimensions.cols || col < 0)
            return false;

        var bottom = this.get_bottom(col);
        if (bottom != undefined) {
            this.board[bottom] = this.turn;
            this.last_play = bottom;
            this.check_winner();

            if (this.winning == '')
                this.toggle_turn();

            // This column was successfully played by this turn
            return true;
        }

        // This column is not playable.
        return false;
    },
};
