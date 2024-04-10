# Space 间距

元素排列中保持相同的宽度。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适用于多个元素按照水平或垂直方向保持相同的间距。

### 与 Flex 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 示例

<code src="./demos/demo1.tsx"></code>

<code src="./demos/demo2.tsx"></code>

## Space

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - |
| block | 是否渲染为块级元素 | `boolean` | `false` |
| direction | 间距方向 | `'vertical' \| 'horizontal'` | `'horizontal'` |
| justify | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| 'stretch'` | - |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | - |
| wrap | 是否自动换行，仅在 `horizontal` 时有效 | `boolean` | `false` |

### CSS 变量

| 属性             | 说明               | 默认值       |
| ---------------- | ------------------ | ------------ |
| --gap            | 间距大小           | `8px`        |
| --gap-horizontal | 水平方向的间距大小 | `var(--gap)` |
| --gap-vertical   | 垂直方向的间距大小 | `var(--gap)` |
