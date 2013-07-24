$(function () {
  var el = $('<div>');
  el.elementready(function () {
    $(this).html('hello world').attr('id', 'salutation');
  });
  $(document).append(el);
});