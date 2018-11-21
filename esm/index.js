/*! (c) Andrea Giammarchi - ISC */
var QuerySelectorObserver = (function () {'use strict';
  var I = 0;
  var IE = typeof Reflect == typeof IE;
  var type = ['animationstart', 'webkitAnimationStart', 'MSAnimationStart'];
  var prefix = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
  var proto = QuerySelectorObserver.prototype;
  var wm = new WeakMap;
  var query = [];
  var mo = null;
  Record.prototype.type = "childList";
  proto.connected = true;
  proto.handleEvent = function (event) {
    if (event.animationName === this.I) {
      event.preventDefault();
      event.stopPropagation();
      this.$([new Record(true, [register(this, event.target)], [])]);
    }
  };
  proto.observe = function (selector) {
    if (query.indexOf(selector) < 0)
      query.push(selector);
    if (!mo)
      observe();
    var _ = this._;
    var I = this.I;
    var P = this.P;
    if (!_.length)
      connectObserver(this, I, P);
    _.push(style(createAnimation(selector, I)));
  };
  proto.disconnect = function () {
    disconnectObserver(this);
  };
  return QuerySelectorObserver;
  function QuerySelectorObserver(callback) {
    this._ = [];
    this.$ = callback;
    this.I = 'selector-observer-' + I++;
    this.P = IE ? 'outline-color' : ('--' + this.I);
  }
  function Record(live, addedNodes, removedNodes) {
    this.addedNodes = addedNodes;
    this.removedNodes = removedNodes;
    this.target = live ? addedNodes[0] : removedNodes[0];
  }
  function disconnectObserver(so) {
    so.connected = false;
    for (var i = 0, length = type.length; i < length; i++)
      document.removeEventListener(type[i], so, true);
    for (var _ = so._.splice(0), i = 0, length = _.length; i < length; i++) {
      var style = _[i];
      var parentNode = style.parentNode;
      if (parentNode)
        parentNode.removeChild(style);
    }
  }
  function connectObserver(so, id, property) {
    for (var i = 0, length = type.length; i < length; i++)
      document.addEventListener(type[i], so, true);
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = '@' + prefix[i] + 'keyframes ' + id + [
        '{from{', ':#fff;}to{', ':#000;}}'
      ].join(property);
    so._.push(style(text.join('\n')));
  }
  function createAnimation(selector, id) {
    for (var text = [], i = 0, length = prefix.length; i < length; i++)
      text[i] = ['',
        'animation-duration:0.001s;',
        'animation-name:' + id
      ].join(prefix[i]);
    return selector + '{' + text.join(';') + ';}';
  }
  function notifyObservers(target) {
    var observers = wm.get(target);
    if (observers) {
      wm.delete(target);
      for (var so, i = 0, length = observers.length; i < length; i++) {
        so = observers[i];
        if (so.connected)
          so.$([new Record(false, [], [target])]);
      }
    }
  }
  function observe() {
    mo = new MutationObserver(function (records) {
      for (var i = 0, length = records.length; i < length; i++) {
        for (var
          target,
          nodes,
          removedNodes = records[i].removedNodes,
          j = 0, len = removedNodes.length; j < len; j++
        ) {
          target = removedNodes[j];
          if (target.nodeType === 1) {
            notifyObservers(target);
            nodes = target.querySelectorAll(query);
            for (var k = 0, l = nodes.length; k < l; k++) {
              notifyObservers(nodes[k]);
            }
          }
        }
      }
    });
    mo.observe(document, {childList: true, subtree: true});
  }
  function register(so, target) {
    var observers = wm.get(target);
    if (observers) {
      if (observers.indexOf(so) < 0)
        observers.push(so);
    }
    else
      wm.set(target, [so]);
    return target;
  }
  function style(css) {
    var d = document;
    var s = d.createElement('style');
    s.textContent = css;
    return d.head.appendChild(s);
  }
}());
export default QuerySelectorObserver;
