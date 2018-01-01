/**
 * @desc Module responsibile for rendering the user interface
 * @export
 * @class UI
 */
function UI() {

    let self = this;
    /**
     * @instance
     * @desc 
     * @param {object} obj Contains a bookmarks data
     * @fires UI:renderBookmark
     */
    self.renderFolder = function (obj, el) {

        folderDiv = document.createElement('div');

        if (el) {
            div.appendChild(el);
        }

        let title = document.createElement('h3');
        title.innerText = obj.title;
        folderDiv.appendChild(title);

        obj.children.map(i => {
            if (i.hasOwnProperty("children")) {

                folderDiv.appendChild(self.renderSubFolder(i));

            } else {

                folderDiv.appendChild(self.renderBookmark(i));
            }
        })
        return folderDiv;
    }

    self.renderSubFolder = function (subfolder) {

        let subfolderDiv = document.createElement('div');
        let title = document.createElement('h3');
        title.innerText = subfolder.title;
        subfolderDiv.className = 'list-sub-folder';
        subfolderDiv.appendChild(title);

        subfolder.children.map(bm => {
            subfolderDiv.appendChild(self.renderBookmark(bm));
        })

        return subfolderDiv;
    }

    /**
     * @instance
     * @desc Removes the rendered elements from the UI
     * @memberOf UI
     * @listens country:mouseout
     *
     */
    self.clearInfo = function () {

    }

    /**
     *
     * @instance
     * @param {object} obj 
     * @param {number} pos Current index of property interation
     * @returns DOM element to attach to sidebar
     *
     * @memberOf UI
     */
    self.renderBookmark = function (obj, pos) {

        let p = document.createElement('p');
        p.className = 'list-group-item';

        let a = document.createElement('a');

        a.href = obj.url;
        a.innerText = obj.title;

        p.appendChild(a);

        return p;

    }

    self.renderTitle = function (txt) {
        title = document.createElement('h2')
        title.innerText = txt;
        return title;
    }

    self.toggles = {
        grow: function (els, styles) {




        },

        shrink: function (els, styles) {

        }

    }
    // static helpers
    /**
     * 
     * @static
     * @param {any} selector 
     * @returns document.querySelectorAll(selector)
     * 
     * @memberOf UI
     */
    function _(selector) {
        return document.querySelectorAll(selector);
    }
    /**
     * 
     * @static
     * @param {any} el 
     * @returns document.getElementById(el)
     * 
     * @memberOf UI
     */
    function getEl(el) {
        return document.getElementById(el);
    }
}