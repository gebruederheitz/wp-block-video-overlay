import { components, i18n, element, blockEditor, data, compose, hooks, blocks } from 'wp';

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

const uid = Date.now();

/**
 * Merge two or more objects
 */
function extend() {
    let extended = {};
    let deep = true;
    let i = 0;
    let length = arguments.length;
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }
    let merge = (obj) => {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    for (; i < length; i++) {
        let obj = arguments[i];
        merge(obj);
    }
    return extended;
}


/**
 * Each
 *
 * @param {mixed} node list, array, object
 * @param {function} callback
 */
function each(collection, callback) {
    if (isNode(collection) || collection === window || collection === document) {
        collection = [collection];
    }
    if (!isArrayLike$1(collection) && !isObject$2(collection)) {
        collection = [collection];
    }
    if (size(collection) == 0) {
        return;
    }

    if (isArrayLike$1(collection) && !isObject$2(collection)) {
        let l = collection.length,
            i = 0;
        for (; i < l; i++) {
            if (callback.call(collection[i], collection[i], i, collection) === false) {
                break;
            }
        }
    } else if (isObject$2(collection)) {
        for (let key in collection) {
            if (has(collection, key)) {
                if (callback.call(collection[key], collection[key], key, collection) === false) {
                    break;
                }
            }
        }
    }
}


/**
 * Get nde events
 * return node events and optionally
 * check if the node has already a specific event
 * to avoid duplicated callbacks
 *
 * @param {node} node
 * @param {string} name event name
 * @param {object} fn callback
 * @returns {object}
 */
function getNodeEvents(node, name = null, fn = null) {
    const cache = (node[uid] = node[uid] || []);
    const data = { all: cache, evt: null, found: null };
    if (name && fn && size(cache) > 0) {
        each(cache, (cl, i) => {
            if (cl.eventName == name && cl.fn.toString() == fn.toString()) {
                data.found = true;
                data.evt = i;
                return false;
            }
        });
    }
    return data;
}


/**
 * Add Event
 * Add an event listener
 *
 * @param {string} eventName
 * @param {object} detials
 */
function addEvent(eventName, {
    onElement,
    withCallback,
    avoidDuplicate = true,
    once = false,
    useCapture = false
} = {}, thisArg) {
    let element = onElement || [];
    if (isString(element)) {
        element = document.querySelectorAll(element);
    }

    function handler(event) {
        if (isFunction$2(withCallback)) {
            withCallback.call(thisArg, event, this);
        }
        if (once) {
            handler.destroy();
        }
    }
    handler.destroy = function() {
        each(element, (el) => {
            const events = getNodeEvents(el, eventName, handler);
            if (events.found) {
                events.all.splice(events.evt, 1);
            }
            if (el.removeEventListener) {
                el.removeEventListener(eventName, handler, useCapture);
            }
        });
    };
    each(element, (el) => {
        const events = getNodeEvents(el, eventName, handler);
        if (el.addEventListener && (avoidDuplicate && !events.found) || !avoidDuplicate) {
            el.addEventListener(eventName, handler, useCapture);
            events.all.push({ eventName: eventName, fn: handler });
        }
    });
    return handler;
}

/**
 * Add element class
 *
 * @param {node} element
 * @param {string} class name
 */
function addClass(node, name) {
    each(name.split(' '), cl => node.classList.add(cl));
}

/**
 * Remove element class
 *
 * @param {node} element
 * @param {string} class name
 */
function removeClass(node, name) {
    each(name.split(' '), cl => node.classList.remove(cl));
}

/**
 * Has class
 *
 * @param {node} element
 * @param {string} class name
 */
function hasClass(node, name) {
    return node.classList.contains(name);
}

/**
 * Get the closestElement
 *
 * @param {node} element
 * @param {string} class name
 */
function closest(elem, selector) {
    while (elem !== document.body) {
        elem = elem.parentElement;
        if (!elem) {
            return false;
        }
        const matches = typeof elem.matches == 'function' ? elem.matches(selector) : elem.msMatchesSelector(selector);

        if (matches) {
            return elem;
        }
    }
}

/**
 * CSS Animations
 *
 * @param {node} element
 * @param {string} animation name
 * @param {function} callback
 */
function animateElement(element, animation = '', callback = false) {
    if (!element || animation === '') {
        return false;
    }
    if (animation == 'none') {
        if (isFunction$2(callback)) {
            callback();
        }
        return false;
    }
    const animationEnd = whichAnimationEvent();
    const animationNames = animation.split(' ');
    each(animationNames, (name) => {
        addClass(element, 'g' + name);
    });
    addEvent(animationEnd, {
        onElement: element,
        avoidDuplicate: false,
        once: true,
        withCallback: (event, target) => {
            each(animationNames, (name) => {
                removeClass(target, 'g' + name);
            });
            if (isFunction$2(callback)) {
                callback();
            }
        }
    });
}

function cssTransform(node, translate = '') {
    if (translate == '') {
        node.style.webkitTransform = '';
        node.style.MozTransform = '';
        node.style.msTransform = '';
        node.style.OTransform = '';
        node.style.transform = '';
        return false;
    }
    node.style.webkitTransform = translate;
    node.style.MozTransform = translate;
    node.style.msTransform = translate;
    node.style.OTransform = translate;
    node.style.transform = translate;
}

/**
 * Show element
 *
 * @param {node} element
 */
function show(element) {
    element.style.display = 'block';
}

/**
 * Hide element
 */
function hide(element) {
    element.style.display = 'none';
}

/**
 * Create a document fragment
 *
 * @param {string} html code
 */
function createHTML(htmlStr) {
    let frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

/**
 * Return screen size
 * return the current screen dimensions
 *
 * @returns {object}
 */
function windowSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}

/**
 * Determine animation events
 */
function whichAnimationEvent() {
    let t, el = document.createElement('fakeelement');
    let animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd'
    };
    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

/**
 * Determine transition events
 */
function whichTransitionEvent() {
    let t,
        el = document.createElement('fakeelement');

    const transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}


/**
 * Create an iframe element
 *
 * @param {string} url
 * @param {numeric} width
 * @param {numeric} height
 * @param {function} callback
 */
function createIframe(config) {
    let { url, allow, callback, appendTo } = config;
    let iframe = document.createElement('iframe');
    iframe.className = 'vimeo-video gvideo';
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    if (allow) {
        iframe.setAttribute('allow', allow);
    }
    iframe.onload = function() {
        addClass(iframe, 'node-ready');
        if (isFunction$2(callback)) {
            callback();
        }
    };

    if (appendTo) {
        appendTo.appendChild(iframe);
    }
    return iframe;
}


/**
 * Wait until
 * wait until all the validations
 * are passed
 *
 * @param {function} check
 * @param {function} onComplete
 * @param {numeric} delay
 * @param {numeric} timeout
 */
function waitUntil(check, onComplete, delay, timeout) {
    if (check()) {
        onComplete();
        return;
    }

    if (!delay) {
        delay = 100;
    }
    let timeoutPointer;
    let intervalPointer = setInterval(() => {
        if (!check()) {
            return;
        }
        clearInterval(intervalPointer);
        if (timeoutPointer) {
            clearTimeout(timeoutPointer);
        }
        onComplete();
    }, delay);
    if (timeout) {
        timeoutPointer = setTimeout(() => {
            clearInterval(intervalPointer);
        }, timeout);
    }
}

/**
 * Inject videos api
 * used for video player
 *
 * @param {string} url
 * @param {function} callback
 */
function injectAssets(url, waitFor, callback) {
    if (isNil(url)) {
        console.error('Inject assets error');
        return;
    }
    if (isFunction$2(waitFor)) {
        callback = waitFor;
        waitFor = false;
    }

    if (isString(waitFor) && (waitFor in window)) {
        if (isFunction$2(callback)) {
            callback();
        }
        return;
    }

    let found;

    if (url.indexOf('.css') !== -1) {
        found = document.querySelectorAll('link[href="' + url + '"]');
        if (found && found.length > 0) {
            if (isFunction$2(callback)) {
                callback();
            }
            return;
        }

        const head = document.getElementsByTagName('head')[0];
        const headStyles = head.querySelectorAll('link[rel="stylesheet"]');
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';

        if (headStyles) {
            head.insertBefore(link, headStyles[0]);
        } else {
            head.appendChild(link);
        }
        if (isFunction$2(callback)) {
            callback();
        }
        return;
    }

    found = document.querySelectorAll('script[src="' + url + '"]');
    if (found && found.length > 0) {
        if (isFunction$2(callback)) {
            if (isString(waitFor)) {
                waitUntil(() => {
                    return typeof window[waitFor] !== 'undefined';
                }, () => {
                    callback();
                });
                return false;
            }
            callback();
        }
        return;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => {
        if (isFunction$2(callback)) {
            if (isString(waitFor)) {
                waitUntil(() => {
                    return typeof window[waitFor] !== 'undefined';
                }, () => {
                    callback();
                });
                return false;
            }
            callback();
        }
    };
    document.body.appendChild(script);
    return;
}

function isMobile$1() {
    return ('navigator' in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i));
}

function isTouch$1() {
    return isMobile$1() !== null || document.createTouch !== undefined || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints;
}

function isFunction$2(f) {
    return typeof f === 'function';
}
function isString(s) {
    return typeof s === 'string';
}
function isNode(el) {
    return !!(el && el.nodeType && el.nodeType == 1);
}
function isArray$2(ar) {
    return Array.isArray(ar);
}
function isArrayLike$1(ar) {
    return (ar && ar.length && isFinite(ar.length));
}
function isObject$2(o) {
    let type = typeof o;
    return type === 'object' && (o != null && !isFunction$2(o) && !isArray$2(o));
}
function isNil(o) {
    return o == null;
}
function has(obj, key) {
    return obj !== null && hasOwnProperty.call(obj, key);
}
function size(o) {
    if (isObject$2(o)) {
        if (o.keys) {
            return o.keys().length;
        }
        let l = 0;
        for (let k in o) {
            if (has(o, k)) {
                l++;
            }
        }
        return l;
    } else {
        return o.length;
    }
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Keyboard Navigation
 * Allow navigation using the keyboard
 *
 * @param {object} instance
 */

function getNextFocusElement(current = -1) {
    const btns = document.querySelectorAll('.gbtn[data-taborder]:not(.disabled)');
    if (!btns.length) {
        return false;
    }

    if (btns.length == 1) {
        return btns[0];
    }

    if (typeof current == 'string') {
        current = parseInt(current);
    }

    let newIndex = current < 0 ? 1 : current + 1;
    if (newIndex > btns.length) {
        newIndex = '1';
    }

    const orders = [];
    each(btns, (btn) => {
        orders.push(btn.getAttribute('data-taborder'));
    });
    const nextOrders = orders.filter((el) => el >= parseInt(newIndex));
    const nextFocus = nextOrders.sort()[0];

    return document.querySelector(`.gbtn[data-taborder="${nextFocus}"]`);
}

function keyboardNavigation(instance) {
    if (instance.events.hasOwnProperty('keyboard')) {
        return false;
    }

    instance.events['keyboard'] = addEvent('keydown', {
        onElement: window,
        withCallback: (event, target) => {
            event = event || window.event;
            const key = event.keyCode;
            if (key == 9) {
                //prettier-ignore
                const focusedButton = document.querySelector('.gbtn.focused');

                if (!focusedButton) {
                    const activeElement = document.activeElement && document.activeElement.nodeName ? document.activeElement.nodeName.toLocaleLowerCase() : false;
                    if (activeElement == 'input' || activeElement == 'textarea' || activeElement == 'button') {
                        return;
                    }
                }

                event.preventDefault();
                const btns = document.querySelectorAll('.gbtn[data-taborder]');
                if (!btns || btns.length <= 0) {
                    return;
                }

                if (!focusedButton) {
                    const first = getNextFocusElement();
                    if (first) {
                        first.focus();
                        addClass(first, 'focused');
                    }
                    return;
                }

                let currentFocusOrder = focusedButton.getAttribute('data-taborder');
                let nextFocus = getNextFocusElement(currentFocusOrder);

                removeClass(focusedButton, 'focused');

                if (nextFocus) {
                    nextFocus.focus();
                    addClass(nextFocus, 'focused');
                }
            }
            if (key == 39) {
                instance.nextSlide();
            }
            if (key == 37) {
                instance.prevSlide();
            }
            if (key == 27) {
                instance.close();
            }
        }
    });
}

function getLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function getAngle(v1, v2) {
    var mr = getLen(v1) * getLen(v2);
    if (mr === 0) {
        return 0;
    }
    var r = dot(v1, v2) / mr;
    if (r > 1) {
        r = 1;
    }
    return Math.acos(r);
}

function cross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
}

function getRotateAngle(v1, v2) {
    var angle = getAngle(v1, v2);
    if (cross(v1, v2) > 0) {
        angle *= -1;
    }

    return (angle * 180) / Math.PI;
}

class EventsHandlerAdmin {
    constructor(el) {
        this.handlers = [];
        this.el = el;
    }
    add(handler) {
        this.handlers.push(handler);
    }
    del(handler) {
        if (!handler) {
            this.handlers = [];
        }

        for (var i = this.handlers.length; i >= 0; i--) {
            if (this.handlers[i] === handler) {
                this.handlers.splice(i, 1);
            }
        }
    }
    dispatch() {
        for (var i = 0, len = this.handlers.length; i < len; i++) {
            var handler = this.handlers[i];
            if (typeof handler === 'function') {
                handler.apply(this.el, arguments);
            }
        }
    }
}

function wrapFunc(el, handler) {
    var EventshandlerAdmin = new EventsHandlerAdmin(el);
    EventshandlerAdmin.add(handler);

    return EventshandlerAdmin;
}

