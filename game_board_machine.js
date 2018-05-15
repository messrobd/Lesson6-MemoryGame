/*
@description States and transition functions of the gameBoard object
*/
const gameBoardMachine = {
  dispatch(actionName, ...payload) {
    const action = this.transitions[this.state][actionName];
    if (action) {
      action.apply(gameBoardMachine, ...payload);
    }
  },
  changeStateTo(newState) {
    this.state = newState;
  },
  state: 'idle',
  transitions: {
    'idle': {
      setUpBoard: function() {
        gameBoard.createEmptyBoard();
        let gameBoardMachine = this;
        gameBoardMachine.changeStateTo('boardReady');
        $('#start-game').one('click', function() {
          gameBoardMachine.dispatch('newGame');
        });
      }
    },
    'boardReady': {
      newGame: function() {
        gameMachine.dispatch('newGame');
        let gameBoardMachine = this;
        gameBoardMachine.changeStateTo('playing');
        $('#start-game').one('click', function() {
          gameBoardMachine.dispatch('restartGame');
        });
      }
    },
    'playing': {
      restartGame: function() {
        if(gameMachine.state !== 'gameOver') {
          gameMachine.changeStateTo('gameOver');
        }
        gameMachine.dispatch('reset');
        this.changeStateTo('boardReady');
        this.dispatch('newGame');
      }
    }
  }
}
