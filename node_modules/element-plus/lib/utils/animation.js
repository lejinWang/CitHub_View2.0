export var cubic = function cubic(value) {
  return Math.pow(value, 3);
};
export var easeInOutCubic = function easeInOutCubic(value) {
  return value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
};