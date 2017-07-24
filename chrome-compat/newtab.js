function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}

function buildSiteList(mostVisitedURLs) {
  var popupDiv = document.getElementById('site-list');
  var ol = popupDiv.appendChild(document.createElement('ol'));

  mostVisitedURLs.splice(12);

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
(function() {

  function _makeDelayed() {
    var timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }

  function bindNoteHandlers() {
    var elem = document.getElementById('note-content'),
        saveHandler = _makeDelayed();
    function save() {
      chrome.storage.sync.set({'noteText': elem.value});
    }
    // Throttle save so that it only occurs after 1 second without a keypress.
    elem.addEventListener('keypress', function() {
      saveHandler(save, 1000);
    });
    elem.addEventListener('blur', save);
    chrome.storage.sync.get('noteText', function(data) {
      elem.value = data.noteText ? data.noteText : '';
    });
  }

  bindNoteHandlers();
})();

