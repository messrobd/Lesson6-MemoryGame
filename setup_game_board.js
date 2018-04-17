var board = $('#board');

function createEmptyBoard() {
  var cards = 16;
  for(card = 0; card < cards; card ++) {
    board.append('<div class="card"></div>');
  }
}

createEmptyBoard();

var cards = ["A", "B", "C", "D", "E", "F", "G", "H"];

function dealCards() {
  var card = "A";
  var boardCards = $(board).children();
  boardCards.each(function(){
    $(this).text(card);
  })
}

dealCards();
