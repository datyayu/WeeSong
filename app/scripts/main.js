$(function () {
  $('.Header__button').on('click', function () {
    $(this).toggleClass('Active')
    $('.Menu').toggleClass('Active')
    $('Header').toggleClass('Move')
  })
})