$( document ).ready(function () {
  /*****************************************************
    Amenity checkbox
   *****************************************************/
  let amen_list = {};
  $('.amenities input[type=checkbox]').change (function () {
      if ($(this).is(':checked')) {
        amen_list[$(this).data('id')] = $(this).data('name');
      } else {
        delete amen_list[$(this).data('id')]
      }
    $('.amenities h4').text(amen_list.join(', '));
  });
  /*****************************************************
    city checkbox
   *****************************************************/
  let city_list = {};
  $('.locations input[type=checkbox]').change (function () {
      if ($(this).is(':checked')) {
        city_list[$(this).data('id')] = $(this).data('name');
      } else {
        delete city_list[$(this).data('id')]
      }
    $('.locations h4').text(city_list.join(', '));
  });
  /*****************************************************
    State checkbox
   *****************************************************/
    let state_list = {};
    $('.locations input[type=checkbox]').change (function () {
        if ($(this).is(':checked')) {
          state_list[$(this).data('id')] = $(this).data('name');
        } else {
          delete state_list[$(this).data('id')]
        }
      $('.locations h4').text(state_list.join(', '));
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
  $('button').click(function () {
    $('article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(amen_list), 'cities': Object.key(city_list), 'state': Object.key(state_list)}),
      dataType: 'json',
      contentType: 'application/json',
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
});
