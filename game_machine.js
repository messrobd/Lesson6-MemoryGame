/*
@description States and transition functions of the game-in-progress
todo: look into machine prototype + inheritance
*/
const gameMachine = {
  dispatch(actionName, ...payload) {//todo: 1) support for spread, 2) remove param if not used
    const action = this.transitions[this.state][actionName];
    if (action) {
      action.apply(gameMachine, ...payload);
    }
  },
  changeStateTo(newState) {
    this.state = newState;
  },
  state: 'idle',
  transitions: {
    'idle': {
      newGame: function () {
        gameBoard.dealCards();
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    },
    'readyToPlay': {
      play: function() {
        let game = this,
            turn = gameContext.turn;
        $('#board').one('click', '.card.back', function() {
          let card = $(event.target).parent();
          gameBoard.flipCardUp(card);
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
        if (gameContext.turn.length < gameBoard.cardsPerTurn) {
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
        let card1 = $(gameContext.turn[0]).find('.card.face').text(),
            card2 = $(gameContext.turn[1]).find('.card.face').text();
        if (card1 !== card2){
          throw 'card mismatch';
        }
        gameContext.score ++;
        this.changeStateTo('newTurn');
        try {
          this.dispatch('newTurn');
        }
        catch(error) {
          this.dispatch('terminateGame');
        }
      },
      tryAgain: function() {
        let game = this,
            turn = gameContext.turn,
            pauseDuration = 500;//ms
        let pause = setTimeout(function() {
          turn.forEach(function(card) {
            gameBoard.flipCardDown(card);
          });
          turn.length = 0;
          game.changeStateTo('readyToPlay');
          game.dispatch('play');
        }, pauseDuration);
      }
    },
    'newTurn': {
      newTurn: function() {
        let gameLength = gameBoard.deck.length / gameBoard.cardsPerTurn;
        if (gameContext.score === gameLength) {
          throw 'game over';
        }
        gameContext.turn.length = 0;
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      },
      terminateGame: function() {
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
      }
    },
    'gameOver': {
      reset: function() {
        $('#board').off('click');
        gameContext.turn.length = 0;
        gameContext.score = 0;
        this.changeStateTo('idle');
      }
    }
  }
}