// Modified version of AlloyFinger
class TouchEvents {
    constructor(el, option) {
        this.element = typeof el == 'string' ? document.querySelector(el) : el;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.cancel = this.cancel.bind(this);
        this.element.addEventListener('touchstart', this.start, false);
        this.element.addEventListener('touchmove', this.move, false);
        this.element.addEventListener('touchend', this.end, false);
        this.element.addEventListener('touchcancel', this.cancel, false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.zoom = 1;
        this.isDoubleTap = false;

        var noop = function () {};

        this.rotate = wrapFunc(this.element, option.rotate || noop);
        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
        this.pinch = wrapFunc(this.element, option.pinch || noop);
        this.swipe = wrapFunc(this.element, option.swipe || noop);
        this.tap = wrapFunc(this.element, option.tap || noop);
        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
        this.longTap = wrapFunc(this.element, option.longTap || noop);
        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
        this.twoFingerPressMove = wrapFunc(this.element, option.twoFingerPressMove || noop);
        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);
        this.translateContainer = this.element;

        this._cancelAllHandler = this.cancelAll.bind(this);

        window.addEventListener('scroll', this._cancelAllHandler);

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    }
    start(evt) {
        if (!evt.touches) {
            return;
        }

        // Fix Media Buttons Not responding on Android #233
        const ignoreDragFor = ['a', 'button', 'input'];
        if (evt.target && evt.target.nodeName && ignoreDragFor.indexOf(evt.target.nodeName.toLowerCase()) >= 0) {
            console.log('ignore drag for this touched element', evt.target.nodeName.toLowerCase());
            return;
        }

        this.now = Date.now();
        this.x1 = evt.touches[0].pageX;
        this.y1 = evt.touches[0].pageY;
        this.delta = this.now - (this.last || this.now);
        this.touchStart.dispatch(evt, this.element);
        if (this.preTapPosition.x !== null) {
            this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30;
            if (this.isDoubleTap) {
                clearTimeout(this.singleTapTimeout);
            }
        }
        this.preTapPosition.x = this.x1;
        this.preTapPosition.y = this.y1;
        this.last = this.now;
        var preV = this.preV,
            len = evt.touches.length;
        if (len > 1) {
            this._cancelLongTap();
            this._cancelSingleTap();
            var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
            preV.x = v.x;
            preV.y = v.y;
            this.pinchStartLen = getLen(preV);
            this.multipointStart.dispatch(evt, this.element);
        }
        this._preventTap = false;
        this.longTapTimeout = setTimeout(
            function () {
                this.longTap.dispatch(evt, this.element);
                this._preventTap = true;
            }.bind(this),
            750
        );
    }
    move(evt) {
        if (!evt.touches) {
            return;
        }
        var preV = this.preV,
            len = evt.touches.length,
            currentX = evt.touches[0].pageX,
            currentY = evt.touches[0].pageY;
        this.isDoubleTap = false;
        if (len > 1) {
            var sCurrentX = evt.touches[1].pageX,
                sCurrentY = evt.touches[1].pageY;
            var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

            if (preV.x !== null) {
                if (this.pinchStartLen > 0) {
                    evt.zoom = getLen(v) / this.pinchStartLen;
                    this.pinch.dispatch(evt, this.element);
                }

                evt.angle = getRotateAngle(v, preV);
                this.rotate.dispatch(evt, this.element);
            }
            preV.x = v.x;
            preV.y = v.y;

            if (this.x2 !== null && this.sx2 !== null) {
                evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
                evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this.twoFingerPressMove.dispatch(evt, this.element);

            this.sx2 = sCurrentX;
            this.sy2 = sCurrentY;
        } else {
            if (this.x2 !== null) {
                evt.deltaX = currentX - this.x2;
                evt.deltaY = currentY - this.y2;

                var movedX = Math.abs(this.x1 - this.x2),
                    movedY = Math.abs(this.y1 - this.y2);

                if (movedX > 10 || movedY > 10) {
                    this._preventTap = true;
                }
            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this.pressMove.dispatch(evt, this.element);
        }

        this.touchMove.dispatch(evt, this.element);

        this._cancelLongTap();
        this.x2 = currentX;
        this.y2 = currentY;

        if (len > 1) {
            evt.preventDefault();
        }
    }
    end(evt) {
        if (!evt.changedTouches) {
            return;
        }
        this._cancelLongTap();
        var self = this;
        if (evt.touches.length < 2) {
            this.multipointEnd.dispatch(evt, this.element);
            this.sx2 = this.sy2 = null;
        }

        //swipe
        if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) || (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
            evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
            this.swipeTimeout = setTimeout(function () {
                self.swipe.dispatch(evt, self.element);
            }, 0);
        } else {
            this.tapTimeout = setTimeout(function () {
                if (!self._preventTap) {
                    self.tap.dispatch(evt, self.element);
                }
                // trigger double tap immediately
                if (self.isDoubleTap) {
                    self.doubleTap.dispatch(evt, self.element);
                    self.isDoubleTap = false;
                }
            }, 0);

            if (!self.isDoubleTap) {
                self.singleTapTimeout = setTimeout(function () {
                    self.singleTap.dispatch(evt, self.element);
                }, 250);
            }
        }

        this.touchEnd.dispatch(evt, this.element);

        this.preV.x = 0;
        this.preV.y = 0;
        this.zoom = 1;
        this.pinchStartLen = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
    }
    cancelAll() {
        this._preventTap = true;
        clearTimeout(this.singleTapTimeout);
        clearTimeout(this.tapTimeout);
        clearTimeout(this.longTapTimeout);
        clearTimeout(this.swipeTimeout);
    }
    cancel(evt) {
        this.cancelAll();
        this.touchCancel.dispatch(evt, this.element);
    }
    _cancelLongTap() {
        clearTimeout(this.longTapTimeout);
    }
    _cancelSingleTap() {
        clearTimeout(this.singleTapTimeout);
    }
    _swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : y1 - y2 > 0 ? 'Up' : 'Down';
    }
    on(evt, handler) {
        if (this[evt]) {
            this[evt].add(handler);
        }
    }
    off(evt, handler) {
        if (this[evt]) {
            this[evt].del(handler);
        }
    }
    destroy() {
        if (this.singleTapTimeout) {
            clearTimeout(this.singleTapTimeout);
        }
        if (this.tapTimeout) {
            clearTimeout(this.tapTimeout);
        }
        if (this.longTapTimeout) {
            clearTimeout(this.longTapTimeout);
        }
        if (this.swipeTimeout) {
            clearTimeout(this.swipeTimeout);
        }

        this.element.removeEventListener('touchstart', this.start);
        this.element.removeEventListener('touchmove', this.move);
        this.element.removeEventListener('touchend', this.end);
        this.element.removeEventListener('touchcancel', this.cancel);

        this.rotate.del();
        this.touchStart.del();
        this.multipointStart.del();
        this.multipointEnd.del();
        this.pinch.del();
        this.swipe.del();
        this.tap.del();
        this.doubleTap.del();
        this.longTap.del();
        this.singleTap.del();
        this.pressMove.del();
        this.twoFingerPressMove.del();
        this.touchMove.del();
        this.touchEnd.del();
        this.touchCancel.del();

        this.preV =
            this.pinchStartLen =
            this.zoom =
            this.isDoubleTap =
            this.delta =
            this.last =
            this.now =
            this.tapTimeout =
            this.singleTapTimeout =
            this.longTapTimeout =
            this.swipeTimeout =
            this.x1 =
            this.x2 =
            this.y1 =
            this.y2 =
            this.preTapPosition =
            this.rotate =
            this.touchStart =
            this.multipointStart =
            this.multipointEnd =
            this.pinch =
            this.swipe =
            this.tap =
            this.doubleTap =
            this.longTap =
            this.singleTap =
            this.pressMove =
            this.touchMove =
            this.touchEnd =
            this.touchCancel =
            this.twoFingerPressMove =
                null;

        window.removeEventListener('scroll', this._cancelAllHandler);
        return null;
    }
}

/**
 * Touch Navigation
 * Allow navigation using touch events
 *
 * @param {object} instance
 */

function resetSlideMove(slide) {
    const transitionEnd = whichTransitionEvent();
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    let media = hasClass(slide, 'gslide-media') ? slide : slide.querySelector('.gslide-media');
    let container = closest(media, '.ginner-container');
    let desc = slide.querySelector('.gslide-description');

    if (windowWidth > 769) {
        media = container;
    }

    addClass(media, 'greset');
    cssTransform(media, 'translate3d(0, 0, 0)');
    addEvent(transitionEnd, {
        onElement: media,
        once: true,
        withCallback: (event, target) => {
            removeClass(media, 'greset');
        }
    });

    media.style.opacity = '';
    if (desc) {
        desc.style.opacity = '';
    }
}

function touchNavigation(instance) {
    if (instance.events.hasOwnProperty('touch')) {
        return false;
    }

    let winSize = windowSize();
    let winWidth = winSize.width;
    let winHeight = winSize.height;
    let process = false;
    let currentSlide = null;
    let media = null;
    let mediaImage = null;
    let doingMove = false;
    let initScale = 1;
    let maxScale = 4.5;
    let currentScale = 1;
    let doingZoom = false;
    let imageZoomed = false;
    let zoomedPosX = null;
    let zoomedPosY = null;
    let lastZoomedPosX = null;
    let lastZoomedPosY = null;
    let hDistance;
    let vDistance;
    let hDistancePercent = 0;
    let vDistancePercent = 0;
    let vSwipe = false;
    let hSwipe = false;
    let startCoords = {};
    let endCoords = {};
    let xDown = 0;
    let yDown = 0;
    let isInlined;

    const sliderWrapper = document.getElementById('glightbox-slider');
    const overlay = document.querySelector('.goverlay');

    const touchInstance = new TouchEvents(sliderWrapper, {
        touchStart: (e) => {
            process = true;

            // TODO: More tests for inline content slides
            if (hasClass(e.targetTouches[0].target, 'ginner-container') || closest(e.targetTouches[0].target, '.gslide-desc') || e.targetTouches[0].target.nodeName.toLowerCase() == 'a') {
                process = false;
            }

            if (closest(e.targetTouches[0].target, '.gslide-inline') && !hasClass(e.targetTouches[0].target.parentNode, 'gslide-inline')) {
                process = false;
            }

            if (process) {
                endCoords = e.targetTouches[0];
                startCoords.pageX = e.targetTouches[0].pageX;
                startCoords.pageY = e.targetTouches[0].pageY;
                xDown = e.targetTouches[0].clientX;
                yDown = e.targetTouches[0].clientY;

                currentSlide = instance.activeSlide;
                media = currentSlide.querySelector('.gslide-media');
                isInlined = currentSlide.querySelector('.gslide-inline');

                mediaImage = null;
                if (hasClass(media, 'gslide-image')) {
                    mediaImage = media.querySelector('img');
                }

                const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                if (windowWidth > 769) {
                    media = currentSlide.querySelector('.ginner-container');
                }

                removeClass(overlay, 'greset');

                if (e.pageX > 20 && e.pageX < window.innerWidth - 20) {
                    return;
                }
                e.preventDefault();
            }
        },
        touchMove: (e) => {
            if (!process) {
                return;
            }
            endCoords = e.targetTouches[0];

            if (doingZoom || imageZoomed) {
                return;
            }
            if (isInlined && isInlined.offsetHeight > winHeight) {
                // Allow scroll without moving the slide
                const moved = startCoords.pageX - endCoords.pageX;
                if (Math.abs(moved) <= 13) {
                    return false;
                }
            }

            doingMove = true;
            let xUp = e.targetTouches[0].clientX;
            let yUp = e.targetTouches[0].clientY;
            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                vSwipe = false;
                hSwipe = true;
            } else {
                hSwipe = false;
                vSwipe = true;
            }

            hDistance = endCoords.pageX - startCoords.pageX;
            hDistancePercent = (hDistance * 100) / winWidth;

            vDistance = endCoords.pageY - startCoords.pageY;
            vDistancePercent = (vDistance * 100) / winHeight;

            let opacity;
            if (vSwipe && mediaImage) {
                opacity = 1 - Math.abs(vDistance) / winHeight;
                overlay.style.opacity = opacity;

                if (instance.settings.touchFollowAxis) {
                    hDistancePercent = 0;
                }
            }
            if (hSwipe) {
                opacity = 1 - Math.abs(hDistance) / winWidth;
                media.style.opacity = opacity;

                if (instance.settings.touchFollowAxis) {
                    vDistancePercent = 0;
                }
            }

            if (!mediaImage) {
                return cssTransform(media, `translate3d(${hDistancePercent}%, 0, 0)`);
            }

            cssTransform(media, `translate3d(${hDistancePercent}%, ${vDistancePercent}%, 0)`);
        },
        touchEnd: () => {
            if (!process) {
                return;
            }
            doingMove = false;
            if (imageZoomed || doingZoom) {
                lastZoomedPosX = zoomedPosX;
                lastZoomedPosY = zoomedPosY;
                return;
            }
            const v = Math.abs(parseInt(vDistancePercent));
            const h = Math.abs(parseInt(hDistancePercent));

            if (v > 29 && mediaImage) {
                instance.close();
                return;
            }
            if (v < 29 && h < 25) {
                addClass(overlay, 'greset');
                overlay.style.opacity = 1;
                return resetSlideMove(media);
            }
        },
        multipointEnd: () => {
            setTimeout(() => {
                doingZoom = false;
            }, 50);
        },
        multipointStart: () => {
            doingZoom = true;
            initScale = currentScale ? currentScale : 1;
        },
        pinch: (evt) => {
            if (!mediaImage || doingMove) {
                return false;
            }

            doingZoom = true;
            mediaImage.scaleX = mediaImage.scaleY = initScale * evt.zoom;

            let scale = initScale * evt.zoom;
            imageZoomed = true;

            if (scale <= 1) {
                imageZoomed = false;
                scale = 1;
                lastZoomedPosY = null;
                lastZoomedPosX = null;
                zoomedPosX = null;
                zoomedPosY = null;
                mediaImage.setAttribute('style', '');
                return;
            }
            if (scale > maxScale) {
                // max scale zoom
                scale = maxScale;
            }

            mediaImage.style.transform = `scale3d(${scale}, ${scale}, 1)`;
            currentScale = scale;
        },
        pressMove: (e) => {
            if (imageZoomed && !doingZoom) {
                var mhDistance = endCoords.pageX - startCoords.pageX;
                var mvDistance = endCoords.pageY - startCoords.pageY;

                if (lastZoomedPosX) {
                    mhDistance = mhDistance + lastZoomedPosX;
                }
                if (lastZoomedPosY) {
                    mvDistance = mvDistance + lastZoomedPosY;
                }

                zoomedPosX = mhDistance;
                zoomedPosY = mvDistance;

                let style = `translate3d(${mhDistance}px, ${mvDistance}px, 0)`;
                if (currentScale) {
                    style += ` scale3d(${currentScale}, ${currentScale}, 1)`;
                }
                cssTransform(mediaImage, style);
            }
        },
        swipe: (evt) => {
            if (imageZoomed) {
                return;
            }
            if (doingZoom) {
                doingZoom = false;
                return;
            }
            if (evt.direction == 'Left') {
                if (instance.index == instance.elements.length - 1) {
                    return resetSlideMove(media);
                }
                instance.nextSlide();
            }
            if (evt.direction == 'Right') {
                if (instance.index == 0) {
                    return resetSlideMove(media);
                }
                instance.prevSlide();
            }
        }
    });

    instance.events['touch'] = touchInstance;
}

/**
 * ZoomImages
 * Allow imaes to zoom and drag
 * for desktops
 *
 * @param {node} img node
 * @param {node} slide container
 * @param {function} function to trigger on close
 */
class ZoomImages {
    constructor(el, slide, onclose = null) {
        this.img = el;
        this.slide = slide;
        this.onclose = onclose;

        if (this.img.setZoomEvents) {
            return false;
        }

        this.active = false;
        this.zoomedIn = false;
        this.dragging = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;

        this.img.addEventListener('mousedown', (e) => this.dragStart(e), false);
        this.img.addEventListener('mouseup', (e) => this.dragEnd(e), false);
        this.img.addEventListener('mousemove', (e) => this.drag(e), false);

        this.img.addEventListener(
            'click',
            (e) => {
                if (this.slide.classList.contains('dragging-nav')) {
                    this.zoomOut();
                    return false;
                }

                if (!this.zoomedIn) {
                    return this.zoomIn();
                }
                if (this.zoomedIn && !this.dragging) {
                    this.zoomOut();
                }
            },
            false
        );

        this.img.setZoomEvents = true;
    }
    zoomIn() {
        let winWidth = this.widowWidth();

        if (this.zoomedIn || winWidth <= 768) {
            return;
        }

        const img = this.img;
        img.setAttribute('data-style', img.getAttribute('style'));
        img.style.maxWidth = img.naturalWidth + 'px';
        img.style.maxHeight = img.naturalHeight + 'px';

        if (img.naturalWidth > winWidth) {
            let centerX = winWidth / 2 - img.naturalWidth / 2;
            this.setTranslate(this.img.parentNode, centerX, 0);
        }
        this.slide.classList.add('zoomed');
        this.zoomedIn = true;
    }
    zoomOut() {
        this.img.parentNode.setAttribute('style', '');
        this.img.setAttribute('style', this.img.getAttribute('data-style'));
        this.slide.classList.remove('zoomed');
        this.zoomedIn = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;

        if (this.onclose && typeof this.onclose == 'function') {
            this.onclose();
        }
    }
    dragStart(e) {
        e.preventDefault();
        if (!this.zoomedIn) {
            this.active = false;
            return;
        }
        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.img) {
            this.active = true;
            this.img.classList.add('dragging');
        }
    }
    dragEnd(e) {
        e.preventDefault();
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;

        setTimeout(() => {
            this.dragging = false;
            this.img.isDragging = false;
            this.img.classList.remove('dragging');
        }, 100);
    }
    drag(e) {
        if (this.active) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.img.isDragging = true;
            this.dragging = true;

            this.setTranslate(this.img, this.currentX, this.currentY);
        }
    }
    onMove(e) {
        if (!this.zoomedIn) {
            return;
        }
        let xOffset = e.clientX - this.img.naturalWidth / 2;
        let yOffset = e.clientY - this.img.naturalHeight / 2;

        this.setTranslate(this.img, xOffset, yOffset);
    }
    setTranslate(node, xPos, yPos) {
        node.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
    }
    widowWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
}

/**
 * DragSlides
 * Allow imaes to be dragged for prev and next
 * in desktops
 *
 * @param { object } config
 */

class DragSlides {
    constructor(config = {}) {
        let { dragEl, toleranceX = 40, toleranceY = 65, slide = null, instance = null } = config;

        this.el = dragEl;
        this.active = false;
        this.dragging = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;
        this.direction = null;
        this.lastDirection = null;
        this.toleranceX = toleranceX;
        this.toleranceY = toleranceY;
        this.toleranceReached = false;
        this.dragContainer = this.el;
        this.slide = slide;
        this.instance = instance;

        this.el.addEventListener('mousedown', (e) => this.dragStart(e), false);
        this.el.addEventListener('mouseup', (e) => this.dragEnd(e), false);
        this.el.addEventListener('mousemove', (e) => this.drag(e), false);
    }
    dragStart(e) {
        if (this.slide.classList.contains('zoomed')) {
            this.active = false;
            return;
        }

        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        let clicked = e.target.nodeName.toLowerCase();
        let exludeClicks = ['input', 'select', 'textarea', 'button', 'a'];
        if (
            e.target.classList.contains('nodrag') ||
            closest(e.target, '.nodrag') ||
            exludeClicks.indexOf(clicked) !== -1
        ) {
            this.active = false;
            return;
        }

        e.preventDefault();

        if (e.target === this.el || (clicked !== 'img' && closest(e.target, '.gslide-inline'))) {
            this.active = true;
            this.el.classList.add('dragging');
            this.dragContainer = closest(e.target, '.ginner-container');
        }
    }
    dragEnd(e) {
        e && e.preventDefault();
        this.initialX = 0;
        this.initialY = 0;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;
        this.active = false;

        if (this.doSlideChange) {
            this.instance.preventOutsideClick = true;
            this.doSlideChange == 'right' && this.instance.prevSlide();
            this.doSlideChange == 'left' && this.instance.nextSlide();
        }

        if (this.doSlideClose) {
            this.instance.close();
        }

        if (!this.toleranceReached) {
            this.setTranslate(this.dragContainer, 0, 0, true);
        }

        setTimeout(() => {
            this.instance.preventOutsideClick = false;
            this.toleranceReached = false;
            this.lastDirection = null;
            this.dragging = false;
            this.el.isDragging = false;
            this.el.classList.remove('dragging');
            this.slide.classList.remove('dragging-nav');
            this.dragContainer.style.transform = '';
            this.dragContainer.style.transition = '';
        }, 100);
    }
    drag(e) {
        if (this.active) {
            e.preventDefault();

            this.slide.classList.add('dragging-nav');

            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.el.isDragging = true;
            this.dragging = true;
            this.doSlideChange = false;
            this.doSlideClose = false;

            let currentXInt = Math.abs(this.currentX);
            let currentYInt = Math.abs(this.currentY);

            // Horizontal drag
            if (
                currentXInt > 0 &&
                currentXInt >= Math.abs(this.currentY) &&
                (!this.lastDirection || this.lastDirection == 'x')
            ) {
                this.yOffset = 0;
                this.lastDirection = 'x';
                this.setTranslate(this.dragContainer, this.currentX, 0);

                let doChange = this.shouldChange();
                if (!this.instance.settings.dragAutoSnap && doChange) {
                    this.doSlideChange = doChange;
                }

                if (this.instance.settings.dragAutoSnap && doChange) {
                    this.instance.preventOutsideClick = true;
                    this.toleranceReached = true;
                    this.active = false;
                    this.instance.preventOutsideClick = true;
                    this.dragEnd(null);
                    doChange == 'right' && this.instance.prevSlide();
                    doChange == 'left' && this.instance.nextSlide();
                    return;
                }
            }

            // Vertical drag
            if (
                this.toleranceY > 0 &&
                currentYInt > 0 &&
                currentYInt >= currentXInt &&
                (!this.lastDirection || this.lastDirection == 'y')
            ) {
                this.xOffset = 0;
                this.lastDirection = 'y';
                this.setTranslate(this.dragContainer, 0, this.currentY);

                let doClose = this.shouldClose();

                if (!this.instance.settings.dragAutoSnap && doClose) {
                    this.doSlideClose = true;
                }
                if (this.instance.settings.dragAutoSnap && doClose) {
                    this.instance.close();
                }
                return;
            }
        }
    }

