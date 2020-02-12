// Open thumbs view straight away for demo purposes
if (window.matchMedia('(min-width: 768px)').matches) {
  $.fancybox.defaults.thumbs.autoStart = true;
}

// fancybox
$().fancybox({
  selector: '.js-gallery-item:not(.slick-cloned)',
  backFocus: false
});


// ============================================
// Attach custom click event on cloned elements,
// trigger click event on corresponding link
// ============================================
$(document).on('click', '.slick-cloned', function (e) {
  var $slides = $(this)
    .parent()
    .children('.slick-slide:not(.slick-cloned)');

  $slides
    .eq(($(this).attr("data-slick-index") || 0) % $slides.length)
    .trigger("click.fb-start", {
      $trigger: $(this)
    });

  return false;
});
