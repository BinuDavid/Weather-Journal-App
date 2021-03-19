/* Global Variables */
const base_url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=f9073135a549c17ba1e1db22044aeb25";
const generate = document.querySelector("#generate");

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
  console.log(zip.checkValidity());
  // Exit function if NOT valid
  if (zip.validity.valid === false) {
    console.log("This returned False");
    return false;
  } else {
    console.log("Condition is True ");
    get(base_url, zip.value, api_key);
  }
});

// Get Function  - Fetch Method
const get = async (base_url, zip, api) => {
  const url = base_url + zip + ",us" + api;

  const response = await fetch(url);

  try {
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Error", err);
  }
};
