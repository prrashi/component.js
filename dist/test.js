'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Jankay =
/*#__PURE__*/
function () {
  function Jankay() {
    _classCallCheck(this, Jankay);
  }

  _createClass(Jankay, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Jankay;
}();

var x = Component.createElement(Jankay, null, Component.createElement("div", null, Component.createElement(Component.createFragment, null, Component.createElement("p", null, "sdfsfd"), Component.createElement("p", null, [1, 2, 3].map(function (item) {
  return item;
}), Component.createElement("a", null, "sddfs")))));
