import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { EVENT_CODE, triggerEvent } from "../aria";
import SubMenu from "./submenu";

var MenuItem = /*#__PURE__*/function () {
  function MenuItem(domNode) {
    this.domNode = domNode;

    _defineProperty(this, "submenu", null);

    this.submenu = null;
    this.init();
  }

  var _proto = MenuItem.prototype;

  _proto.init = function init() {
    this.domNode.setAttribute('tabindex', '0');
    var menuChild = this.domNode.querySelector('.el-menu');

    if (menuChild) {
      this.submenu = new SubMenu(this, menuChild);
    }

    this.addListeners();
  };

  _proto.addListeners = function addListeners() {
    var _this = this;

    this.domNode.addEventListener('keydown', function (event) {
      var prevDef = false;

      switch (event.code) {
        case EVENT_CODE.down:
          {
            triggerEvent(event.currentTarget, 'mouseenter');
            _this.submenu && _this.submenu.gotoSubIndex(0);
            prevDef = true;
            break;
          }

        case EVENT_CODE.up:
          {
            triggerEvent(event.currentTarget, 'mouseenter');
            _this.submenu && _this.submenu.gotoSubIndex(_this.submenu.subMenuItems.length - 1);
            prevDef = true;
            break;
          }

        case EVENT_CODE.tab:
          {
            triggerEvent(event.currentTarget, 'mouseleave');
            break;
          }

        case EVENT_CODE.enter:
        case EVENT_CODE.space:
          {
            prevDef = true;
            event.currentTarget.click();
            break;
          }
      }

      if (prevDef) {
        event.preventDefault();
      }
    });
  };

  return MenuItem;
}();

export default MenuItem;