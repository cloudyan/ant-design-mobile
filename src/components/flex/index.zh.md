# Flex 弹性布局

弹性布局

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 示例

<code src="./demos/demo1.tsx"></code>

组合使用

<code src="./demos/demo2.tsx"></code>

## Flex

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 对应 `flex-direction` | `row \| row-reverse \| column \| column-reverse` | `row` |
| wrap | 设置元素单行显示还是多行显示 | 参考 `flex-wrap` | |
| justify | 设置元素在主轴方向上的对齐方式 | 参考 `justify-content` | `normal` |
| align | 设置元素在交叉轴方向上的对齐方式 | 参考 `align-items` | `normal` |
| flex | flex CSS 简写属性 | 参考 `flex` | `normal` |
| gap | 设置网格之间的间隙 | `string \| number` | - |
| component | 自定义元素类型 | `React.ComponentType` | `div` |
