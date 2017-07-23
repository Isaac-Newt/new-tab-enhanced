function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}

function buildSiteList(mostVisitedURLs) {
  var popupDiv = document.getElementById('site-list');
  var ol = popupDiv.appendChild(document.createElement('ol'));

  for (var i = 0; i < mostVisitedURLs.length; i++) {
    var li = ol.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
    a.addEventListener('click', onAnchorClick);
  }
}

chrome.topSites.get(buildSiteList);

var VERSION = 1;

//notes
window.onload = () => {
  var $textarea = document.querySelector('#note-content');

  var initNote = () => {
    chrome.storage.sync.get().then( data => {

      if (data.version === undefined) {
        data = {
          version: VERSION,
          content: ''
        };
        chrome.storage.sync.set(data);
      }

      $textarea.value = data.content;
    });
  };
  initNote();

  // when user writing
  $textarea.addEventListener('keyup', event => {
    chrome.storage.sync.set({ content: event.target.value });
  });

  // when actived window or tab changed
  chrome.tabs.onActivated.addListener(initNote);
  chrome.windows.onFocusChanged.addListener(initNote);
};

