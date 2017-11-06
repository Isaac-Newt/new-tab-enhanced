//Weather
function saveOptions(e) {
  e.preventDefault();
  //this is an object, values are ,-seperated
  browser.storage.local.set({
    color: document.querySelector("#color").value,
    theme: document.querySelector("#theme").value,
  });
  // image: document.querySelector("#image").value
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "";
    document.querySelector("#theme").value = result.theme || "Default";
    // document.querySelector("#theme").value = result.image || "";
    
    // Hide image-specific settings unless needed
    if (document.querySelector("#theme").value != "Image") {
      var div0 = document.getElementById("image-locate");
      div0.style.display = "none";
      var div1 = document.getElementById("local-select");
      div1.style.display = "none";
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["color", "theme"]);
  getting.then(setCurrentChoice, onError);
}

function showImageOptions() {
  console.log("Yay!");
}

//runs restoreOptions when page is loaded
document.addEventListener("DOMContentLoaded", restoreOptions);
//runs saveOptions when submit button is clicked
document.querySelector("form").addEventListener("submit", saveOptions);

var themeCheck = document.getElementById("image-location");
themeCheck.addEventListener("changed", showImageOptions);
