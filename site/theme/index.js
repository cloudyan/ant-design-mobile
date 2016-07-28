const contentTmpl = './template/Content/index';
// 不要加外部 plugin
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin(); // fix Warning: Unknown prop `onTouchTap`

module.exports = {
  categoryOrder: {
    组件: 0,
    十大原则: 0,
    设计基础: 1,
    动画: 2,
  },
  typeOrder: {
    APIS: 0,
    COMPONENTS: 1,
  },
  docVersions: {
    '0.1.x': 'http://01x.antm.alipay.net',
    '0.5.x': 'http://05x.antm.alipay.net',
    '0.6.x': 'http://06x.antm.alipay.net',
  },
  routes: [{
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: './template/Home/index' },
    childRoutes: [{
      path: '/docs/practice/:children',
      component: contentTmpl,
    }, {
      path: '/docs/pattern/:children',
      component: contentTmpl,
    }, {
      path: '/docs/react/:children',
      component: contentTmpl,
    }, {
      path: '/changelog',
      component: contentTmpl,
    }, {
      path: '/components/:children',
      component: contentTmpl,
    }],
  }, {
    path: '/kitchen-sink',
    component: './template/KitchenSink/index',
  }, {
    path: '/kitchen-sink/:component',
    dataPath: '/components/:component',
    component: './template/KitchenSink/Demo',
  }, {
    path: '/kitchen-sink/:component/:index',
    dataPath: '/components/:component/demo/:index',
    component: './template/KitchenSink/Demo',
  }],
};