    shouldChange() {
        let doChange = false;
        let currentXInt = Math.abs(this.currentX);

        if (currentXInt >= this.toleranceX) {
            let dragDir = this.currentX > 0 ? 'right' : 'left';

            if (
                (dragDir == 'left' && this.slide !== this.slide.parentNode.lastChild) ||
                (dragDir == 'right' && this.slide !== this.slide.parentNode.firstChild)
            ) {
                doChange = dragDir;
            }
        }
        return doChange;
    }

    shouldClose() {
        let doClose = false;
        let currentYInt = Math.abs(this.currentY);

        if (currentYInt >= this.toleranceY) {
            doClose = true;
        }
        return doClose;
    }

    setTranslate(node, xPos, yPos, animated = false) {
        if (animated) {
            node.style.transition = 'all .2s ease';
        } else {
            node.style.transition = '';
        }
        node.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
}

/**
 * Set slide inline content
 * we'll extend this to make http
 * requests using the fetch api
 * but for now we keep it simple
 *
 * @param {node} slide
 * @param {object} data
 * @param {int} index
 * @param {function} callback
 */

function slideImage(slide, data, index, callback) {
    const slideMedia = slide.querySelector('.gslide-media');

    let img = new Image();
    let titleID = 'gSlideTitle_' + index;
    let textID = 'gSlideDesc_' + index;

    // prettier-ignore
    img.addEventListener('load', () => {
        if (isFunction$2(callback)) {
            callback();
        }
    }, false);

    img.src = data.href;
    img.alt = ''; // https://davidwalsh.name/accessibility-tip-empty-alt-attributes

    if (data.title !== '') {
        img.setAttribute('aria-labelledby', titleID);
    }
    if (data.description !== '') {
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute#Example_2_A_Close_Button
        img.setAttribute('aria-describedby', textID);
    }

    if (data.hasOwnProperty('_hasCustomWidth') && data._hasCustomWidth) {
        img.style.width = data.width;
    }
    if (data.hasOwnProperty('_hasCustomHeight') && data._hasCustomHeight) {
        img.style.height = data.height;
    }

    slideMedia.insertBefore(img, slideMedia.firstChild);
    return;
}

/**
 * Set slide video
 *
 * @param {node} slide
 * @param {object} data
 * @param {int} index
 * @param {function} callback
 */

function slideVideo(slide, data, index, callback) {
    const slideContainer = slide.querySelector('.ginner-container');
    const videoID = 'gvideo' + index;
    const slideMedia = slide.querySelector('.gslide-media');
    const videoPlayers = this.getAllPlayers();

    addClass(slideContainer, 'gvideo-container');

    slideMedia.insertBefore(createHTML('<div class="gvideo-wrapper"></div>'), slideMedia.firstChild);

    const videoWrapper = slide.querySelector('.gvideo-wrapper');

    injectAssets(this.settings.plyr.css, 'Plyr');

    let url = data.href;
    location.protocol.replace(':', '');
    let videoSource = '';
    let embedID = '';
    let customPlaceholder = false;
    slideMedia.style.maxWidth = data.width;

    injectAssets(this.settings.plyr.js, 'Plyr', () => {
        // Set vimeo videos
        if (url.match(/vimeo\.com\/([0-9]*)/)) {
            const vimeoID = /vimeo.*\/(\d+)/i.exec(url);
            videoSource = 'vimeo';
            embedID = vimeoID[1];
        }

        // Set youtube videos
        if (url.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || url.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
            const youtubeID = getYoutubeID(url);
            videoSource = 'youtube';
            embedID = youtubeID;
        }

        // Set local videos
        if (url.match(/\.(mp4|ogg|webm|mov)$/) !== null) {
            videoSource = 'local';
            let html = '<video id="' + videoID + '" ';
            html += `style="background:#000; max-width: ${data.width};" `;
            html += 'preload="metadata" ';
            html += 'x-webkit-airplay="allow" ';
            html += 'webkit-playsinline="" ';
            html += 'controls ';
            html += 'class="gvideo-local">';

            let format = url.toLowerCase().split('.').pop();
            let sources = { mp4: '', ogg: '', webm: '' };
            format = format == 'mov' ? 'mp4' : format;
            sources[format] = url;

            for (let key in sources) {
                if (sources.hasOwnProperty(key)) {
                    let videoFile = sources[key];
                    if (data.hasOwnProperty(key)) {
                        videoFile = data[key];
                    }
                    if (videoFile !== '') {
                        html += `<source src="${videoFile}" type="video/${key}">`;
                    }
                }
            }
            html += '</video>';
            customPlaceholder = createHTML(html);
        }

        // prettier-ignore
        const placeholder = customPlaceholder ? customPlaceholder : createHTML(`<div id="${videoID}" data-plyr-provider="${videoSource}" data-plyr-embed-id="${embedID}"></div>`);

        addClass(videoWrapper, `${videoSource}-video gvideo`);
        videoWrapper.appendChild(placeholder);
        videoWrapper.setAttribute('data-id', videoID);
        videoWrapper.setAttribute('data-index', index);

        const playerConfig = has(this.settings.plyr, 'config') ? this.settings.plyr.config : {};
        const player = new Plyr('#' + videoID, playerConfig);

        player.on('ready', (event) => {
            const instance = event.detail.plyr;
            videoPlayers[videoID] = instance;
            if (isFunction$2(callback)) {
                callback();
            }
        });
        waitUntil(
            () => {
                return slide.querySelector('iframe') && slide.querySelector('iframe').dataset.ready == 'true';
            },
            () => {
                this.resize(slide);
            }
        );
        player.on('enterfullscreen', handleMediaFullScreen);
        player.on('exitfullscreen', handleMediaFullScreen);
    });
}

/**
 * Get youtube ID
 *
 * @param {string} url
 * @returns {string} video id
 */
function getYoutubeID(url) {
    let videoID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        videoID = url[2].split(/[^0-9a-z_\-]/i);
        videoID = videoID[0];
    } else {
        videoID = url;
    }
    return videoID;
}

/**
 * Handle fullscreen
 *
 * @param {object} event
 */
function handleMediaFullScreen(event) {
    const media = closest(event.target, '.gslide-media');

    if (event.type == 'enterfullscreen') {
        addClass(media, 'fullscreen');
    }
    if (event.type == 'exitfullscreen') {
        removeClass(media, 'fullscreen');
    }
}

/**
 * Set slide inline content
 * we'll extend this to make http
 * requests using the fetch api
 * but for now we keep it simple
 *
 * @param {node} slide
 * @param {object} data
 * @param {int} index
 * @param {function} callback
 */

function slideInline(slide, data, index, callback) {
    const slideMedia = slide.querySelector('.gslide-media');
    const hash = has(data, 'href') && data.href ? data.href.split('#').pop().trim() : false;
    const content = has(data, 'content') && data.content ? data.content : false;
    let innerContent;

    if (content) {
        if (isString(content)) {
            innerContent = createHTML(`<div class="ginlined-content">${content}</div>`);
        }
        if (isNode(content)) {
            if (content.style.display == 'none') {
                content.style.display = 'block';
            }

            const container = document.createElement('div');
            container.className = 'ginlined-content';
            container.appendChild(content);
            innerContent = container;
        }
    }

    if (hash) {
        let div = document.getElementById(hash);
        if (!div) {
            return false;
        }
        const cloned = div.cloneNode(true);

        cloned.style.height = data.height;
        cloned.style.maxWidth = data.width;
        addClass(cloned, 'ginlined-content');
        innerContent = cloned;
    }

    if (!innerContent) {
        console.error('Unable to append inline slide content', data);
        return false;
    }

    slideMedia.style.height = data.height;
    slideMedia.style.width = data.width;
    slideMedia.appendChild(innerContent);

    this.events['inlineclose' + hash] = addEvent('click', {
        onElement: slideMedia.querySelectorAll('.gtrigger-close'),
        withCallback: (e) => {
            e.preventDefault();
            this.close();
        }
    });

    if (isFunction$2(callback)) {
        callback();
    }
    return;
}

/**
 * Set slide iframe content
 *
 * @param {node} slide
 * @param {object} data
 * @param {int} index
 * @param {function} callback
 */

function slideIframe(slide, data, index, callback) {
    const slideMedia = slide.querySelector('.gslide-media');
    const iframe = createIframe({
        url: data.href,
        callback: callback
    });

    slideMedia.parentNode.style.maxWidth = data.width;
    slideMedia.parentNode.style.height = data.height;
    slideMedia.appendChild(iframe);

    return;
}

class SlideConfigParser {
    constructor(slideParamas = {}) {
        this.defaults = {
            href: '',
            title: '',
            type: '',
            description: '',
            descPosition: 'bottom',
            effect: '',
            width: '',
            height: '',
            content: false,
            zoomable: true,
            draggable: true
        };

        if (isObject$2(slideParamas)) {
            this.defaults = extend(this.defaults, slideParamas);
        }
    }

    /**
     * Get source type
     * gte the source type of a url
     *
     * @param {string} url
     */
    sourceType(url) {
        let origin = url;
        url = url.toLowerCase();

        if (url.match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/) !== null) {
            return 'image';
        }
        if (url.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || url.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
            return 'video';
        }
        if (url.match(/vimeo\.com\/([0-9]*)/)) {
            return 'video';
        }
        if (url.match(/\.(mp4|ogg|webm|mov)$/) !== null) {
            return 'video';
        }
        if (url.match(/\.(mp3|wav|wma|aac|ogg)$/) !== null) {
            return 'audio';
        }

        // Check if inline content
        if (url.indexOf('#') > -1) {
            let hash = origin.split('#').pop();
            if (hash.trim() !== '') {
                return 'inline';
            }
        }
        // Ajax
        if (url.indexOf('goajax=true') > -1) {
            return 'ajax';
        }

        return 'external';
    }

    parseConfig(element, settings) {
        let data = extend({ descPosition: settings.descPosition }, this.defaults);

        if (isObject$2(element) && !isNode(element)) {
            if (!has(element, 'type')) {
                if (has(element, 'content') && element.content) {
                    element.type = 'inline';
                } else if (has(element, 'href')) {
                    element.type = this.sourceType(element.href);
                }
            }
            let objectData = extend(data, element);
            this.setSize(objectData, settings);

            return objectData;
        }

        let url = '';
        let config = element.getAttribute('data-glightbox');
        let nodeType = element.nodeName.toLowerCase();
        if (nodeType === 'a') {
            url = element.href;
        }
        if (nodeType === 'img') {
            url = element.src;
        }

        data.href = url;

        each(data, (val, key) => {
            if (has(settings, key) && key !== 'width') {
                data[key] = settings[key];
            }
            const nodeData = element.dataset[key];
            if (!isNil(nodeData)) {
                data[key] = this.sanitizeValue(nodeData);
            }
        });

        if (data.content) {
            data.type = 'inline';
        }

        if (!data.type && url) {
            data.type = this.sourceType(url);
        }

        if (!isNil(config)) {
            let cleanKeys = [];
            each(data, (v, k) => {
                cleanKeys.push(';\\s?' + k);
            });
            cleanKeys = cleanKeys.join('\\s?:|');
            if (config.trim() !== '') {
                each(data, (val, key) => {
                    const str = config;
                    const match = 's?' + key + 's?:s?(.*?)(' + cleanKeys + 's?:|$)';
                    const regex = new RegExp(match);
                    const matches = str.match(regex);

                    if (matches && matches.length && matches[1]) {
                        const value = matches[1].trim().replace(/;\s*$/, '');
                        data[key] = this.sanitizeValue(value);
                    }
                });
            }
        } else {
            if (!data.title && nodeType == 'a') {
                let title = element.title;
                if (!isNil(title) && title !== '') {
                    data.title = title;
                }
            }
            if (!data.title && nodeType == 'img') {
                let alt = element.alt;
                if (!isNil(alt) && alt !== '') {
                    data.title = alt;
                }
            }
        }

        // Try to get the description from a referenced element
        if (data.description && data.description.substring(0, 1) === '.') {
            let description;

            try {
                description = document.querySelector(data.description).innerHTML;
            } catch (error) {
                if (!(error instanceof DOMException)) {
                    throw error;
                }
            }

            if (description) {
                data.description = description;
            }
        }

        // Try to get the description from a .glightbox-desc element
        if (!data.description) {
            let nodeDesc = element.querySelector('.glightbox-desc');
            if (nodeDesc) {
                data.description = nodeDesc.innerHTML;
            }
        }

        this.setSize(data, settings, element);
        this.slideConfig = data;

        return data;
    }

    /**
     * Set slide data size
     * set the correct size dependin
     * on the slide type
     *
     * @param { object } data
     * @param { object } settings
     * @return { object }
     */
    setSize(data, settings, element = null) {
        const defaultWith = data.type == 'video' ? this.checkSize(settings.videosWidth) : this.checkSize(settings.width);
        const defaultHeight = this.checkSize(settings.height);

        data.width = has(data, 'width') && data.width !== '' ? this.checkSize(data.width) : defaultWith;
        data.height = has(data, 'height') && data.height !== '' ? this.checkSize(data.height) : defaultHeight;

        if (element && data.type == 'image') {
            data._hasCustomWidth = element.dataset.width ? true : false;
            data._hasCustomHeight = element.dataset.height ? true : false;
        }

        return data;
    }

    /**
     * [checkSize size
     * check if the passed size has a correct unit
     *
     * @param {string} size
     * @return {string}
     */
    checkSize(size) {
        return isNumber(size) ? `${size}px` : size;
    }

    /**
     * Sanitize data attributes value
     *
     * @param string val
     * @return mixed
     */
    sanitizeValue(val) {
        if (val !== 'true' && val !== 'false') {
            return val;
        }
        return val === 'true';
    }
}

/**
 * Slide
 * class to hablde slide creation
 * and config parser
 */

class Slide {
    constructor(el, instance, index) {
        this.element = el;
        this.instance = instance;
        this.index = index;
    }

    /**
     * Set slide content
     *
     * @param {node} slide
     * @param {object} data
     * @param {function} callback
     */
    setContent(slide = null, callback = false) {
        if (hasClass(slide, 'loaded')) {
            return false;
        }

        const settings = this.instance.settings;
        const slideConfig = this.slideConfig;
        const isMobileDevice = isMobile$1();

        if (isFunction$2(settings.beforeSlideLoad)) {
            settings.beforeSlideLoad({
                index: this.index,
                slide: slide,
                player: false
            });
        }

        let type = slideConfig.type;
        let position = slideConfig.descPosition;
        let slideMedia = slide.querySelector('.gslide-media');
        let slideTitle = slide.querySelector('.gslide-title');
        let slideText = slide.querySelector('.gslide-desc');
        let slideDesc = slide.querySelector('.gdesc-inner');
        let finalCallback = callback;

        // used for image accessiblity
        let titleID = 'gSlideTitle_' + this.index;
        let textID = 'gSlideDesc_' + this.index;

        if (isFunction$2(settings.afterSlideLoad)) {
            finalCallback = () => {
                if (isFunction$2(callback)) {
                    callback();
                }
                settings.afterSlideLoad({
                    index: this.index,
                    slide: slide,
                    player: this.instance.getSlidePlayerInstance(this.index)
                });
            };
        }

        if (slideConfig.title == '' && slideConfig.description == '') {
            if (slideDesc) {
                slideDesc.parentNode.parentNode.removeChild(slideDesc.parentNode);
            }
        } else {
            if (slideTitle && slideConfig.title !== '') {
                slideTitle.id = titleID;
                slideTitle.innerHTML = slideConfig.title;
            } else {
                slideTitle.parentNode.removeChild(slideTitle);
            }
            if (slideText && slideConfig.description !== '') {
                slideText.id = textID;
                if (isMobileDevice && settings.moreLength > 0) {
                    slideConfig.smallDescription = this.slideShortDesc(slideConfig.description, settings.moreLength, settings.moreText);
                    slideText.innerHTML = slideConfig.smallDescription;
                    this.descriptionEvents(slideText, slideConfig);
                } else {
                    slideText.innerHTML = slideConfig.description;
                }
            } else {
                slideText.parentNode.removeChild(slideText);
            }
            addClass(slideMedia.parentNode, `desc-${position}`);
            addClass(slideDesc.parentNode, `description-${position}`);
        }

        addClass(slideMedia, `gslide-${type}`);
        addClass(slide, 'loaded');

        if (type === 'video') {
            slideVideo.apply(this.instance, [slide, slideConfig, this.index, finalCallback]);
            return;
        }

        if (type === 'external') {
            slideIframe.apply(this, [slide, slideConfig, this.index, finalCallback]);
            return;
        }

        if (type === 'inline') {
            slideInline.apply(this.instance, [slide, slideConfig, this.index, finalCallback]);
            if (settings.draggable) {
                new DragSlides({
                    dragEl: slide.querySelector('.gslide-inline'),
                    toleranceX: settings.dragToleranceX,
                    toleranceY: settings.dragToleranceY,
                    slide: slide,
                    instance: this.instance
                });
            }
            return;
        }

        if (type === 'image') {
            slideImage(slide, slideConfig, this.index, () => {
                const img = slide.querySelector('img');

                if (settings.draggable) {
                    new DragSlides({
                        dragEl: img,
                        toleranceX: settings.dragToleranceX,
                        toleranceY: settings.dragToleranceY,
                        slide: slide,
                        instance: this.instance
                    });
                }
                if (slideConfig.zoomable && img.naturalWidth > img.offsetWidth) {
                    addClass(img, 'zoomable');
                    new ZoomImages(img, slide, () => {
                        this.instance.resize();
                    });
                }

                if (isFunction$2(finalCallback)) {
                    finalCallback();
                }
            });
            return;
        }

        if (isFunction$2(finalCallback)) {
            finalCallback();
        }
    }

