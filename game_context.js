/*
@description Properties and behaviour of the game-in-progress
*/
const gameContext = {
  turn: [],
  score: 0,
  elapsedTime: 0,
  turns: 0,
  rating: 2, //zero-based
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
      return;
    }
  },
  incrementTurn: function(card) {
    this.turn.push(card);
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
  updateRating: function() {
    if (this.rating === 0) {
      return;
    }
    let ratingBoundary = this.rating - 1;
    if (this.turns > gameBoard.ratingBoundaries[ratingBoundary]) {
      this.rating --;
    }
    $('#rating').text(this.rating);
  },
  newTurn: function() {
    this.turn.length = 0;
    this.turns ++;
    $('#move-counter').text(this.turns);
    this.updateRating();
  },
  incrementScore: function() {
    this.score ++ ;
    this.newTurn();
  },
  tryAgain: function() {
    this.turn.forEach(function(card) {
      gameBoard.flipCardDown(card);
    });
    this.newTurn();
  },
  resetGameContext: function() {
    this.score = 0;
    this.elapsedTime = 0;
    this.turns = 0;
    this.rating = 2;
  }
}
