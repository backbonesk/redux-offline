'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (state) {
  var offline = state.offline,
      rest = _objectWithoutProperties(state, ['offline']);

  return {
    get: offline,
    set: function set(offlineState) {
      return typeof offlineState === 'undefined' ? rest : _extends({ offline: offlineState }, rest);
    }
  };
};