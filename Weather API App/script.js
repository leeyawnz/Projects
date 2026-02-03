// API Key
// City API Key
api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY
let queryUrl1 = "https://api.openweathermap.org/data/2.5/weather?q="
let APIKey = "&appid=7c7d7a1926ecee9815479af7ceeaee76"
let units = "&units=metric"
let cityName = "Singapore";
let file1 = queryUrl1 + cityName + units + APIKey;
console.log(file1)
fetch(file1).then((response) => response.json()).then((data) => {
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    document.getElementById("city-name").innerHTML = cityName;
    document.getElementById("city-lon").innerHTML = Math.round(lon * 100) / 100;
    document.getElementById("city-lat").innerHTML = Math.round(lat * 100) / 100;

    // Hourly, Daily API Key
    let queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    let APIoptions = "&exclude=minutely,alerts";
    let file2 = queryUrl2 + lat + "&lon=" + lon + "&" + units + APIoptions + APIKey;
    console.log(file2)
    fetch(file2).then((response) => response.json()).then((data) => {
        // Current Data
        console.log(data)
        let description = data.current.weather[0].description;
        let currentTemp = Math.round(data.current.temp) + "ºC";
        let pressure = data.current.pressure;
        let humidity = data.current.humidity + "%";

        document.getElementById("current-description").innerHTML = description;
        document.getElementById("current-temp").innerHTML = currentTemp;
        document.getElementById("current-pressure").innerHTML = pressure;
        document.getElementById("current-humidity").innerHTML = humidity;

        // Hourly Data
        let nowTemp = Math.round(data.hourly[0].temp) + "ºC";
        let hour1Temp = Math.round(data.hourly[1].temp) + "ºC";
        let hour2Temp = Math.round(data.hourly[2].temp) + "ºC";
        let hour3Temp = Math.round(data.hourly[3].temp) + "ºC";
        let hour4Temp = Math.round(data.hourly[4].temp) + "ºC";

        document.getElementById("now-temp").innerHTML = nowTemp;
        document.getElementById("hour1-temp").innerHTML = hour1Temp;
        document.getElementById("hour2-temp").innerHTML = hour2Temp;
        document.getElementById("hour3-temp").innerHTML = hour3Temp;
        document.getElementById("hour4-temp").innerHTML = hour4Temp;

        // Daily Data
        let tomorrowTemp = Math.round(data.daily[1].temp.day) + "ºC";
        let dATTemp = Math.round(data.daily[2].temp.day) + "ºC";

        document.getElementById("tomorrow-temp").innerHTML = tomorrowTemp;
        document.getElementById("dAT-temp").innerHTML = dATTemp;

        // Date
        let timeNow = new Date().getHours();
        if (timeNow > 12) {
            timeNow -= 12;
        }
                
        if (timeNow == 10) {
            let time1 = timeNow + 1;
            let time2 = timeNow + 2;
            let time3 = timeNow + 3 - 12;
            let time4 = timeNow + 4 - 12;

            document.getElementById("hour1-title").innerHTML = time1;
            document.getElementById("hour2-title").innerHTML = time2;
            document.getElementById("hour3-title").innerHTML = time3;
            document.getElementById("hour4-title").innerHTML = time4;
        } else if (timeNow == 11) {
            let time1 = timeNow + 1;
            let time2 = timeNow + 2 - 12;
            let time3 = timeNow + 3 - 12;
            let time4 = timeNow + 4 - 12;

            document.getElementById("hour1-title").innerHTML = time1;
            document.getElementById("hour2-title").innerHTML = time2;
            document.getElementById("hour3-title").innerHTML = time3;
            document.getElementById("hour4-title").innerHTML = time4;
        } else if (timeNow == 12) {
            let time1 = timeNow + 1 - 12;
            let time2 = timeNow + 2 - 12;
            let time3 = timeNow + 3 - 12;
            let time4 = timeNow + 4 - 12;

            document.getElementById("hour1-title").innerHTML = time1;
            document.getElementById("hour2-title").innerHTML = time2;
            document.getElementById("hour3-title").innerHTML = time3;
            document.getElementById("hour4-title").innerHTML = time4;
        } else if (timeNow > 12) {
            let time1 = timeNow + 1 - 12;
            let time2 = timeNow + 2 - 12;
            let time3 = timeNow + 3 - 12;
            let time4 = timeNow + 4 - 12;

            document.getElementById("hour1-title").innerHTML = time1;
            document.getElementById("hour2-title").innerHTML = time2;
            document.getElementById("hour3-title").innerHTML = time3;
            document.getElementById("hour4-title").innerHTML = time4;
        } else {
            let time1 = timeNow + 1;
            let time2 = timeNow + 2;
            let time3 = timeNow + 3;
            let time4 = timeNow + 4;

            document.getElementById("hour1-title").innerHTML = time1;
            document.getElementById("hour2-title").innerHTML = time2;
            document.getElementById("hour3-title").innerHTML = time3;
            document.getElementById("hour4-title").innerHTML = time4;
        }

        // Icons
        let iconBaseUrl = "https://openweathermap.org/img/wn/";
        let iconFormat = ".png";

        // Icon Hourly
        let iconHourNow = data.hourly[0].weather[0].icon;
        let iconFullUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
        document.getElementById("now-icon").src = iconFullUrlHourNow;

        let iconHour1 = data.hourly[1].weather[0].icon;
        let iconFullUrlHour1 = iconBaseUrl + iconHour1 + iconFormat;
        document.getElementById("hour1-icon").src = iconFullUrlHour1;

        let iconHour2 = data.hourly[2].weather[0].icon;
        let iconFullUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
        document.getElementById("hour2-icon").src = iconFullUrlHour2;

        let iconHour3 = data.hourly[3].weather[0].icon;
        let iconFullUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
        document.getElementById("hour3-icon").src = iconFullUrlHour3;

        let iconHour4 = data.hourly[4].weather[0].icon;
        let iconFullUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
        document.getElementById("hour4-icon").src = iconFullUrlHour4;

        // Icon Daily
        let iconCodeTomorrow = data.daily[0].weather[0].icon;
        let iconFullUrlTomorrow= iconBaseUrl + iconCodeTomorrow + iconFormat;
        document.getElementById("tomorrow-icon").src = iconFullUrlTomorrow;

        let iconCodeDAT = data.daily[1].weather[0].icon;
        let iconFullUrlDAT= iconBaseUrl + iconCodeDAT + iconFormat;
        document.getElementById("dAT-icon").src = iconFullUrlDAT;
    })
})
