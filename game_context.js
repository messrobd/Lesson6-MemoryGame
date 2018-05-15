/*
@description Properties and behaviour of the game-in-progress
*/
const gameContext = {
  turn: [],
  score: 0,
  incrementTurn: function(card) {
    this.push(card);
  },
  incrementScore: function() {
    this.score ++;
  },
  /*turnCardsMatch: function() {
    let card1 = $(this.turn[0]).find('.card.face').text(),
        card2 = $(this.turn[1]).find('.card.face').text();
    return card1 === card2;
  },*/
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
