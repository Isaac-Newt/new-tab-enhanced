var wide = document.getElementById('topsites').offsetWidth;
document.getElementById('topsites').style.marginLeft = 0 + "px";

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
  weather.href += place;
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
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
