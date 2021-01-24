import MenuItem from "./menu-item";

var Menu = /*#__PURE__*/function () {
  function Menu(domNode) {
    this.domNode = domNode;
    this.init();
  }

  var _proto = Menu.prototype;

  _proto.init = function init() {
    var menuChildren = this.domNode.childNodes;
    [].filter.call(menuChildren, function (child) {
      return child.nodeType === 1;
    }).forEach(function (child) {
      new MenuItem(child);
    });
  };

  return Menu;
}();

export default Menu;