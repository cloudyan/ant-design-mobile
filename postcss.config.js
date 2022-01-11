// 在没有任何配置的情况下，postcss-preset-env 会开启 stage 2 阶段的特性并支持所有浏览器。
// https://cssdb.org/
module.exports = {
  plugins: {
    'postcss-preset-env': {},
  },
}
