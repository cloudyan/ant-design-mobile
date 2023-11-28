# FAQ

- `e.stopPropagation()`
- `e.stopImmediatePropagation()`
- `e.nativeEvent.stopImmediatePropagation()`

> 阻止合成事件间的冒泡，用 e.stopPropagation()
>
> 阻止合成事件与最外层 document 上的事件间的冒泡，用 e.nativeEvent.stopImmediatePropagation()

通过 React 绑定的事件，其回调函数中的 `event` 对象，是经过 React 合成的 `SyntheticEvent`，与原生的 DOM 事件的 `event` 不是一回事。准确地说，在 React 中，`e.nativeEvent` 才是原生 DOM 事件的那个 `event`。

参考

- https://segmentfault.com/a/1190000015725214
