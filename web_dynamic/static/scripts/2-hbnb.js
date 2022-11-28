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

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
