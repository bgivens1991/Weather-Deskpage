var dt = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("datetime").innerHTML = dt.toLocaleDateString('en-US', options);



function updateClock() {
var d = new Date();
document.getElementById("time").innerHTML = d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

setTimeout(updateClock, 1000);
}

updateClock();

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    let locationSection = document.querySelector(".location");
    let stateSection = document.querySelector(".state-name");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/8bde5b51cfa18e413c20202fb146a088/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary} = data.currently;

                temperatureDegree.textContent = parseInt(temperature, 10);
                temperatureDescription.textContent = summary;
                
                

                if (summary === "Partly Cloudy" || summary === "Clear" || summary === "Mostly Cloudy") {
                    document.getElementById("background").src="Weather Videos/Clouds - 4753.mp4";
                }

                else if (summary === "Thunderstorm") {
                    document.getElementById("background").src="Weather Videos/Wind - 641.mp4";
                }

                else if (summary === "Humid and Overcast") {
                    document.getElementById("background").src="Weather Videos/Lake - 11311.mp4";
                }

                else if (summary === "Fog") {
                    document.getElementById("background").src="Weather Videos/Cloudscape - 2166.mp4";
                }

                else if (summary === "Light Rain" || summary === "Heavy Rain" || summary === "Medium Rain" || summary === "Very Light Rain") {
                    document.getElementById("background").src="Weather Videos/Garden - 18230.mp4";
                }

                else {
                    document.getElementById("background").src="Weather Videos/Lighthouse - 1917.mp4";
                }

                

                

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan === "F") {
                        temperatureSpan.textContent = "C";
                    }
                    else {
                        temperatureSpan.textContent = "F";
                    }
                });


            });
            
            const location = `https://us1.locationiq.com/v1/reverse.php?key=129dd404cc09be&lat=${lat}&lon=${long}&format=json`;
            
            fetch(location)
            .then(answer => {
                return answer.json();
            })
            .then(geo => {
                console.log(geo);

                locationSection.textContent = geo.address.city;
                stateSection.textContent = geo.address.state;
            });

            
        });

    } 
    else {
        h1.textContent = "Unfortunately we need your location for this to work."
    }
});

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

window.onload = timedRefresh(900000);