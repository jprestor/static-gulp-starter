$(function () {
  const $preloader = $('.j-preloader');

  $(window).on('load', () => {
    $preloader.delay(200).fadeOut();
  });

  setTimeout(function () {
    $preloader.fadeOut();
  }, 5000);
});
