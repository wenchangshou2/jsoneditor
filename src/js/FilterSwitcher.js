'use strict';

var ContextMenu = require('./ContextMenu');

/**
 * Create a select box to be used in the editor menu's, which allows to switch filter mode 
 * @param {HTMLElement} container
 * @param {String[]} modes  Available modes: 'all','difference','identical'
 * @param {String} current  Available modes: 'all','difference','identical'
 * @param {function(mode: string)} onSwitch  Callback invoked on switch
 * @constructor
 */
function FilterSwitcher(container, modes, current, onSwitch) {
  // available modes
  var availableModes = {
    all: {
      'text': 'all',
      'title': 'Switch to all filter condition',
      'click': function () {
        onSwitch('all')
      }
    },
    difference: {
      'text': 'difference',
      'title': 'Switch to difference condition mode',
      'click': function () {
        onSwitch('difference');
      }
    },
    identical: {
      'text': 'identical',
      'title': 'Switch to identical condition',
      'click': function () {
        onSwitch('identical');
      }
    },
  };

  // list the selected modes
  var items = [];
  for (var i = 0; i < modes.length; i++) {
    var mode = modes[i];
    var item = availableModes[mode];
    if (!item) {
      throw new Error('Unknown mode "' + mode + '"');
    }

    item.className = 'jsoneditor-type-modes' + ((current == mode) ? ' jsoneditor-selected' : '');
    items.push(item);
  }

  // retrieve the title of current mode
  var currentMode = availableModes[current];
  if (!currentMode) {
    throw new Error('Unknown mode "' + current + '"');
  }
  var currentTitle = currentMode.text;

  // create the html element
  var box = document.createElement('button');
  box.type = 'button';
  box.className = 'jsoneditor-modes jsoneditor-separator';
  box.innerHTML = currentTitle + ' &#x25BE;';
  box.title = 'Switch editor mode';
  box.onclick = function () {
    var menu = new ContextMenu(items);
    menu.show(box);
  };

  var frame = document.createElement('div');
  frame.className = 'jsoneditor-modes';
  frame.style.position = 'relative';
  frame.appendChild(box);

  container.appendChild(frame);
  this.dom = {
    container: container,
    box: box,
    frame: frame
  };
  console.log('this.dom',this.dom);
}

/**
 * Set focus to switcher
 */
FilterSwitcher.prototype.focus = function () {
  this.dom.box.focus();
};

/**
 * Destroy the FilterSwitcher, remove from DOM
 */
FilterSwitcher.prototype.destroy = function () {
  if (this.dom && this.dom.frame && this.dom.frame.parentNode) {
    this.dom.frame.parentNode.removeChild(this.dom.frame);
  }
  this.dom = null;
};

module.exports = FilterSwitcher;
