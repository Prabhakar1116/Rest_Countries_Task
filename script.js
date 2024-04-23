
const container = document.createElement("div");
container.classList.add("container");

const title = document.createElement("h1");
title.id = "title";
title.classList.add("text-center");
title.innerText = "Countries with Weather Report";

container.appendChild(title);

const row = document.createElement("div");
row.classList.add("row");
container.appendChild(row);

document.body.appendChild(container);

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((result) => {
    const cardContainer = document.querySelector(".row");

    for (let i = 0; i < result.length; i++) {
      let image = result[i].flags.png;
      let name = result[i].name.common;
      let capital = result[i].capital;
      let region = result[i].region;
      let countryCode = result[i].fifa;
      let lat = result[i].latlng[0];
      let lon = result[i].latlng[1];

      const col = document.createElement("div");
      col.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4", "mb-4");
      cardContainer.appendChild(col);

      const card = document.createElement("div");
      card.classList.add("card", "h-100");
      col.appendChild(card);

      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");
      cardHeader.innerText = name;
      card.appendChild(cardHeader);

      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top");
      cardImg.src = image;
      cardImg.alt = `${name} Flag`;
      card.appendChild(cardImg);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "countryDetails");
      card.appendChild(cardBody);

      const cardText = document.createElement("div");
      cardText.classList.add("card-text");
      cardText.innerHTML = `
        <p>Capital: ${capital}</p>
        <p>Region: ${region}</p>
        <p>Lat/Lng: ${lat}, ${lon}</p>
        <p>Country Code: ${countryCode}</p>
      `;
      cardBody.appendChild(cardText);

      const weatherButton = document.createElement("button");
      weatherButton.classList.add("btn", "btn-primary", "weatherButton");
      weatherButton.innerText = "Click for Weather";
      weatherButton.addEventListener("click", () => weather(lat, lon, i));
      cardBody.appendChild(weatherButton);

      const weatherReport = document.createElement("div");
      weatherReport.id = `weatherReport${i}`;
      cardBody.appendChild(weatherReport);
    }
  })
  .catch((error) =>
    console.log("error occurred during the REST countries API process")
  );

function weather(lat, lon, i) {
  const weatherReport = document.querySelector(`#weatherReport${i}`);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7824e7bdfc655f7c6eb1c1dda1e5deb5`
    
  )
    .then((response) => response.json())
    .then((result) => {
      weatherReport.innerHTML = `<span class="weather-report">${result.weather[0].description}</span>`;
    })
    .catch((error) =>
      console.log("error occurred during the weather API process")
    );
}
