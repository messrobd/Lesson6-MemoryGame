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
  score: 0,
  transitions: {
    'idle': {
      newGame: function () {
        gameKit.dealCards();
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
          gameKit.flipCardUp(card);
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
        this.score ++;
        this.changeStateTo('newTurn');
        try {
          this.dispatch('terminateGame');
        }
        catch(error) {
          this.dispatch('newTurn');
        }
      },
      tryAgain: function() {
        let game = this,
            turn = this.turn,
            pauseDuration = 500;//ms
        let pause = setTimeout(function() {
          turn.forEach(function(card) {
            gameKit.flipCardDown(card);
          });
          turn.length = 0;
          game.changeStateTo('readyToPlay');
          game.dispatch('play');
        }, pauseDuration);
      }
    },
    'newTurn': {
      terminateGame: function() {
        let gameLength = 8;//todo: refactor out magic number
        if (this.score < gameLength) {
          throw 'game not over';
        }
        let modal = $('#modal');
        modal.css({
          display: 'block'
        });
        modal.one('click', function() {
          modal.css({
            display: 'none'
          });
        });
        this.changeStateTo('gameOver');
      },
      newTurn: function() {
        this.turn.length = 0;
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    },
    'gameOver': {}
  }
}

$('#start-game').click(function() {
  machine.dispatch('newGame');
});
