# Lesson6-MemoryGame
Lesson 6 final project: Memory game webpage
* the aim of the game is to match 8 pairs of cards
  - the cards are dealt face down in a random order
  - each turn the player turns over 2 cards by clicking on them
    - if they match, they remain face up
    - if they don't, they are turned face down again and the player takes
    another turn
* the player can use as many turns as they like, but they receive a rating as
follows:
  - the initial rating is 3
  - after 15 turns (ie, enough to view every card, less a turn for when there
    are only 2 cards remaining) a rating will be lost
  - after another 10 turns, another rating will be lost
* once all the cards are matched the player can choose whether to play again or not
* the player can restart the game at any time

How to play
1. download or clone this folder (Lesson6-MemoryGame)
2. open index.html in the browser  
3. click "play" to begin 

Files and dependencies:
* only the .html, .css and .js files are loaded to run the game program. the python scripts are dev utilities
* game requires jQuery 3.3.1 from Google CDN
* setup_game_board.js: initiates gameplay. depends on
  - imageDict.js
  - game_board_machine.js
* imageDict.js: contains the image references that define the deck that will
  be used in the game  
* game_board_machine: defines states and implements transitions when a
  game is started or concluded. depends on
  - game_board.js
  - game_machine.js
* game_board: contains functions that implement the behaviour of the board,
  and properties to instantiate a new game
* game_machine: defines states of the current game and implements transitions
  to play cards and evaluate the outcome. depends on
  - game_board.js
  - game_context.js
* game_context: contains properties of the current game, and functions to
  implement turn evaluation etc

references:
* state machine design from https://www.smashingmagazine.com/2018/01/rise-state-machines/
