/*
@description Artifacts and behaviour required to play the game
*/
const gameBoard = {
  deck: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  imageDict: {},
  createEmptyBoard: function() {
    let board = $('#board'),
        cards = this.deck.length;
    for(let card = 0; card < cards; card ++) {
      board.append(
        '<div class="">' +
        '  <div class="card face down"></div>' +
        '  <div class="card back"></div>' +
        '</div>');
    }
  },
  flipCardUp: function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', false);
    $(cardBack).toggleClass('down', true);
  },
  flipCardDown: function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', true);
    $(cardBack).toggleClass('down', false);
  },
  shuffleDeck: function() {
    let deck = new Array(...this.deck),
        shuffledDeck = [],
        cardNumber,
        card;
    while (deck.length > 0) {
      cardNumber = Math.floor(Math.random() * deck.length);
      card = deck.splice(cardNumber,1).toString();
      shuffledDeck.push(card);
    }
    return shuffledDeck;
  },
  dealCards: function() {
    let gameBoard = this,
        shuffledDeck = gameBoard.shuffleDeck(),
        boardCards = $('.card.face');
    boardCards.each(function(){
      let card = shuffledDeck.pop();
      gameBoard.flipCardDown($(this).parent());
      $(this).text(card);
    });
  }
}
