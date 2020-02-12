  /*MODAL---*/
  const activeClass = 'modal--show';
  const bodyClass = 'modal-open';

  $('[data-toggle="modal"]').click(function (e) {
    e.preventDefault();

    var $modalName = $(this).attr('data-target');
    var $modalTarget = $('.modal[data-modal="' + $modalName + '"]');
    var $others = $('.modal').not($modalTarget);

    $others.removeClass(activeClass);
    $modalTarget.addClass(activeClass);
    $('body').addClass(bodyClass);
  });

  $('.modal-close').click(function () {
    $(this).parent().parent('.modal').removeClass(activeClass);
    $('body').removeClass(bodyClass);
  });

  $('.modal').click(function (e) {
    if ($(e.target).is(this)) {
      $(this).removeClass(activeClass);
      $('body').removeClass(bodyClass);
    };
  });
