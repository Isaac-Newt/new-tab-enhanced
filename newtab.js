//Top Sites
/*browser.topSites.get()
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
  });*/

document.getElementById('topsites').style.marginLeft = -100 + "%";

//bookmarks
function onFulfilled(children) {
  var div = document.getElementById('boomkarks');

  for (child of children) {
    console.log(child.id);
    let p = document.createElement('p');
    p.className = 'list-group-item';
    let a = document.createElement('a');
    a.href = child.url;
    a.innerText = child.title || site.url;
    p.appendChild(a);
    div.appendChild(p);
  }
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}

var gettingChildren = browser.bookmarks.getChildren("toolbar_____");
gettingChildren.then(onFulfilled, onRejected);

//notes
var VERSION = 1;

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

/* Toggles
 * The below functions are used to toggle the various
 * panels/dropdowns in this extension. They are labeled
 * pretty clearly as to what they do.
 */

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

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  if(sidebar.style.marginLeft == "0px" || sidebar.style.marginLeft == null) {
    sidebar.style.marginLeft = -width + "px";
    sidebar.style.boxShadow = "none";
  } else {
    shrinkSearch();
    sidebar.style.marginLeft = "0px";
    sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
  }
}

var toggleID = document.getElementById('toggle');
toggleID.onclick = showTopSites;

//toggle bookmarks sidebar
var toggleID = document.getElementById('bmtoggle');
toggleID.onclick = showBookmarks;

//toggle searchbox
function showSearch(event) {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  if(searchPopOver.style.maxHeight == "0px" || searchPopOver.style.maxHeight == null) {
    if(sidebar.style.marginLeft = "0px") {
      sidebar.style.marginLeft = -width + "px";
      sidebar.style.boxShadow = "none";
    }
    growSearch();
  } else {
    shrinkSearch();
  }
}

var toggleSearch = document.getElementById('searchToggle');
toggleSearch.onclick = showSearch;
