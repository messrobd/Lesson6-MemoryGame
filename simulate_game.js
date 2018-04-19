function simulateGame() {
  var cards = ["A", "B", "C", "D", "E", "F", "G", "H"]
  var boardCards = $('.card.face');
  cards.forEach(function(card) {
    $(boardCards).each(function(){
      if ($(this).text() === card) {
        cardBack = $(this).siblings('.card.back');
        $(cardBack).trigger('click');
        console.log($(this).text());
      }
    });
  });
}
