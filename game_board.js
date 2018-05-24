/*
@description Artifacts and behaviour required to play the game
*/
const gameBoard = {
  deck: [],
  cardsPerTurn: 2,
  initGameTime: 0,
  initTurns: 0,
  initScore: 0,
  maxRating: 2, //zero-based index
  ratingBoundaries: [25,15],
  importDeck: function(deck) {
    this.deck = deck;
  },
  createEmptyBoard: function() {
    let board = $('#board'),
        cards = this.deck.length;
    for(let card = 0; card < cards; card ++) {
      board.append(
        '<div class="position">' +
        '  <div class="card face down">' +
        '    <img class="card">' +
        '  </div>' +
        '  <div class="card back down"></div>' +
        '</div>');
    }
  },
  createRatingMeter: function() {
    let ratingMeter = $('#rating-meter'),
        imageElement = '<img class="rating" src="assets/round_plate_1x1_Trans.png">';
    for (let i = 0; i <= this.maxRating; i++) {
      ratingMeter.append(imageElement);
    }
  },
  flipCardUp: function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', false); //investigate using toggle() method
    $(cardBack).toggleClass('down', true);
    $(cardBack).toggleClass('responsive', false);
  },
  flipCardDown: function(card) {
    let cardFace = $(card).find('.card.face'),
        cardBack = $(card).find('.card.back');
    $(cardFace).toggleClass('down', true);
    $(cardBack).toggleClass('down', false);
    $(cardBack).toggleClass('responsive', true);
  },
  shuffleDeck: function() {
    let deck = [...this.deck],//todo: check support for spread operator
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
        card,
        cardImage,
        boardCards = $('.card.face');
    boardCards.each(function(){
      card = shuffledDeck.pop();
      cardImage = $(this).find('img.card');
      gameBoard.flipCardDown($(this).parent());
      $(cardImage).attr({
        src: card
      });
    });
  },
  showHideCongrats: function(totalGameTime, finalRating) {
    $('#game-time').text(totalGameTime);
    $('#final-rating').text(finalRating);
    let modal = $('#modal');
    let toggleVisibility = function() {
        hidden = modal.is('.hide');
      modal.toggleClass('hide', !hidden);
      modal.toggleClass('show', hidden);
    };
    toggleVisibility();
    modal.one('click', toggleVisibility);
  }
}
