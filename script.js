
let weather = {
    ApiKey: "453fe1ce8241971da092a86182477553",

    //API call
    fetchweather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.ApiKey) //JS fetch()

            //response from the API
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    throw new error("No weather found");
                }
                else {
                    return response.json();  //convert response into json format
                }
            })

            .then((data) => this.displayweather(data));
    },
    //for displaying weather on screen
    displayweather: function (data) {
        console.log(data);

        //we need {thisparameter} from = {there}
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.body.style.backgroundImage =" url('https://source.unsplash.com/random/1600x900/? "+ name +"')";
    },
    search: function () {
        this.fetchweather(document.querySelector(".searchBar").value);
    },
};
document.getElementById("hit").addEventListener("click", function () {
    weather.search();
});


document.querySelector(".searchBar").addEventListener("keyup",function(e){
    if(e.keyCode === 13){
        weather.search();
    }
});

weather.fetchweather("Delhi");