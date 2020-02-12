$(function() {
  const isFrontPage = $(".front-page").length;
  const isSchoolHistoryPage = $(".pg-school-history").length;

  if (isFrontPage) {
    const $bannerSlider = $(".js-banner-slider");

    $bannerSlider.on("init afterChange", function(event, slick, currentSlide) {
      const i = (currentSlide ? currentSlide : 0) + 1;
      const $currentNum = $(this).find(".js-current-num");
      const $totalNum = $(this).find(".js-total-num");

      $currentNum.text("0" + i);
      $totalNum.text("0" + slick.slideCount);
    });

    $bannerSlider.slick({
      rows: 0,
      slide: ".js-slide",
      // autoplay: true,
      fade: true,
      autoplaySpeed: 5000,
      speed: 500,

      responsive: [
        {
          breakpoint: 1239,

          settings: {
            arrows: false,
            dots: true
          }
        }
      ]
    });

    const $columnsSlider = $(".js-four-columns-slider");
    $columnsSlider.slick({
      rows: 0,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1240,

          settings: {
            slidesToShow: 2,
            arrows: false,
            dots: true
          }
        },
        {
          breakpoint: 767,

          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true
          }
        }
      ]
    });

    const $partnersSlider = $(".js-partners-slider");
    $partnersSlider.slick({
      slidesToShow: 6,
      responsive: [
        {
          breakpoint: 1680,

          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1240,

          settings: {
            slidesToShow: 3,
            arrows: false,
            dots: true
          }
        },
        {
          breakpoint: 767,

          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true
          }
        }
      ]
    });
  }

  if (isSchoolHistoryPage) {
    const $schoolHistorySlider = $(".js-school-history-slider");

    $schoolHistorySlider.slick({
      slidesToShow: 5,
      infinite: false,
      responsive: [
        {
          breakpoint: 1680,

          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1240,

          settings: {
            slidesToShow: 3,
            arrows: false,
            dots: true
          }
        },
        {
          breakpoint: 767,

          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true
          }
        }
      ]
    });
  }
});
