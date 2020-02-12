const dropdownHandler = function (e) {
  e.preventDefault();
  $dropdown.next().slideUp();

  if (!($(this).next().is(":visible"))) {
    $dropdown.not(this).removeClass("dropdown--act");
    $(this).next().slideDown();
  };

  $(this).toggleClass("dropdown--act");
};
