  $(function () {
    const $header = $('.page-header');
    const $mainNav = $(".main-nav");


    /* - Активируем мобильное меню
    ------------------------------ */

    const activeNavClass = 'main-nav--act';

    const onMainNavToggleClick = () => {
      if ($mainNav.hasClass(activeNavClass)) {
        $mainNav.removeClass(activeNavClass);
        //        showScroll();

      } else {
        $mainNav.addClass(activeNavClass);
        //        hideScroll();
      }
    };


    /* - По клику на ссылку закрываем меню и активируем скролл
    ----------------------------- */

    const onMainNavLinkClick = () => {
      if (window.matchMedia('(max-width: 1084px)').matches) {
        $mainNav.removeClass(activeNavClass);
        //        showScroll();
      };
    };


    /* - При скролле страницы вверх сдвигаем хедер
    ------------------------------- */

    const headerShiftClass = 'page-header--shifted';
    let $lastScrollTop = 0;

    const headerShift = () => {
      let $scrollTop = $(window).scrollTop();

      if ($scrollTop > 5) {
        $header.addClass(headerShiftClass);


        if ($scrollTop < $lastScrollTop) {
          $header.removeClass(headerShiftClass);
        }
      } else {
        $header.removeClass(headerShiftClass);
      }

      $lastScrollTop = $scrollTop;
    };


    /* - При скролле страницы
    ------------------------------- */

    const pageScrollClass = 'page--scroll';

    const onPageScroll = () => {
      let $scrollTop = $(window).scrollTop();

      if ($scrollTop > 100) {
        $('body').addClass(pageScrollClass);

      } else {
        $('body').removeClass(pageScrollClass);
      }
    };


    /* - EVENTS -------- */
    $(".main-nav__toggle").click(onMainNavToggleClick);
    $(".main-nav__link").click(onMainNavLinkClick);

    $(window).scroll(() => {
      headerShift();
      onPageScroll();
    });

  });
