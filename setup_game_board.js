gameBoard.createEmptyBoard();


$('#start-game').click(function() {
  gameMachine.dispatch('newGame');
});
