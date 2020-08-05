# Deprecated: QuerySelectorObserver

Please use **[qsa-observer](https://github.com/WebReflection/qsa-observer#readme)** instead, as it's been used in various other libraries, hence it's way more battle-tested, and better, than this initial attempt.

- - -

100% inspired by a [Daniel](https://twitter.com/csuwildcat)'s [hack](http://www.backalleycoder.com/2012/08/06/css-selector-listeners/), this module brings a friendly [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) like API to observe CSS selectors instead.

```js

const so = new QuerySelectorObserver(records => {
  for (const record of records) {
    if (record.addedNodes.length) {
      record.target.textContent = 'Hello via QSO!';
      console.log(record.addedNodes);
    } else {
      console.log(record.removedNodes);
    }
  }
});

so.observe('.some-selector');
so.observe('#some-complex > .selector + p.cool');

button.onclick = () => so.disconnect();
```

Compatible with IE11 and other browsers, feel free to [test it live](https://webreflection.github.io/qso/test/).
