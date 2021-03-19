/* Global Variables */
const base_url = "api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=f9073135a549c17ba1e1db22044aeb25";
const generate = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Generate- Event Listener
generate.addEventListener("click", () => {
  const zip = document.querySelector("#zip");
  // Zip-Code Validation
  zip.oninvalid = function (event) {
    event.target.setCustomValidity(
      "Please enter a valid 5 digit numeric zip-code"
    );
  };

  const zip_code = zip.value;

  console.log(zip_code);
});
