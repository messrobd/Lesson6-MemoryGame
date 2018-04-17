function createEmptyBoard() {
  var board = $('#board');
  var cards = 16;
  for(card = 0; card < cards; card ++) {
    board.append('<div class="card"></div>');
  }
}

createEmptyBoard(); 
