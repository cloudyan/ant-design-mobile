# Icon 组件

自定义 antd-mobile-icons 组件

在 iconfont 平台做管理，可以选中需要的图标，批量下载到本地，然后通过工具自动转换为 React 组件

```bash
npm install @svgr/cli --save-dev
./node_modules/.bin/svgr -h
./node_modules/.bin/svgr ./source -d ./dist

svgr ./source -d ./dist
```

默认的图标，没书写 `fill="currentColor"` 属性，需要批量改写，可使用 template 机制来完成。
