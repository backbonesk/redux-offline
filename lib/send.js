'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var _constants = require('./constants');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var complete = function complete(action, success, payload) {
  var meta = _extends({}, action.meta, { success: success, completed: true });

  if (typeof action === 'function') {
    return action({ payload: payload, meta: meta });
  }

  return _extends({}, action, { payload: payload, meta: meta });
};

var send = function send(action, dispatch, config) {
  var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var metadata = action.meta.offline;
  dispatch((0, _actions.busy)(true));
  return config.effect(metadata.effect, action).then(function (result) {
    var commitAction = metadata.commit || _extends({}, config.defaultCommit, {
      meta: _extends({}, config.defaultCommit.meta, { offlineAction: action })
    });
    try {
      dispatch(complete(commitAction, true, result));
    } catch (e) {
      console.error(e);
      dispatch(complete({ type: _constants.JS_ERROR, payload: e }, false));
    }
  }).catch(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
      var rollbackAction, mustDiscard, delay;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rollbackAction = metadata.rollback || _extends({}, config.defaultRollback, {
                meta: _extends({}, config.defaultRollback.meta, { offlineAction: action })
              });

              // discard

              mustDiscard = true;
              _context.prev = 2;
              _context.next = 5;
              return config.discard(error, action, retries);

            case 5:
              mustDiscard = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](2);

              console.warn(_context.t0);

            case 11:
              if (mustDiscard) {
                _context.next = 16;
                break;
              }

              delay = config.retry(action, retries);

              if (!(delay != null)) {
                _context.next = 16;
                break;
              }

              dispatch((0, _actions.scheduleRetry)(delay));
              return _context.abrupt('return');

            case 16:

              dispatch(complete(rollbackAction, false, error));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 8]]);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.default = send;