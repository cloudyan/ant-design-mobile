# 主题

- 支持动态切换主题；
- 支持同时存在多个主题；
- 支持针对某个/某些组件修改主题变量；

得益于 CSS 变量强大而灵活的能力，自定义一套 antd-mobile 的主题是非常简单的，你不需要配置任何编译工具，也不需要安装额外的插件，直接修在 `:root` 覆盖 CSS 变量就可以了：

```css
:root:root {
  --adm-color-primary: #a062d4;
}
```

> 注：为什么要写两个重复的 `:root`？
>
> 由于 antd-mobile 中的主题变量也是在 `:root` 下声明的，所以在有些情况下会由于优先级的问题无法成功覆盖。通过 `:root:root` 可以显式地让你所写内容的优先级更高一些，从而确保主题变量的成功覆盖。

当然如果你只是希望对局部的主题进行调整，也可以把上面的 CSS 变量覆盖逻辑加在任何一个你想调整的节点上，例如：

```css
.purple-theme {
  --adm-color-primary: #a062d4;
}
```

```jsx
<div className='purple-theme'>
  <Button color='primary'>Purple</Button>
</div>
```

可以得到这样的一个按钮：

```jsx | preview
/**
 * inline: true
 */

import React from 'react'
import { Button } from 'antd-mobile'

export default () => {
  return (
    <div style={{
      ['--adm-color-primary']: '#a062d4',
    }}>
      <Button color='primary'>Purple</Button>
    </div>
  )
}
```

以下是 antd-mobile 目前提供的全局性 CSS 变量：

```css
:root {
  --adm-color-primary: #1677ff;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;

  --adm-color-white: #ffffff;
  --adm-color-text: #333333;
  --adm-color-text-secondary: #666666;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-color-border: #eeeeee;
  --adm-color-box: #f5f5f5;
  --adm-color-background: #ffffff;

  --adm-font-size-main: var(--adm-font-size-5);

  --adm-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue',
  helvetica, segoe ui, arial, roboto, 'PingFang SC', 'miui',
  'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}
```

<Alert type="warning">
  从 5.14.0 版本起，--adm-border-color 变量已经被弃用了，如果你在项目中用到了它，请替换为 --adm-color-border。我们将在下个大版本中移除 --adm-border-color。
</Alert>

此外，每个组件也有自己对应的 CSS 全局变量，你可以在它们的文档页面中找到，具体请参阅 [CSS 变量](/zh/guide/css-variables) 章节。

## 内置主题

自行按需扩展

```css
/* 红 橙 黄 绿 青 蓝 紫 彩 */
.adm-theme-m1 {
  --adm-color-primary: #17B271;
}

.adm-theme-m2 {
  --adm-color-primary: #3E5DD8;
}

.adm-theme-m3 {
  --adm-color-primary: #3E5DD8;
}

.adm-theme-m9 {
  --adm-color-primary: #3E5DD8;
}
```

明暗或者说浅色深色模式，不是主题

更强大功能，还需要参考 ant-design 的 Design Token 设计，[样式定制](https://ant.design/docs/react/customize-theme-cn)更灵活

### 主题换肤方案探索

可以参考 https://mp.weixin.qq.com/s/a-qqUzyClY9Binwsk2-Ltw
