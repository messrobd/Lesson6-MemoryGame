/*
@description Represents the game board etc
@constructor
*/
function GameKit() {
  this.deck = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  this.imageDict = {},
  this.createEmptyBoard = function() {
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
  this.flipCardUp = function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', false);
    $(cardBack).toggleClass('down', true);
  },
  this.flipCardDown = function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', true);
    $(cardBack).toggleClass('down', false);
  },
  this.shuffleDeck = function() {
    let deck = this.deck,
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
  this.dealCards = function() {
    let gameKit = this,
        shuffledDeck = gameKit.shuffleDeck(),
        boardCards = $('.card.face');
    boardCards.each(function(){
      let card = shuffledDeck.pop();
      gameKit.flipCardDown($(this).parent());
      $(this).text(card);
    });
  }
}
