# QuerySelectorObserver

100% inspired by a [Daniel](https://twitter.com/csuwildcat)'s [hack](http://www.backalleycoder.com/2012/08/06/css-selector-listeners/), this module brings a friendly [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) like API to observe CSS selectors instead.

```js
var so = new QuerySelectorObserver(
  elements => elements.forEach(el => {
    el.textContent = 'Hello via QSO!';
  })
);

so.observe('.some-selector');
so.observe('#some-complex > .selector + p.cool');

button.onclick = () => so.disconnect();
```
