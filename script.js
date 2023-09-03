const container = document.getElementsByClassName("container-1")[0];
const arr = document.getElementsByClassName("inner-text");
let apiKey = `87a4f85010326a6ab3760b121ddab25b`;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      arr[0].innerText = `Lat: ${latitude}`;
      arr[1].innerText = `Long: ${longitude}`;

      // Create iframe tag
      const iframe = document.createElement("iframe");
      iframe.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
      iframe.width = "750";
      iframe.height = "330";
      iframe.style.border = "0";
      container.appendChild(iframe);

      // Fetch the Geoloction of user
      let response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      let temp = response.then((data) => {
        return data.json();
      });
      temp.then((d) => {
        arr[2].innerText = `Location: ${d.name}`;
        arr[3].innerHTML = `Wind Speed: ${d.wind.speed} kmph`;
        arr[4].innerText = `Humidity : ${d.main.humidity}`;
        arr[5].innerText = `Timezone: ${secondsToTimeZoneString(d.timezone)}`;
        arr[6].innerText = `Pressure: ${d.main.pressure} atm`;
        arr[7].innerText = `Wind Direction : ${degreesToWindDirection(
          d.wind.deg
        )}`;
        arr[9].innerText = `Feels like: ${d.main.feels_like}°`;
        arr[10].innerText = `Temperature: ${temperature(d.main.temp)} °C`;
        console.log(d);
      });
    });
  }
}

function temperature(k) {
  let c = k - 273.15;
  return parseInt(c);
}

// Wind Direction
const degreesToWindDirection = (degrees) => {
  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// convert timzone given by weather api into string
const secondsToTimeZoneString = (offsetSeconds) => {
  const hours = Math.floor(offsetSeconds / 3600);
  const minutes = Math.floor((offsetSeconds % 3600) / 60);
  const sign = offsetSeconds < 0 ? "-" : "+";
  const formattedOffset = `${sign}${Math.abs(hours)
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return `UTC${formattedOffset}`;
};
getLocation();
