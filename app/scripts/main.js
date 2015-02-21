$(function () {
  $icon        = $('.Player__controls__icon');
  $Menu_button = $('.Header__button');
  $wrapper     = $('.Wrapper');

  // Active Menu.
  $Menu_button.on('click', function () {
    $wrapper.toggleClass('Move');
  });

  // Eventos en iconos.
  $icon.on('click', function () {
    // Active suffle / Loop
    if ($(this).hasClass('icon-shuffle') || $(this).hasClass('icon-loop') ) {
      $(this).toggleClass('Active');
    }

    // Play / Pause
    if($(this).hasClass('icon-play')) {
      $(this).removeClass('icon-play');
      $(this).addClass('icon-pause');
    }
    else if($(this).hasClass('icon-pause')) {
      $(this).removeClass('icon-pause');
      $(this).addClass('icon-play');
    }

  })

});
