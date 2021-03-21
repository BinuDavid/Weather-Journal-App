/* Global Variables */
const base_url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Farenheit units
const units = "&units=imperial";
const api_key = "&appid=f9073135a549c17ba1e1db22044aeb25";
const generate = document.querySelector("#generate");
const feelings = document.querySelector("#feelings");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Click Event
generate.addEventListener("click", () => {
  const zip = document.querySelector("#zip");

  // Check Validity of #Zip
  zip.oninvalid = (event) => {
    // Custom Error Message
    zip.setCustomValidity("Please enter a valid 5 digit numeric zip code");
  };
  // Exit function if NOT valid
  if (zip.validity.valid === false) {
    return false;
  } else {
    get(base_url, zip.value, units, api_key);
  }
});

// Get Function  - Fetch Method
const get = async (base_url, zip, units, api) => {
  const url = base_url + zip + ",us" + units + api;
  const response = await fetch(url);

  try {
    const data = await response.json().then((data) => {
      post("/", data);
    });
  } catch (err) {
    console.error("Error", err);
  }
};

// post Function
const post = async (url = "", data) => {
  const processedData = {
    temp: data.main.temp,
    date: newDate,
    user: feelings.value,
  };
  console.log(processedData);
  const response = await fetch("/", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(processedData),
  });

  try {
    const newData = await response.json();
    console.log(newData);
  } catch (error) {
    console.error("Error", error);
  }
};
