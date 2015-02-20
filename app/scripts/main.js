$(function () {
  $content     = $('.Content');
  $Menu_button = $('.Header__button');
  $wrapper     = $('.Wrapper');

  $Menu_button.on('click', function () {
    $wrapper.toggleClass('Move');
  });

});
