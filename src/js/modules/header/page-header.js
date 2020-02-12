$(function() {
  const $header = $(".js-page-header");
  const $mainNav = $(".js-main-nav");

  /* - Активируем мобильное меню
    ------------------------------ */

  const activeNavClass = "main-nav--act";

  const onNavToggleClick = () => {
    if ($mainNav.hasClass(activeNavClass)) {
      $mainNav.removeClass(activeNavClass);
    } else {
      $mainNav.addClass(activeNavClass);

      $("body").click(e => {
        if ($(e.target).closest(".js-main-nav").length === 0) {
          onNavToggleClick();
        }
      });
    }
  };

  /* - По клику на ссылку закрываем меню и активируем скролл
    ----------------------------- */

  const onNavLinkClick = () => {
    if (window.matchMedia("(max-width: 1200px)").matches) {
      $mainNav.removeClass(activeNavClass);
    }
  };

  /* - Если элемент попал во вьюпорт
    ----------------------------- */

  const isAnyPartOfElementInViewport = function(el) {
    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  };

  /* - EVENTS -------- */
  const $navToggle = $(".js-main-nav-toggle");
  const $navLink = $(".js-main-nav li a");

  $navToggle.click(onNavToggleClick);
  $navLink.click(onNavLinkClick);

  const secondaryNav = document.querySelector(".js-secondary-nav");

  $(window).scroll(() => {
    if (isAnyPartOfElementInViewport(secondaryNav)) {
      $mainNav.addClass("main-nav--is-hidden");
    } else {
      $mainNav.removeClass("main-nav--is-hidden");
    }
  });
});
