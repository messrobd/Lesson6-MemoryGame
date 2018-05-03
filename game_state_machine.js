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
            turn = this.turn,
            cardsPerTurn = 2;
        $('#board').one('click', '.card.back', function() {
          let card = $(event.target).parent();
          flipCardUp(card);
          turn.push(card);
          game.changeStateTo('turnComplete');
          let transition = turn.length === cardsPerTurn ? game.dispatch('evaluateTurn') : game.dispatch('nextCard');
          /*if (turn.length < cardsPerTurn) {
            game.dispatch('nextCard');
          }*/
        });
      }
    },
    'turnComplete': {
      nextCard: function() {
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      },
      evaluateTurn: function() {
        console.log('evaluateTurn action')
      }
    }
  }
}

$('#start-game').click(function() {
  machine.dispatch('newGame');
});
