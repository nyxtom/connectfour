function repeat(pattern, count) {
    /// Functions as a fast string repeater, so html 
    /// repeatable patterns can be generated quickly
    /// and inserted into html if necessary.
    if (count < 1)
        return '';
    var result = '';
    while (count > 0) {
        if (count & 1) 
            result += pattern;
        count >>= 1, pattern += pattern;
    };
    return result;
}
