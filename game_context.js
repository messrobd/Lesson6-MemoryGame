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
  gameTimer: function(start) {
    let interval = 100,//ms
        game = this;
    if(start) {
      timer = setInterval(function() {
        game.elapsedTime += interval;
      }, interval);
    } else if (!start) {
      try {
        clearInterval(timer);
      }
      catch (error) {
        return;
      }
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
  }
}
