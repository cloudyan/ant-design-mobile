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

```less

.css-var {
  /* 红 橙 黄 绿 青 蓝 紫 */
  --ant-red: #F5222D;
  --ant-volcano: #FA541C;
  --ant-orange: #FA8C16;
  --ant-gold: #FAAD14;
  --ant-yellow: #FADB14;
  --ant-lime: #A0D911;
  --ant-green: #52C41A;
  --ant-green2: #17B271;
  --ant-cyan: #13C2C2;
  --ant-blue: #1677ff;
  --ant-geekblue: #2F54EB;
  --ant-purple: #722ED1;
  --ant-magenta: #EB2F96;
  --ant-pink: #eb2f96;

  // Dust Red / 薄暮 斗志、奔放
  --ant-red-6: #f5222d;
  // Volcano / 火山 醒目、澎湃
  --ant-volcano-6: #fa541c;
  // Sunset Orange / 日暮 温暖、欢快
  --ant-orange-6: #fa8c16;
  // Calendula Gold / 金盏花 活力、积极
  --ant-gold-6: #faad14;
  // Sunrise Yellow / 日出 出生、阳光
  --ant-yellow-6: #fadb14;
  // Lime / 青柠 自然、生机
  --ant-lime-6: #a0d911;
  // Polar Green / 极光绿 健康、创新
  --ant-green-6: #52c41a;
  // Cyan / 明青 希望、坚强
  --ant-cyan-6: #13c2c2;
  // Daybreak Blue / 拂晓蓝 包容、科技、普惠
  --ant-blue-6: #1677ff;
  // Geek Blue / 极客蓝 探索、钻研
  --ant-geekblue-6: #2f54eb;
  // Golden Purple / 酱紫 优雅、浪漫
  --ant-purple-6: #722ed1;
  // Magenta / 法式洋红 明快、感性
  --ant-magenta-6: #eb2f96;
  --ant-pink-6: #eb2f96;
}

.adm-theme-red {
  --adm-color-primary: var(--ant-red);
}

.adm-theme-volcano {
  --adm-color-primary: var(--ant-volcano);
}

.adm-theme-green {
  --adm-color-primary: var(--ant-green);
}

.adm-theme-blue {
  --adm-color-primary: var(--ant-blue);
}

.adm-theme-purple {
  --adm-color-primary: var(--ant-purple);
}
```

明暗或者说浅色深色模式，不是主题

更强大功能，还需要参考 ant-design 的 Design Token 设计，[样式定制](https://ant.design/docs/react/customize-theme-cn)更灵活

### 主题换肤方案探索

可以参考 https://mp.weixin.qq.com/s/a-qqUzyClY9Binwsk2-Ltw

## 扩展知识

### 色板

- Ant Design [色彩体系](https://ant.design/docs/spec/colors-cn)
  - [色板生成工具](https://ant.design/docs/spec/colors-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)
- Ant Design [暗黑模式](https://ant.design/docs/spec/dark-cn)
- AntV 色板是基于 Ant Design 色彩体系
  - https://antv.antgroup.com/specification/language/palette
