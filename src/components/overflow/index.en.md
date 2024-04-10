# Overflow

When the display space is not enough, hide some content and replace it with "...".

## When to Use

- The text content length or height exceeds the column width or row height.
- The space in the chart is limited and the text content cannot be fully displayed.
- Width becomes smaller during adaptive adjustment.

## Demos

<code src="./demos/demo1.tsx"></code>

## Overflow

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| rows | The number to display lines | `number` | `1` |
| content | The text content | `React.ReactNode` | - |
| justify | Position omitted | `'center' \| 'end'` |
| expandText | Expand operation text | `React.ReactNode` | `''` |
| collapseText | Collapse operation text | `React.ReactNode` | `''` |
| onContentClick | Trigger when clicked text content | `(e: React.MouseEvent) => void` | - |
| stopPropagationForActionButtons | Prevent the event bubbling caused by the expand operation and the collapse operation | `PropagationEvent[]` | `[]` |
| defaultExpanded | Whether to expand by default | `boolean` | `false` |

## FAQ