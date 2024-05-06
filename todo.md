# TODO

## 渐进增强

- Image 组件，替代 img 标签

## hooks

- useReachBottom
  - 滚动触底 Taro.useReachBottom
  - https://juejin.cn/post/7238570834343772219
  - vs useInViewport
- useCountDown
  - 目标时间点终止，优先级高于剩余时间

## TODO

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
  - [ ] 翻滚文本动效 rolling-text
  - [ ] 文件上传 uploader
  - [ ] 签名 signature
  - [ ] 二维码 qrcode
  - [ ] 回到顶部 back-top
- 扩展组件
  - [x] 展开更多 overflow
  - [x] 自定义 Icon IconCustom
  - [x] 弹性布局 Flex
  - [ ] 统计数值 Statistic
  - [ ] 时间轴 Timeline
  - [ ] 分段控制器 Segmented
- 业务组件
  - [ ] 优惠券 coupon
  - [ ] 优惠券列表 coupon-list
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
- 复杂组件
  - 查询构建器
    - 推荐官方 https://react-querybuilder.js.org/
    - antd [query-builder](https://github.com/ukrbublik/react-awesome-query-builder)

## 问题

### Flex vs Space

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

### Modal vs Popup

- Modal 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
- Popup 适用于展示弹窗、信息提示、选择输入、切换等内容，支持多个弹出层叠加展示。
- CenterPopup 和 Popup 不同，CenterPopup 是从中间弹出的，Dialog 和 Modal 都是基于它实现的。

### Dialog vs Modal

这两个是重复的，区别对比：https://www.nngroup.com/articles/modal-nonmodal-dialog/

- Modal 更偏向于复杂内容的展示
- Dialog 一般是简单信息的展示

更多对比：[Dialog, Modal, Popup, Popover, Lightbox 等的区别](https://cloud.tencent.com/developer/article/1025695)

Alert

一般用于需要立即关注处理的警示信息（警示信息要言简意赅），一般伴有“确定”与“取消”的按钮。警示的窗体通常是前置在当前用户界面，使得用户不能忽视之而必须立即做出响应。

Modal/Dialog

一般用于通过点击或其它动作后产生的二次操作，操作的窗体就是Modal 或 Dialog。Modal 或 Dialog 主要用于那些不必时时刻刻显示在主界面上，在一定情况下才展示的信息（包括操作本身），通常伴有遮罩层且用户点击空白处（或者关闭按钮——如果有的话）即可消失。

Popup

一般用于展示一些不需要立即处理的信息。但Popup 一般不会自动消失，需要手动关闭，手动关闭的行为表示你已经看到并知晓信息了（跟“勾选表示我已经阅读”的意思差不多）。

Flash Notice/Growl Notification

一般用于那些限时提示的信息，这个“限时”并不意味着“紧急”，只是说信息是静静地展示在那里，你不看也没关系，一般几秒钟后便会自动消失。

Lightbox/Theatres

用于放大并聚焦页面中的某一部分信息，常常用于图片的放大展示中。这种情况下通常是伴有多张图片（相册集）且含有左右切换导航按钮，使得用户不必一张张点击图片缩略图来查看。

Popover/Tooltip/Hovercard

用于对于页面上某个元素展示额外的信息。常常用来添加额外的说明或提示，或者在用户进行某些动作予以预告形式的提醒（比如“点击这个链接会发生什么”的情景）。

## 自动化兼容性检查

- https://segmentfault.com/a/1190000044137569

```json
  'compat',
  'builtin-compat',
```
