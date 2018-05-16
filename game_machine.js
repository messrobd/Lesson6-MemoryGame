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
        gameContext.gameTimer(true);
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    },
    'readyToPlay': {
      play: function() {
        let game = this;
        $('#board').one('click', '.card.back', function() {
          let card = $(event.target).parent();
          gameBoard.flipCardUp(card);
          gameContext.incrementTurn(card);
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
        if (!gameContext.turnCardsMatch()){
          throw 'card mismatch';
        }
        gameContext.incrementScore();
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
            pauseDuration = 500;//ms
        let pause = setTimeout(function() {
          gameContext.tryAgain();
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
        gameContext.resetTurn();
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      },
      terminateGame: function() {
        gameContext.gameTimer(false);
        gameBoard.showHideCongrats();
        this.changeStateTo('gameOver');
      }
    },
    'gameOver': {
      reset: function() {
        $('#board').off('click');
        gameContext.resetGameContext();
        this.changeStateTo('idle');
      }
    }
  }
}
