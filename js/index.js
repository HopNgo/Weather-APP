
const DEFAULT_VALUE = '--';

const searchInput = document.querySelector('#search-input');
const APIKey = '2bfe6e7f86822763406ae37142d103ab';
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

cityName.textContent = DEFAULT_VALUE;
weatherState.textContent = DEFAULT_VALUE;
weatherIcon.textContent = DEFAULT_VALUE;
temperature.textContent = DEFAULT_VALUE;

sunrise.textContent = DEFAULT_VALUE;
sunset.textContent = DEFAULT_VALUE;
humidity.textContent = DEFAULT_VALUE;
windSpeed.textContent = DEFAULT_VALUE;

function convertTimeStampToHours(timestamp) {
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APIKey}&units=metric&lang=vi`)
        .then(response => response.json())
        .then(data => {
            cityName.textContent = data.name;
            weatherState.textContent = data.weather[0].description;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.textContent = Math.round(data.main.temp);

            sunrise.textContent = convertTimeStampToHours(data.sys.sunrise);
            sunset.textContent = convertTimeStampToHours(data.sys.sunset);
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = (data.wind.speed * 3.6).toFixed(2) + " ";

        });
})