'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}

var isType = function isType(type) {
  return function (input) {
    return _typeof(input) === type;
  };
};

var isString = isType("string");
var isFunction = isType("function");
var isElement = function isElement(input) {
  return input instanceof Element;
};
var isArray = Array.isArray;
var isObject = function isObject(input) {
  return input && isType("object");
};
var isDefined = function isDefined(input) {
  return input !== void 0;
};
var isComponent = function isComponent(input) {
  return input instanceof Component;
};
var node = document.createElement("div");
function mount(component, target) {
  if (!isElement(target) || !isComponent(component) || component.mounted) {
    return;
  }

  return component.onRender(function () {
    target.appendChild(component.$el);
    Object.defineProperty(component, "mounted", {
      value: true
    });
    return component.componentDidMount && component.componentDidMount();
  });
}
function createNode(htmlString) {
  node.innerHTML = htmlString.trim();
  return node.firstChild;
}
function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;
      var value = object[name];

      try {
        object[name] = value;
      } catch (e) {
        /* the prop is not writable */
      }

      value && _typeof(value) === "object" ? deepFreeze(value) : value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Object.freeze(object);
}

var Component =
/*#__PURE__*/
function () {
  function Component(props, container) {
    var _this = this;

    _classCallCheck(this, Component);

    var context = {};
    Object.defineProperty(this, "context", {
      get: function get() {
        return context;
      },
      set: function set(obj) {
        if (!isObject(obj)) {
          return;
        }

        Object.keys(obj).forEach(function (key) {
          var value = context[key];
          return value ? Object.assign(context[key], value) : context[key] = obj[key];
        });
        Object.assign(_this, context);
      }
    });
    Object.defineProperty(this, "props", {
      value: deepFreeze(props || {})
    });
    this.__renderSubscribers = [];

    if (this.render) {
      // let other things in constructor get executed
      window.setTimeout(function () {
        var $el = null;

        if (_this.render) {
          var html = _this.render(props),
              node = html instanceof Node ? html : (_this.parser || createNode)(html);

          $el = node;
        }

        Object.defineProperty(_this, "$el", {
          value: $el
        });
        Object.defineProperty(_this, "rendered", {
          value: true
        });

        _this.__renderSubscribers.forEach(function (fn) {
          return fn();
        });

        delete _this.__renderSubscribers;
        return _this.ready && _this.ready();
      });
    }
  }

  _createClass(Component, [{
    key: "onRender",
    value: function onRender(fn) {
      if (this.rendered) {
        fn();
      } else {
        this.__renderSubscribers.push(fn);
      }

      return this;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      if (this.$el) {
        var _this$$el;

        (_this$$el = this.$el).addEventListener.apply(_this$$el, arguments);
      }

      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      if (this.$el) {
        var _this$$el2;

        (_this$$el2 = this.$el).removeEventListener.apply(_this$$el2, arguments);
      }

      return this;
    }
  }, {
    key: "appendChild",
    value: function appendChild(child, $el) {
      var _this2 = this;

      if (isArray(child) && child.length > 0) {
        child.forEach(function (child) {
          return _this2.appendChild(child, $el);
        });
        return this;
      }

      if (!Component.isComponent(child)) {
        return this;
      }

      return this.onRender(function () {
        var context = _this2.context,
            $parentEl = _this2.$el;

        if (!isDefined($el)) {
          $el = $parentEl;
        } else {
          $el = isElement($el) ? $el : isString($el) ? _this2.$($el) : null;

          if (!$el) {
            return;
          }
        }

        if (context) {
          child.context = context;
        }

        return Component.mount(child, $el);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.componentWillUnMount) {
        this.componentWillUnMount();
      }

      var $container = this.$el && this.$el.parentElement;
      return $container && $container.removeChild(this.$el);
    }
  }, {
    key: "$",
    value: function $(selector) {
      return this.$el && this.$el.querySelector(selector) || null;
    }
  }, {
    key: "$$",
    value: function $$(selector) {
      return this.$el && this.$el.querySelectorAll(selector) || null;
    }
  }]);

  return Component;
}();

_defineProperty(Component, "isComponent", isComponent);

_defineProperty(Component, "mount", mount);

var getEvent = function getEvent() {
  var subscribers = [];
  return {
    subscribe: function subscribe(subscriber) {
      return isFunction(subscriber) && subscribers.push(subscriber);
    },
    unSubscribe: function unSubscribe(subscriber) {
      var subscriberIndex = subscribers.indexOf(subscriber);
      return subscriberIndex >= 0 && subscribers.splice(subscriberIndex, 1);
    },
    publish: function publish() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return subscribers.forEach(function (subscriber) {
        return subscriber.apply(void 0, args);
      });
    },
    unSubscribeAll: function unSubscribeAll() {
      return subscribers = [];
    }
  };
};

var PublisherComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(PublisherComponent, _Component);

  function PublisherComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PublisherComponent);

    for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      props[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PublisherComponent)).call.apply(_getPrototypeOf2, [this].concat(props)));
    _this.events = {};
    _this.context = {
      "events": _this.events
    };
    Object.defineProperty(_assertThisInitialized(_this), "destroyHandlers", {
      value: []
    });
    return _this;
  }

  _createClass(PublisherComponent, [{
    key: "registerEvent",
    value: function registerEvent(eventName) {
      if (this.events[eventName]) {
        return;
      }

      var _getEvent = getEvent(),
          subscribe = _getEvent.subscribe,
          unSubscribe = _getEvent.unSubscribe,
          publish = _getEvent.publish,
          unSubscribeAll = _getEvent.unSubscribeAll;

      this.events[eventName] = {
        subscribe: subscribe,
        unSubscribe: unSubscribe,
        trigger: function trigger() {
          return publish.apply(void 0, arguments);
        }
      };
      this.destroyHandlers.push(unSubscribeAll);
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this2 = this;

      for (var _len3 = arguments.length, eventNames = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        eventNames[_key3] = arguments[_key3];
      }

      eventNames.forEach(function (name) {
        return _this2.registerEvent(name);
      });
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(PublisherComponent.prototype), "destroy", this).call(this);

      this.destroyHandlers.forEach(function (item) {
        return item();
      });
    }
  }]);

  return PublisherComponent;
}(Component);

Component.PublisherComponent = PublisherComponent;

module.exports = Component;
