import Component from "../Component";

const isType = type => input => typeof input === type;
export const isString = isType("string");
export const isFunction = isType("function");
export const isElement = input => input instanceof Element;
export const isArray = Array.isArray;
export const isObject = input => input && isType("object");
export const isNull = input => !input && isType("object");
export const isDefined = input => input !== void 0;
export const isDOMELement = input => input instanceof Node;
export const isComponent = input => input instanceof Component;

const node = document.createElement("div");

export function mount (component, target) {

  if (!isElement(target) ||
      !isComponent(component) ||
      component.mounted) {
  
    return;
  }

  return component.onRender(() => {

    target.appendChild(component.$el);
    Object.defineProperty(component, "mounted", {value: true});
    return component.componentDidMount && component.componentDidMount();
  });
}

export function createElement () {

}

export function createNode (htmlString) {

  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

export function deepFreeze(object) {

  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {

    let value = object[name];

    try {

      object[name] = value
    } catch (e) { /* the prop is not writable */}
          
    value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}
