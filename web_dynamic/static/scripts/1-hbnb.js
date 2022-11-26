$( document ).ready(function () {
  let list = {};
  $('input[type=checkbox]').change (function () {
      if ($(this).is(':checked')) {
        list[$(this).data('id')] = $(this).data('name');
      } else {
        delete list[$(this).data('id')]
      }
    $('.amenities h4').text(list.join(', '));
  });
});
