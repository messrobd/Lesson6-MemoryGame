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

var cards = ["A", "B", "C", "D", "E", "F", "G", "H"];
var deck = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];

function shuffleDeck(deck) {
  var shuffledDeck = [];
  var cardNumber, card;
  while (deck.length > 0) {
    cardNumber = Math.floor(Math.random() * deck.length);
    card = deck.splice(cardNumber,1).toString();
    shuffledDeck.push(card);
  }
  return shuffledDeck;
}

function dealCards(deck) {
  var shuffledDeck = shuffleDeck(deck);
  var boardCards = $('.card.face');
  boardCards.each(function(){
    var card = shuffledDeck.pop();
    $(this).text(card);
  })
}

dealCards(deck);
