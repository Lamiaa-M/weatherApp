/* Global Variables */
let d = new Date();
let details = {};
let apiData = {};

// Create a new date instance dynamically with JS
let newDate = -1+d.getHours() + 1 + ':' + d.getMinutes() + ':' + d.getSeconds();
let newTime = d.toDateString();

//save the API Key in const variable.
const apiKey = "df5cad1517d3e8bc0754c4cef58c70da";

//first made function to git weather temp from api openweather website


async function apiIntegrating() {
    //get city name  value from user input 
    const cityName = document.getElementById("cityName").value;
    //get feelings value from  user input 
    const feelings = document.getElementById("feelings").value;
    try {
        const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        const data = await apiData.json();
        const temp = data.main.temp;
        details = { date: newDate, temp, feelings }
        console.log(details);
        postData();
    }
    catch (error) {
        console.log(error);
    }
}

// send/post  weather data to server side 
async function postData() {
    try {
        await fetch("/postWeatherData", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
        getData();
    } catch (error) {
        console.log(error);
    }
}

//get weather data from server side 
async function getData() {
    try {
        const res = await fetch("/getWeatherData", {
            credentials: "same-origin",
        });
        apiData = await res.json()
        console.log(apiData)
        showData();
    } catch (error) {
        console.log(error);
    }
}

//display  weather data at front/clint  side 

async function showData() {
    const cityName = document.getElementById("cityName").value;

    document.getElementById("date").innerHTML = `<p>Data :${newTime}   Time: ${apiData.date}</p>`;
    document.getElementById("temp").innerHTML = `<p> ${cityName} Temp : ${apiData.temp} °C </p>`;
    document.getElementById("content").innerHTML = `<p>Your Feelings : ${apiData.feelings}</p>`;
}

//add onclick to generate button to call  apiIntegrating function  and start the prossess  .

const generateBtn = document.getElementById("generate")

generateBtn.addEventListener("click", async function () {

    apiIntegrating();
})