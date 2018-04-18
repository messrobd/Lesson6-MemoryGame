$('#board').on('click', '.card.back', function(event){
  var cardBack = event.target;
  var cardFace = $(cardBack).siblings('.card.face');
  $(cardFace).toggleClass('down', false);
  $(cardBack).toggleClass('down', true);
  var card = $(cardFace).text();
  updateGame(card);
});

var turnCard, cardMatch;
var flipCount = 0;
function updateGame(card) {
  if (flipCount === 0) {
    turnCard = card;
    flipCount ++;
  } else {
    cardMatch = turnCard === card;
    flipCount = 0;
  }
}
