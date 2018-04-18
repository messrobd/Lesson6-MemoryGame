var cards = $('.card');
console.log(cards);
cards.click(function(event){
  var card = event.target;
  console.log(event);
  target.toggleClass('faceDown', false);
  target.toggleClass('faceUp', true);
});
