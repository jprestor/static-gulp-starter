const $range = $(".js-range");
const $money = $(".js-range-money");

$range.ionRangeSlider({
  min: 0,
  max: 10000,
  from: 500,

  onStart: function(data) {
    $money.text(`${data.from} руб.`);
  },
  onChange: function(data) {
    $money.text(`${data.from} руб.`);
  }
});
