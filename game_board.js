/*
@description Artifacts and behaviour required to play the game
*/
const gameBoard = {
  deck: ['assets/brick_2x4.jpeg', 'assets/connbush_fric_crossale.jpeg', 'assets/connpeg_fric.jpeg', 'assets/double_conical_wheel.jpeg', 'assets/mini_antenna.jpeg', 'assets/mini_head.jpeg', 'assets/plate_2x2.jpeg', 'assets/technic_brick_1x2.jpeg', 'assets/brick_2x4.jpeg', 'assets/connbush_fric_crossale.jpeg', 'assets/connpeg_fric.jpeg', 'assets/double_conical_wheel.jpeg', 'assets/mini_antenna.jpeg', 'assets/mini_head.jpeg', 'assets/plate_2x2.jpeg', 'assets/technic_brick_1x2.jpeg'],
  cardsPerTurn: 2,
  ratingBoundaries: [25,15],
  createEmptyBoard: function() {
    let board = $('#board'),
        cards = this.deck.length;
    for(let card = 0; card < cards; card ++) {
      board.append(
        '<div class="">' +
        '  <div class="card face down">' +
        '    <img class="card">' +
        '  </div>' +
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
    modal.css({
      display: 'block'
    });
    modal.one('click', function() {
      modal.css({
        display: 'none'
      });
    });
  }
}