    slideShortDesc(string, n = 50, wordBoundary = false) {
        let div = document.createElement('div');
        div.innerHTML = string;
        let cleanedString = div.innerText;

        let useWordBoundary = wordBoundary;
        string = cleanedString.trim();
        if (string.length <= n) {
            return string;
        }
        let subString = string.substr(0, n - 1);
        if (!useWordBoundary) {
            return subString;
        }

        div = null;
        return subString + '... <a href="#" class="desc-more">' + wordBoundary + '</a>';
    }

    descriptionEvents(desc, data) {
        let moreLink = desc.querySelector('.desc-more');
        if (!moreLink) {
            return false;
        }

        addEvent('click', {
            onElement: moreLink,
            withCallback: (event, target) => {
                event.preventDefault();
                const body = document.body;

                let desc = closest(target, '.gslide-desc');
                if (!desc) {
                    return false;
                }

                desc.innerHTML = data.description;
                addClass(body, 'gdesc-open');

                let shortEvent = addEvent('click', {
                    onElement: [body, closest(desc, '.gslide-description')],
                    withCallback: (event, target) => {
                        if (event.target.nodeName.toLowerCase() !== 'a') {
                            removeClass(body, 'gdesc-open');
                            addClass(body, 'gdesc-closed');
                            desc.innerHTML = data.smallDescription;
                            this.descriptionEvents(desc, data);

                            setTimeout(() => {
                                removeClass(body, 'gdesc-closed');
                            }, 400);
                            shortEvent.destroy();
                        }
                    }
                });
            }
        });
    }

    /**
     * Create Slide Node
     *
     * @return { node }
     */
    create() {
        return createHTML(this.instance.settings.slideHTML);
    }

    /**
     * Get slide config
     * returns each individual slide config
     * it uses SlideConfigParser
     * each slide can overwrite a global setting
     * read more in the SlideConfigParser class
     *
     * @return { object }
     */
    getConfig() {
        const parser = new SlideConfigParser(this.instance.settings.slideExtraAttributes);
        this.slideConfig = parser.parseConfig(this.element, this.instance.settings);

        return this.slideConfig;
    }
}

/**
 * GLightbox
 * Awesome pure javascript lightbox
 * made by https://www.biati.digital
 * Github: https://github.com/biati-digital/glightbox
 */

const version = '3.0.9';
const isMobile = isMobile$1();
const isTouch = isTouch$1();
const html = document.getElementsByTagName('html')[0];

const defaults = {
    selector: '.glightbox',
    elements: null,
    skin: 'clean',
    theme: 'clean',
    closeButton: true,
    startAt: null,
    autoplayVideos: true,
    autofocusVideos: true,
    descPosition: 'bottom',
    width: '900px',
    height: '506px',
    videosWidth: '960px',
    beforeSlideChange: null,
    afterSlideChange: null,
    beforeSlideLoad: null,
    afterSlideLoad: null,
    slideInserted: null,
    slideRemoved: null,
    slideExtraAttributes: null,
    onOpen: null,
    onClose: null,
    loop: false,
    zoomable: true,
    draggable: true,
    dragAutoSnap: false,
    dragToleranceX: 40,
    dragToleranceY: 65,
    preload: true,
    oneSlidePerOpen: false,
    touchNavigation: true,
    touchFollowAxis: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
    plugins: false,
    plyr: {
        css: 'https://cdn.plyr.io/3.6.8/plyr.css',
        js: 'https://cdn.plyr.io/3.6.8/plyr.js',
        config: {
            ratio: '16:9', // or '4:3'
            fullscreen: { enabled: true, iosNative: true },
            youtube: {
                noCookie: true,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3 // eslint-disable-line camelcase
            },
            vimeo: {
                byline: false,
                portrait: false,
                title: false,
                transparent: false
            }
        }
    },
    openEffect: 'zoom', // fade, zoom, none
    closeEffect: 'zoom', // fade, zoom, none
    slideEffect: 'slide', // fade, slide, zoom, none
    moreText: 'See more',
    moreLength: 60,
    cssEfects: {
        fade: { in: 'fadeIn', out: 'fadeOut' },
        zoom: { in: 'zoomIn', out: 'zoomOut' },
        slide: { in: 'slideInRight', out: 'slideOutLeft' },
        slideBack: { in: 'slideInLeft', out: 'slideOutRight' },
        none: { in: 'none', out: 'none' }
    },
    svg: {
        close: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
        next: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
        prev: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
    }
};

// You can pass your own slide structure
// just make sure that add the same classes so they are populated
// title class = gslide-title
// desc class = gslide-desc
// prev arrow class = gnext
// next arrow id = gprev
// close id = gclose
defaults.slideHTML = `<div class="gslide">
    <div class="gslide-inner-content">
        <div class="ginner-container">
            <div class="gslide-media">
            </div>
            <div class="gslide-description">
                <div class="gdesc-inner">
                    <h4 class="gslide-title"></h4>
                    <div class="gslide-desc"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;

defaults.lightboxHTML = `<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="gloader visible"></div>
    <div class="goverlay"></div>
    <div class="gcontainer">
    <div id="glightbox-slider" class="gslider"></div>
    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>
    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>
    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>
