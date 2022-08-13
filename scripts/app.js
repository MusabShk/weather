const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const cardImage = document.querySelector(".card-img-top");
const cardNotFound = document.querySelector(".notfound");

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  details.innerHTML = `<h5 class="card-title text-center">${cityDetails.EnglishName}</h5>
    <p class="card-text text-center">${weather.WeatherText}</p>
    <p class="card-text text-center">
      <small class="text-muted">${weather.Temperature.Metric.Value} &deg; C</small>
    </p>`;

  let timeSrc = weather.IsDayTime ? "images/day.png" : "images/night.png";
  //   if (weather.IsDayTime) {
  //     timeSrc = "images/day.jpg";
  //   } else {
  //     timeSrc = "images/night.jpg";
  //   }

  cardImage.setAttribute("src", timeSrc);

  if (!cardNotFound.classList.contains("d-none")) {
    cardNotFound.classList.add("d-none");
  }
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => {
      //   console.log(err);
      card.classList.add("d-none");
      cardNotFound.classList.remove("d-none");
    });
});
