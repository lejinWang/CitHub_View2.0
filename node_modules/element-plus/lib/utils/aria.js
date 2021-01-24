export var EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft',
  // 37
  up: 'ArrowUp',
  // 38
  right: 'ArrowRight',
  // 39
  down: 'ArrowDown',
  // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace'
};
var FOCUSABLE_ELEMENT_SELECTORS = "a[href],button:not([disabled]),button:not([hidden]),:not([tabindex=\"-1\"]),input:not([disabled]),input:not([type=\"hidden\"]),select:not([disabled]),textarea:not([disabled])";
/**
 * Determine if the testing element is visible on screen no matter if its on the viewport or not
 */

export var isVisible = function isVisible(element) {
  if (process.env.NODE_ENV === 'test') return true;
  var computed = getComputedStyle(element); // element.offsetParent won't work on fix positioned
  // WARNING: potential issue here, going to need some expert advices on this issue

  return computed.position === 'fixed' ? false : element.offsetParent !== null;
};
export var obtainAllFocusableElements = function obtainAllFocusableElements(element) {
  return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(isFocusable).filter(isVisible);
};
/**
 * @desc Determine if target element is focusable
 * @param element {HTMLElement}
 * @returns {Boolean} true if it is focusable
 */

export var isFocusable = function isFocusable(element) {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute('tabIndex') !== null) {
    return true;
  } // HTMLButtonElement has disabled


  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case 'A':
      {
        // casting current element to Specific HTMLElement in order to be more type precise
        return !!element.href && element.rel !== 'ignore';
      }

    case 'INPUT':
      {
        return !(element.type === 'hidden' || element.type === 'file');
      }

    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      {
        return true;
      }

    default:
      {
        return false;
      }
  }
};
/**
 * @desc Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns
 *  true if element is focused.
 */

export var attemptFocus = function attemptFocus(element) {
  if (!isFocusable(element)) {
    return false;
  }

  Utils.IgnoreUtilFocusChanges = true; // Remove the old try catch block since there will be no error to be thrown

  element.focus == null ? void 0 : element.focus();
  Utils.IgnoreUtilFocusChanges = false;
  return document.activeElement === element;
};
/**
 * Trigger an event
 * mouseenter, mouseleave, mouseover, keyup, change, click, etc.
 * @param  {HTMLElement} elm
 * @param  {String} name
 * @param  {*} opts
 */

export var triggerEvent = function triggerEvent(elm, name) {
  var eventName;

  if (name.includes('mouse') || name.includes('click')) {
    eventName = 'MouseEvents';
  } else if (name.includes('key')) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }

  var evt = document.createEvent(eventName);

  for (var _len = arguments.length, opts = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    opts[_key - 2] = arguments[_key];
  }

  evt.initEvent.apply(evt, [name].concat(opts));
  elm.dispatchEvent(evt);
  return elm;
};
var Utils = {
  IgnoreUtilFocusChanges: false,

  /**
   * @desc Set focus on descendant nodes until the first focusable element is
   *       found.
   * @param {HTMLElement} element
   *          DOM node for which to find the first focusable descendant.
   * @returns {Boolean}
   *  true if a focusable element is found and focus is set.
   */
  focusFirstDescendant: function focusFirstDescendant(element) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var child = element.childNodes[i];

      if (attemptFocus(child) || this.focusFirstDescendant(child)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @desc Find the last descendant node that is focusable.
   * @param {HTMLElement} element
   *          DOM node for which to find the last focusable descendant.
   * @returns {Boolean}
   *  true if a focusable element is found and focus is set.
   */
  focusLastDescendant: function focusLastDescendant(element) {
    for (var i = element.childNodes.length - 1; i >= 0; i--) {
      var child = element.childNodes[i];

      if (attemptFocus(child) || this.focusLastDescendant(child)) {
        return true;
      }
    }

    return false;
  }
};
export default Utils;