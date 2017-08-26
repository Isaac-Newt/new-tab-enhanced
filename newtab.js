//Top Sites
browser.topSites.get()
  .then((sites) => {
    var div = document.getElementById('topsites');

    if (!sites.length) {
      div.innerText = 'No sites returned from the topSites API.';
      return;
    }

    sites.splice(12);

    for (let site of sites) {
      let p = document.createElement('p');
      p.className = 'list-group-item';
      let a = document.createElement('a');
      a.href = site.url;
      a.innerText = site.title || site.url;
      p.appendChild(a);
      div.appendChild(p);
    }
  });

/*var wide = document.getElementById('topsites').offsetWidth;*/
document.getElementById('topsites').style.marginLeft = -300 + "px";

var VERSION = 1;

//notes
window.onload = () => {
  var $textarea = document.querySelector('#note-content');

  var initNote = () => {
    browser.storage.sync.get().then( data => {

      if (data.version === undefined) {
        data = {
          version: VERSION,
          content: ''
        };
        browser.storage.sync.set(data);
      }

      $textarea.value = data.content;
    });
  };
  initNote();

  // when user writing
  $textarea.addEventListener('keyup', event => {
    browser.storage.sync.set({ content: event.target.value });
  });

  // when actived window or tab changed
  browser.tabs.onActivated.addListener(initNote);
  browser.windows.onFocusChanged.addListener(initNote);
};

//Weather, Theme
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  var color = "";
  if (item.color) {
    place = item.color;
  }
  var weather = document.getElementById('weather');
  weather.src += place += "_1qt.png";
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);

/*Toggles
The below functions are used to toggle the various panels/dropdowns in this extension.
They are labeled pretty clearly as to what they do.
*/

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  if(sidebar.style.marginLeft == "0px" || sidebar.style.marginLeft == null) {
      sidebar.style.marginLeft = -width + "px";
      sidebar.style.boxShadow = "none";
  } else {
      sidebar.style.marginLeft = "0px";
      sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
  }
}

var toggleID = document.getElementById('toggle');
toggleID.onclick = showTopSites;

//toggle searchbox
function showSearch(event) {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  var weatherPopOver = document.getElementById('weather-div');
  if(searchPopOver.style.maxHeight == "0px" || searchPopOver.style.maxHeight == null) {
    if(weatherPopOver.style.maxHeight = "450px") {
      weatherPopOver.style.maxHeight = "0px";
      weatherPopOver.style.padding = "0";
    }
    growSearch();
  } else {
    shrinkSearch();
  }
}

function growSearch() {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  searchPopOver.style.maxHeight = "60px";
  searchPopOver.style.padding = "1.2em 0";
  searchPopOver.style.boxShadow = "0 .4rem .4rem rgba(0,0,0,0.35)";
  searchPopOver.style.borderTop = "2px solid var(--highlight-color)";
  box.style.visibility = "visible";
  box.focus();
  button.style.visibility = "visible";
}

function shrinkSearch() {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  searchPopOver.style.maxHeight = "0px";
  searchPopOver.style.padding = "0";
  searchPopOver.style.boxShadow = "none";
  searchPopOver.style.borderTop = "none";
  box.style.visibility = "collapse";
  button.style.visibility = "collapse";
}

var toggleSearch = document.getElementById('searchToggle');
toggleSearch.onclick = showSearch;

//Toggle Weather
function showWeather(event) {
  var weatherPopOver = document.getElementById('weather-div');
  var searchPopOver = document.getElementById('searchBoxId');
  if(weatherPopOver.style.maxHeight == "0px" || weatherPopOver.style.maxHeight == null) {
    if(searchPopOver.style.maxHeight = "60px") {
      shrinkSearch();
    }
    weatherPopOver.style.borderTop = "2px solid var(--highlight-color)";
    weatherPopOver.style.maxHeight = "275px";
    weatherPopOver.style.padding = "1.2em 0";
    weatherPopOver.style.boxShadow = "0 .4rem .4rem rgba(0,0,0,0.35)";
  } else {
    weatherPopOver.style.maxHeight = "0px";
    weatherPopOver.style.padding = "0";
    weatherPopOver.style.boxShadow = "none";
    weatherPopOver.style.borderTop = "none";
  }
}

var toggleSearch = document.getElementById('weatherToggle');
toggleSearch.onclick = showWeather;
