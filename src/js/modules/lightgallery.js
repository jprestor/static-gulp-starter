$(function () {
  $('.j-gallery').lightGallery({
    selector: '.j-gallery-item',
    thumbnail: true,
  });

  $('.j-show-gallery').click(function () {
    $('.j-gallery-item').first().trigger('click');
  });
});
