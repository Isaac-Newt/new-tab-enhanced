//Weather
function saveOptions(e) {
  e.preventDefault();
  //this is an object, values are ,-seperated
  browser.storage.local.set({
    color: document.querySelector("#color").value,
    theme: document.querySelector("#theme").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "";
    document.querySelector("#theme").value = result.theme || "Default";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["color", "theme"]);
  getting.then(setCurrentChoice, onError);
}

//runs restoreOptions when page is loaded
document.addEventListener("DOMContentLoaded", restoreOptions);
//runs saveOptions when submit button is clicked
document.querySelector("form").addEventListener("submit", saveOptions);
