"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _netinfo = _interopRequireDefault(require("@react-native-community/netinfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line
var DetectNetwork =
/*#__PURE__*/
function () {
  function DetectNetwork(callback) {
    var _this = this;

    _classCallCheck(this, DetectNetwork);

    _defineProperty(this, "_hasChanged", function (reach) {
      if (_this._reach !== reach) {
        return true;
      }

      if (_this._isConnected !== _this._getConnection(reach)) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "_setReach", function (reach) {
      _this._reach = reach;
      _this._isConnected = _this._getConnection(reach);
    });

    _defineProperty(this, "_getConnection", function (reach) {
      return reach !== 'none' && reach !== 'unknown';
    });

    _defineProperty(this, "_setIsConnectionExpensive",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref2, details;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _netinfo["default"].fetch();

            case 3:
              _ref2 = _context.sent;
              details = _ref2.details;
              _this._isConnectionExpensive = details.isConnectionExpensive;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              // err means that isConnectionExpensive is not supported in iOS
              _this._isConnectionExpensive = null;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    })));

    _defineProperty(this, "_setShouldInitUpdateReach", function (shouldUpdate) {
      _this._shouldInitUpdateReach = shouldUpdate;
    });

    _defineProperty(this, "_init",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var connectionInfo;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _netinfo["default"].fetch();

            case 2:
              connectionInfo = _context2.sent;

              if (_this._shouldInitUpdateReach) {
                _this._update(connectionInfo.type);
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(this, "_update", function (reach) {
      if (_this._hasChanged(reach)) {
        _this._setReach(reach);

        _this._dispatch();
      }
    });

    _defineProperty(this, "_dispatch",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this._setIsConnectionExpensive();

            case 2:
              _this._callback({
                online: _this._isConnected,
                netInfo: {
                  isConnectionExpensive: _this._isConnectionExpensive,
                  reach: _this._reach
                }
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    this._reach = null;
    this._isConnected = null;
    this._isConnectionExpensive = null;
    this._callback = callback;
    this._shouldInitUpdateReach = true;

    this._init();

    this._addListeners();
  }
  /**
   * Check props for changes
   * @param {string} reach - connection reachability.
   *     - Cross-platform: [none, wifi, cellular, unknown]
   *     - Android: [bluetooth, ethernet, wimax]
   * @returns {boolean} - Whether the connection reachability or the connection props have changed
   * @private
   */


  _createClass(DetectNetwork, [{
    key: "_addListeners",

    /**
     * Adds listeners for when connection reachability and app state changes to update props
     * @returns {void}
     * @private
     */
    value: function _addListeners() {
      var _this2 = this;

      _netinfo["default"].addEventListener(function (connectionInfo) {
        _this2._setShouldInitUpdateReach(false);

        _this2._update(connectionInfo.type);
      });

      _reactNative.AppState.addEventListener('change',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var connectionInfo;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this2._setShouldInitUpdateReach(false);

                _context4.next = 3;
                return _netinfo["default"].fetch();

              case 3:
                connectionInfo = _context4.sent;

                _this2._update(connectionInfo.type);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    }
    /**
     * Executes the given callback to update redux's store with the new internal props
     * @returns {Promise.<void>} Resolves after fetching the isConnectionExpensive
     * and dispatches actions
     * @private
     */

  }]);

  return DetectNetwork;
}();

var _default = function _default(callback) {
  return new DetectNetwork(callback);
};

exports["default"] = _default;