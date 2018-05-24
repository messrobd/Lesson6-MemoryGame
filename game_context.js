/*
@description Properties and behaviour of the game-in-progress
*/
const gameContext = {
  initTurn: function() {
    this.turn = [];
  },
  initRules: function(cardsPerTurn, gameLength, ratingBoundaries) {
    this.cardsPerTurn = cardsPerTurn;
    this.gameLength = gameLength;
    this.ratingBoundaries = ratingBoundaries;
  },
  initCounters: function(initGameTime, initTurns, initScore, initRating) {
    this.elapsedTime = initGameTime;
    this.turns = initTurns;
    this.score = initScore;
    this.rating = initRating;
    let displayTime = this.formatDisplayTime();
    $('.rating').toggleClass('failed', false);
    $('#move-counter').text(this.turns);
    $('#game-timer').text(displayTime);
  },
  formatDisplayTime: function() {
    let convertToSeconds = 0.001,
        roundingFactor = 10, //to show time to 1 decimal place
        displayTime = this.elapsedTime * convertToSeconds;
    return Math.round(displayTime * roundingFactor) / roundingFactor;
  },
  startTimer: function() {
    clearInterval(this.timer); //to ensure there is only ever one timer running
    let interval = 100, //ms
        game = this,
        displayTime;
    this.timer = setInterval(function() {
        game.elapsedTime += interval;
        displayTime = game.formatDisplayTime();
        $('#game-timer').text(displayTime);
    }, interval);
  },
  getTotalGameTime: function() {
    clearInterval(this.timer);
    return this.formatDisplayTime();
  },
  incrementTurn: function(card) {
    this.turn.push(card);
  },
  turnCardsMatch: function() {
    if (this.turn.length < this.cardsPerTurn) {
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
    if (this.turns > this.ratingBoundaries[ratingBoundary]) {
      let ratings = $('.rating');
      $(ratings[this.rating]).toggleClass('failed', true);
      this.rating --;
    }
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
  }
}
