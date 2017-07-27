//Weather
function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    color: document.querySelector("#color").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("color");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

//Theme
function saveOptionsTheme(e) {
  e.preventDefault();
  browser.storage.local.set({
    theme: document.querySelector("#theme").value
  });
}

function restoreOptionsTheme() {

  function setCurrentChoice(result) {
    document.querySelector("#theme").value = result.theme || "Default";
  }

  function onError(error) {
    console.log("Error: ${error}");
  }

  var coloring = browser.storage.local.get("theme");
  coloring.then(setCurrentChoice, onError)
}

document.addEventListener("DOMContentLoaded", restoreOptionsTheme);
document.querySelector("select").addEventListener("submit", saveOptionsTheme);