</div>
</div>`;

/**
 * GLightbox Class
 * Class and public methods
 */
class GlightboxInit {
    constructor(options = {}) {
        this.customOptions = options;
        this.settings = extend(defaults, options);
        this.effectsClasses = this.getAnimationClasses();
        this.videoPlayers = {};
        this.apiEvents = [];
        this.fullElementsList = false;
    }

    init() {
        const selector = this.getSelector();

        if (selector) {
            this.baseEvents = addEvent('click', {
                onElement: selector,
                withCallback: (e, target) => {
                    e.preventDefault();
                    this.open(target);
                }
            });
        }

        this.elements = this.getElements();
    }

    open(element = null, startAt = null) {
        if (this.elements.length == 0) {
            return false;
        }

        this.activeSlide = null;
        this.prevActiveSlideIndex = null;
        this.prevActiveSlide = null;
        let index = isNumber(startAt) ? startAt : this.settings.startAt;

        if (isNode(element)) {
            const gallery = element.getAttribute('data-gallery');
            if (gallery) {
                this.fullElementsList = this.elements;
                this.elements = this.getGalleryElements(this.elements, gallery);
            }
            if (isNil(index)) {
                // get the index of the element
                index = this.getElementIndex(element);
                if (index < 0) {
                    index = 0;
                }
            }
        }

        if (!isNumber(index)) {
            index = 0;
        }

        this.build();

        animateElement(this.overlay, this.settings.openEffect == 'none' ? 'none' : this.settings.cssEfects.fade.in);

        const body = document.body;

        const scrollBar = window.innerWidth - document.documentElement.clientWidth;
        if (scrollBar > 0) {
            var styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.className = 'gcss-styles';
            styleSheet.innerText = `.gscrollbar-fixer {margin-right: ${scrollBar}px}`;
            document.head.appendChild(styleSheet);
            addClass(body, 'gscrollbar-fixer');
        }

        addClass(body, 'glightbox-open');
        addClass(html, 'glightbox-open');
        if (isMobile) {
            addClass(document.body, 'glightbox-mobile');
            this.settings.slideEffect = 'slide';
        }

        this.showSlide(index, true);

        if (this.elements.length == 1) {
            addClass(this.prevButton, 'glightbox-button-hidden');
            addClass(this.nextButton, 'glightbox-button-hidden');
        } else {
            removeClass(this.prevButton, 'glightbox-button-hidden');
            removeClass(this.nextButton, 'glightbox-button-hidden');
        }
        this.lightboxOpen = true;

        this.trigger('open');

        // settings.onOpen is deprecated and will be removed in a future update
        if (isFunction$2(this.settings.onOpen)) {
            this.settings.onOpen();
        }
        if (isTouch && this.settings.touchNavigation) {
            touchNavigation(this);
        }
        if (this.settings.keyboardNavigation) {
            keyboardNavigation(this);
        }
    }

    /**
     * Open at specific index
     * @param {int} index
     */
    openAt(index = 0) {
        this.open(null, index);
    }

    /**
     * Set Slide
     */
    showSlide(index = 0, first = false) {
        show(this.loader);
        this.index = parseInt(index);

        let current = this.slidesContainer.querySelector('.current');
        if (current) {
            removeClass(current, 'current');
        }

        // hide prev slide
        this.slideAnimateOut();

        let slideNode = this.slidesContainer.querySelectorAll('.gslide')[index];

        // Check if slide's content is alreay loaded
        if (hasClass(slideNode, 'loaded')) {
            this.slideAnimateIn(slideNode, first);
            hide(this.loader);
        } else {
            // If not loaded add the slide content
            show(this.loader);

            const slide = this.elements[index];
            const slideData = {
                index: this.index,
                slide: slideNode, //this will be removed in the future
                slideNode: slideNode,
                slideConfig: slide.slideConfig,
                slideIndex: this.index,
                trigger: slide.node,
                player: null
            };

            this.trigger('slide_before_load', slideData);

            slide.instance.setContent(slideNode, () => {
                hide(this.loader);
                this.resize();
                this.slideAnimateIn(slideNode, first);
                this.trigger('slide_after_load', slideData);
            });
        }

        this.slideDescription = slideNode.querySelector('.gslide-description');
        this.slideDescriptionContained = this.slideDescription && hasClass(this.slideDescription.parentNode, 'gslide-media');

        // Preload subsequent slides
        if (this.settings.preload) {
            this.preloadSlide(index + 1);
            this.preloadSlide(index - 1);
        }

        // Handle navigation arrows
        this.updateNavigationClasses();

        this.activeSlide = slideNode;
    }

    /**
     * Preload slides
     * @param  {Int}  index slide index
     * @return {null}
     */
    preloadSlide(index) {
        // Verify slide index, it can not be lower than 0
        // and it can not be greater than the total elements
        if (index < 0 || index > this.elements.length - 1) {
            return false;
        }

        if (isNil(this.elements[index])) {
            return false;
        }

        let slideNode = this.slidesContainer.querySelectorAll('.gslide')[index];
        if (hasClass(slideNode, 'loaded')) {
            return false;
        }

        const slide = this.elements[index];
        const type = slide.type;
        const slideData = {
            index: index,
            slide: slideNode, //this will be removed in the future
            slideNode: slideNode,
            slideConfig: slide.slideConfig,
            slideIndex: index,
            trigger: slide.node,
            player: null
        };

        this.trigger('slide_before_load', slideData);

        if (type == 'video' || type == 'external') {
            setTimeout(() => {
                slide.instance.setContent(slideNode, () => {
                    this.trigger('slide_after_load', slideData);
                });
            }, 200);
        } else {
            slide.instance.setContent(slideNode, () => {
                this.trigger('slide_after_load', slideData);
            });
        }
    }

    /**
     * Load previous slide
     * calls goToslide
     */
    prevSlide() {
        this.goToSlide(this.index - 1);
    }

    /**
     * Load next slide
     * calls goToslide
     */
    nextSlide() {
        this.goToSlide(this.index + 1);
    }

    /**
     * Go to sldei
     * calls set slide
     * @param {Int} - index
     */
    goToSlide(index = false) {
        this.prevActiveSlide = this.activeSlide;
        this.prevActiveSlideIndex = this.index;

        if (!this.loop() && (index < 0 || index > this.elements.length - 1)) {
            return false;
        }
        if (index < 0) {
            index = this.elements.length - 1;
        } else if (index >= this.elements.length) {
            index = 0;
        }
        this.showSlide(index);
    }

    /**
     * Insert slide
     *
     * @param { object } data
     * @param { numeric } position
     */
    insertSlide(config = {}, index = -1) {
        // Append at the end
        if (index < 0) {
            index = this.elements.length;
        }

        const slide = new Slide(config, this, index);
        const data = slide.getConfig();
        const slideInfo = extend({}, data);
        const newSlide = slide.create();
        const totalSlides = this.elements.length - 1;

        slideInfo.index = index;
        slideInfo.node = false;
        slideInfo.instance = slide;
        slideInfo.slideConfig = data;
        this.elements.splice(index, 0, slideInfo);

        let addedSlideNode = null;
        let addedSlidePlayer = null;

        if (this.slidesContainer) {
            // Append at the end
            if (index > totalSlides) {
                this.slidesContainer.appendChild(newSlide);
            } else {
                // A current slide must exist in the position specified
                // we need tp get that slide and insder the new slide before
                let existingSlide = this.slidesContainer.querySelectorAll('.gslide')[index];
                this.slidesContainer.insertBefore(newSlide, existingSlide);
            }

            if ((this.settings.preload && this.index == 0 && index == 0) || this.index - 1 == index || this.index + 1 == index) {
                this.preloadSlide(index);
            }

            if (this.index == 0 && index == 0) {
                this.index = 1;
            }

            this.updateNavigationClasses();

            addedSlideNode = this.slidesContainer.querySelectorAll('.gslide')[index];
            addedSlidePlayer = this.getSlidePlayerInstance(index);
            slideInfo.slideNode = addedSlideNode;
        }

        this.trigger('slide_inserted', {
            index: index,
            slide: addedSlideNode,
            slideNode: addedSlideNode,
            slideConfig: data,
            slideIndex: index,
            trigger: null,
            player: addedSlidePlayer
        });

        // Deprecated and will be removed in a future update
        if (isFunction$2(this.settings.slideInserted)) {
            this.settings.slideInserted({
                index: index,
                slide: addedSlideNode,
                player: addedSlidePlayer
            });
        }
    }

    /**
     * Remove slide
     *
     * @param { numeric } position
     */
    removeSlide(index = -1) {
        if (index < 0 || index > this.elements.length - 1) {
            return false;
        }

        const slide = this.slidesContainer && this.slidesContainer.querySelectorAll('.gslide')[index];

        if (slide) {
            if (this.getActiveSlideIndex() == index) {
                if (index == this.elements.length - 1) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
            slide.parentNode.removeChild(slide);
        }
        this.elements.splice(index, 1);

        this.trigger('slide_removed', index);

        // Deprecated and will be removed in a future update
        if (isFunction$2(this.settings.slideRemoved)) {
            this.settings.slideRemoved(index);
        }
    }

    /**
     * Slide In
     * @return {null}
     */
    slideAnimateIn(slide, first) {
        let slideMedia = slide.querySelector('.gslide-media');
        let slideDesc = slide.querySelector('.gslide-description');
        let prevData = {
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide, //this will be removed in the future
            slideNode: this.prevActiveSlide,
            slideIndex: this.prevActiveSlide,
            slideConfig: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
            trigger: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
        };

        let nextData = {
            index: this.index,
            slide: this.activeSlide, //this will be removed in the future
            slideNode: this.activeSlide,
            slideConfig: this.elements[this.index].slideConfig,
            slideIndex: this.index,
            trigger: this.elements[this.index].node,
            player: this.getSlidePlayerInstance(this.index)
        };
        if (slideMedia.offsetWidth > 0 && slideDesc) {
            hide(slideDesc);
            slideDesc.style.display = '';
        }

        removeClass(slide, this.effectsClasses);

        if (first) {
            animateElement(slide, this.settings.cssEfects[this.settings.openEffect].in, () => {
                if (this.settings.autoplayVideos) {
                    this.slidePlayerPlay(slide);
                }

                this.trigger('slide_changed', {
                    prev: prevData,
                    current: nextData
                });

                // settings.afterSlideChange is deprecated and will be removed in a future update
                if (isFunction$2(this.settings.afterSlideChange)) {
                    this.settings.afterSlideChange.apply(this, [prevData, nextData]);
                }
            });
        } else {
            let effectName = this.settings.slideEffect;
            let animIn = effectName !== 'none' ? this.settings.cssEfects[effectName].in : effectName;
            if (this.prevActiveSlideIndex > this.index) {
                if (this.settings.slideEffect == 'slide') {
                    animIn = this.settings.cssEfects.slideBack.in;
                }
            }
            animateElement(slide, animIn, () => {
                if (this.settings.autoplayVideos) {
                    this.slidePlayerPlay(slide);
                }

                this.trigger('slide_changed', {
                    prev: prevData,
                    current: nextData
                });

                // settings.afterSlideChange is deprecated and will be removed in a future update
                if (isFunction$2(this.settings.afterSlideChange)) {
                    this.settings.afterSlideChange.apply(this, [prevData, nextData]);
                }
            });
        }

        setTimeout(() => {
            this.resize(slide);
        }, 100);
        addClass(slide, 'current');
    }

    /**
     * Slide out
     */
    slideAnimateOut() {
        if (!this.prevActiveSlide) {
            return false;
        }

        let prevSlide = this.prevActiveSlide;
        removeClass(prevSlide, this.effectsClasses);
        addClass(prevSlide, 'prev');

        let animation = this.settings.slideEffect;
        let animOut = animation !== 'none' ? this.settings.cssEfects[animation].out : animation;

        this.slidePlayerPause(prevSlide);

        this.trigger('slide_before_change', {
            prev: {
                index: this.prevActiveSlideIndex, //this will be removed in the future
                slide: this.prevActiveSlide, //this will be removed in the future
                slideNode: this.prevActiveSlide,
                slideIndex: this.prevActiveSlideIndex,
                slideConfig: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
                trigger: isNil(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
            },
            current: {
                index: this.index, //this will be removed in the future
                slide: this.activeSlide, //this will be removed in the future
                slideNode: this.activeSlide,
                slideIndex: this.index,
                slideConfig: this.elements[this.index].slideConfig,
                trigger: this.elements[this.index].node,
                player: this.getSlidePlayerInstance(this.index)
            }
        });

        // settings.beforeSlideChange is deprecated and will be removed in a future update
        if (isFunction$2(this.settings.beforeSlideChange)) {
            this.settings.beforeSlideChange.apply(this, [
                {
                    index: this.prevActiveSlideIndex,
                    slide: this.prevActiveSlide,
                    player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
                },
                {
                    index: this.index,
                    slide: this.activeSlide,
                    player: this.getSlidePlayerInstance(this.index)
                }
            ]);
        }
        if (this.prevActiveSlideIndex > this.index && this.settings.slideEffect == 'slide') {
            // going back
            animOut = this.settings.cssEfects.slideBack.out;
        }
        animateElement(prevSlide, animOut, () => {
            let container = prevSlide.querySelector('.ginner-container');
            let media = prevSlide.querySelector('.gslide-media');
            let desc = prevSlide.querySelector('.gslide-description');

            container.style.transform = '';
            media.style.transform = '';
            removeClass(media, 'greset');
            media.style.opacity = '';
            if (desc) {
                desc.style.opacity = '';
            }
            removeClass(prevSlide, 'prev');
        });
    }

    /**
     * Get all defined players
     */
    getAllPlayers() {
        return this.videoPlayers;
    }

    /**
     * Get player at index
     *
     * @param index
     * @return bool|object
     */
    getSlidePlayerInstance(index) {
        const id = 'gvideo' + index;
        const videoPlayers = this.getAllPlayers();

        if (has(videoPlayers, id) && videoPlayers[id]) {
            return videoPlayers[id];
        }

        return false;
    }

    /**
     * Stop video at specified
     * node or index
     *
     * @param slide node or index
     * @return void
     */
    stopSlideVideo(slide) {
        if (isNode(slide)) {
            let node = slide.querySelector('.gvideo-wrapper');
            if (node) {
                slide = node.getAttribute('data-index');
            }
        }
        console.log('stopSlideVideo is deprecated, use slidePlayerPause');
        const player = this.getSlidePlayerInstance(slide);
        if (player && player.playing) {
            player.pause();
        }
    }

    /**
     * Stop player at specified index
     *
     * @param slide node or index
     * @return void
     */
    slidePlayerPause(slide) {
        if (isNode(slide)) {
            let node = slide.querySelector('.gvideo-wrapper');
            if (node) {
                slide = node.getAttribute('data-index');
            }
        }
        const player = this.getSlidePlayerInstance(slide);
        if (player && player.playing) {
            player.pause();
        }
    }

    /**
     * Play video at specified
     * node or index
     *
     * @param slide node or index
     * @return void
     */
    playSlideVideo(slide) {
        if (isNode(slide)) {
            let node = slide.querySelector('.gvideo-wrapper');
            if (node) {
                slide = node.getAttribute('data-index');
            }
        }
        console.log('playSlideVideo is deprecated, use slidePlayerPlay');
        const player = this.getSlidePlayerInstance(slide);
        if (player && !player.playing) {
            player.play();
        }
    }

    /**
     * Play media player at specified
     * node or index
     *
     * @param slide node or index
     * @return void
     */
    slidePlayerPlay(slide) {
        if (isNode(slide)) {
            let node = slide.querySelector('.gvideo-wrapper');
            if (node) {
                slide = node.getAttribute('data-index');
            }
        }

        const player = this.getSlidePlayerInstance(slide);

        if (player && !player.playing) {
            player.play();
            if (this.settings.autofocusVideos) {
                player.elements.container.focus();
            }
        }
    }

    /**
     * Set the entire elements
     * in the gallery, it replaces all
     * the existing elements
     * with the specified list
     *
     * @param {array}  elements
     */
    setElements(elements) {
        this.settings.elements = false;

        const newElements = [];

        if (elements && elements.length) {
            each(elements, (el, i) => {
                const slide = new Slide(el, this, i);
                const data = slide.getConfig();
                const slideInfo = extend({}, data);

                slideInfo.slideConfig = data;
                slideInfo.instance = slide;
                slideInfo.index = i;
                newElements.push(slideInfo);
            });
        }

        this.elements = newElements;

        if (this.lightboxOpen) {
            this.slidesContainer.innerHTML = '';

            if (this.elements.length) {
                each(this.elements, () => {
                    let slide = createHTML(this.settings.slideHTML);
                    this.slidesContainer.appendChild(slide);
                });
                this.showSlide(0, true);
            }
        }
    }

    /**
     * Return the index
     * of the specified node,
     * this node is for example an image, link, etc.
     * that when clicked it opens the lightbox
     * its position in the elements array can change
     * when using insertSlide or removeSlide so we
     * need to find it in the elements list
     *
     * @param {node} node
     * @return bool|int
     */
    getElementIndex(node) {
        let index = false;
        each(this.elements, (el, i) => {
            if (has(el, 'node') && el.node == node) {
                index = i;
                return true; // exit loop
            }
        });

        return index;
    }

    /**
     * Get elements
     * returns an array containing all
     * the elements that must be displayed in the
     * lightbox
     *
     * @return { array }
     */
    getElements() {
        let list = [];
        this.elements = this.elements ? this.elements : [];

        if (!isNil(this.settings.elements) && isArray$2(this.settings.elements) && this.settings.elements.length) {
            each(this.settings.elements, (el, i) => {
                const slide = new Slide(el, this, i);
                const elData = slide.getConfig();
                const slideInfo = extend({}, elData);

                slideInfo.node = false;
                slideInfo.index = i;
                slideInfo.instance = slide;
                slideInfo.slideConfig = elData;
                list.push(slideInfo);
            });
        }

        let nodes = false;
        let selector = this.getSelector();

        if (selector) {
            nodes = document.querySelectorAll(this.getSelector());
        }

        if (!nodes) {
            return list;
        }

        each(nodes, (el, i) => {
            const slide = new Slide(el, this, i);
            const elData = slide.getConfig();
            const slideInfo = extend({}, elData);

            slideInfo.node = el;
            slideInfo.index = i;
            slideInfo.instance = slide;
            slideInfo.slideConfig = elData;
            slideInfo.gallery = el.getAttribute('data-gallery');
            list.push(slideInfo);
        });

        return list;
    }

    /**
     * Return only the elements
     * from a specific gallery
     *
     * @return array
     */
    getGalleryElements(list, gallery) {
        return list.filter((el) => {
            return el.gallery == gallery;
        });
    }

    /**
     * Get selector
     */
    getSelector() {
        if (this.settings.elements) {
            return false;
        }
        if (this.settings.selector && this.settings.selector.substring(0, 5) == 'data-') {
            return `*[${this.settings.selector}]`;
        }
        return this.settings.selector;
    }

    /**
     * Get the active slide
     */
    getActiveSlide() {
        return this.slidesContainer.querySelectorAll('.gslide')[this.index];
    }

    /**
     * Get the active index
     */
    getActiveSlideIndex() {
        return this.index;
    }

    /**
     * Get the defined
     * effects as string
     */
    getAnimationClasses() {
        let effects = [];
        for (let key in this.settings.cssEfects) {
            if (this.settings.cssEfects.hasOwnProperty(key)) {
                let effect = this.settings.cssEfects[key];
                effects.push(`g${effect.in}`);
                effects.push(`g${effect.out}`);
            }
        }
        return effects.join(' ');
    }

    /**
     * Build the structure
     * @return {null}
     */
    build() {
        if (this.built) {
            return false;
        }

        // TODO: :scope is not supported on IE or first Edge. so we'll
        // update this when IE support is removed to use newer code
        //const children = document.body.querySelectorAll(':scope > *');
        const children = document.body.childNodes;
        const bodyChildElms = [];
        each(children, (el) => {
            if (el.parentNode == document.body && el.nodeName.charAt(0) !== '#' && el.hasAttribute && !el.hasAttribute('aria-hidden')) {
                bodyChildElms.push(el);
                el.setAttribute('aria-hidden', 'true');
            }
        });

        const nextSVG = has(this.settings.svg, 'next') ? this.settings.svg.next : '';
        const prevSVG = has(this.settings.svg, 'prev') ? this.settings.svg.prev : '';
        const closeSVG = has(this.settings.svg, 'close') ? this.settings.svg.close : '';

        let lightboxHTML = this.settings.lightboxHTML;
        lightboxHTML = lightboxHTML.replace(/{nextSVG}/g, nextSVG);
        lightboxHTML = lightboxHTML.replace(/{prevSVG}/g, prevSVG);
        lightboxHTML = lightboxHTML.replace(/{closeSVG}/g, closeSVG);

        lightboxHTML = createHTML(lightboxHTML);
        document.body.appendChild(lightboxHTML);

        const modal = document.getElementById('glightbox-body');
        this.modal = modal;
        let closeButton = modal.querySelector('.gclose');
        this.prevButton = modal.querySelector('.gprev');
        this.nextButton = modal.querySelector('.gnext');
        this.overlay = modal.querySelector('.goverlay');
        this.loader = modal.querySelector('.gloader');
        this.slidesContainer = document.getElementById('glightbox-slider');
        this.bodyHiddenChildElms = bodyChildElms;
        this.events = {};

        addClass(this.modal, 'glightbox-' + this.settings.skin);

        if (this.settings.closeButton && closeButton) {
            this.events['close'] = addEvent('click', {
                onElement: closeButton,
                withCallback: (e, target) => {
                    e.preventDefault();
                    this.close();
                }
            });
        }
        if (closeButton && !this.settings.closeButton) {
            closeButton.parentNode.removeChild(closeButton);
        }

        if (this.nextButton) {
            this.events['next'] = addEvent('click', {
                onElement: this.nextButton,
                withCallback: (e, target) => {
                    e.preventDefault();
                    this.nextSlide();
                }
            });
        }

        if (this.prevButton) {
            this.events['prev'] = addEvent('click', {
                onElement: this.prevButton,
                withCallback: (e, target) => {
                    e.preventDefault();
                    this.prevSlide();
                }
            });
        }
        if (this.settings.closeOnOutsideClick) {
            this.events['outClose'] = addEvent('click', {
                onElement: modal,
                withCallback: (e, target) => {
                    if (!this.preventOutsideClick && !hasClass(document.body, 'glightbox-mobile') && !closest(e.target, '.ginner-container')) {
                        if (!closest(e.target, '.gbtn') && !hasClass(e.target, 'gnext') && !hasClass(e.target, 'gprev')) {
                            this.close();
                        }
                    }
                }
            });
        }

        each(this.elements, (slide, i) => {
            this.slidesContainer.appendChild(slide.instance.create());
            slide.slideNode = this.slidesContainer.querySelectorAll('.gslide')[i];
        });
        if (isTouch) {
            addClass(document.body, 'glightbox-touch');
        }

        this.events['resize'] = addEvent('resize', {
            onElement: window,
            withCallback: () => {
                this.resize();
            }
        });

        this.built = true;
    }

    /**
     * Handle resize
     * Create only to handle
     * when the height of the screen
     * is lower than the slide content
     * this helps to resize videos vertically
     * and images with description
     */
    resize(slide = null) {
        slide = !slide ? this.activeSlide : slide;

        if (!slide || hasClass(slide, 'zoomed')) {
            return;
        }

        const winSize = windowSize();
        const video = slide.querySelector('.gvideo-wrapper');
        const image = slide.querySelector('.gslide-image');
        const description = this.slideDescription;

        let winWidth = winSize.width;
        let winHeight = winSize.height;

        if (winWidth <= 768) {
            addClass(document.body, 'glightbox-mobile');
        } else {
            removeClass(document.body, 'glightbox-mobile');
        }

        if (!video && !image) {
            return;
        }

        let descriptionResize = false;
        if (description && (hasClass(description, 'description-bottom') || hasClass(description, 'description-top')) && !hasClass(description, 'gabsolute')) {
            descriptionResize = true;
        }

        if (image) {
            if (winWidth <= 768) {
                image.querySelector('img');
                //imgNode.setAttribute('style', '');
            } else if (descriptionResize) {
                let descHeight = description.offsetHeight;
                let imgNode = image.querySelector('img');

                imgNode.setAttribute('style', `max-height: calc(100vh - ${descHeight}px)`);
                description.setAttribute('style', `max-width: ${imgNode.offsetWidth}px;`);
            }
        }

        if (video) {
            let ratio = has(this.settings.plyr.config, 'ratio') ? this.settings.plyr.config.ratio : '';

            if (!ratio) {
                // If no ratio passed, calculate it using the video width and height
                // generated by Plyr
                const containerWidth = video.clientWidth;
                const containerHeight = video.clientHeight;
                const divisor = containerWidth / containerHeight;
                ratio = `${containerWidth / divisor}:${containerHeight / divisor}`;
            }

            let videoRatio = ratio.split(':');
            let videoWidth = this.settings.videosWidth;
            let maxWidth = this.settings.videosWidth;

            if (isNumber(videoWidth) || videoWidth.indexOf('px') !== -1) {
                maxWidth = parseInt(videoWidth);
            } else {
                // If video size is vw, vh or % convert it to pixels,
                // fallback to the current video size
                if (videoWidth.indexOf('vw') !== -1) {
                    maxWidth = (winWidth * parseInt(videoWidth)) / 100;
                } else if (videoWidth.indexOf('vh') !== -1) {
                    maxWidth = (winHeight * parseInt(videoWidth)) / 100;
                } else if (videoWidth.indexOf('%') !== -1) {
                    maxWidth = (winWidth * parseInt(videoWidth)) / 100;
                } else {
                    maxWidth = parseInt(video.clientWidth);
                }
            }

            let maxHeight = maxWidth / (parseInt(videoRatio[0]) / parseInt(videoRatio[1]));
            maxHeight = Math.floor(maxHeight);

            if (descriptionResize) {
                winHeight = winHeight - description.offsetHeight;
            }

            if (maxWidth > winWidth || maxHeight > winHeight || (winHeight < maxHeight && winWidth > maxWidth)) {
                let vwidth = video.offsetWidth;
                let vheight = video.offsetHeight;
                let ratio = winHeight / vheight;
                let vsize = { width: vwidth * ratio, height: vheight * ratio };
                video.parentNode.setAttribute('style', `max-width: ${vsize.width}px`);

                if (descriptionResize) {
                    description.setAttribute('style', `max-width: ${vsize.width}px;`);
                }
            } else {
                video.parentNode.style.maxWidth = `${videoWidth}`;
                if (descriptionResize) {
                    description.setAttribute('style', `max-width: ${videoWidth};`);
                }
            }
        }
    }

    /**
     * Reload Lightbox
     * reload and apply events to nodes
     */
    reload() {
        this.init();
    }

    /**
     * Update navigation classes on slide change
     */
    updateNavigationClasses() {
        const loop = this.loop();
        // Handle navigation arrows
        removeClass(this.nextButton, 'disabled');
        removeClass(this.prevButton, 'disabled');

        if (this.index == 0 && this.elements.length - 1 == 0) {
            addClass(this.prevButton, 'disabled');
            addClass(this.nextButton, 'disabled');
        } else if (this.index === 0 && !loop) {
            addClass(this.prevButton, 'disabled');
        } else if (this.index === this.elements.length - 1 && !loop) {
            addClass(this.nextButton, 'disabled');
        }
    }

    /**
     * Handle loop config
     */
    loop() {
        let loop = has(this.settings, 'loopAtEnd') ? this.settings.loopAtEnd : null;
        loop = has(this.settings, 'loop') ? this.settings.loop : loop;

        return loop;
    }

    /**
     * Close Lightbox
     * closes the lightbox and removes the slides
     * and some classes
     */
    close() {
        if (!this.lightboxOpen) {
            if (this.events) {
                for (let key in this.events) {
                    if (this.events.hasOwnProperty(key)) {
                        this.events[key].destroy();
                    }
                }
                this.events = null;
            }
            return false;
        }

        if (this.closing) {
            return false;
        }
        this.closing = true;
        this.slidePlayerPause(this.activeSlide);

        if (this.fullElementsList) {
            this.elements = this.fullElementsList;
        }

        if (this.bodyHiddenChildElms.length) {
            each(this.bodyHiddenChildElms, (el) => {
                el.removeAttribute('aria-hidden');
            });
        }

        addClass(this.modal, 'glightbox-closing');
        animateElement(this.overlay, this.settings.openEffect == 'none' ? 'none' : this.settings.cssEfects.fade.out);
        animateElement(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, () => {
            this.activeSlide = null;
            this.prevActiveSlideIndex = null;
            this.prevActiveSlide = null;
            this.built = false;

            if (this.events) {
                for (let key in this.events) {
                    if (this.events.hasOwnProperty(key)) {
                        this.events[key].destroy();
                    }
                }
                this.events = null;
            }

            const body = document.body;
            removeClass(html, 'glightbox-open');
            removeClass(body, 'glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer');
            this.modal.parentNode.removeChild(this.modal);

            this.trigger('close');

            // settings.onClose is deprecated and will be removed in a future update
            if (isFunction$2(this.settings.onClose)) {
                this.settings.onClose();
            }

            const styles = document.querySelector('.gcss-styles');
            if (styles) {
                styles.parentNode.removeChild(styles);
            }
            this.lightboxOpen = false;
            this.closing = null;
        });
    }

    /**
     * Destroy lightbox
     * and all events
     */
    destroy() {
        this.close();
        this.clearAllEvents();

        if (this.baseEvents) {
            this.baseEvents.destroy();
        }
    }

    /**
     * Set event
     */
    on(evt, callback, once = false) {
        if (!evt || !isFunction$2(callback)) {
            throw new TypeError('Event name and callback must be defined');
        }
        this.apiEvents.push({ evt, once, callback });
    }

    /**
     * Set event
     */
    once(evt, callback) {
        this.on(evt, callback, true);
    }

    /**
     * Triggers an specific event
     * with data
     *
     * @param string eventName
     */
    trigger(eventName, data = null) {
        const onceTriggered = [];
        each(this.apiEvents, (event, i) => {
            const { evt, once, callback } = event;
            if (evt == eventName) {
                callback(data);
                if (once) {
                    onceTriggered.push(i);
                }
            }
        });
        if (onceTriggered.length) {
            each(onceTriggered, (i) => this.apiEvents.splice(i, 1));
        }
    }

    /**
     * Removes all events
     * set using the API
     */
    clearAllEvents() {
        this.apiEvents.splice(0, this.apiEvents.length);
    }

    /**
     * Get Version
     */
    version() {
        return version;
    }
}

function GLightbox (options = {}) {
    const instance = new GlightboxInit(options);
    instance.init();

    return instance;
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq$1(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$1(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype;

/** Built-in value references. */
var splice$1 = arrayProto$1.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf$1(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$1.prototype.clear = listCacheClear$1;
ListCache$1.prototype['delete'] = listCacheDelete$1;
ListCache$1.prototype.get = listCacheGet$1;
ListCache$1.prototype.has = listCacheHas$1;
ListCache$1.prototype.set = listCacheSet$1;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache$1;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/** Built-in value references. */
var Symbol$2 = root$1.Symbol;

/** Used for built-in method references. */
var objectProto$h = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$f = objectProto$h.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$3 = objectProto$h.toString;

/** Built-in value references. */
var symToStringTag$3 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$f.call(value, symToStringTag$3),
      tag = value[symToStringTag$3];

  try {
    value[symToStringTag$3] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$3.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$3] = tag;
    } else {
      delete value[symToStringTag$3];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$g = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$2 = objectProto$g.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$2.call(value);
}

/** `Object#toString` result references. */
var nullTag$1 = '[object Null]',
    undefinedTag$1 = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$2 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag$1 : nullTag$1;
  }
  return (symToStringTag$2 && symToStringTag$2 in Object(value))
    ? getRawTag$1(value)
    : objectToString$1(value);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag$1 = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag$1 = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$1(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag$1 || tag == proxyTag$1;
}

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey$1 = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey$1 && (maskSrcKey$1 in func);
}

