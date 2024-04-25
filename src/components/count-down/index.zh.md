# CountDown 倒计时

> TODO: 可参考 ant-design 统计数据组件，收纳类似组件。

用于实时展示倒计时数值，支持毫秒精度。

## 何时使用

- 展示倒计时时间
- 毫秒精度
- 自定义倒计时格式
- 手动控制开始，暂停和重置

## 示例

<code src="./demos/demo1.tsx"></code>

<code src="./demos/demo2.tsx"></code>

## CountDown

### 属性

| 属性        | 说明                 | 类型               | 默认值     |
| ----------- | -------------------- | ------------------ | ---------- |
| time        | 倒计时时长，单位毫秒 | `number \| string` | 0          |
| format      | 时间格式             | `string`           | `HH:mm:ss` |
| autoStart   | 是否自动开始倒计时   | `boolean`          | `true`     |
| millisecond | 是否开启毫秒级渲染   | `boolean`          | `false`    |

### format 格式

格式与 dayjs 保持一致，但仅支持天、时、分、秒、毫秒。

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### 事件

| 事件名   | 说明             | 回调参数                   |
| -------- | ---------------- | -------------------------- |
| onChange | 倒计时变化时触发 | `currentTime: CurrentTime` |
| onFinish | 倒计时结束时触发 | -                          |

### CurrentTime 格式

| 名称         | 说明                   | 类型   |
| ------------ | ---------------------- | ------ |
| total        | 剩余总时间（单位毫秒） | number |
| days         | 剩余天数               | number |
| hours        | 剩余小时               | number |
| minutes      | 剩余分钟               | number |
| seconds      | 剩余秒数               | number |
| milliseconds | 剩余毫秒               | number |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| start | 开始倒计时 | - | - |
| pause | 暂停倒计时 | - | - |
| reset | 重设倒计时，若 autoStart 为 true，重设后会自动开始倒计时 | - | - |

## FAQ

### 在 iOS 系统上倒计时不生效？

如果你遇到了在 iOS 上倒计时不生效的问题，请确认在创建 Date 对象时没有使用 `new Date('2020-01-01')` 这样的写法，iOS 不支持以中划线分隔的日期格式，正确写法是 `new Date('2020/01/01')`。

对此问题的详细解释：[stackoverflow](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)。
