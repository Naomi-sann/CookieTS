"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Cookie = /*#__PURE__*/function () {
  function Cookie() {
    _classCallCheck(this, Cookie);
  }
  _createClass(Cookie, null, [{
    key: "all",
    value: function all() {
      if (!document.cookie) return [];
      var cookies = document.cookie.split("; ");
      return cookies.map(function (c) {
        var cke = c.split('=');
        return {
          key: cke[0],
          value: cke[1]
        };
      });
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.all().find(function (c) {
        return c.key === key;
      });
    }
  }, {
    key: "set",
    value: function set(key, value, expire) {
      var date = new Date();
      var expireDate = 0;
      var _expire$unit = expire.unit,
        unit = _expire$unit === void 0 ? 'millisecond' : _expire$unit,
        duration = expire.duration;
      switch (unit) {
        case 'millisecond':
          expireDate = duration;
          break;
        case 'second':
          expireDate = 1000 * duration;
          break;
        case 'minute':
          expireDate = 1000 * 60 * duration;
          break;
        case 'hour':
          expireDate = 1000 * 60 * 60 * duration;
          break;
        case 'day':
          expireDate = 1000 * 60 * 60 * 24 * duration;
          break;
        case 'month':
          expireDate = 1000 * 60 * 60 * 24 * 30 * duration;
          break;
        case 'year':
          expireDate = 1000 * 60 * 60 * 24 * 30 * 12 * duration;
          break;
        default:
          throw new Error('invalid date unit!');
      }
      date.setTime(date.getTime() + expireDate);
      document.cookie = key + "=" + value + ";" + 'expires=' + date.toUTCString() + ";path=/";
    }
  }, {
    key: "remove",
    value: function remove(key) {
      document.cookie = "".concat(key, "=;expires=").concat(new Date(0), ";path=/");
    }
  }, {
    key: "clear",
    value: function clear() {
      var cookies = this.all();
      var _iterator = _createForOfIteratorHelper(cookies),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cookie = _step.value;
          console.log(cookie);
          this.remove(cookie.key);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return Cookie;
}();
