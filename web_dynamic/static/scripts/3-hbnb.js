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

  $.ajex({
    type: 'POST',
    url: "http://0.0.0.0:5001/api/v1/places_search",
    data: JSON.stringify({}),
    ContentType: application/json,
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places').append(
        '<article>' +
        '<div class="title_box">' +
          '<h2>' + place[i].name + '</h2>' +
          '<div class="price_by_night">$' + place[i].price_by_night + '</div>' +
        '</div>' +
        '<div class="information">' +
          '<div class="max_guest">' + place[i].max_guest + ' Guest</div>' +
                '<div class="number_rooms">' + place[i].number_rooms + ' Bedroom</div>' +
                '<div class="number_bathrooms">' + place[i].number_bathrooms + ' Bathroom</div>' +
        '</div>' +
        '<div class="user">' +
        '<b>Owner:</b>' + place.user.first_name + place.user.last_name +
        '</div>' +
        '<div class="description">' + place.description +
        '</div>' +
      '</article>');
      }
    }
  });
});
