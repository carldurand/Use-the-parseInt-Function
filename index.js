// as html and css is loaded, this code will run
window.addEventListener('load', ()=>{
    let long;   // longitutude
    let lat;    // latitude
    // selecting html elements
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.temperature-unit');
    
    //  if location is supported by browser
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // we need to use proxy because API does not work on local host
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            // weather API with API key to get weather data
            const api = `${proxy}https://api.darksky.net/forecast/4d1e6e2e896f28a52c01e04bffa89039/${lat},${long}`;

            // asking to get data from server
            fetch(api)
            // if server response with some data
            .then(response =>{
                // sreturn data in the form of json file
                return response.json();
                // than store all in data object
            }).then(data =>{
            
            /* console.log(data);  check with this line what you are getting from server API */
            
            // using API data and put into our html
            
                // we are getting data from data object current property
                const {temperature,summary, icon}= data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                temperatureTimezone.textContent = data.timezone;
            
                // put icon according to the weather
                setIcons(icon,document.querySelector('.icon') );

                // changing faranhite to celsius and celcius to fahrenheit and vice versa
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = (((temperatureDegree.textContent)-32 )/1.8).toFixed(0);
                    }
                    else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = ((temperatureDegree.textContent)* (9/5)+32).toFixed(0);
                    }
                });
            });
        });
    } 
    // API function to set icon according to the current weather
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }    
});