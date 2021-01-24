import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";

var ElementPlusError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ElementPlusError, _Error);

  function ElementPlusError(m) {
    var _this;

    _this = _Error.call(this, m) || this;
    _this.name = 'ElementPlusError';
    return _this;
  }

  return ElementPlusError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

export default (function (scope, m) {
  throw new ElementPlusError("[" + scope + "] " + m);
});
export function warn(scope, m) {
  console.warn(new ElementPlusError("[" + scope + "] " + m));
}