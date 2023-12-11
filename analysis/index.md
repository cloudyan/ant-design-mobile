# 源码分析

目的是学习以及总结最佳实践

## 重点

- [x] mask 背景蒙层
  - `ShouldRender`
  - `renderToContainer`
  - `withStopPropagation`
- [x] toast 轻提示（全局唯一）
  - `renderImperatively`
  - `useImperativeHandle`
  - `renderToBody`
- [x] Dialog 对话框(包含 alert, confirm)
  - `CenterPopup`
  - `Dialog.alert`
  - `Dialog.confirm`
  - `Dialog.show`
- [x] Modal 弹窗、模态框
- dialog vs modal, 有区别吗？
  - 对话框仍允许用户在打开页面时与页面上的其他内容进行交互（即单击对话框周围可见的按钮和链接）
  - 模式锁定页面，直到完成某些操作。这通常是在涵盖所有其他内容的背景中完成的，因此必须处理模态。这个相比与对话框则更具破坏性。
  - antd-mobile 中实现基本一致，略有差异
    - modal 支持 showCloseButton
    - dialog 支持 actions 配置双层数组
- [x] Popup 弹出层
  - `useInnerVisible`
  - useSpring ==> `@react-spring/web` 流畅动画库
  - useDrag ==> `@use-gesture/react` 手势库
- [x] ellipsis 文本省略
  - `runes2` 字符串分割
  - `calcEllipsised`
  - `useResizeEffect`
  - `checkMiddle`
- form
  - Checkbox
- Image
  - `LazyDetector`
  - `useInViewport`
- 业务组件

可参考 vant 继续扩展常用组件即功能

- 基础组件
  - [x] 内置样式
  - [x] 倒计时 countdown
  - [ ] 粘性布局 sticky
  - [ ] 懒加载 lazyload
  - [ ] 分享面板 share-panel
  - [ ] 消息提示 notify
  - [ ] 弹幕 barrage
  - [ ] 高亮文本 highlight-text
  - [ ] 翻滚文本 rolling-text
  - [ ] 文件上传 uploader
  - [ ] 签名 signature
  - [ ] 二维码 qrcode
  - [ ] 回到顶部 back-top
- 业务组件
  - [ ] 优惠券 coupon
  - [ ] 协议 agreement（N 秒后可交互/滚动到底部可交互）
  - [ ] 省市区选择 area
- 电商组件
  - [ ] 动作栏 action-bar
  - [ ] 地址编辑 address-edit
  - [ ] 地址列表 address-list
  - [ ] 商品卡片 goods-card
  - [ ] 商品列表 goods-list
  - [ ] 联系人卡片 contact-card
  - [ ] 联系人编辑 contact-edit
  - [ ] 联系人列表 contact-list
  - [ ] 提交订单栏 submit-bar

## 基础

- utils
  - `usePropsValue`
  - `isNodeWithContent`

```css
flex: none; ==> 0 0 auto;
flex: 1;    ==> 1 1 0%
flex: 0;    ==> 0 1 0%
```

## 组件列表

- 通用 common
  - [x] button
    - loading="auto" 功能很不错
  - [x] icon => `antd-mobile-icons`
    - 仅仅是 ICON 库
- 布局 layout
  - [x] auto-center
  - [x] divider
  - [x] grid
    - grid 布局系统
  - [x] safe-area
    - 底层实现是 `env(safe-area-inset-xxx)`
  - [x] space
    - flex 布局, 扩展 itemStyle
- 导航 navigation
  - [ ] capsule-tabs
  - [ ] index-bar
  - [ ] jumbo-tabs
  - [ ] nav-bar
  - [ ] side-bar
  - [ ] tab-bar
  - [ ] tabs
- 信息展示 dataDisplay
  - [ ] avatar (基于 Image)
  - [x] card
  - [ ] collapse
  - [x] ellipsis
  - [x] overflow
  - [ ] floating-panel
  - [ ] image
  - [ ] image-viewer
  - [ ] infinite-scroll
  - [ ] list
  - [ ] page-indicator
  - [ ] steps
  - [ ] swiper
  - [x] tag
  - [ ] water-mark
  - [x] footer
- 信息录入 dataEntry
  - [ ] cascader
  - [ ] cascader-view
  - [ ] check-list
  - [ ] checkbox
  - [ ] form
  - [ ] input
  - [ ] picker
  - [ ] picker-view
  - [ ] radio
  - [ ] rate
  - [ ] search-bar
  - [ ] selector
  - [ ] slider
  - [ ] stepper
  - [x] switch
    - SpinIcon
  - [ ] text-area
- 反馈 feedback
  - [x] action-sheet
  - [x] dialog
  - [x] empty // @deprecated 使用 ErrorBlock 替代
  - [x] error-block // 不一定是错误，应该有更通用的名称
  - [x] loading // @deprecated 使用 DotLoading 替代
  - [x] mask
  - [x] modal
  - [ ] popover 气泡弹出框
  - [x] popup
  - [x] progress-bar
  - [x] progress-circle 本质使用 svg 实现
  - [ ] pull-to-refresh
  - [x] result
  - [x] skeleton
  - [ ] swipe-action
  - [x] toast
- 引导提示 guidance
  - [x] badge
  - [ ] notice-bar
- 其他 other
  - [ ] config-provider
- 试验性 experimental
  - [ ] calendar
  - [ ] calendar-picker
  - [ ] calendar-picker-view
  - [ ] dropdown
  - [ ] floating-bubble
  - [ ] image-uploader
  - [ ] number-keyboard
  - [ ] passcode-input
  - [ ] result-page
  - [ ] tree-select
  - [ ] virtual-input
  - [ ] // scroll-mask
