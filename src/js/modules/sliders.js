$(function () {
  if ($('.home').length) {
    $('.j-intro-slider').slick({
      rows: 0,
      prevArrow: '.intro__slider-prev',
      nextArrow: '.intro__slider-next',
    });

    $('.j-sertificates-slider').slick({
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 1200,

          settings: {
            slidesToShow: 3,
          }
        },

        {
          breakpoint: 750,

          settings: {
            slidesToShow: 1,
          }
        },
      ],
    });
  }

  if ($('.home').length || $('.pg-portfolio').length) {
    $('.j-projects-slider').slick({
      rows: 0,
      responsive: [
        {
          breakpoint: 750,

          settings: {
            arrows: false,
            dots: true
          }
        },
      ],
    });
  }


  if ($('.home').length || $('.pg-about-us').length) {
    $('.j-our-team-slider').slick({
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 1200,

          settings: {
            slidesToShow: 3,
          }
        },

        {
          breakpoint: 750,

          settings: {
            slidesToShow: 1,
          }
        },
      ],
    });
  }


  if ($('.pg-about-us').length) {
    $('.j-press-slider').slick({
      rows: 0,
      slidesToShow: 3,
      infinite: false,
      responsive: [
        {
          breakpoint: 1200,

          settings: {
            slidesToShow: 2,
          }
        },

        {
          breakpoint: 750,

          settings: {
            slidesToShow: 1,
          }
        },
      ],
    });
  }


  if ($('.pg-services').length) {
    $('.j-slider-from-scratch').slick({
      rows: 0,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 750,

          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
          }
        },
      ],
    });
  }
});
