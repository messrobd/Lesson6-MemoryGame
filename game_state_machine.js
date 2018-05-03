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
  transitions: {
    'idle': {
      newGame: function () {
        console.log('newGame action dispatched')
        this.changeStateTo('readyToPlay');
        //this.dispatch('play');
      }
    },
    'readyToPlay': {
      play: function() {
        //add click handler
        //this.changeStateTo('playing');
      }
    }
  }
}

$('#start-game').click(function() {
  machine.dispatch('newGame');
});
