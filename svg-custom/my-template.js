// my-template.js 示例
// npx @svgr/cli --template my-template.js -- my-icon.svg
const template = (variables, context) => {
  const { imports, interfaces, componentName, props, jsx, exports } = variables
  const { tpl, options } = context

  // console.log(jsx)

  return tpl`
${imports}

${interfaces}

const ${componentName} = (${props}) => {
  props = { ...props, fill: 'currentColor' };
  return ${jsx};
};

export default ${componentName};
`
}

module.exports = template
