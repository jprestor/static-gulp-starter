const $input = $(".js-mail-form input");

$input.on("change", function() {
  if ($(this).val()) {
    $(this).addClass("form__input--selected");
  } else {
    $(this).removeClass("form__input--selected");
  }
});
