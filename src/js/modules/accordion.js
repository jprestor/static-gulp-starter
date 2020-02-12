const $toggle = $(".js-accordion-toggle");
const $content = $(".js-accordion-content");
const activeSelector = "is-active";

const dropdownHandler = function(e) {
  e.preventDefault();
  $toggle.siblings(".js-accordion-content").slideUp();

  if (
    !$(this)
      .next()
      .is(":visible")
  ) {
    $toggle.not(this).removeClass(activeSelector);
    $(this)
      .next()
      .slideDown();
  }

  $(this).toggleClass(activeSelector);
};

$toggle.click(dropdownHandler);
