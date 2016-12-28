/* eslint no-console:0 */
// export components to browser's window for `dist/antd-mobile.js`

var req = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.web\.tsx?$/);

req.keys().forEach((mod) => {
  req(mod);
});

module.exports = require('./components');

if (typeof console !== 'undefined' && console.warn) {
  console.warn(`you are using prebuild antd-mobile,
please use https://github.com/ant-design/babel-plugin-import to reduce app bundle size.`);
}