/** Used for built-in method references. */
var funcProto$4 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$4 = funcProto$4.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$4.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$3 = Function.prototype,
    objectProto$f = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$3 = funcProto$3.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$e = objectProto$f.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative$1 = RegExp('^' +
  funcToString$3.call(hasOwnProperty$e).replace(reRegExpChar$1, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$1(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$1(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$1(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var Map$1 = getNative$1(root$1, 'Map');

/* Built-in method references that are verified to be native. */
var nativeCreate$1 = getNative$1(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$3 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$d = objectProto$e.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$3 ? undefined : result;
  }
  return hasOwnProperty$d.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$9.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$c.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear$1;
Hash$1.prototype['delete'] = hashDelete$1;
Hash$1.prototype.get = hashGet$1;
Hash$1.prototype.has = hashHas$1;
Hash$1.prototype.set = hashSet$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash$1,
    'map': new (Map$1 || ListCache$1),
    'string': new Hash$1
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$1(map, key) {
  var data = map.__data__;
  return isKeyable$1(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$1(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$1(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData$1(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear$1;
MapCache$1.prototype['delete'] = mapCacheDelete$1;
MapCache$1.prototype.get = mapCacheGet$1;
MapCache$1.prototype.has = mapCacheHas$1;
MapCache$1.prototype.set = mapCacheSet$1;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache$1(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var defineProperty$1 = (function() {
  try {
    var func = getNative$1(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$1(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq$1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/** Detect free variable `exports`. */
var freeExports$4 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$4 = freeExports$4 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$4 = freeModule$4 && freeModule$4.exports === freeExports$4;

/** Built-in value references. */
var Buffer$2 = moduleExports$4 ? root$1.Buffer : undefined,
    allocUnsafe = Buffer$2 ? Buffer$2.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/** Built-in value references. */
var Uint8Array = root$1.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;

  return value === proto;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$1(value) && baseGetTag$1(value) == argsTag$1;
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments$1(function() { return arguments; }()) ? baseIsArguments$1 : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$b.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$3 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$1(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$3;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike$1(value) && isArrayLike(value);
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$3 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$3 = freeExports$3 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$3 = freeModule$3 && freeModule$3.exports === freeExports$3;

/** Built-in value references. */
var Buffer$1 = moduleExports$3 ? root$1.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype,
    objectProto$5 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$5.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$2) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$6.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike$1(value) &&
    isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Detect free variable `process` from Node.js. */
var freeProcess$1 = moduleExports$2 && freeGlobal$1.process;

/** Used to access faster Node.js helpers. */
var nodeUtil$1 = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$2 && freeModule$2.require && freeModule$2.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess$1 && freeProcess$1.binding && freeProcess$1.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$2.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq$1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$2 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint$1 = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$1(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$2 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint$1.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$1.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$1(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray$1(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject$1(objValue) || isFunction$1(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$1(value) {
  return value;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax$2(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$2(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply$1(func, this, otherArgs);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$1(value) {
  return function() {
    return value;
  };
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty$1 ? identity$1 : function(func, string) {
  return defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant$1(string),
    'writable': true
  });
};

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT$1 = 800,
    HOT_SPAN$1 = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow$1 = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow$1(),
        remaining = HOT_SPAN$1 - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT$1) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut$1(baseSetToString$1);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString$1(overRest$1(func, start, identity$1), func + '');
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex$1(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq$1(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var defaultPlyrOptions = {
  js: null,
  css: null,
  config: {
    iconUrl: null
  }
};
var LightboxFactory = /*#__PURE__*/function () {
  function LightboxFactory(plyrOptions) {
    _classCallCheck$1(this, LightboxFactory);

    this.plyrOptions = merge(defaultPlyrOptions, plyrOptions);
  }

  _createClass$1(LightboxFactory, [{
    key: "images",
    value: function images() {
      var selector = 'a[href$=".gif"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]';
      var hasImageLinks = document.querySelectorAll(selector);

      if (hasImageLinks.length > 0) {
        this.create(selector);
      }
    }
  }, {
    key: "videos",
    value: function videos() {
      var selector = '.ghwp-video a';
      var hasVideos = document.querySelectorAll(selector);

      if (hasVideos.length) {
        this.create(selector);
      }
    }
    /**
     * Creates a lightbox for every image link.
     */

  }, {
    key: "all",
    value: function all(selector) {
      this.images();
      this.videos();

      if (selector && document.querySelectorAll(selector).length) {
        this.create(selector);
      }
    }
    /**
     * Initializes a single lightbox / modal.
     *
     * @param selector
     * @return {GLightbox}
     */

  }, {
    key: "create",
    value: function create(selector) {
      if (this.plyrOptions) {
        return new GLightbox({
          selector: selector,
          plyr: this.plyrOptions
        });
      } else {
        return new GLightbox({
          selector: selector
        });
      }
    }
  }]);

  return LightboxFactory;
}();

var classnames$2 = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames$2));

var classnames$1$1 = classnames$2.exports;

function _defineProperty$1(obj, key, value) {
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/*
 *
 * Material Design SVG icons as functional hyperscript components from
 * https://material.io/resources/icons/
 *
 */
var Add = function Add(props) {
  var _props$color = props.color,
      color = _props$color === void 0 ? 'none' : _props$color;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var Alarm = function Alarm(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
  }));
};
var BorderHorizontal = function BorderHorizontal(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var BorderRight = function BorderRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"
  }));
};
var BorderVertical = function BorderVertical(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var Button$4 = function Button(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
  })));
};
var CalendarViewDay = function CalendarViewDay(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    role: "img",
    "aria-hidden": true,
    focusable: false
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }));
};
var CheckCircleOutline = function CheckCircleOutline(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0zm0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }));
};
var Collections = function Collections(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"
  }));
};
var Crop169 = function Crop169(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
  }));
};
var Crop32 = function Crop32(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z"
  }));
};
var CropFree = function CropFree(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"
  }));
};
var Delete = function Delete(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var DynamicFeed = function DynamicFeed(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("g", {
    id: "Bounding_Box"
  }, /*#__PURE__*/React.createElement("rect", {
    fill: "none",
    width: "24",
    height: "24"
  })), /*#__PURE__*/React.createElement("g", {
    id: "Flat"
  }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"
  }))), /*#__PURE__*/React.createElement("g", {
    id: "Master",
    display: "none"
  }, /*#__PURE__*/React.createElement("g", {
    display: "inline"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"
  }))));
};
var Equalizer = function Equalizer(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"
  }));
};
var Filter = function Filter(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter1 = function Filter1(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 10h2V5h-4v2h2v8zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter2 = function Filter2(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-4-4h-4v-2h2c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2h-4v2h4v2h-2c-1.1 0-2 .89-2 2v4h6v-2z"
  }));
};
var Filter3 = function Filter3(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-4v2h4v2h-2v2h2v2h-4v2h4c1.1 0 2-.89 2-2z"
  }));
};
var Filter4 = function Filter4(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm12 10h2V5h-2v4h-2V5h-2v6h4v4zm6-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
var Filter5 = function Filter5(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-2c0-1.11-.9-2-2-2h-2V7h4V5h-6v6h4v2h-4v2h4c1.1 0 2-.89 2-2z"
  }));
};
var Filter6 = function Filter6(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-2c0-1.11-.9-2-2-2h-2V7h4V5h-4c-1.1 0-2 .89-2 2v6c0 1.11.9 2 2 2zm0-4h2v2h-2v-2z"
  }));
};
var Filter7 = function Filter7(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2l4-8V5h-6v2h4l-4 8h2z"
  }));
};
var Filter8 = function Filter8(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-2c-1.1 0-2 .89-2 2v1.5c0 .83.67 1.5 1.5 1.5-.83 0-1.5.67-1.5 1.5V13c0 1.11.9 2 2 2zm0-8h2v2h-2V7zm0 4h2v2h-2v-2z"
  }));
};
var Filter9 = function Filter9(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM15 5h-2c-1.1 0-2 .89-2 2v2c0 1.11.9 2 2 2h2v2h-4v2h4c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2zm0 4h-2V7h2v2z"
  }));
};
var FilterNone = function FilterNone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"
  }));
};
/**
 * A cross in a circle
 *
 * @param props
 * @return {*}
 * @constructor
 */

var HighlightOff = function HighlightOff(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  }));
};
var KeyboardArrowDown = function KeyboardArrowDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowLeft = function KeyboardArrowLeft(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowRight = function KeyboardArrowRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};
var KeyboardArrowUp = function KeyboardArrowUp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var KeyboardTab = function KeyboardTab(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"
  }));
};
var Label = function Label(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"
  }));
};
var Link = function Link(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
  }));
};
var LinkOff = function LinkOff(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 24V0",
    fill: "none"
  }));
};
/**
 * Two concentric arrows arranged in a circle
 *
 * @param props
 * @return {*}
 * @constructor
 */

var Loop = function Loop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
  }));
};
/**
 * Three dots / Menu icon
 *
 * @param props
 * @return {*}
 * @constructor
 */

var MoreHorizontal = function MoreHorizontal(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
};
var PhotoResizeSelectLarge = function PhotoResizeSelectLarge(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M24 24H0V0h24v24z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z"
  }));
};
var PlayCircleOutline = function PlayCircleOutline(props) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React.createElement("path", _extends({
    d: "M0 0h24v24H0z",
    fill: "none"
  }, props)), /*#__PURE__*/React.createElement("path", {
    d: "M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  }));
};
var PresentToAllTwoTone = function PresentToAllTwoTone(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 19.02h18V4.98H3v14.04zM12 8l4 4h-2v4h-4v-4H8l4-4z",
    opacity: ".3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 16h4v-4h2l-4-4-4 4h2zM21 3H3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 16.02H3V4.98h18v14.04z"
  }));
};
/**
 * An arrow pointing at a paragraph from the left edge
 * @param props
 * @return {*}
 * @constructor
 */

var ReadMore = function ReadMore(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    fill: "none",
    height: "24",
    width: "24"
  })), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "9",
    x: "13",
    y: "7"
  }), /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "9",
    x: "13",
    y: "15"
  }), /*#__PURE__*/React.createElement("rect", {
    height: "2",
    width: "6",
    x: "16",
    y: "11"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "13,12 8,7 8,11 2,11 2,13 8,13 8,17"
  }))));
};
/**
 * A screen with a plus icon and a caret to the right on the bottom right edge
 *
 * @param props
 * @return {*}
 * @constructor
 */

var QueuePlayNext = function QueuePlayNext(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "a",
    d: "M0 0h24v24H0V0z"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "b"
  }, /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#a",
    overflow: "visible"
  })), /*#__PURE__*/React.createElement("path", {
    clipPath: "url(#b)",
    d: "M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z"
  }));
};
/**
 * A square box surrounded by dots forming an outer box
 *
 * @param props
 * @return {*}
 * @constructor
 */

var SelectAll = function SelectAll(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "black",
    width: "24px",
    height: "24px"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"
  }));
};
var Snooze = function Snooze(props) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React.createElement("path", _extends({
    d: "M0 0h24v24H0z",
    fill: "none"
  }, props)), /*#__PURE__*/React.createElement("path", {
    d: "M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z"
  }));
};
var Stars = function Stars(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
  }));
};
var Star = Stars;
var StarOutline = function StarOutline(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
  }));
};
var SwapHoriz = function SwapHoriz(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var SwapVert = function SwapVert(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * A larger capital letter "T" followed by a smaller capital "T"
 *
 * @param props
 * @return {*}
 * @constructor
 */

var TextFields = function TextFields(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "a",
    d: "M24 24H0V0h24v24z"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "b"
  }, /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#a",
    overflow: "visible"
  })), /*#__PURE__*/React.createElement("path", {
    clipPath: "url(#b)",
    d: "M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"
  }));
};
/**
 * A celluloid strip / Video icon / Film
 *
 * @param props
 * @return {*}
 * @constructor
 */

var Theaters = function Theaters(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * Carets pointing up and down away from each other on top of each other
 *
 * @param props
 * @return {*}
 * @constructor
 */

var UnfoldMore = function UnfoldMore(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"
  }));
};
var VerticalAlignBottom = function VerticalAlignBottom(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "black",
    width: "24px",
    height: "24px"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"
  }));
};
var VerticalAlignCenter = function VerticalAlignCenter(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"
  }));
};
var VerticalAlignTop = function VerticalAlignTop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
/**
 * Text lines to the left, a block / image to the right
 *
 * @param props
 * @return {*}
 * @constructor
 */

var VerticalSplit = function VerticalSplit(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 15h8v-2H3v2zm0 4h8v-2H3v2zm0-8h8V9H3v2zm0-6v2h8V5H3zm10 0h8v14h-8V5z"
  }));
};
var ViewAgenda = function ViewAgenda(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"
  }));
};
var ViewCarousel = function ViewCarousel(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};
var ViewColumn = function ViewColumn(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"
  }));
};
var ViewCompact = function ViewCompact(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"
  }));
};
var WbIridescent = function WbIridescent(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49l1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z"
  }));
};
var Web = function Web(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }));
};

