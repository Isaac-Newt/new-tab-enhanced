function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    color: document.querySelector("#location").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#location").value = result.location || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("location");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
