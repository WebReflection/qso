/*! (c) Andrea Giammarchi - ISC */
var QuerySelectorObserver=function(){var a=["animationstart","webkitAnimationStart","MSAnimationStart"],i=["-webkit-","-o-","-ms-","-moz-",""],t=o.prototype,e=typeof Reflect==typeof e,s=e?"":"--",n=0;return t.handleEvent=function(t){t.animationName===this.I&&(t.preventDefault(),t.stopPropagation(),this.$([{target:t.target}]))},t.observe=function(t){var e=this._,n=this.I;e.length||function(t,e){for(var n=0,o=a.length;n<o;n++)document.addEventListener(a[n],t,!0);for(var r=[],n=0,o=i.length;n<o;n++)r[n]=["@"+i[n]+"keyframes ","{from{"+s,":#fff;}to{"+s,":#000;}}"].join(e);t._.push(f(r.join("\n")))}(this,n),e.push(f(function(t,e){for(var n=[],o=0,r=i.length;o<r;o++)n[o]=["","animation-duration:0.001s;","animation-name:"+e].join(i[o]);return t+"{"+n.join(";")+";}"}(t,n)))},t.disconnect=function(){!function(t){for(var e=0,n=a.length;e<n;e++)document.removeEventListener(a[e],t,!0);for(var o=t._.splice(0),e=0,n=o.length;e<n;e++){var r=o[e],i=r.parentNode;i&&i.removeChild(r)}}(this)},o;function o(t){this.$=t,this._=[],this.I=e?"outline-color":"selector-observer-"+n++}function f(t){var e=document,n=e.createElement("style");return n.textContent=t,e.documentElement.appendChild(n)}}();