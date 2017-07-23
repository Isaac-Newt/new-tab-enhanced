# Enhanced New Tab

## Chrome compatibility branch

### An enhanced new tab experience, for Firefox 54+

This addon will transform Firefox's new tab page into a notebook, links to weather and search, and a listing of top sites.



Notes:
---

 - Top sites will be the same as those loaded in about:newtab.  Pinned sites on that page will be respectively pinned on this extension's page.  
 - Weather links to [wttr.in](http://wttr.in) and should show local weather based on your IP address.  



ToDo:
---

* [X] Add shortcuts along top (weather, search, etc)

* [X] Use most visited API to populate links 

* [X] Add search engine box from about:newtab and relevant styling 
(Added search link)

* [ ] Publish on addons.mozilla.org

* [ ] Add settings page to choose color scheme (light, dark, greyscale, colorful) and location for weather



Credits
---

Credit for the initial work on the "notebook", and the initial base for this project, goes to [wildskyf's "tab-notes"](https://github.com/wildskyf/tab-notes/).

JavaScript for the topSites API from [Top-Sites](https://github.com/mdn/webextensions-examples/tree/master/top-sites) Webextensions example from MDN.

Weather links to [wttr.in](https://github.com/chubin/wttr.in), an open-source weather display utility.

Search links to [DuckDuckGo](https://duckduckgo.com), a search engine that doesn't track you.

