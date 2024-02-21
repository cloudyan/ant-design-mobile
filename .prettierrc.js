module.exports = {
  semi: false,
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: false,
  jsxSingleQuote: true,
  quoteProps: 'preserve',
  arrowParens: 'avoid',
  // 因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  proseWrap: 'never',
  overrides: [
    {
      files: ['*.md'],
      options: {
        // 是否格式化一些文件中被嵌入的代码片段的风格，如果插件可以识别。
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
}
