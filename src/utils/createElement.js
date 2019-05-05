import {isFunction, isString, isComponent} from "./index";
import Component from "../Component";

class ComponentElement extends Component {

  constructor (tagName, props) {

    super(pros);

    const tag = document.createElement(tagName);

    this.render = function () {

      return tag;
    };
  }
}

export default function createElement (tagName, props, ...children) {

  children = children || [];


  let component;

  if (isFunction(tagName)) {

    component = new tagName(porps);

    if (!isComponent(component)) {

      return null;
    }
  } else {

    component = new ComponentElement(tagName, props);
  }

  component.appendChild(children);

  return component;
};
