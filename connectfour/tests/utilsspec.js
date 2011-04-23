describe("utils", function() {
    it("should be able to repeat an string pattern x number of times", function() {
        var result = repeat('li', 5);
        expect(result).toEqual('lilililili');
    });
});
