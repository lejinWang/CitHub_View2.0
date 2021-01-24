var $ELEMENT = {};

var setConfig = function setConfig(option) {
  $ELEMENT = option;
};

var getConfig = function getConfig(key) {
  return $ELEMENT[key];
};

export { getConfig, setConfig };