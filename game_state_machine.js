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

const machine = {
  dispatch(actionName, ...payload) {
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    }
  },
  changeStateTo(newState) {
    this.state = newState;
  },
  state: 'idle',
  turn: [],
  transitions: {
    'idle': {
      newGame: function () {
        let deck = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
        dealCards(deck);
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    },
    'readyToPlay': {
      play: function() {
        let game = this,
            turn = this.turn;
        $('#board').one('click', '.card.back', function() {
          let card = $(event.target).parent();
          flipCardUp(card);
          turn.push(card);
          game.changeStateTo('turnComplete');
          try {
            game.dispatch('evaluateTurn');
          }
          catch(error) {
            game.dispatch('nextCard');
          }
        });
      }
    },
    'turnComplete': {
      nextCard: function() {
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      },
      evaluateTurn: function() {
        let cardsPerTurn = 2;
        if (this.turn.length < cardsPerTurn) {
          throw 'turn incomplete';
        }
        this.changeStateTo('match');
        try {
          this.dispatch('nextPair');
        }
        catch(error) {
          this.dispatch('tryAgain');
        }
      }
    },
    'match': {
      nextPair: function() {
        let card1 = $(this.turn[0]).find('.card.face').text(),
            card2 = $(this.turn[1]).find('.card.face').text();
        if (card1 !== card2){
          throw 'card mismatch';
        }
        this.changeStateTo('allMatched');
        try {
          this.dispatch('gameOver');
        }
        catch(error) {
          this.dispatch('newTurn');
        }
      },
      tryAgain: function() {
        let game = this,
            turn = this.turn,
            pauseDuration = 500;//ms
            pause = setTimeout(function() {
          turn.forEach(function(card) {
            flipCardDown(card);
          });
          turn.length = 0;
          game.changeStateTo('readyToPlay');
          game.dispatch('play');
        }, pauseDuration);
      }
    },
    'allMatched': {
      gameOver: function() {
        throw 'game not over';
      },
      newTurn: function() {
        this.turn.length = 0;
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    }
  }
}

$('#start-game').click(function() {
  machine.dispatch('newGame');
});
