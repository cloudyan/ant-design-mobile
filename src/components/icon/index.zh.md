# Icon

- https://www.iconfont.cn/

1. 使用 iconfont.cn 做 icon 图标的管理
   1. [图标绘制](https://www.iconfont.cn/help/detail)
   2. 存储为 svg 格式（建议使用存储为 svg，不要使用导出为 svg）
2. 解决 iconfont.cn 的产物做图标的使用
   1. [代码使用](https://www.iconfont.cn/help/detail?helptype=code)

### iconfont 平台管理及使用

统一标准

1. [图标绘制](https://www.iconfont.cn/help/detail)
   1. 统一 svg 纯色图标（注意边线风格等一致）
   2. 画布统一正方形
   3. 存储为 svg 格式（建议使用存储为 svg，不要使用导出为 svg）
2. iconfont 配置规范
   1. 改 FontClass 前缀为 `${FontFamily}-`
   2. FontFamily 命名为 `xxfont` 格式
3. 代码使用，参见以下示例
   1. font-class 方式
   2. symbol 方式

```html
<!-- 拷贝项目下面生成的fontclass代码 -->
<!-- font-class 方式引用 -->
<i class="xxfont xxfont-select"></i>

<!-- symbol 方式引用 -->
<svg class="xxfont" aria-hidden="true">
  <use xlink:href="#xxfont-select"></use>
</svg>
```

## 何时使用

Icon 图标集合，一般分两个库来管理

1. 公共库，跟随基础组件库迭代管理，更标准化
2. 业务库，跟随业务项目迭代管理，更灵活

## 示例

<code src="./demos/demo1.tsx"></code>
