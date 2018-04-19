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

function resetBoard(turn) {
  turn.forEach(function(card) {
    console.log("flipped");
    flipCardDown(card);
  });
}

function evaluateTurn(turn) {
  var cardsPerTurn = 2;
  if (turn.length === cardsPerTurn) {
    var cardValues = [];
    console.log(cardValues);
    turn.forEach(function(card) {
      var cardFace = $(card).find('.card.face');
      var cardValue =  $(cardFace).text();
      cardValues.push(cardValue);
    });
    if (cardValues[0] !== cardValues[1]) {
      resetBoard(turn);
    }
    turn.length = 0;
  }
}

function startGame(deck) {
  dealCards(deck);
  var turn = [];
  $('#board').on('click', '.card.back', function(event){
    var card = $(event.target).parent();
    flipCardUp(card);
    turn.push(card);
    console.log(turn);
    evaluateTurn(turn);
  });
}
