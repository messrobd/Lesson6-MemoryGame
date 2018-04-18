$('#board').on('click', '.card.back', function(event){
  var card = event.target;
  console.log(event.target);
  $(card).toggleClass('down', true);
  //target.toggleClass('faceUp', true);
});
