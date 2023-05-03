const Weather = {
  apiKey: "c1a6da483e4450b352e3e16b6c56a5c6",
  apiIconUrl: "https://openweathermap.org/img/wn/",
  getWeather: function (cityName) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric&lang=ua`
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Wrong city name");
        }
        return response.json();
      })
      .then(function (result) {
        Weather.displayWeather(result);
      });
  },
  startSearch: function (form) {
    let city = form.elements.cityName.value;
    if (city?.length >= 3) {
      this.getWeather(city);
    }
    form.reset();
  },
  displayWeather: function (data) {
    document.querySelector(".app__result").removeAttribute("hidden");
    console.log(data);
    this.cityName = data;
    document.querySelector(".cityName").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp);
    document.querySelector(".clouds").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText =
      Math.round(data.main.humidity) + "%";
    document.querySelector(".windSpeed").innerText = data.wind.speed;
    document
      .querySelector(".icon")
      .setAttribute("src", `${this.apiIconUrl}${data.weather[0].icon}.png`);
  },
};

document.addEventListener("submit", function () {
  event.preventDefault();
  Weather.startSearch(event.target);
});

const CLIENT_ID = "ZYTD44efX6CLGiAb_wI7Yxmcd04aiPkD6m-6q4Gnab0";
const fetchPhotos = async (cityName) => {
  console.log(cityName);
  // fetchPhotos(cityName);
  const url = `https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&query=Florida`;
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    document.querySelector(
      ".app"
    ).style.backgroundImage = `url(${data.results[0].urls.full})`;
  }
};
