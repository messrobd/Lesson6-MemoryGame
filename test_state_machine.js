var game = {
  state: undefined,
  states: {
    readyToPlay: ,
    turnInProgress: ,
    gameOver:
  }
  initialise: ,
  playTurn: ,//transition readyToPlay ==> turnInProgress
  completeTurn: ,//transition turnInProgress ==> readyToPlay
  completeGame: ,//transition turnInProgress ==> gameOver
  changeState: function(state)//checks state and changes it if it can
}

//now based on the Java version in https://en.wikipedia.org/wiki/State_pattern
/*
function Interface(name, methods) {
  this.name = name;
  this.methods = [];//or can accept a string, or an object (I guess), where ideally the value is a method signature
  if (typeof methods === Array) {
    //build methods array
  }
}

var stateProto = new Interface('stateProto', 'someFunc') //ideally, someFunc would be a key where the value is a method signature. not sure how that would work */

function StateReadyToPlay(){ //should inherit from stateProto, strictly speaking
  this.someFunc =  //implementation of somefunc. must refer to context AND crucially, toggle its state
}

function StateTurnInProgress(){
  this.someFunc =  //same as above
}

function StateContext(){
  Object.defineProperties(this, {
    'state': {
      set: ,//set to a state, configurable is false by default
    },
    'someFunc': {
      value: function(this) {
        //calls state.someFunc, thereby mutating itself
      }
    }
  });
  this.state = //default state
}

var game = new StateContext();

//now JS based on https://www.smashingmagazine.com/2018/01/rise-state-machines/
const machine = {//const declaration prevents machine being reassigned later
  dispatch(actionName, ...payload) {//... is the spread operator. allows the expression to be expanded to multiple args. payload must be iterable
    const actions = this.transitions[this.state];//doesn't seem to be needed
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);//apply() calls the action function on the machine with an array of args
    }
  },
  changeStateTo(newState) {//shorthand notation for a method on an object
    this.state = newState;
  },
  state: 'idle',
  transitions: {
    'idle': {
      newGame: function () {
        //deal etc
        this.changeStateTo('readyToPlay');
        this.dispatch('play');
      }
    },
    'readyToPlay': {
      play: function() {
        //add click handler
        this.changeStateTo('playing');
      }
    },
    'playing': {
      card: function() {
        //flip, define pair
        this.changeStateTo('turnInProgress');
      },
      quit: function() {
        this.changeStateTo('gameOver');
        this.dispatch('reset');
      }
    },
    'turnInProgress': {
      pair: function() {
        //flip, add to pair
        this.changeStateTo('turnEvaluation');
        //dispatch either success or failure
      },
      quit: function() {
        this.changeStateTo('gameOver');
        this.dispatch('reset');
      }
    },
    'turnEvaluation': {
      success: function() {
        //conditions for success + response
        //either changeStateTo('readyToPlay') & dispatch('play'), or
        //changeStateTo('gameOver')
      },
      failure: function() {
        //conditions for failure
        var pause = setTimeout(function() {
          changeStateTo('readyToPlay') & dispatch('play')
        })
      }
    },
    'gameOver': {
      reset: function() {
        //hide modal
        this.changeStateTo(idle); 
      }
    }
  }
}

machine.dispatch('click');
