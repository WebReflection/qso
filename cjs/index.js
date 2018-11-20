/*! (c) Andrea Giammarchi - ISC */
var QuerySelectorObserver = (function () {
  function QuerySelectorObserver(callback) {
    this.$ = callback;
    this._ = [];
    this.I = 'selector-observer-' + I++;
  }
  var I = 0;
  var proto = QuerySelectorObserver.prototype;
  var prefix = [
    '-webkit-',
    '-o-',
    '-ms-',
    '-moz-',
    ''
  ];
  var type = [
    'animationstart',
    'webkitAnimationStart',
    'MSAnimationStart'
  ];
  proto.handleEvent = function (event) {
    if (event.animationName === this.I) {
      event.preventDefault();
      event.stopPropagation();
      // sending an array of targets only
      // to allow batched events in the future
      this.$([event.target]);
    }
  };
  proto.observe = function (selector) {
    var _ = this._;
    var I = this.I;
    if (!_.length)
      connectObserver(this, I);
    var s = style();
    s.textContent = createAnimation(selector, I);
    _.push(s);
  };
  proto.disconnect = function () {
    disconnectObserver(this);
  };
  return QuerySelectorObserver;
  function style() {
    var d = document;
    return d.documentElement.appendChild(d.createElement('style'));
  }
  function createAnimation(selector, name) {
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = ['', 'animation-duration:0.001s;', 'animation-name:' + name].join(prefix[i]);
    return selector + '{' + text.join(';') + ';}';
  }
  function connectObserver(so, name) {
    for (var i = 0, length = type.length; i < length; i++)
      document.addEventListener(type[i], so, true);
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = ['@' + prefix[i] + 'keyframes ', '{from{--', ':0;}to{--', ':1;}}'].join(name);
    var s = style();
    s.textContent = text.join('\n');
    so._.push(s);
  }
  function disconnectObserver(so) {
    for (var i = 0, length = type.length; i < length; i++)
      document.removeEventListener(type[i], so, true);
    for (var _ = so._.splice(0), i = 0, length = _.length; i < length; i++) {
      var style = _[i];
      var parentNode = style.parentNode;
      if (parentNode)
        parentNode.removeChild(style);
    }
  }
}());
module.exports = QuerySelectorObserver;
