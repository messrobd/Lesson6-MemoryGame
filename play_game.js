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

function flipCardUp(card) {
  var cardFace = $(card).find('.card.face');
  var cardBack = $(card).find('.card.back');
  $(cardFace).toggleClass('down', false);
  $(cardBack).toggleClass('down', true);
}

function flipCardDown(card) {
  var cardFace = $(card).find('.card.face');
  var cardBack = $(card).find('.card.back');
  $(cardFace).toggleClass('down', true);
  $(cardBack).toggleClass('down', false);
}

function dealCards(deck) {
  var shuffledDeck = shuffleDeck(deck);
  var boardCards = $('.card.face');
  boardCards.each(function(){
    var card = shuffledDeck.pop();
    flipCardDown($(this).parent());
    $(this).text(card);
  });
}

function resetBoard(turn) {
  turn.forEach(function(card) {
    flipCardDown(card);
  });
}

function evaluateTurn(turn) {
  var cardsPerTurn = 2;
  if (turn.length === cardsPerTurn) {
    var cardValues = [];
    turn.forEach(function(card) {
      var cardFace = $(card).find('.card.face');
      var cardValue =  $(cardFace).text();
      cardValues.push(cardValue);
    });
    cardMatch = cardValues[0] === cardValues[1];
    if (!cardMatch) {
      resetBoard(turn);
    }
    turn.length = 0;
    return cardMatch;
  }
}

function terminateGame() {
  var modal = $('#modal');
  modal.css({
    display: 'block'
  });
  $('#board').off('click');
  modal.one('click', function() {
    modal.css({
      display: 'none'
    });
  });
}

function startGame(deck) {
  var turn = [];
  var cardsPerTurn = 2;
  var gameLength = deck.length / cardsPerTurn;
  var score = 0;
  dealCards(deck);
  $('#board').on('click', '.card.back', function(event){
    var card = $(event.target).parent();
    flipCardUp(card);
    turn.push(card);
    if (evaluateTurn(turn)) {
      score ++;
    }
    if (score === gameLength) {
      terminateGame();
    }
  });
}

$('#start-game').click(function() {
  var deck = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
  startGame(deck)
});
