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
_parcelHelpers.export(exports, "powerups", function () {
  return powerups;
});
_parcelHelpers.export(exports, "foods", function () {
  return foods;
});
_parcelHelpers.export(exports, "entityLocations", function () {
  return entityLocations;
});
_parcelHelpers.export(exports, "entities", function () {
  return entities;
});
_parcelHelpers.export(exports, "username", function () {
  return username;
});
_parcelHelpers.export(exports, "currentFrame", function () {
  return currentFrame;
});
_parcelHelpers.export(exports, "startScreen", function () {
  return startScreen;
});
var _db = require("./db");
var _snake = require("./snake");
var _food = require("./food");
var _vec2D = require("./vec2D");
var _player = require("./player");
var _powerup = require("./powerup");
require("dotenv").config();
const canvas = document.getElementById("canvas");
const gameboard = canvas.getContext("2d");
const size = 1600;
canvas.width = size;
canvas.height = size / 2;
const canvasDimension = new _vec2D.Vec2D(canvas.width, canvas.height);
const tileWidth = 20, tileHeight = 20;
let snakes;
let powerups;
let foods;
let entityLocations = [];
let snake1;
let snake2;
let entities;
let username;
startScreen();
function initVariables(players, usernameParam) {
  username = usernameParam;
  snake1 = new _snake.Snake(_player.player.PLAYER1, new _vec2D.Vec2D(40, 6), new _vec2D.Vec2D(51, 6), new _vec2D.Vec2D(52, 6));
  snakes = [snake1];
  if (players == 2) {
    snake2 = new _snake.Snake(_player.player.PLAYER2, new _vec2D.Vec2D(30, 6), new _vec2D.Vec2D(11, 6), new _vec2D.Vec2D(12, 6));
    snakes.push(snake2);
  }
  powerups = [new _powerup.Warp()];
  if (players == 2) {
    powerups.push(new _powerup.EatOthers());
  }
  foods = _food.Food.foodArray(30);
  entities = [...snakes, ...foods, ...powerups];
  entityLocations = [...snakes.flatMap(value => value.snakeParts), ...foods.map(value => value.location), ...powerups.map(value => value.location)];
  window.requestAnimationFrame(gameLoop);
}
function draw() {
  gameboard.clearRect(0, 0, canvas.width, canvas.height);
  drawBoardGrid();
  entities.forEach(entity => entity.draw(gameboard));
  handleWarpPowerup();
}
function tick() {
  entities.forEach(entity => entity.update());
  draw();
}
let prevRenderTime;
let currentFrame;
function gameLoop(currentTime) {
  currentFrame = window.requestAnimationFrame(gameLoop);
  const difference = (currentTime - prevRenderTime) / 1000;
  if (difference < 1 / snake1.speed) return;
  prevRenderTime = currentTime;
  tick();
}
function drawBoardGrid() {
  for (let i = 0; i < canvasDimension.y / tileHeight; i++) {
    const offset = i % 2 == 0 ? 0 : 1;
    for (let j = 0; j < canvasDimension.x / tileWidth; j++) {
      gameboard.fillStyle = j % 2 == offset ? "#c2c2c2" : "#ccc";
      gameboard.fillRect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
    }
  }
}
function handleWarpPowerup() {
  // draw canvas outline of snake holding Warp powerup
  snakes.forEach(value => {
    if (value.activePowerups.some(powerup => powerup instanceof _powerup.Warp)) {
      let currentPowerup = value.activePowerups.find(value1 => value1 instanceof _powerup.Warp);
      gameboard.strokeStyle = value.color;
      gameboard.lineWidth = currentPowerup.timeLeft / 500;
      gameboard.strokeRect(0, 0, canvas.width, canvas.height);
      gameboard.lineWidth = 1;
    }
  });
}
let startScreenActive = true;
async function drawLeaderboard() {
  let leaderboardOffset = 100;
  let count = 1;
  const scores = await _db.getScores();
  scores.forEach(value => {
    const username = value.username;
    const score = value.score;
    const date = value.date;
    gameboard.fillStyle = "black";
    gameboard.font = "25px Ariel";
    gameboard.fillText(String(count++), canvasDimension.x / 2 - 200, leaderboardOffset);
    gameboard.fillText(username, canvasDimension.x / 2 - 150, leaderboardOffset);
    gameboard.fillText(date.substr(0, 10), canvasDimension.x / 2 - 10, leaderboardOffset);
    gameboard.fillStyle = "green";
    gameboard.fillText(String(score), canvasDimension.x / 2 + 120, leaderboardOffset);
    leaderboardOffset += 25;
  });
}
async function startScreen() {
  await drawLeaderboard();
  let activeButton = 1;
  gameboard.fillStyle = "black";
  gameboard.lineWidth = 2;
  gameboard.strokeStyle = "green";
  const button1 = new _vec2D.Vec2D(canvasDimension.x / 2 - 100, canvasDimension.y * 0.9);
  const button2 = new _vec2D.Vec2D(canvasDimension.x / 2, canvasDimension.y * 0.9);
  gameboard.fillRect(button1.x, button1.y, 60, 50);
  gameboard.strokeRect(button1.x, button1.y, 60, 50);
  gameboard.fillRect(button2.x, button2.y, 60, 50);
  gameboard.fillStyle = "white";
  gameboard.font = "25px Ariel";
  gameboard.fillText("1", button1.x + 25, button1.y + 30);
  gameboard.fillText("2", button2.x + 25, button2.y + 30);
  window.addEventListener("keydown", ev => {
    if (startScreenActive == false) return;
    if (ev.key == "ArrowLeft" || ev.key == "ArrowRight") {
      gameboard.fillStyle = "black";
      if (ev.key == "ArrowRight") {
        gameboard.strokeStyle = "#ccc";
        activeButton = 2;
      } else gameboard.strokeStyle = "green";
      gameboard.fillRect(button1.x, button1.y, 60, 50);
      gameboard.strokeRect(button1.x, button1.y, 60, 50);
      gameboard.fillStyle = "white";
      gameboard.fillText("1", button1.x + 25, button1.y + 30);
      if (ev.key == "ArrowLeft") {
        gameboard.strokeStyle = "#ccc";
        activeButton = 1;
      } else gameboard.strokeStyle = "green";
      gameboard.fillStyle = "black";
      gameboard.fillRect(button2.x, button2.y, 60, 50);
      gameboard.strokeRect(button2.x, button2.y, 60, 50);
      gameboard.fillStyle = "white";
      gameboard.fillText("2", button2.x + 25, button2.y + 30);
    }
    if (ev.key == "Enter") {
      startScreenActive = false;
      let usernameField = document.getElementById("go");
      let username = usernameField.value.substr(0, 8);
      if (username == "") username = "Unknown";
      usernameField.remove();
      console.log(username);
      initVariables(activeButton, username);
    }
  });
}

},{"./snake":"6Drdo","./food":"6ULAr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./player":"5AQdY","./vec2D":"2BBDe","./powerup":"7EqXP","./db":"1e1pv","dotenv":"1w2AO"}],"6Drdo":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Snake", function () {
  return Snake;
});
require("./Drawable");
var _main = require("./main");
var _vec2D = require("./vec2D");
var _input = require("./input");
var _player = require("./player");
var _powerup = require("./powerup");
var _db = require("./db");
class Snake {
  speed = 10;
  color = "cyan";
  activePowerups = [];
  constructor(playerNumber, ...bodyParts) {
    this.playerNumber = playerNumber;
    if (playerNumber == _player.player.PLAYER2) this.color = "red";
    this.snakeParts = bodyParts;
  }
  draw(gameboard) {
    gameboard.fillStyle = this.color;
    gameboard.strokeStyle = "black";
    gameboard.lineWidth = 2;
    this.snakeParts.forEach(part => gameboard.strokeRect(part.x * _main.tileWidth, part.y * _main.tileHeight, _main.tileWidth, _main.tileHeight));
    this.snakeParts.forEach(part => gameboard.fillRect(part.x * _main.tileWidth, part.y * _main.tileHeight, _main.tileWidth, _main.tileHeight));
  }
  update() {
    this.move();
  }
  move() {
    let currentHead = this.snakeParts[0];
    let newHead = new _vec2D.Vec2D(currentHead.x + _input.getDirection(this.playerNumber).x, currentHead.y + _input.getDirection(this.playerNumber).y);
    let hasWarpPowerup = this.activePowerups.some(powerup => powerup instanceof _powerup.Warp);
    let hasCollided = this.checkCollisions(newHead, hasWarpPowerup);
    if (hasWarpPowerup) this.warp(newHead);
    if (hasCollided) {
      this.kill();
    }
    this.snakeParts.pop();
    this.snakeParts.unshift(newHead);
  }
  kill() {
    window.cancelAnimationFrame(_main.currentFrame);
    console.log(this);
    _db.sendScore(_main.username, this.snakeParts.length).then(res => {
      console.log(res);
    }).catch(reason => console.log(reason)).then(value => window.location.reload());
    alert(this.color + " loses");
  }
  warp(newHead) {
    if (this.checkBounds(newHead)) {
      if (newHead.x < 0) newHead.x = _main.canvasDimension.x / _main.tileWidth;
      if (newHead.x > _main.canvasDimension.x / _main.tileWidth) newHead.x = 0;
      if (newHead.y < 0) newHead.y = _main.canvasDimension.y / _main.tileHeight;
      if (newHead.y > _main.canvasDimension.y / _main.tileHeight) newHead.y = 0;
    }
  }
  checkCollisions(newHead, hasWarpPowerup = false) {
    const otherSnakes = this.getOtherSnakes();
    const overlapOtherSnakes = this.checkOverlapOtherSnakes(otherSnakes, newHead);
    let overlapOfSelf = this.checkOverlap(newHead);
    let outBounds = hasWarpPowerup ? false : this.checkBounds(newHead);
    if (outBounds || overlapOfSelf || overlapOtherSnakes) return true;
    return false;
  }
  checkOverlapOtherSnakes(otherSnakes, newHead) {
    let overlaps = false;
    otherSnakes.forEach(snake => {
      if (snake.snakeParts.some(snakePart => snakePart.isOn(newHead))) overlaps = true;
    });
    return overlaps;
  }
  checkOverlap(newHead) {
    let overlap = this.snakeParts.some(bodyPart => bodyPart.isOn(newHead));
    return overlap;
  }
  checkBounds(newHead) {
    let outBounds = newHead.x < 0 || newHead.x >= _main.canvasDimension.x / _main.tileWidth || newHead.y < 0 || newHead.y >= _main.canvasDimension.y / _main.tileHeight;
    return outBounds;
  }
  addSegment() {
    let tail = this.snakeParts[this.snakeParts.length - 1];
    this.snakeParts.push(tail);
  }
  removeSegmentOthers() {
    const otherSnakes = this.getOtherSnakes();
    otherSnakes.forEach(snake => {
      snake.removeSegment();
      if (snake.snakeParts.length == 0) {
        snake.kill();
      }
    });
  }
  getOtherSnakes() {
    return _main.snakes.filter(snake => snake.playerNumber != this.playerNumber);
  }
  removeSegment() {
    this.snakeParts.pop();
  }
  eatFood() {
    this.addSegment();
    this.speed = Math.min(this.speed + 1.5, 20);
    if (this.activePowerups.some(powerup => powerup instanceof _powerup.EatOthers)) {
      this.removeSegmentOthers();
    }
  }
}

},{"./Drawable":"RvnMX","./main":"3fL2n","./input":"5iTXl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./player":"5AQdY","./vec2D":"2BBDe","./powerup":"7EqXP","./db":"1e1pv"}],"RvnMX":[function(require,module,exports) {

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

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2BBDe":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Vec2D", function () {
  return Vec2D;
});
var _main = require("./main");
class Vec2D {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    if (height && width) {
      this.height = height;
      this.width = width;
    }
  }
  isOn(other) {
    if (other.y === this.y && other.x === this.x) return true;
    return false;
  }
  setRandomLocation() {
    let x;
    let y;
    let newLocation;
    do {
      x = Math.floor(Math.random() * (_main.canvasDimension.x / _main.tileWidth));
      y = Math.floor(Math.random() * (_main.canvasDimension.y / _main.tileHeight));
      newLocation = new Vec2D(x, y);
    } while (_main.entityLocations.some(value => {
      value.isOn(newLocation);
    }));
    this.x = x;
    this.y = y;
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./main":"3fL2n"}],"7EqXP":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Powerup", function () {
  return Powerup;
});
_parcelHelpers.export(exports, "EatOthers", function () {
  return EatOthers;
});
_parcelHelpers.export(exports, "Warp", function () {
  return Warp;
});
_parcelHelpers.export(exports, "Teleport", function () {
  return Teleport;
});
var _vec2D = require("./vec2D");
var _main = require("./main");
class Powerup {
  constructor() {
    this.location = new _vec2D.Vec2D(0, 0);
    this.location.setRandomLocation();
    this.timeLeft = this.time;
  }
  draw(gameboard) {
    if (this.currentOwner === undefined) {
      gameboard.fillStyle = this.color;
      gameboard.strokeStyle = "black";
      gameboard.globalAlpha = this.timeLeft / this.time;
      gameboard.strokeRect(this.location.x * _main.tileWidth, this.location.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
      gameboard.fillRect(this.location.x * _main.tileWidth, this.location.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
      gameboard.globalAlpha = 1;
    }
  }
  update() {
    // console.log(this.timeLeft)
    this.timeLeft -= 100;
    this.checkColissions();
    if (this.timeLeft < 1) {
      if (this.currentOwner !== undefined) {
        console.log(this.currentOwner);
        this.currentOwner.activePowerups.splice(this.currentOwner.activePowerups.indexOf(this), 1);
        delete this.currentOwner;
        console.log(this.currentOwner);
      }
      this.location.setRandomLocation();
      this.timeLeft = this.time;
    }
  }
  checkColissions() {
    _main.snakes.forEach(snake => {
      let snakeHead = snake.snakeParts[0];
      let snakeOnPowerup = snakeHead.isOn(this.location);
      if (snakeOnPowerup) {
        this.timeLeft = this.time;
        this.location.x = null;
        this.location.y = null;
        this.currentOwner = snake;
        snake.activePowerups.unshift(this);
      }
    });
  }
}
class EatOthers extends Powerup {
  color = "green";
  time = 10000;
  constructor() {
    super();
    this.timeLeft = this.time;
  }
}
class Warp extends Powerup {
  color = "pink";
  time = 10000;
  constructor() {
    super();
    this.timeLeft = this.time;
  }
}
class Teleport extends Powerup {
  color = "black";
  time = Infinity;
  constructor() {
    super();
    this.timeLeft = this.time;
  }
}

},{"./main":"3fL2n","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./vec2D":"2BBDe"}],"1e1pv":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "sendScore", function () {
  return sendScore;
});
_parcelHelpers.export(exports, "getScores", function () {
  return getScores;
});
async function sendScore(username, score) {
  console.log("sending score");
  try {
    if (username && score) {
      await fetch("https://snakewebapi.herokuapp.com" + "/scores", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          username: username,
          score: score
        })
      }).then(res => console.log(res));
    }
  } catch (e) {
    console.error(e);
  }
}
async function getScores() {
  console.log("getting scores");
  let scores;
  try {
    await fetch("https://snakewebapi.herokuapp.com" + "/scores", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => res.json()).then(data => scores = data);
  } catch (e) {
    console.log(e);
  }
  return scores;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6ULAr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Food", function () {
  return Food;
});
var _vec2D = require("./vec2D");
var _main = require("./main");
class Food {
  color = "#fdc601";
  constructor() {
    this.location = new _vec2D.Vec2D(0, 0);
    this.location.setRandomLocation();
  }
  static foodArray(amount) {
    let foodArray = [];
    for (let i = 0; i < amount; i++) {
      foodArray.push(new Food());
    }
    return foodArray;
  }
  draw(gameboard) {
    gameboard.fillStyle = this.color;
    gameboard.lineWidth = 0.5;
    gameboard.strokeStyle = "black";
    gameboard.fillRect(this.location.x * _main.tileWidth, this.location.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
    gameboard.strokeRect(this.location.x * _main.tileWidth, this.location.y * _main.tileHeight, _main.tileWidth, _main.tileHeight);
  }
  update() {
    _main.snakes.forEach(snake => {
      let snakeHead = snake.snakeParts[0];
      let snakeOnFood = snakeHead.isOn(this.location);
      if (snakeOnFood) {
        snake.eatFood();
        this.location.setRandomLocation();
      }
    });
  }
}

},{"./main":"3fL2n","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./vec2D":"2BBDe"}],"1w2AO":[function(require,module,exports) {
var process = require("process");
/*@flow*/
/*::

type DotenvParseOptions = {
debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
path?: string, // path to .env file
encoding?: string, // encoding of .env file
debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
parsed?: DotenvParseOutput,
error?: Error
}

*/
const fs = require('fs');
const path = require('path');
function log(message) /*: string*/
{
  console.log(`[dotenv][DEBUG] ${message}`);
}
const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const RE_NEWLINES = /\\n/g;
// Parses src into an Object
function parse(src, /*: string | Buffer*/
options) /*: ?DotenvParseOptions*/
/*: DotenvParseOutput*/
{
  const debug = Boolean(options && options.debug);
  const obj = {};
  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINE).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      // default undefined or missing values to empty string
      let val = keyValueArr[2] || '';
      const end = val.length - 1;
      const isDoubleQuoted = val[0] === '"' && val[end] === '"';
      const isSingleQuoted = val[0] === "'" && val[end] === "'";
      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end);
        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE);
        }
      } else {
        // remove surrounding whitespace
        val = val.trim();
      }
      obj[key] = val;
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
    }
  });
  return obj;
}
// Populates process.env from .env file
function config(options) /*: ?DotenvConfigOptions*/
/*: DotenvConfigOutput*/
{
  let dotenvPath = path.resolve(process.cwd(), '.env');
  let encoding = /*: string*/
  'utf8';
  let debug = false;
  if (options) {
    if (options.path != null) {
      dotenvPath = options.path;
    }
    if (options.encoding != null) {
      encoding = options.encoding;
    }
    if (options.debug != null) {
      debug = true;
    }
  }
  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, {
      encoding
    }), {
      debug
    });
    Object.keys(parsed).forEach(function (key) {
      if (!process.env.hasOwnProperty(key)) {
        process.env[key] = parsed[key];
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
      }
    });
    return {
      parsed
    };
  } catch (e) {
    return {
      error: e
    };
  }
}
module.exports.config = config;
module.exports.parse = parse;

},{"process":"7AgFc","fs":"2RD6T","path":"7rNOE"}],"7AgFc":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    // normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    // normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = '';
// empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};

},{}],"2RD6T":[function(require,module,exports) {
"use strict";
},{}],"7rNOE":[function(require,module,exports) {
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
// 
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var process = require("process");
function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}
// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i); else if (code === 47) /*/*/
    break; else code = 47;
    if (code === 47) /*/*/
    {
      if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || /*.*/
        res.charCodeAt(res.length - 2) !== 46) /*.*/
        {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += '/..'; else res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i); else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && /*.*/
    dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i]; else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }
      assertPath(path);
      // Skip empty entries
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }
    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)
    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath; else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var isAbsolute = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);
    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';
    if (isAbsolute) return '/' + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined) joined = arg; else joined += '/' + arg;
      }
    }
    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return '';
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return '';
    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47) /*/*/
      break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47) /*/*/
      break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) /*/*/
          {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) /*/*/
          {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break; else if (fromCode === 47) /*/*/
      lastCommonSep = i;
    }
    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) /*/*/
      {
        if (out.length === 0) out += '..'; else out += '/..';
      }
    }
    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep); else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47) /*/*/
      ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd; else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) /*/*/
        {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return '';
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },
  parse: function parse(path) {
    assertPath(path);
    var ret = {
      root: '',
      dir: '',
      base: '',
      ext: '',
      name: ''
    };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47) /*/*/
      {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) /*.*/
      {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1) startDot = i; else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end); else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1); else if (isAbsolute) ret.dir = '/';
    return ret;
  },
  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};
posix.posix = posix;
module.exports = posix;

},{"process":"7AgFc"}]},["6xRmv","3fL2n"], "3fL2n", "parcelRequire5504")

//# sourceMappingURL=index.9c22e636.js.map
