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

document.getElementById('topsites').style.marginLeft = -100 + "%";

//bookmarks
function onFulfilled(children) {
  var divbm = document.getElementById('bookmarks');

  for (child of children) {
    let p = document.createElement('p');
    p.className = 'list-group-item';
    let a = document.createElement('a');

    //filter out non-bookmark items, specifically seperators
    var bookmarksArray = [];
    var seperatorsArray = [];
    if ((child.url != undefined) && (child.url.startsWith("http")) && (child.type != "seperator")) {
      bookmarksArray.push(child);
    } else {
      if (child.type = "seperator") {
        seperatorsArray.push(child);
      }
    }

    /*
    else { //attempt to read folder contents
      if (child.children != undefined) {
        bookmarksArray.push(getAllBookmarks(element.children));
        console.log("folder");
      }
    }
     * I eventually want to add support for reading the contents of
     * folders in the bookmarks toolbar.  However, that adds more
     * complexity to an already shaky function.  I will add support
     * for folders when I begin using a seperate folder specifically
     * for this addon, rather than the bookmarks toolbar.  So, expect
     * improvements sometime around the 2.0 release.
     *
     * ~Isaac
     */

    //add bookmark info to sidebar items
    for (i = 0; i < bookmarksArray.length; i++) {
      a.href = bookmarksArray[i].url;
      a.innerText = bookmarksArray[i].title || bookmarksArray[i].url;
    }

    //attach sidebar items to each other
    p.appendChild(a);
    divbm.appendChild(p);
  }
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}

var gettingChildren = browser.bookmarks.getChildren("toolbar_____");
gettingChildren.then(onFulfilled, onRejected);

document.getElementById('bookmarks').style.marginLeft = -100 + "%";

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

/* Callback functions
 * There's probably a better name for these, but they're
 * here so the toggle functions below are readable.
 */

//search
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

//topsites
function shrinkTopSites() {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = -width + "px";
  sidebar.style.boxShadow = "none";
}

function growTopSites() {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = "0px";
  sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
}

//bookmarks
function shrinkBookmarks() {
  var sidebar = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = -width + "px";
  sidebar.style.boxShadow = "none";
}

function growBookmarks() {
  var sidebar = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = "0px";
  sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
}

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  if(sidebar.style.marginLeft == "0px" || sidebar.style.marginLeft == null) {
    shrinkTopSites();
  } else {
    shrinkBookmarks();
    shrinkSearch();
    growTopSites();
  }
}

var toggleID = document.getElementById('toggle');
toggleID.onclick = showTopSites;

//toggle bookmarks sidebar
function showBookmarks(event) {
  var sidebarbm = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  if(sidebarbm.style.marginLeft == "0px" || sidebarbm.style.marginLeft == null) {
    shrinkBookmarks();
  } else {
    shrinkTopSites();
    shrinkSearch();
    growBookmarks();
  }
}

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
      shrinkTopSites();
    }
    growSearch();
  } else {
    shrinkSearch();
  }
}

var toggleSearch = document.getElementById('searchToggle');
toggleSearch.onclick = showSearch;
