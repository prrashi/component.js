const isType = type => input => typeof input === type;
export const isString = isType("string");
export const isNumber = isType("number");
export const isFunction = isType("function");
export const isText = input => isString(input) || isNumber(input);
export const isElement = input => input instanceof Element;
export const isArray = Array.isArray;
export const isObject = input => input && isType("object");
export const isDefined = input => input !== void 0;

const node = document.createElement("div");

export function createNode (htmlString) {
  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

export function createTextNode (text) {
  node.innerHTML = text;
  return node.firstChild;
}

export function deepFreeze(object) {

  return Object.freeze(Object.create(object));
}
