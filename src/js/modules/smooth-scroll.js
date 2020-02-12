    var $linksToScroll = $('header a[href*="#"]:not([href="#"])');

    $linksToScroll.on('click', function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 70,
          }, 1000);
          return false;
        }
      }
    });


    /*Scroll. To-top---*/
    var $linkTop = $('.link-to-top');

    $(window).on('load scroll', function () {
      var scrollTop = $(this).scrollTop();

      if (scrollTop > 10) {
        $linkTop.removeClass('d-none');
      } else {
        $linkTop.addClass('d-none');
      }
    });
