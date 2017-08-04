browser.topSites.get()
  .then((sites) => {
    var div = document.getElementById('site-list');

    if (!sites.length) {
      div.innerText = 'No sites returned from the topSites API.';
      return;
    }

    sites.splice(12);

    let ul = document.createElement('ul');
    ul.className = 'list-group';
    for (let site of sites) {
      let li = document.createElement('li');
      li.className = 'list-group-item';
      let a = document.createElement('a');
      a.href = site.url;
      a.innerText = site.title || site.url;
      li.appendChild(a);
      ul.appendChild(li);
    }

    div.appendChild(ul);
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
function showTopSites() {
  var sidebar = document.getElementById('topsites');
  if(sidebar.style.visibility == null || sidebar.style.visibility == "visible") {
      sidebar.style.visibility = "collapse";
  } else {
      sidebar.style.visibility = "visible";
  }
}

/*function swapStyleSheet(sheet) {
    document.getElementById("style").setAttribute("href", sheet);
}

function initate() {
    var style1 = document.getElementById("stylesheet1");
    var style2 = document.getElementById("stylesheet2");

    style1.onclick = function () {
      swapStyleSheet("style.css")
    };
    style2.onclick = function () {
      swapStyleSheet("styledark.css");
    };
}

window.onload = initate;*/
