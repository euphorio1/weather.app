

async function getThatWeather() {

    

    let searchInput = document.getElementById('w-search').value;
    let weatherResult = document.getElementById('weather-result');
    weatherResult.style.display = 'block';
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (searchInput == '') {

        weatherResult.innerHTML = `
     <div class="empty">
     <h2>Empty Input!</h2>
     <p>Please Enter a Valid <u>City Name</u> </p>
     </div>
        `
        return;
    }

    async function getLonAndLat() {
        const countryCode = 0;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;

        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();

        if (data.length == 0) {
            console.log("Something went wrong here.");
            weatherResult.innerHTML = `
            <div class="invalid">
              <h2>Invalid Input: "${searchInput}"</h2>
              <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
        } else {
            return data[0];
        }

    }

    async function getWeatherData(lon, lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();

        weatherResult.innerHTML = `
       
        
        <div class="main-result">
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <h2>${data.name},${data.sys.country}</h2>
        
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        
        </div>
`
     
    }

    document.getElementById("w-search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);

  

}

// ENTER KEY PRESS

document.getElementById('w-search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('w-submit').click();
    }
});