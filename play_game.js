$('#board').on('click', '.card.back', function(event){
  var cardBack = event.target;
  var cardFace = $(cardBack).siblings('.card.face')
  $(cardFace).toggleClass('down', false);
  $(cardBack).toggleClass('down', true);
});
