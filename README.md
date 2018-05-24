# Lesson6-MemoryGame
Lesson 6 final project: Memory game webpage

dependencies:
* jQuery 3.3.1 from Google CDN
* setup_game_board.js:
  - imageDict.js: contains the image references that define the deck that will
  be used in the game
  - game_board_machine: defines states and implements transitions when a
  game is started or concluded
* game_board_machine:
  - game_board: contains functions that implement the behaviour of the board,
  and properties to instantiate a new game
  - game_machine: defines states of the current game and implements transitions
  to play cards and evaluate the outcome
* game_machine:
  - game_context: contains properties of the current game, and functions to
  implement turn evaluation etc
  - game_board: see above

references:
* state machine design from https://www.smashingmagazine.com/2018/01/rise-state-machines/
