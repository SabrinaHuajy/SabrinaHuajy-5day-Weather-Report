const parse_saved_cities = JSON.parse(localStorage.getItem('city'));

const input_cities = document.querySelector('#input_cities');
const cities_chosen_div = document.querySelector('#cities_chosen_div');
const cities_chosen_button = document.querySelector('#cities_chosen_button');

const city_name = document.querySelector('#city_name');
const img_weather_today = document.querySelector('#img_weather_today');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const uv_index = document.querySelector('#uv_index');

const cities_saved = [];

if (parse_saved_cities !== null) {
  get_cities_saved();
}


function get_cities_saved() {


  for (i = 0; i < parse_saved_cities.length; i++) {
    var button_cities = document.createElement('button');
    button_cities.setAttribute('data-value', parse_saved_cities[i].texts);
    button_cities.classList.add('button_city')
    button_cities.textContent = parse_saved_cities[i].texts;
    cities_chosen_div.append(button_cities);
  }

  cities_chosen_div.addEventListener('click', get_city_chosen);
}

$(function () {
  var availableTags = ['York', 'Tokyo', 'Shanghai', 'Deli', 'Prague', 'Seoul', 'Mexico city', 'Madrid', 'Manila', 'New York', 'BeiJing', 'London', 'Manchester', 'Guangzhou'];
  $("#input_cities").autocomplete({
    source: availableTags,
  });
});


function get_city() {
  if (input_cities.value == '') {
    alert('Please, insert one city on EUA');
  } else if (!isNaN(input_cities.value)) {
    alert('Insert one city on EUA');
  } else {


    var city = input_cities.value.trim();
    console.log(city)
    var button_cities = document.createElement('button');
    console.log(button_cities)
    button_cities.setAttribute('data-value', city);
    button_cities.classList.add('button_city')
    button_cities.textContent = city;
    cities_chosen_div.append(button_cities);


    var object_city = {
      texts: city
    }
    cities_saved.push(object_city);

    localStorage.setItem('city', JSON.stringify(cities_saved));

    input_cities.value = '';
    console.log('test')
    const url_api_weather = ('https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=91c2192a6f0948bb2d116c3e5eb13b43&units=imperial&q=' + city + ',EUA')

    fetch(url_api_weather)
      .then(function (response) {

        if (!response.ok) {
          alert('Warning: error');
        }
        return response.json();
      })
      .then(function (data) {
        return get_weather(data);
      })
  }
}


function get_weather(data) {

  city_name.innerHTML = data.city.name + ' ' + moment().format("(MM-DD-YYYY)");


  temp.innerHTML = ' ' + data.list[0].main.temp + 'ºF';
  wind.innerHTML = ' ' + data.list[0].wind.speed + ' MPH';
  humidity.innerHTML = ' ' + data.list[0].main.humidity + '%';
  uv_index.innerHTML = ' ' + 'pending';
  console.log(data.list)

  if (data.list[0].weather[0].main == "Clear") {
    img_weather_today.classList.remove('hide');
    img_weather_today.setAttribute('src', '../assets/images/sunny.png');
    img_weather_today.setAttribute('alt', 'sunny');

  } else if (data.list[1].weather[0].main == "Clouds") {
    img_weather_today.classList.remove('hide');
    img_weather_today.setAttribute('src', '../assets/images/cloudy.png');
    img_weather_today.setAttribute('alt', 'cloudy');

  } else if (data.list[2].weather[0].main == "Rain") {
    img_weather_today.classList.remove('hide');
    img_weather_today.setAttribute('src', '../assets/images/rainy.png');
    img_weather_today.setAttribute('alt', 'rainy');

  } else if (data.list[3].weather[0].main == "Snow") {
    img_weather_today.classList.remove('hide');
    img_weather_today.setAttribute('src', '../assets/images/snowy.png');
    img_weather_today.setAttribute('alt', 'snowy');

  } else {
    img_weather_today.classList.remove('hide');
    img_weather_today.setAttribute('src', '../assets/images/dangerous.png');
    img_weather_today.setAttribute('alt', 'dangerous');
  }


  get_weather_5(data);
}

function get_weather_5(data) {
  console.log("get_weather_5");

  for (i = 1; i <= 5; i++) {
    var time_5 = document.querySelector('#time' + [i]);
    time_5.textContent = moment().add([i], 'days').format("MM/DD/YYYY");


    var temp_5 = document.querySelector('#temp' + [i]);
    var wind_5 = document.querySelector('#wind' + [i]);
    var humidity_5 = document.querySelector('#humidity' + [i]);
    var img_5 = document.querySelector('#img' + [i]);

    temp_5.textContent = ` ${data.list[i * 7].main.temp} ºF`;
    wind_5.textContent = ` ${data.list[i * 7].wind.speed} MPH`;
    humidity_5.textContent = ` ${data.list[i * 7].main.humidity} %`;


    if (data.list[i * 7].weather[0].main == "Clear") {
      img_5.classList.remove('hide');
      img_5.setAttribute('src', '../assets/images/sunny.png');
      img_5.setAttribute('alt', 'sunny');

    } else if (data.list[i * 7].weather[0].main == "Clouds") {
      img_5.classList.remove('hide');
      img_5.setAttribute('src', '../assets/images/cloudy.png');
      img_5.setAttribute('alt', 'cloudy');

    } else if (data.list[i * 7].weather[0].main == "Rain") {
      img_5.classList.remove('hide');
      img_5.setAttribute('src', '../assets/images/rainy.png');
      img_5.setAttribute('alt', 'rainy');

    } else if (data.list[i * 7].weather[0].main == "Snow") {
      img_5.classList.remove('hide');
      img_5.setAttribute('src', '../assets/images/snowy.png');
      img_5.setAttribute('alt', 'snowy');

    } else {
      img_5.classList.remove('hide');
      img_5.setAttribute('src', '../assets/images/dangerous.png');
      img_5.setAttribute('alt', 'dangerous');
    }
  }
}


function get_city_chosen(e) {


  var button_cities_attribute = e.target.getAttribute('data-value');

  city = button_cities_attribute;
  console.log(city)


  const url_api_weather = ('https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=91c2192a6f0948bb2d116c3e5eb13b43&units=imperial&q=' + city + ',EUA')
  console.log('test2')


  fetch(url_api_weather)
    .then(function (response) {

      if (!response.ok) {
        alert('Warning: error');
      }
      return response.json();
    })
    .then(function (data) {
      return get_weather(data);
    })
}

$('#search').on('click', function (e) {
  get_city()
});

// function clearcities() {
//   localStorage.removeItem("button_cities");
//   location.reload();
// }

// document.getElementById("cleanup").onclick = clearcities;