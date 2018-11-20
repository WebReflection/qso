/*! (c) Andrea Giammarchi - ISC */
var QuerySelectorObserver = (function () {
  var type = ['animationstart', 'webkitAnimationStart', 'MSAnimationStart'];
  var prefix = ['-webkit-', '-o-', '-ms-', '-moz-', ''];
  var proto = QuerySelectorObserver.prototype;
  var IE = typeof Reflect == typeof IE;
  var dd = IE ? '' : '--';
  var I = 0;
  proto.handleEvent = function (event) {
    if (event.animationName === this.I) {
      event.preventDefault();
      event.stopPropagation();
      // sending an array of targets only
      // to allow batched events in the future
      this.$([{target: event.target}]);
    }
  };
  proto.observe = function (selector) {
    var _ = this._;
    var I = this.I;
    if (!_.length)
      connectObserver(this, I);
    _.push(style(createAnimation(selector, I)));
  };
  proto.disconnect = function () {
    disconnectObserver(this);
  };
  return QuerySelectorObserver;
  function QuerySelectorObserver(callback) {
    this.$ = callback;
    this._ = [];
    this.I = IE ? 'outline-color' : ('selector-observer-' + I++);
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
  function connectObserver(so, name) {
    for (var i = 0, length = type.length; i < length; i++)
      document.addEventListener(type[i], so, true);
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = [
        '@' + prefix[i] + 'keyframes ',
        '{from{' + dd,
        ':#fff;}to{' + dd,
        ':#000;}}'
      ].join(name);
    so._.push(style(text.join('\n')));
  }
  function createAnimation(selector, name) {
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = ['',
        'animation-duration:0.001s;',
        'animation-name:' + name
      ].join(prefix[i]);
    return selector + '{' + text.join(';') + ';}';
  }
  function style(css) {
    var d = document;
    var s = d.createElement('style');
    s.textContent = css;
    return d.documentElement.appendChild(s);
  }
}());
module.exports = QuerySelectorObserver;
