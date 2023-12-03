# Image 组件

需求：替代原生 img 标签，并优化性能体验

此组件需求，最终要扩展到 Image 组件上

1. 支持 img 标签常规功能
2. 支持图片占位
   1. placeholder 占位图
   2. 图片加载太慢，展示 loading 占位图
   3. 图片加载失败，加载备选图片或展示 error 占位符
   4. error 占位图加载失败，展示内置兜底图
3. 增加回退图片 fallback 属性
   1. Suspense 形式调用
4. 兼容图片懒加载(lazyload 兼容原生 lazy)
   1. supportNativeLazyLoading
   2. `IntersectionObserver`
   3. polyfill: `intersection-observer`
5. 懒加载支持防抖动（支持快速滚动预览时，不误触发懒加载）
6. 性能优化，缓存图片加载的 promise，重复引用不会重复 `new Image()`
7. 默认在渲染图片前会进行 decode，避免页面卡顿或者闪烁
8. 无多余的元素，保证组件只返回 `<img>` 元素，尽可能使它们的行为相同或类似
9. 转发 ref，将 Image 组件的 ref 直接应用于 `<img>` 元素
10. 禁止给 Image 传递子组件
11. 支持服务端渲染

对比 next/image 组件

参考

- https://juejin.cn/post/7041860384243843085
- https://juejin.cn/post/6901615625811656712
- https://zhuanlan.zhihu.com/p/150193090
- https://juejin.cn/post/7110240631531765797
- https://zhuanlan.zhihu.com/p/139318295
