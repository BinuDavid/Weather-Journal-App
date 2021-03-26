/* Global Variables */
const base_url = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Farenheit units
const units = "&units=imperial";
// Enter a valid API Key
const api_key = "";
const generate = document.querySelector("#generate");
const feelings = document.querySelector("#feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Click Event
generate.addEventListener("click", (event) => {
  event.preventDefault();
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
  const url = base_url + zip + units + api;
  const response = await fetch(url);

  try {
    await response.json().then((data) => {
      post("/", data);
    });
  } catch (error) {
    console.error("Get Error", error);
  }
};

// Post Function
const post = async (url = "", data) => {
  const processedData = {
    temp: `${data.main.temp} °F`,
    date: newDate,
    user: feelings.value,
  };
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(processedData),
  });

  try {
    await response.json().then((postData) => {
      updateUI(postData);
    });
  } catch (error) {
    console.error("Post Error", error);
  }
};

const updateUI = async (postData) => {
  const date = document.querySelector("#date");
  const temp = document.querySelector("#temp");
  const content = document.querySelector("#content");

  try {
    date.textContent = postData.date;
    temp.textContent = postData.temp;
    content.textContent = postData.user;
  } catch (error) {
    console.error("UI Error", error);
  }
};
