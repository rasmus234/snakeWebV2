// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6xRmv":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0be583634b8016caed6497d99c22e636";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3fL2n":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "canvasDimension", function () {
  return canvasDimension;
});
_parcelHelpers.export(exports, "tileWidth", function () {
  return tileWidth;
});
_parcelHelpers.export(exports, "tileHeight", function () {
  return tileHeight;
});
_parcelHelpers.export(exports, "snakes", function () {
  return snakes;
});
var _snake = require("./snake");
var _food = require("./food");
var _player = require("./player");
const canvas = document.getElementById("canvas");
const context2D = canvas.getContext("2d");
const size = 1000;
canvas.width = size;
canvas.height = size / 2;
const canvasDimension = {
  x: canvas.width,
  y: canvas.height
};
const tileWidth = 20, tileHeight = 20;
const snake1 = new _snake.Snake(_player.player.PLAYER1, {
  x: 0,
  y: 6
}, {
  x: 1,
  y: 6
}, {
  x: 2,
  y: 6
});
const snake2 = new _snake.Snake(_player.player.PLAYER2, {
  x: 10,
  y: 6
}, {
  x: 11,
  y: 6
}, {
  x: 12,
  y: 6
});
const snakes = [snake1, snake2];
const foods = [new _food.Food(), new _food.Food(), new _food.Food(), new _food.Food()];
const entities = [snake1, snake2, ...foods];
function draw(board) {
  board.clearRect(0, 0, canvas.width, canvas.height);
  entities.forEach(entity => entity.draw(context2D));
}
function tick() {
  entities.forEach(entity => entity.update());
  draw(context2D);
}
let prevRenderTime;
function gameLoop(currentTime) {
  window.requestAnimationFrame(gameLoop);
  const difference = (currentTime - prevRenderTime) / 1000;
  if (difference < 1 / snake1.speed) return;
  prevRenderTime = currentTime;
  tick();
}
window.requestAnimationFrame(gameLoop);

},{"./snake":"6Drdo","./food":"6ULAr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./player":"5AQdY"}],"6Drdo":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Snake", function () {
  return Snake;
});
require("./Drawable");
var _main = require("./main");
var _input = require("./input");
var _player = require("./player");
class Snake {
  speed = 10;
  color = "cyan";
  constructor(playerNumber, ...bodyParts) {
    this.playerNumber = playerNumber;
    if (playerNumber == _player.player.PLAYER2) this.color = "red";
    this.snakeParts = bodyParts;
  }
  draw(gameboard) {
    gameboard.fillStyle = this.color;
    gameboard.strokeStyle = "black";
    this.snakeParts.forEach(part => gameboard.strokeRect(part.x * _main.tileWidth, part.y * _main.tileHeight, _main.tileWidth, _main.tileHeight));
    this.snakeParts.forEach(part => gameboard.fillRect(part.x * _main.tileWidth, part.y * _main.tileHeight, _main.tileWidth, _main.tileHeight));
  }
  update() {
    this.move();
  }
  move() {
    let currentHead = this.snakeParts[0];
    let newHead = {
      x: currentHead.x + _input.getDirection(this.playerNumber).x,
      y: currentHead.y + _input.getDirection(this.playerNumber).y
    };
    const otherSnakes = _main.snakes.filter(snake => snake.playerNumber != this.playerNumber);
    const overlapOtherSnakes = this.checkOverlapOtherSnakes(otherSnakes, newHead);
    let overlapOfSelf = this.checkOverlap(newHead);
    let outBounds = this.checkBounds(newHead);
    if (outBounds || overlapOfSelf || overlapOtherSnakes) {
      // @ts-ignore
      window.location = "/";
      alert(this.color + " loses");
    }
    this.snakeParts.pop();
    this.snakeParts.unshift(newHead);
  }
  checkOverlapOtherSnakes(otherSnakes, newHead) {
    let overlaps = false;
    otherSnakes.forEach(snake => {
      if (snake.snakeParts.some(snakePart => snakePart.x === newHead.x && snakePart.y === newHead.y)) overlaps = true;
    });
    console.log(overlaps);
    return overlaps;
  }
  checkOverlap(newHead) {
    let overlap = this.snakeParts.some(bodyPart => bodyPart.x === newHead.x && bodyPart.y === newHead.y);
    return overlap;
  }
  checkBounds(newHead) {
    let outBounds = newHead.x < 0 || newHead.x > _main.canvasDimension.x / _main.tileWidth || newHead.y < 0 || newHead.y >= _main.canvasDimension.y / _main.tileHeight;
    return outBounds;
  }
  addSegment() {
    let tail = this.snakeParts[this.snakeParts.length - 1];
    this.snakeParts.push(tail);
  }
}

},{"./Drawable":"RvnMX","./main":"3fL2n","./input":"5iTXl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./player":"5AQdY"}],"RvnMX":[function(require,module,exports) {

},{}],"5iTXl":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getDirection", function () {
  return getDirection;
});
var _player = require("./player");
let lastDirection1;
let direction1 = {
  x: 0,
  y: 1
};
let lastDirection2;
let direction2 = {
  x: 0,
  y: 1
};
window.addEventListener("keydown", ev => {
  switch (ev.key) {
    case "ArrowUp":
      if (lastDirection1.y === 1) break;
      direction1 = {
        x: 0,
        y: -1
      };
      break;
    case "ArrowDown":
      if (lastDirection1.y === -1) break;
      direction1 = {
        x: 0,
        y: +1
      };
      break;
    case "ArrowRight":
      if (lastDirection1.x === -1) break;
      direction1 = {
        x: 1,
        y: 0
      };
      break;
    case "ArrowLeft":
      if (lastDirection1.x === 1) break;
      direction1 = {
        x: -1,
        y: 0
      };
      break;
    case "w":
      if (lastDirection2.y === 1) break;
      direction2 = {
        x: 0,
        y: -1
      };
      break;
    case "s":
      if (lastDirection2.y === -1) break;
      direction2 = {
        x: 0,
        y: +1
      };
      break;
    case "d":
      if (lastDirection2.x === -1) break;
      direction2 = {
        x: 1,
        y: 0
      };
      break;
    case "a":
      if (lastDirection2.x === 1) break;
      direction2 = {
        x: -1,
        y: 0
      };
      break;
  }
});
function getDirection(playerNumber) {
  lastDirection1 = direction1;
  lastDirection2 = direction2;
  if (playerNumber == _player.player.PLAYER1) return direction1; else if (playerNumber == _player.player.PLAYER2) return direction2;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./player":"5AQdY"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"5AQdY":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "player", function () {
  return player;
});
let player;
(function (player) {
  player[player["PLAYER1"] = 0] = "PLAYER1";
  player[player["PLAYER2"] = 1] = "PLAYER2";
})(player || (player = {}));

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6ULAr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Food", function () {
  return Food;
});
var _main = require("./main");
class Food {
  color = "#fdc601";
  constructor() {
    this.setRandomLocation();
  }
  draw(gameboard) {
    gameboard.fillStyle = this.color;
    gameboard.strokeStyle = "black";
    gameboard.fillRect(this.food.x * _main.tileWidth, this.food.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
    gameboard.strokeRect(this.food.x * _main.tileWidth, this.food.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
  }
  update() {
    _main.snakes.forEach(snake => {
      let snakeHead = snake.snakeParts[0];
      let snakeOnFood = snakeHead.x === this.food.x && snakeHead.y === this.food.y;
      if (snakeOnFood) {
        snake.addSegment();
        snake.speed += 3;
        this.setRandomLocation();
      }
    });
  }
  setRandomLocation() {
    let x = Math.floor(Math.random() * (_main.canvasDimension.x / _main.tileWidth));
    let y = Math.floor(Math.random() * (_main.canvasDimension.y / _main.tileHeight));
    this.food = {
      x: x,
      y: y
    };
  }
}

},{"./main":"3fL2n","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["6xRmv","3fL2n"], "3fL2n", "parcelRequire5504")

//# sourceMappingURL=index.9c22e636.js.map
