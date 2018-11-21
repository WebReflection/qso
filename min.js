/*! (c) Andrea Giammarchi - ISC */
var QuerySelectorObserver=function(){"use strict";var t=0,n=typeof Reflect==typeof n,a=["animationstart","webkitAnimationStart","MSAnimationStart"],s=["","-webkit-","-moz-","-ms-","-o-"],e=o.prototype,i=new WeakMap,f=[],r=null;return h.prototype.type="childList",e.connected=!0,e.handleEvent=function(e){e.animationName===this.I&&(e.preventDefault(),e.stopPropagation(),this.$([new h(!0,[function(e,t){var n=i.get(t);n?n.indexOf(e)<0&&n.push(e):i.set(t,[e]);return t}(this,e.target)],[])]))},e.observe=function(e){f.indexOf(e)<0&&f.push(e),r||(r=new MutationObserver(function(e){for(var t=0,n=e.length;t<n;t++)for(var o,r,i=e[t].removedNodes,a=0,s=i.length;a<s;a++)if(1===(o=i[a]).nodeType){u(o),r=o.querySelectorAll(f);for(var h=0,c=r.length;h<c;h++)u(r[h])}})).observe(document,{childList:!0,subtree:!0});var t=this._,n=this.I,o=this.P;t.length||function(e,t,n){for(var o=0,r=a.length;o<r;o++)document.addEventListener(a[o],e,!0);for(var i=[],o=0,r=s.length;o<r;o++)i[o]="@"+s[o]+"keyframes "+t+["{from{",":#fff;}to{",":#000;}}"].join(n);e._.push(c(i.join("\n")))}(this,n,o),t.push(c(function(e,t){for(var n=[],o=0,r=s.length;o<r;o++)n[o]=["","animation-duration:0.001s;","animation-name:"+t].join(s[o]);return e+"{"+n.join(";")+";}"}(e,n)))},e.disconnect=function(){!function(e){e.connected=!1;for(var t=0,n=a.length;t<n;t++)document.removeEventListener(a[t],e,!0);for(var o=e._.splice(0),t=0,n=o.length;t<n;t++){var r=o[t],i=r.parentNode;i&&i.removeChild(r)}}(this)},o;function o(e){this._=[],this.$=e,this.I="selector-observer-"+t++,this.P=n?"outline-color":"--"+this.I}function h(e,t,n){this.addedNodes=t,this.removedNodes=n,this.target=e?t[0]:n[0]}function u(e){var t=i.get(e);if(t){i.delete(e);for(var n,o=0,r=t.length;o<r;o++)(n=t[o]).connected&&n.$([new h(!1,[],[e])])}}function c(e){var t=document,n=t.createElement("style");return n.textContent=e,t.head.appendChild(n)}}();