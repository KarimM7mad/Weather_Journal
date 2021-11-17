/* Global Variables */
const openWeatherApiKey = "&appid=51870b10cdab5101e13f806b0258b6fc";
const openWeatherBaseURL = "http://api.openweathermap.org/data/2.5/weather?units=metric";

const getWeatherAPIData = async (zipCode) => {
    const res = await fetch(
        openWeatherBaseURL + "&zip=" + zipCode + openWeatherApiKey,
        {
            method: "GET",
            mode: 'cors'
        }
    );
    try {
        const resData = await res.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log("ElError", error);
        return null;
    }
};

const insertNewWeatherData = async (data = {}) => {
    const res = await fetch("/addData", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const rdata = res.json();
    } catch (error) {
    }
};


const getStoredWeatherData = async () => {
    const res = await fetch("/getData", {
        method: "GET",
    });
    try {
        const rdata = res.json();
        return rdata;
    } catch (error) {
    }
}

const updateUI = async (data = {}) => {
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("content").innerHTML = data.userResponse;
}

const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", function (ev) {
    const zipCode = document.getElementById("zip").value;
    const ress = getWeatherAPIData(zipCode).then((weatherData) => {
        newEntry = {
            temperature: weatherData.main.temp, // for degree celcius
            date: getCurrDate(),
            userResponse: document.getElementById("feelings").value
        };
        insertNewWeatherData(newEntry);

        getStoredWeatherData().then((storedData) => updateUI(storedData));
    });
});


// Create a new date instance dynamically with JS
function getCurrDate() {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}