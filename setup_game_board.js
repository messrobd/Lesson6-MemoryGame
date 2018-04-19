function createEmptyBoard() {
  var board = $('#board');
  var cards = 16;
  for(card = 0; card < cards; card ++) {
    board.append(
      '<div class="">' +
      '  <div class="card face down"></div>' +
      '  <div class="card back"></div>' +
      '</div>');
  }
}

createEmptyBoard();
