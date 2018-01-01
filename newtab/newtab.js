let ui = new UI();

console.log(ui.toggles.growSearch);

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

//default to hiding the topsites sidebar
document.getElementById('topsites').style.marginLeft = -200 + "%";

//bookmarks
function onFulfilled(tree) {
  var divbm = document.getElementById('bookmarks');

  var subTree = tree[0].children;
  //If there are no bookmarks in the folder (toolbar)
  if (!subTree.length) {
    let p = document.createElement('p');
    p.id = 'emptyText';
    p.innerText = 'Bookmarks in the Bookmarks Toolbar will be shown here.';
    divbm.appendChild(p);
    return;
  }

  // console.log(subTree);

  foldersArray = subTree.filter(bm => {
    if ("children" in bm) {
      return bm;
    }
  })

  bookmarksArray = subTree.filter(bm => {
    if (!bm.hasOwnProperty("children")) {
      return bm;
    }
  })

  separatorArray = subTree.filter(bm => {
    if (!bm.hasOwnProperty("children") && bm.type === "separator") {
      return bm;
    }
  })

  foldersArray.map((f, pos) => {
    if (pos == 0) {
      divbm.appendChild(ui.renderTitle("Folders"))
    }
    divbm.appendChild(ui.renderFolder(f));
  })

  bookmarksArray.map((bm, pos) => {
    if (pos == 0) {
      divbm.appendChild(ui.renderTitle("Bookmarks"))
    }
    divbm.appendChild(ui.renderBookmark(bm));
  })

  // console.log(foldersArray)
  // console.log(bookmarksArray)
  // console.log(separatorArray)

}

//run when things are broken
function onRejected(error) {
  console.log(`An error: ${error}`);
}

//get bookmarknodeobjects in the bookmarks toolbar folder, promise them
var toolbar = browser.bookmarks.getSubTree("toolbar_____");
toolbar.then(onFulfilled, onRejected);

//default to hiding the bookmarks sidebar
document.getElementById('bookmarks').style.marginLeft = -200 + "%";

//notes
var VERSION = 1;

window.onload = () => {
  var $textarea = document.querySelector('#note-content');

  var initNote = () => {
    browser.storage.sync.get().then(data => {

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

  //when user writing
  $textarea.addEventListener('keyup', event => {
    browser.storage.sync.set({ content: event.target.value });
  });

  //when actived window or tab changed
  browser.tabs.onActivated.addListener(initNote);
  browser.windows.onFocusChanged.addListener(initNote);
};

//Set location for Weather, theme
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  //weather
  var color = "";
  if (item.color) {
    place = item.color;
    var weather = document.getElementById('weather');
    weather.href += place;
  }

  //theme
  console.log("theme = " + item.theme);

  if (item.theme == "Default") {
    console.log("Default");
  } else if (item.theme == "Dark") {
    console.log("Dark");
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ":root {" +
      "--notes-bg-color: #273038;" +
      "--main-bg-color: #424F5A;" +
      "--notes-text: #fff;" +
      "--secondary-bg-color: #1B2126;" +
      "}"
      , 0);
  } else if (item.theme == "Image") {
    console.log("Image");
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ":root {" +
      "--main-bg-color: url(background.jpg)" +
      "}"
      , 0);
  } else {
    console.log("Default-weird");
  }
}

var getting = browser.storage.local.get(["color", "theme", "image"]);
getting.then(onGot, onError);
