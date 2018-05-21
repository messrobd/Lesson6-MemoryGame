/*
@description Properties and behaviour of the game-in-progress
todo: remove remaining dependencies on  gameBoard
*/
const gameContext = {
  turn: [],
  initCounters: function(initGameTime, initTurns, initScore, initRating) {
    this.elapsedTime = initGameTime;
    this.turns = initTurns;
    this.score = initScore;
    this.rating = initRating;
    let displayTime = this.formatDisplayTime();
    $('#rating').text(this.rating);
    $('#move-counter').text(this.turns);
    $('#game-timer').text(displayTime);
  },
  formatDisplayTime: function() {
    let convertToSeconds = 0.001,
        roundingFactor = 10,//to show time to 1 decimal place
        displayTime = this.elapsedTime * convertToSeconds;
    return Math.round(displayTime * roundingFactor) / roundingFactor;
  },
  startTimer: function() {
    let interval = 100, //ms
        game = this,
        displayTime;
    timer = setInterval(function() { //todo: find a way to avoid relying on a global variable
        game.elapsedTime += interval;
        displayTime = game.formatDisplayTime();
        $('#game-timer').text(displayTime);
    }, interval);
  },
  getTotalGameTime: function() {
    try {
      clearInterval(timer);
      return this.formatDisplayTime();
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
      let card1 = $(this.turn[0]).find('img.card').attr('src'),
          card2 = $(this.turn[1]).find('img.card').attr('src');
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
  }
}