var materialDesignIcons = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Add: Add,
	Alarm: Alarm,
	BorderHorizontal: BorderHorizontal,
	BorderRight: BorderRight,
	BorderVertical: BorderVertical,
	Button: Button$4,
	CalendarViewDay: CalendarViewDay,
	CheckCircleOutline: CheckCircleOutline,
	Collections: Collections,
	Crop169: Crop169,
	Crop32: Crop32,
	CropFree: CropFree,
	Delete: Delete,
	DynamicFeed: DynamicFeed,
	Equalizer: Equalizer,
	Filter: Filter,
	Filter1: Filter1,
	Filter2: Filter2,
	Filter3: Filter3,
	Filter4: Filter4,
	Filter5: Filter5,
	Filter6: Filter6,
	Filter7: Filter7,
	Filter8: Filter8,
	Filter9: Filter9,
	FilterNone: FilterNone,
	HighlightOff: HighlightOff,
	KeyboardArrowDown: KeyboardArrowDown,
	KeyboardArrowLeft: KeyboardArrowLeft,
	KeyboardArrowRight: KeyboardArrowRight,
	KeyboardArrowUp: KeyboardArrowUp,
	KeyboardTab: KeyboardTab,
	Label: Label,
	Link: Link,
	LinkOff: LinkOff,
	Loop: Loop,
	MoreHorizontal: MoreHorizontal,
	PhotoResizeSelectLarge: PhotoResizeSelectLarge,
	PlayCircleOutline: PlayCircleOutline,
	PresentToAllTwoTone: PresentToAllTwoTone,
	ReadMore: ReadMore,
	QueuePlayNext: QueuePlayNext,
	SelectAll: SelectAll,
	Snooze: Snooze,
	Stars: Stars,
	Star: Star,
	StarOutline: StarOutline,
	SwapHoriz: SwapHoriz,
	SwapVert: SwapVert,
	TextFields: TextFields,
	Theaters: Theaters,
	UnfoldMore: UnfoldMore,
	VerticalAlignBottom: VerticalAlignBottom,
	VerticalAlignCenter: VerticalAlignCenter,
	VerticalAlignTop: VerticalAlignTop,
	VerticalSplit: VerticalSplit,
	ViewAgenda: ViewAgenda,
	ViewCarousel: ViewCarousel,
	ViewColumn: ViewColumn,
	ViewCompact: ViewCompact,
	WbIridescent: WbIridescent,
	Web: Web
});

components.Button;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$1);
}

components.TextControl;
i18n.__;

components.TextareaControl;
    components.TextControl;
i18n.__;

/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var noop = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop,
  measure: noop
};

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var PERFORMANCE = _PERFORMANCE;
!!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
(function () {
  try {
    return process.env.NODE_ENV === 'production';
  } catch (e) {
    return false;
  }
})();

var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  // For example <script data-search-pseudo-elements src="..."></script>
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default = {
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};

var _config = _objectSpread({}, _default, initial);

if (!_config.autoReplaceSvg) _config.observeMutations = false;

var config = _objectSpread({}, _config);

WINDOW.FontAwesomeConfig = config;

var w = WINDOW || {};
if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w[NAMESPACE_IDENTIFIER];

var functions = [];

var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';
typeof setImmediate === 'undefined' ? setTimeout : setImmediate;

var noop$1 = function noop() {};

config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};

/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */

var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};

/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */


var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }

    return acc;
  }, {});

  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalized);
  } else {
    namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll easy the upgrade process for our users by automatically defining
   * this as well.
   */


  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}

var styles = namespace.styles,
    shims = namespace.shims;
var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  lookup(function (acc, icon, iconName) {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }

    return acc;
  });
  lookup(function (acc, icon, iconName) {
    var ligatures = icon[2];
    acc[iconName] = iconName;
    ligatures.forEach(function (ligature) {
      acc[ligature] = iconName;
    });
    return acc;
  });
  var hasRegular = 'far' in styles;
  reduce(shims, function (acc, shim) {
    var oldName = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    acc[oldName] = {
      prefix: prefix,
      iconName: iconName
    };
    return acc;
  }, {});
};
build();

namespace.styles;

function MissingIcon(error) {
  this.name = 'MissingIcon';
  this.message = error || 'Icon unavailable';
  this.stack = new Error().stack;
}
MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;

var FILL = {
  fill: 'currentColor'
};
var ANIMATION_BASE = {
  attributeType: 'XML',
  repeatCount: 'indefinite',
  dur: '2s'
};
({
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
  })
});

var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {
  attributeName: 'opacity'
});

({
  tag: 'circle',
  attributes: _objectSpread({}, FILL, {
    cx: '256',
    cy: '364',
    r: '28'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, ANIMATION_BASE, {
      attributeName: 'r',
      values: '28;14;28;28;14;28;'
    })
  }, {
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '1;0;1;1;0;1;'
    })
  }]
});
({
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    opacity: '1',
    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '1;0;0;0;0;1;'
    })
  }]
});
({
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    opacity: '0',
    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '0;0;1;1;0;0;'
    })
  }]
});

namespace.styles;

namespace.styles;

var Library =
/*#__PURE__*/
function () {
  function Library() {
    _classCallCheck(this, Library);

    this.definitions = {};
  }

  _createClass(Library, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
        defineIcons(key, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;
        if (!additions[prefix]) additions[prefix] = {};
        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }]);

  return Library;
}();

new Library();

var faCog$1 = {};

(function (exports) {
Object.defineProperty(exports, '__esModule', { value: true });
var prefix = 'fas';
var iconName = 'cog';
var width = 512;
var height = 512;
var ligatures = [];
var unicode = 'f013';
var svgPathData = 'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z';

exports.definition = {
  prefix: prefix,
  iconName: iconName,
  icon: [
    width,
    height,
    ligatures,
    unicode,
    svgPathData
  ]};

exports.faCog = exports.definition;
exports.prefix = prefix;
exports.iconName = iconName;
exports.width = width;
exports.height = height;
exports.ligatures = ligatures;
exports.unicode = unicode;
exports.svgPathData = svgPathData;
}(faCog$1));

components.Button;

components.Button;
    components.TextControl;
i18n.__;

element.Component;

var DEFAULT_ID_ATTRIBUTE_NAME = 'mediaID';
var DEFAULT_URL_ATTRIBUTE_NAME = 'mediaURL';
var DEFAULT_ALT_ATTRIBUTE_NAME = 'mediaAltText';
var DEFAULT_BUTTON_LABEL = 'Upload / Select image';
var DEFAULT_BUTTON_CHANGE_LABEL = 'Change image';

var _excluded = ["open"],
    _excluded2 = ["open"];
var Button$1 = components.Button;
var __$2$1 = i18n.__;
var SelectButton = function SelectButton(_ref) {
  var open = _ref.open,
      props = _objectWithoutProperties(_ref, _excluded);

  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$buttonLabel = props.buttonLabel,
      buttonLabel = _props$buttonLabel === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel,
      _props$buttonChangeLa = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa;
  return /*#__PURE__*/React.createElement(Button$1, {
    isPrimary: true,
    onClick: open
  }, !attributes[idAttribute] ? __$2$1(buttonLabel, 'ghwp') : __$2$1(buttonChangeLabel, 'ghwp'));
};
var SelectButtonWithPreview = function SelectButtonWithPreview(_ref2) {
  var open = _ref2.open,
      props = _objectWithoutProperties(_ref2, _excluded2);

  var attributes = props.attributes,
      imageElementClassName = props.imageElementClassName,
      _props$idAttribute2 = props.idAttribute,
      idAttribute = _props$idAttribute2 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute2,
      _props$buttonLabel2 = props.buttonLabel,
      buttonLabel = _props$buttonLabel2 === void 0 ? DEFAULT_BUTTON_LABEL : _props$buttonLabel2,
      _props$buttonChangeLa2 = props.buttonChangeLabel,
      buttonChangeLabel = _props$buttonChangeLa2 === void 0 ? DEFAULT_BUTTON_CHANGE_LABEL : _props$buttonChangeLa2,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute;
  return /*#__PURE__*/React.createElement(Button$1, {
    className: classnames$1$1([{
      'image-button': Boolean(attributes[idAttribute])
    }]),
    isPrimary: !attributes[idAttribute],
    style: {
      height: 'auto',
      minHeight: '36px'
    },
    onClick: open
  }, !attributes[idAttribute] ? __$2$1(buttonLabel, 'ghwp') : /*#__PURE__*/React.createElement("img", {
    className: imageElementClassName,
    src: attributes[urlAttribute],
    alt: __$2$1(buttonChangeLabel, 'ghwp')
  }));
};
var RemoveButton = function RemoveButton(props) {
  var setAttributes = props.setAttributes,
      _props$idAttribute3 = props.idAttribute,
      idAttribute = _props$idAttribute3 === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute3,
      _props$urlAttribute2 = props.urlAttribute,
      urlAttribute = _props$urlAttribute2 === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute2,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute;

  var getOnRemoveImage = function getOnRemoveImage(idAttribute, urlAttribute, altAttribute) {
    return function () {
      var _setAttributes;

      setAttributes((_setAttributes = {}, _defineProperty$1(_setAttributes, urlAttribute, ''), _defineProperty$1(_setAttributes, idAttribute, ''), _defineProperty$1(_setAttributes, altAttribute, ''), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement(Button$1, {
    isDestructive: true,
    onClick: getOnRemoveImage(idAttribute, urlAttribute, altAttribute)
  }, __$2$1('Remove image', 'ghwp'));
};

var MediaUpload = blockEditor.MediaUpload;
/**
 * An image selector with optional preview and remove button
 *
 * @param {object}   props
 * @param {object}   props.attributes           Pass down the props of the parent component so attributes can be read
 *                                              and set
 * @param {function} props.setAttributes
 *
 * @param {?string}  props.idAttribute       ['mediaID']
 *                                             Use this to set a different attribute name for the image's media ID. It's
 *                                             where the image ID is read from and written to on change events.
 * @param {?string}  props.urlAttribute      ['mediaURL']
 *                                             Use this to set a different attribute name for the image's URL.
 * @param {?string}  props.altAttribute      ['mediaAltText']
 *                                             Use this to set a different attribute name for the image's alt text.
 * @param {?string}  props.buttonLabel       ['Upload / select image']
 *                                             You can use this option to set a different button text when no image is
 *                                           selected
 * @param {?string}  props.buttonChangeLabel ['Change image']
 *                                             You can use this to change the button text when an image is selected.
 * @param {?string}  props.imageElementClassName  ['']
 *                                             Set a custom class name on the image element when using "withPreview"
 * @param {boolean}  props.removeButton      [true]
 *                                             Set this option to `false` if you don't need the ability to clear the
 *                                             attributes and remove the image
 * @param {boolean}  props.withPreview       [false]
 *                                             Pass this option to enable a preview of the selected image instead of the
 *                                             change button.
 * @return {*}
 * @constructor
 */

var ImageSelect$1 = function ImageSelect(props) {
  var attributes = props.attributes,
      _props$idAttribute = props.idAttribute,
      idAttribute = _props$idAttribute === void 0 ? DEFAULT_ID_ATTRIBUTE_NAME : _props$idAttribute,
      _props$urlAttribute = props.urlAttribute,
      urlAttribute = _props$urlAttribute === void 0 ? DEFAULT_URL_ATTRIBUTE_NAME : _props$urlAttribute,
      _props$altAttribute = props.altAttribute,
      altAttribute = _props$altAttribute === void 0 ? DEFAULT_ALT_ATTRIBUTE_NAME : _props$altAttribute,
      _props$removeButton = props.removeButton,
      removeButton = _props$removeButton === void 0 ? true : _props$removeButton,
      setAttributes = props.setAttributes,
      _props$withPreview = props.withPreview,
      withPreview = _props$withPreview === void 0 ? false : _props$withPreview;

  var getOnSelectImage = function getOnSelectImage(idAttribute, urlAttribute, altAttribute) {
    return function (_ref) {
      var _setAttributes;

      var url = _ref.url,
          id = _ref.id,
          alt = _ref.alt;
      setAttributes((_setAttributes = {}, _defineProperty$1(_setAttributes, idAttribute, id), _defineProperty$1(_setAttributes, urlAttribute, url), _defineProperty$1(_setAttributes, altAttribute, alt), _setAttributes));
    };
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-image-select",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    onSelect: getOnSelectImage(idAttribute, urlAttribute, altAttribute),
    allowedTypes: "image",
    value: attributes[idAttribute],
    render: function render(_ref2) {
      var open = _ref2.open;
      var SelectButtonComponent = withPreview ? SelectButtonWithPreview : SelectButton;
      return /*#__PURE__*/React.createElement(SelectButtonComponent, _extends({
        open: open
      }, props));
    }
  }), removeButton && (attributes[urlAttribute] || attributes[idAttribute]) && /*#__PURE__*/React.createElement(RemoveButton, props)));
};

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol$1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$2) ? '-0' : result;
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
Buffer ? Buffer.isBuffer : undefined;

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
nodeUtil && nodeUtil.isTypedArray;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$2.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map && getTag(new Map) != mapTag$1) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag$1) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/** Built-in value references. */
root.Uint8Array;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
    symbolProto ? symbolProto.valueOf : undefined;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/* Node.js helper references. */
nodeUtil && nodeUtil.isRegExp;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

components.RangeControl;
    components.TextControl;
    components.ToggleControl;

components.Icon;

var Spinner = components.Spinner;
var SpinnerOverlay$1 = function SpinnerOverlay() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-spinner-overlay"
  }, /*#__PURE__*/React.createElement(Spinner, null));
};

data.withDispatch;

var dedupe = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var classNames = (function () {
		// don't inherit from Object so we can skip hasOwnProperty check later
		// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
		function StorageObject() {}
		StorageObject.prototype = Object.create(null);

		function _parseArray (resultSet, array) {
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				_parse(resultSet, array[i]);
			}
		}

		var hasOwn = {}.hasOwnProperty;

		function _parseNumber (resultSet, num) {
			resultSet[num] = true;
		}

		function _parseObject (resultSet, object) {
			if (object.toString === Object.prototype.toString) {
				for (var k in object) {
					if (hasOwn.call(object, k)) {
						// set value to false instead of deleting it to avoid changing object structure
						// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
						resultSet[k] = !!object[k];
					}
				}
			} else {
				resultSet[object.toString()] = true;
			}
		}

		var SPACE = /\s+/;
		function _parseString (resultSet, str) {
			var array = str.split(SPACE);
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				resultSet[array[i]] = true;
			}
		}

		function _parse (resultSet, arg) {
			if (!arg) return;
			var argType = typeof arg;

			// 'foo bar'
			if (argType === 'string') {
				_parseString(resultSet, arg);

			// ['foo', 'bar', ...]
			} else if (Array.isArray(arg)) {
				_parseArray(resultSet, arg);

			// { 'foo': true, ... }
			} else if (argType === 'object') {
				_parseObject(resultSet, arg);

			// '130'
			} else if (argType === 'number') {
				_parseNumber(resultSet, arg);
			}
		}

		function _classNames () {
			// don't leak arguments
			// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
			var len = arguments.length;
			var args = Array(len);
			for (var i = 0; i < len; i++) {
				args[i] = arguments[i];
			}

			var classSet = new StorageObject();
			_parseArray(classSet, args);

			var list = [];

			for (var k in classSet) {
				if (classSet[k]) {
					list.push(k);
				}
			}

			return list.join(' ');
		}

		return _classNames;
	})();

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(dedupe));

dedupe.exports;

compose.compose;
data.withDispatch;
    data.withSelect;

/* eslint-disable indent */
components.ToolbarButton;
i18n.__;

element.cloneElement;
    element.Children.map;
hooks.addFilter;

blocks.registerBlockStyle;
i18n.__;

var dispatch$1 = data.dispatch; // prettier-ignore

var YT_LONG_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/watch\?(?:[^\s&?]*)*(?:&?v=([^&?\s]*))(?:&[^\s&?]*)*/;
var YT_SHORT_REGEX = /https?:\/\/youtu\.be\/([^\s&?]*)/; // prettier-ignore

var YT_EMBED_REGEX = /https?:\/\/(?:www\.)?youtube\.com\/embed\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var VIMEO_REGEX = /https?:\/\/(?:www\.)?vimeo\.com\/(\d*)(?:(?:&|\?|\/)?.*)*/; // prettier-ignore

var VIMEO_EMBED_REGEX = /https?:\/\/(?:www\.)?player\.vimeo\.com\/video\/(?:([^&?\s]*))(?:&[^\s&?]*)*/;
var IFRAME_REGEX = /<iframe.*src="([^"]*)".*><\/iframe>/;
var getYoutubeEmbedUrlFromVideoId = function getYoutubeEmbedUrlFromVideoId(videoId) {
  return "https://www.youtube.com/embed/".concat(videoId);
};
var getVimeoEmbedUrlFromVideoId = function getVimeoEmbedUrlFromVideoId(videoId) {
  return "https://player.vimeo.com/video/".concat(videoId);
};

var isLongYoutubeUrl = function isLongYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_LONG_REGEX);
};

var isShortYoutubeUrl = function isShortYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_SHORT_REGEX);
};

var isEmbedYoutubeUrl = function isEmbedYoutubeUrl(videoUrl) {
  return videoUrl.match(YT_EMBED_REGEX);
};

var isDefaultVimeoUrl = function isDefaultVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_REGEX);
};

var isEmbedVimeoUrl = function isEmbedVimeoUrl(videoUrl) {
  return videoUrl.match(VIMEO_EMBED_REGEX);
};

var isIframeString = function isIframeString(videoUrl) {
  return videoUrl.match(IFRAME_REGEX);
};
/*
 ******************************************************************************
 *   Test URLs                                                                *
 ******************************************************************************/


