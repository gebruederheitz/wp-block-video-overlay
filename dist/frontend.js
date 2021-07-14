import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

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
    if (!isArrayLike$1(collection) && !isObject$1(collection)) {
        collection = [collection];
    }
    if (size(collection) == 0) {
        return;
    }

    if (isArrayLike$1(collection) && !isObject$1(collection)) {
        let l = collection.length,
            i = 0;
        for (; i < l; i++) {
            if (callback.call(collection[i], collection[i], i, collection) === false) {
                break;
            }
        }
    } else if (isObject$1(collection)) {
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
        if (isFunction$1(withCallback)) {
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
        if (isFunction$1(callback)) {
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
            if (isFunction$1(callback)) {
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
        if (isFunction$1(callback)) {
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
    if (isFunction$1(waitFor)) {
        callback = waitFor;
        waitFor = false;
    }

    if (isString(waitFor) && (waitFor in window)) {
        if (isFunction$1(callback)) {
            callback();
        }
        return;
    }

    let found;

    if (url.indexOf('.css') !== -1) {
        found = document.querySelectorAll('link[href="' + url + '"]');
        if (found && found.length > 0) {
            if (isFunction$1(callback)) {
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
        if (isFunction$1(callback)) {
            callback();
        }
        return;
    }

    found = document.querySelectorAll('script[src="' + url + '"]');
    if (found && found.length > 0) {
        if (isFunction$1(callback)) {
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
        if (isFunction$1(callback)) {
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

function isFunction$1(f) {
    return typeof f === 'function';
}
function isString(s) {
    return typeof s === 'string';
}
function isNode(el) {
    return !!(el && el.nodeType && el.nodeType == 1);
}
function isArray$1(ar) {
    return Array.isArray(ar);
}
function isArrayLike$1(ar) {
    return (ar && ar.length && isFinite(ar.length));
}
function isObject$1(o) {
    let type = typeof o;
    return type === 'object' && (o != null && !isFunction$1(o) && !isArray$1(o));
}
function isNil(o) {
    return o == null;
}
function has(obj, key) {
    return obj !== null && hasOwnProperty.call(obj, key);
}
function size(o) {
    if (isObject$1(o)) {
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
        if (isFunction$1(callback)) {
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
            if (isFunction$1(callback)) {
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

    if (isFunction$1(callback)) {
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

        if (isObject$1(slideParamas)) {
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

        if (isObject$1(element) && !isNode(element)) {
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

        if (isFunction$1(settings.beforeSlideLoad)) {
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

        if (isFunction$1(settings.afterSlideLoad)) {
            finalCallback = () => {
                if (isFunction$1(callback)) {
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

                if (isFunction$1(finalCallback)) {
                    finalCallback();
                }
            });
            return;
        }

        if (isFunction$1(finalCallback)) {
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
        if (isFunction$1(this.settings.onOpen)) {
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
        if (isFunction$1(this.settings.slideInserted)) {
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
        if (isFunction$1(this.settings.slideRemoved)) {
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
                if (isFunction$1(this.settings.afterSlideChange)) {
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
                if (isFunction$1(this.settings.afterSlideChange)) {
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
        if (isFunction$1(this.settings.beforeSlideChange)) {
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

        if (!isNil(this.settings.elements) && isArray$1(this.settings.elements) && this.settings.elements.length) {
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
            if (isFunction$1(this.settings.onClose)) {
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
        if (!evt || !isFunction$1(callback)) {
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
function listCacheClear() {
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
function eq(value, other) {
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

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
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
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$a.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
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
var objectProto$9 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$9.toString;

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
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

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
      return funcToString$2.call(func);
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
var funcProto$1 = Function.prototype,
    objectProto$8 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$8.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
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
var Map = getNative(root, 'Map');

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
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

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
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

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
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
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
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
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
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
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
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
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
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
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
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

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
var Uint8Array = root.Uint8Array;

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
    if (!isObject(proto)) {
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
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

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
function isObjectLike(value) {
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
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$4.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

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
  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
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
var isArray = Array.isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

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
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
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
  return value != null && isLength(value.length) && !isFunction(value);
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
  return isObjectLike(value) && isArrayLike(value);
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
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

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
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$3 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$3.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$4.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
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
    weakMapTag = '[object WeakMap]';

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
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
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
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

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
var hasOwnProperty$3 = objectProto$2.hasOwnProperty;

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
  if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
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
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
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
var MAX_SAFE_INTEGER = 9007199254740991;

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
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
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
  if (!isObject(object)) {
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
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
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
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
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
    if (isObject(srcValue)) {
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
function identity(value) {
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
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

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
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
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
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
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
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
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
    _classCallCheck(this, LightboxFactory);

    this.plyrOptions = merge(defaultPlyrOptions, plyrOptions);
  }

  _createClass(LightboxFactory, [{
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

export { LightboxFactory };
