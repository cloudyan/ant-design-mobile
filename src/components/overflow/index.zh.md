# Overflow 展开更多

用于特定空间展示内容，超出时会自动隐藏内容，展开更多。

> `Ellipsis` 仅支持文本，`Overflow` 支持富文本以及 React 组件。

## 何时使用

- 文本内容长度或高度超过列宽或行高。
- 图表中空间有限，文本内容无法完全显示。
- 自适应调整时宽度变小。
- 内容存在富文本或 React 组件。

## 示例

<code src="./demos/demo1.tsx"></code>

## Overflow

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 展示几行 | `number` | `1` |
| content | 文本内容 | `React.ReactNode` | - |
| justify | 省略位置 | `'center' \| 'end'` |
| expandText | 展开操作的文案 | `React.ReactNode` | `''` |
| collapseText | 收起操作的文案 | `React.ReactNode` | `''` |
| onContentClick | 点击文本内容时触发 | `(e: React.MouseEvent) => void` | - |
| stopPropagationForActionButtons | 阻止展开操作，收起操作引发的事件冒泡 | `PropagationEvent[]` | `[]` |
| defaultExpanded | 是否默认展开 | `boolean` | `false` |

showMore/hideMore

## FAQ

实现方式

1. css 模式，通过纯 css 实现，超出省略，结合内置样式实现即可（`.max-line-${n}`）
   1. 不支持交互行为，如展开收起
2. float 模式，通过 float 特性，实现超出省略，展示更多
3. viewport 模式，通过监听元素是否进入 viewport 实现
   1. 底层为 Intersection Observer API，检测目标元素与祖先元素或 viewport 相交情况
