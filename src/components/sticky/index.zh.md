# Sticky 粘性布局

Sticky 组件与 CSS 中 `position: sticky` 属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

## 何时使用

- 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
- 页面可视范围过小时，慎用此功能以免遮挡页面内容。

## 示例

<code src="./demos/demo1.tsx"></code>

## Sticky

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
|      |      |      |        |

## FAQ

备注：[css sticky 兼容性良好](https://caniuse.com/?search=sticky)

### 失效的 `position: sticky`

1. 包裹的父容器高度与 `sticky` 元素一致
2. 包裹的父容器设置了 `overflow: hidden`

### 总结

`position: sticky` 的生效规则

1. 须指定 top, right, bottom 或 left 四个阈值其中之一（且达到设定的阈值），才可使粘性定位生效。否则其行为与相对定位相同；
   1. 并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高
2. 设定为 `position: sticky` 的元素的任意父节点的 overflow 属性必须是 visible，否则 `position: sticky` 不会生效；
   1. 如果 `position: sticky` 元素的任意父节点定位设置为 `position: overflow`，则父容器无法进行滚动，所以 `position: sticky` 元素也不会有滚动然后固定的情况
3. 在满足上述情况下，设定了 `position: sticky` 的元素的父容器的高度必须大于当前元素，否则也会失效。（当然，此时，sticky 吸附的基准元素就会变成父元素）

- https://github.com/chokcoco/iCSS/issues/85
- https://github.com/chokcoco/iCSS/issues/8
  - https://github.com/filamentgroup/fixed-sticky
