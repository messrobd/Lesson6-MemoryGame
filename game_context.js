/*
@description Properties and behaviour of the game-in-progress
*/
const gameContext = {
  turn: [],
  score: 0,
  elapsedTime: 0,
  incrementTurn: function(card) {
    this.turn.push(card);
  },
  incrementScore: function() {
    this.score ++ ;
  },
  formatDisplayTime: function() {
    let convertToSeconds = 0.001,
        roundingFactor = 10,//to show time to 1 decimal place
        displayTime = this.elapsedTime * convertToSeconds;
    return Math.round(displayTime * roundingFactor) / roundingFactor;
  },
  startTimer: function() {
    let interval = 100,//ms
        game = this,
        displayTime;
    timer = setInterval(function() { //todo: find a way to avoid relying on a global variable 
        game.elapsedTime += interval;
        displayTime = game.formatDisplayTime();
        $('#game-timer').text(displayTime);
    }, interval);
  },
  showTotalGameTime: function() {
    try {
      clearInterval(timer);
      displayTime = this.formatDisplayTime();
      $('#game-time').text(displayTime);
    }
    catch (error) {
      console.log(error);
      return;
    }
  },
  turnCardsMatch: function() {
    if (this.turn.length < gameBoard.cardsPerTurn) {
      throw 'not enough cards to match';
    } else {
      let card1 = $(this.turn[0]).find('.card.face').text(),
          card2 = $(this.turn[1]).find('.card.face').text();
      return card1 === card2;
    }
  },
  resetTurn: function() {
    this.turn.length = 0;
  },
  tryAgain: function() {
    this.turn.forEach(function(card) {
      gameBoard.flipCardDown(card);
    });
    this.resetTurn();
  },
  resetGameContext: function() {
    this.resetTurn();
    this.score = 0;
    this.elapsedTime = 0;
  }
}
