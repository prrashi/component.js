import "./polyfills";
import {
  createNode,
  deepFreeze,
  isString,
  isArray,
  isElement,
  isDefined,
  isObject,
  isNode,
  isFunction,
  isComponent,
  mount
} from "./utils";

class Component {

  constructor (props) {
 
    const context={};

    Object.defineProperty(this, "context", {

      get() { return context },
      set: (obj) => {

        if (!isObject(obj)) {

          return;
        }

        Object.keys(obj).forEach((key) => {

          const value = context[key];

          return value
                   ? Object.assign(context[key], value)
                   : context[key] = obj[key];
        });

        Object.assign(this, context);
      } 
    });

    const {ref, ...otherProps} = props;
 
    Object.defineProperty(
      this, "props",
      {value: deepFreeze(otherProps || {})}
    );

    this.__renderSubscribers = [];

    if (isFunction(this.render)) {
   
      // let other things in constructor get executed
      window.setTimeout(() => {
     
        let $el = null;

        if (this.render) {

          const html = this.render(props),
                isHTMLString = isString(html);

          if (!isDefined(html)) {

            throw new Error("render function did not return anything");
          } else if (isNode(html) || isHTMLString) {

            if (isHTMLString) {

              $el = createNode(html);
            }

            $el = html;

            Object.defineProperty(this, "$el", {value: $el});
          } else if (isComponent) {

            if (this.componentDidMount) {

              component.__onRender(this.componentDidMount);
            }

            this.appendChild(component).then(($elements) => {

              return !this.rendered && this.__publishRender($elements);
            });
          }
        }
      });
    } else {

      throw new Error("render method not specified");
    }
  }

  __publishRender ($el) {

    Object.defineProperty(this, "rendered", {value: true});
    this.__renderSubscribers.forEach((fn) => fn($el));
    delete this.__renderSubscribers;
  }

  __onRender (fn) {
  
    if (this.rendered) {
    
      fn();
    } else {

      this.__renderSubscribers.push(fn);
    }

    return this;
  }

  appendChild(child) {

    if (this.rendered) {

      return;
    }

    if (isArray(child) && child.length > 0) {

      return new Promise.all(
        child.map((child) => this.appendChild(child, $el))
      ).then(($elements) => {

        if (this.$el) {

          return $el;
        }

        return $elements;
      });
    }

    if (!Component.isComponent(child)) {

      if (!child) {

        return Promise.resolve(this.$el || child);
      }
    
      child = document.createTextFragment(String(child));

      let retVal = child;

      if (this.$el) {

        this.$el.appendChild(retVal);
        retVal = this.$el;
      }

      return Promise.resolve(retVal);
    }

    const {context} = this;

    if (context) {

      child.context = context;
    }

    return new Promise((res) => {
 
      child.__onRender(($child) => {

        let retVal = $child;

        if (this.$el) {

          this.$el.appendChild($child);
          retVal = this.$el;
        }

        res(retVal);
      });
    });
  }

  destroy () {
  
    if (this.componentWillUnMount) {
    
      this.componentWillUnMount();
    }

    const $container = this.$el && this.$el.parentElement;

    return $container && 
           $container.removeChild(this.$el);
  }

  static isComponent = isComponent;
  static mount = mount;
}

export default Component;
