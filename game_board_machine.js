/*
@description: states and transition functions of the gameBoard object
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
        this.changeStateTo('boardReady');
        this.dispatch('newGame');
      }
    },
    'boardReady': {
      newGame: function() {
        $('#start-game').click(function() {
          if(gameMachine.state !== 'idle') {
            gameMachine.changeStateTo('idle');
          }
          gameMachine.dispatch('newGame');
        });
      }
    }
  }
}
