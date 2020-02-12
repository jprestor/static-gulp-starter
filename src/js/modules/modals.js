/*MODAL---*/
const activeClass = "modal--show";
const bodyClass = "compensate-for-scrollbar";

$('[data-toggle="modal"]').click(function(e) {
  e.preventDefault();

  var $modalName = $(this).attr("data-target");
  var $modalTarget = $('.modal[data-modal="' + $modalName + '"]');
  var $others = $(".modal").not($modalTarget);

  $others.removeClass(activeClass);
  $modalTarget.addClass(activeClass);
  $("body").addClass(bodyClass);
});

$(".js-modal-close").click(function() {
  $(this)
    .parent()
    .parent(".modal")
    .removeClass(activeClass);
  $("body").removeClass(bodyClass);
});

$(".modal").mousedown(function(e) {
  if ($(e.target).is(this)) {
    $(this).removeClass(activeClass);
    $("body").removeClass(bodyClass);
  }
});

$(document).on("keyup", function(evt) {
  if (evt.keyCode == 27) {
    $(".js-modal-close").click();
  }
});
