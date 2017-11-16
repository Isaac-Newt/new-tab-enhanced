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

function displayImageSettings() {
  // Hide image-specific settings unless needed
  if (document.querySelector("#theme").value == "Image") {
    var div0 = document.getElementById("image-locate");
    div0.style.display = "block";
    var div1 = document.getElementById("local-select");
    div1.style.display = "block";
  } else if (document.querySelector("#theme").value != "Image") {
    var div0 = document.getElementById("image-locate");
    div0.style.display = "none";
    var div1 = document.getElementById("local-select");
    div1.style.display = "none";
  }
}

// Show image-specific settings when "image" selected
document.getElementById("theme").addEventListener("change", displayImageSettings);

function displayBackgroundPicker() {
  if (document.querySelector("#image-location").checked) {
    console.log("show");
  } else {
    console.log("hide");
  }
}

// Show background picker when checkbox is checked
document.getElementById("image-location").addEventListener("change", displayBackgroundPicker);

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "";
    document.querySelector("#theme").value = result.theme || "Default";
    // document.querySelector("#theme").value = result.image || "";

    // Hide image-specific settings unless needed
    displayImageSettings();
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