var isYoutubeUrl$1 = function isYoutubeUrl(videoUrl) {
  return !!(isLongYoutubeUrl(videoUrl) || isShortYoutubeUrl(videoUrl) || isEmbedYoutubeUrl(videoUrl));
};
var isVimeoUrl$1 = function isVimeoUrl(videoUrl) {
  return !!(isDefaultVimeoUrl(videoUrl) || isEmbedVimeoUrl(videoUrl));
};
/*
 ******************************************************************************
 *   IDs from URLs                                                            *
 ******************************************************************************/

var getYoutubeVideoIdFromUrl$1 = function getYoutubeVideoIdFromUrl(videoUrl) {
  var isYT = isLongYoutubeUrl(videoUrl);
  var isShortYT = isShortYoutubeUrl(videoUrl);
  var isEmbedYT = isEmbedYoutubeUrl(videoUrl);

  if (isYT && isYT[1]) {
    return isYT[1];
  } else if (isShortYT && isShortYT[1]) {
    return isShortYT[1];
  } else if (isEmbedYT && isEmbedYT[1]) {
    return isEmbedYT[1];
  } else {
    return null;
  }
};
var getVimeoVideoIdFromUrl$1 = function getVimeoVideoIdFromUrl(videoUrl) {
  var isVimeo = isDefaultVimeoUrl(videoUrl);
  var isEmbedVimeo = isEmbedVimeoUrl(videoUrl);

  if (isVimeo && isVimeo[1]) {
    return isVimeo[1];
  } else if (isEmbedVimeo && isEmbedVimeo[1]) {
    return isEmbedVimeo[1];
  } else {
    return null;
  }
};
/*
 ******************************************************************************
 *   Prêt-a-manger embed urls                                                 *
 ******************************************************************************/

var getYoutubeEmbedByUrl = function getYoutubeEmbedByUrl(videoUrl) {
  if (!isYoutubeUrl$1(videoUrl)) return null;else if (isEmbedYoutubeUrl(videoUrl)) return videoUrl;
  var videoId = getYoutubeVideoIdFromUrl$1(videoUrl);
  return getYoutubeEmbedUrlFromVideoId(videoId);
};
var getVimeoEmbedByUrl = function getVimeoEmbedByUrl(videoUrl) {
  if (!isVimeoUrl$1(videoUrl)) return null;else if (isEmbedVimeoUrl(videoUrl)) return videoUrl;
  var videoId = getVimeoVideoIdFromUrl$1(videoUrl);
  return getVimeoEmbedUrlFromVideoId(videoId);
};
/*
 ******************************************************************************
 *   Full service embed URL generator                                         *
 ******************************************************************************/

var getVideoEmbed = function getVideoEmbed(videoUrl) {
  var isIframe = isIframeString(videoUrl);

  if (isIframe && isIframe[1]) {
    return isIframe[1];
  }

  if (isYoutubeUrl$1(videoUrl)) return getYoutubeEmbedByUrl(videoUrl);
  if (isVimeoUrl$1(videoUrl)) return getVimeoEmbedByUrl(videoUrl);
  return videoUrl;
};
/*
 ******************************************************************************
 *   Bonus: Thumbnails                                                        *
 ******************************************************************************/

var getYoutubeThumbnailUrlByVideoId$1 = function getYoutubeThumbnailUrlByVideoId(videoId) {
  dispatch$1('core/notices').createSuccessNotice('Found Youtube video thumbnail.', {
    id: 'videoThumbGetterSuccess',
    isDismissible: true
  });
  return "https://img.youtube.com/vi/".concat(videoId, "/hqdefault.jpg");
};
/**
 * @param {string} videoId
 * @return {Promise<any>}
 */

var getVimeoThumbnailUrlByVideoId$1 = function getVimeoThumbnailUrlByVideoId(videoId) {
  return fetch("https://vimeo.com/api/v2/video/".concat(videoId, ".json")).then(function (response) {
    return response.json();
  }).then(function (result) {
    return result[0];
  }).then(function (result) {
    if (result && result['thumbnail_large']) {
      dispatch$1('core/notices').createSuccessNotice('Found Vimeo thumbnail.', {
        id: 'vimeoThumbGetterSuccess',
        isDismissible: true
      });
      return result['thumbnail_large'];
    } else {
      throw new Error('No matching thumbnail received');
    }
  })["catch"](function (err) {
    dispatch$1('core/notices').createWarningNotice('Fetching Vimeo thumbnail failed: ' + err, {
      id: 'vimeoThumbGetterFailed',
      isDismissible: true
    });
    return '';
  });
};

var index$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getYoutubeEmbedUrlFromVideoId: getYoutubeEmbedUrlFromVideoId,
	getVimeoEmbedUrlFromVideoId: getVimeoEmbedUrlFromVideoId,
	isYoutubeUrl: isYoutubeUrl$1,
	isVimeoUrl: isVimeoUrl$1,
	getYoutubeVideoIdFromUrl: getYoutubeVideoIdFromUrl$1,
	getVimeoVideoIdFromUrl: getVimeoVideoIdFromUrl$1,
	getYoutubeEmbedByUrl: getYoutubeEmbedByUrl,
	getVimeoEmbedByUrl: getVimeoEmbedByUrl,
	getVideoEmbed: getVideoEmbed,
	getYoutubeThumbnailUrlByVideoId: getYoutubeThumbnailUrlByVideoId$1,
	getVimeoThumbnailUrlByVideoId: getVimeoThumbnailUrlByVideoId$1
});

data.withSelect;

var ImageSelect = ImageSelect$1,
    SpinnerOverlay = SpinnerOverlay$1;
var videoProviderUtils = index$2;

var attributes = {
  mediaURL: {
    type: 'string',
    "default": null
  },
  mediaID: {
    type: 'number'
  },
  mediaAltText: {
    type: 'string'
  },
  videoUrl: {
    type: 'string'
  },
  videoUrlInput: {
    type: 'string'
  },
  providerThumbnailUrl: {
    type: 'string'
  },
  providerType: {
    type: 'string',
    "default": 'youtube'
  }
};

var classnames$1 = {exports: {}};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames$1));

var classnames = classnames$1.exports;

var PlayCircle = function PlayCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    className: "icon-play-circle",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "100",
    viewBox: "0 0 100 100"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M50,100a50,50,0,1,1,50-50A50.0575,50.0575,0,0,1,50,100ZM50,6.7754A43.224,43.224,0,1,0,93.2235,50,43.2732,43.2732,0,0,0,50,6.7754Z"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "39.724 67.356 39.72 32.644 69.585 50 39.724 67.356"
  }));
};

/* global editorData */
var getVimeoThumbnailUrlByVideoId = videoProviderUtils.getVimeoThumbnailUrlByVideoId,
    getVimeoVideoIdFromUrl = videoProviderUtils.getVimeoVideoIdFromUrl,
    getYoutubeThumbnailUrlByVideoId = videoProviderUtils.getYoutubeThumbnailUrlByVideoId,
    getYoutubeVideoIdFromUrl = videoProviderUtils.getYoutubeVideoIdFromUrl,
    isVimeoUrl = videoProviderUtils.isVimeoUrl,
    isYoutubeUrl = videoProviderUtils.isYoutubeUrl;
var dispatch = data.dispatch;
/**
 * @param videoId
 * @param props
 */

var setYoutubeThumbnailUrl = function setYoutubeThumbnailUrl(videoId, props) {
  var setAttributes = props.setAttributes;
  setAttributes({
    providerThumbnailUrl: getYoutubeThumbnailUrlByVideoId(videoId)
  });
};
/**
 * @param videoId
 * @param props
 */

var setVimeoThumbnailUrl = function setVimeoThumbnailUrl(videoId, props) {
  var setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });
  getVimeoThumbnailUrlByVideoId(videoId).then(function (mediaURL) {
    if (mediaURL) {
      setAttributes({
        providerThumbnailUrl: mediaURL
      });
    }

    setState({
      isLoading: false
    });
  });
};
/**
 * @param videoUrl
 * @param props
 */

var checkForThumbnailImage = function checkForThumbnailImage(videoUrl, props) {
  var mediaID = props.attributes.mediaID,
      setState = props.setState;

  if (!mediaID) {
    setState({
      isLoading: true
    });

    if (isYoutubeUrl(videoUrl)) {
      var videoId = getYoutubeVideoIdFromUrl(videoUrl);
      setYoutubeThumbnailUrl(videoId, props);
      setState({
        isLoading: false
      });
    } else if (isVimeoUrl(videoUrl)) {
      var _videoId = getVimeoVideoIdFromUrl(videoUrl);

      setVimeoThumbnailUrl(_videoId, props);
    } else {
      setState({
        isLoading: false
      });
    }
  }
};
/**
 * @param videoUrl
 * @param props
 */

var onVideoUrlChanged = function onVideoUrlChanged(videoUrl, props) {
  var setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });

  if (isYoutubeUrl(videoUrl)) {
    var videoId = getYoutubeVideoIdFromUrl(videoUrl);
    setYoutubeThumbnailUrl(videoId, props); // setAttributes({
    //     videoUrl: videoUrl,
    // });
    // setState({ isLoading: false });
  } else if (isVimeoUrl(videoUrl)) {
    var _videoId2 = getVimeoVideoIdFromUrl(videoUrl);

    setVimeoThumbnailUrl(_videoId2, props); // setAttributes({
    //     videoUrl: videoUrl,
    // });
  } else {
    dispatch('core/notices').createWarningNotice('Could not identify video provider. This URL might not work as expected.', {
      id: 'videoIdentificationFailure',
      isDismissible: true
    });
  }

  setAttributes({
    videoUrl: videoUrl
  });
  setState({
    isLoading: false
  });
};
function sideloadProviderImage(props) {
  var providerThumbnailUrl = props.attributes.providerThumbnailUrl,
      setAttributes = props.setAttributes,
      setState = props.setState;
  setState({
    isLoading: true
  });
  fetch("".concat(editorData.restCustomUrl, "/sideload"), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-WP-Nonce': editorData.restApiNonce || ''
    },
    body: JSON.stringify({
      imageUrl: providerThumbnailUrl
    })
  }).then(function (res) {
    return res.json();
  }).then(function (result) {
    if (result.mediaId && result.mediaUrl) {
      setAttributes({
        mediaID: result.mediaId,
        mediaURL: result.mediaUrl
      });
    } else {
      throw 'Image sideload failed. Please check the URL is valid and links directly to a proper image file and retry.';
    }
  })["catch"](function (e) {
    dispatch('core/notices').createWarningNotice(e.toUpperCase ? e : JSON.stringify(e), {
      id: 'videoSideloadFailure',
      isDismissible: true
    });
  }).then(function () {
    setState({
      isLoading: false
    });
  });
}

/* global editorData */
function getEmbedTypeOptions() {
  if (editorData && editorData.embedTypes) {
    return Object.keys(editorData.embedTypes).map(function (embedType) {
      return {
        label: editorData.embedTypes[embedType].displayName || embedType,
        value: embedType
      };
    });
  } else {
    return null;
  }
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root$1.Date.now();
};

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && baseGetTag$1(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var URLInput = blockEditor.URLInput;
var BaseControl = components.BaseControl;
var __$2 = i18n.__;
var VideoSearch = function VideoSearch(props) {
  var search = props.search,
      setState = props.setState;
  var onVideoUrlChangedDebounced = debounce(onVideoUrlChanged, 1000);
  return /*#__PURE__*/React.createElement(BaseControl, {
    className: "editor-url-input block-editor-url-input is-full-width has-border"
  }, /*#__PURE__*/React.createElement(URLInput, {
    label: __$2('Video URL', 'ghwp'),
    value: search,
    onChange: function onChange(videoUrl) {
      setState({
        search: videoUrl
      });
      onVideoUrlChangedDebounced(videoUrl, props);
    }
  }));
};

var Button = components.Button,
    Icon = components.Icon,
    Placeholder = components.Placeholder,
    Popover = components.Popover,
    SelectControl = components.SelectControl;
var withState = compose.withState;
var __$1 = i18n.__;

var HelpPopoverContent = function HelpPopoverContent() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ghwp-editor-help"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Retry getting original thumbnail', 'ghwp'), " /", ' ', __$1('Try to get the original thumbnail', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Attempts to retrieve the thumbnail image from the Video provider (Youtube / Vimeo). You will see a preview of that image above the button.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Sideload the provider image', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Will save the thumbnail retrieved from the video provider to the local media library and set it as the video block's thumbnail image.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("h6", null, __$1('Change thumbnail image', 'ghwp')), /*#__PURE__*/React.createElement("p", null, "Allows you to pick an existing image or upload an image to use as the thumbnail picture for the video block."))));
};

var VideoEditSettings = function VideoEditSettings(props) {
  var _props$attributes = props.attributes,
      providerThumbnailUrl = _props$attributes.providerThumbnailUrl,
      videoUrl = _props$attributes.videoUrl,
      helpVisible = props.helpVisible,
      isSelected = props.isSelected,
      setState = props.setState;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-video-edit__settings', {
      'ghwp-video-edit__settings--active': isSelected
    })
  }, isSelected && /*#__PURE__*/React.createElement(React.Fragment, null, providerThumbnailUrl && /*#__PURE__*/React.createElement("img", {
    width: "120",
    height: "auto",
    src: providerThumbnailUrl,
    alt: "Provider Thumbnail",
    className: "ghwp-video-edit__provider-thumb"
  }), /*#__PURE__*/React.createElement(Button, {
    isPrimary: true,
    onClick: function onClick() {
      videoUrl && checkForThumbnailImage(videoUrl, props);
    }
  }, __$1(providerThumbnailUrl ? 'Retry getting original thumbnail' : 'Try to get the original thumbnail', 'ghwp')), providerThumbnailUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    isPrimary: true,
    onClick: function onClick() {
      return sideloadProviderImage(props);
    }
  }, __$1('Sideload the provider image', 'ghwp'))), /*#__PURE__*/React.createElement(ImageSelect, _extends$1({
    buttonLabel: "Select thumbnail",
    buttonChangeLabel: "Change thumbnail image"
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "help"
  }, /*#__PURE__*/React.createElement(Button, {
    isSecondary: true,
    onClick: function onClick() {
      setState({
        helpVisible: true
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: "editor-help"
  })), helpVisible && /*#__PURE__*/React.createElement(Popover, {
    onClose: function onClose() {
      setState({
        helpVisible: false
      });
    }
  }, /*#__PURE__*/React.createElement(HelpPopoverContent, null)))));
};

var Edit = function Edit(props) {
  var _props$attributes2 = props.attributes,
      mediaAltText = _props$attributes2.mediaAltText,
      mediaURL = _props$attributes2.mediaURL,
      providerType = _props$attributes2.providerType,
      videoUrl = _props$attributes2.videoUrl,
      isLoading = props.isLoading,
      isSelected = props.isSelected,
      search = props.search,
      setAttributes = props.setAttributes,
      setState = props.setState;

  if (!search && videoUrl) {
    setState({
      search: videoUrl
    });
  }

  var embedTypeOptions = getEmbedTypeOptions();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video-edit"
  }, isLoading && /*#__PURE__*/React.createElement(SpinnerOverlay, null), videoUrl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ghwp-video-link"
  }, /*#__PURE__*/React.createElement("img", {
    width: "480",
    height: "270",
    src: mediaURL,
    alt: mediaAltText
  }), /*#__PURE__*/React.createElement(PlayCircle, null))), /*#__PURE__*/React.createElement(VideoEditSettings, props), /*#__PURE__*/React.createElement("div", {
    className: classnames('ghwp-video-edit__search', {
      'ghwp-video-edit__search--active': isSelected
    })
  }, isSelected && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VideoSearch, props), embedTypeOptions && /*#__PURE__*/React.createElement(SelectControl, {
    label: __$1('Consent Typ'),
    value: providerType,
    options: embedTypeOptions,
    onChange: function onChange(providerType) {
      setAttributes({
        providerType: providerType
      });
    }
  })))) : /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(VideoSearch, props), embedTypeOptions && /*#__PURE__*/React.createElement(SelectControl, {
    label: __$1('Consent Typ'),
    value: providerType,
    options: embedTypeOptions,
    onChange: function onChange(providerType) {
      setAttributes({
        providerType: providerType
      });
    }
  }))));
};

var edit = withState({
  search: '',
  isLoading: false,
  helpVisible: false
})(Edit);

var save = function save() {
  return null;
};

var registerBlockType = blocks.registerBlockType;
var __ = i18n.__;
var VideoOverlayIcon = materialDesignIcons.QueuePlayNext;
function register(_ref) {
  var _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? attributes : _ref$attributes,
      _ref$edit = _ref.edit,
      edit = _ref$edit === void 0 ? edit : _ref$edit,
      _ref$save = _ref.save,
      save = _ref$save === void 0 ? save : _ref$save,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? [] : _ref$styles,
      _ref$deprecated = _ref.deprecated,
      deprecated = _ref$deprecated === void 0 ? deprecated : _ref$deprecated,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? /*#__PURE__*/React.createElement(VideoOverlayIcon, null) : _ref$icon,
      _ref$category = _ref.category,
      category = _ref$category === void 0 ? 'layout' : _ref$category,
      _ref$supports = _ref.supports,
      supports = _ref$supports === void 0 ? {
    anchor: true
  } : _ref$supports;
  registerBlockType('ghwp/video-overlay', {
    title: __('Video Thumbnail & Overlay', 'ghwp'),
    icon: icon,
    description: __('A video thumbnail with a play button opening a video overlay', 'ghwp'),
    styles: styles,
    category: category,
    attributes: attributes,
    supports: supports,
    edit: edit,
    save: save,
    deprecated: deprecated
  });
}

export { LightboxFactory, attributes, edit, register, save };
//# sourceMappingURL=index.js.map
