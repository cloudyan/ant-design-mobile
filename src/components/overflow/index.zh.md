# Overflow 超出省略

用于展示空间不足时，隐去部分内容并用“...”替代，以及展开收起操作。

`Overflow` 仅支持 string 类型，`Overflow` 支持 ReactNode 类型。

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
