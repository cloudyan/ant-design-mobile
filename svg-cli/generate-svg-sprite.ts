import { globSync } from 'glob'
import fs from 'fs'
import { HTMLElement, parse } from 'node-html-parser'
import path from 'path'
import { Config as SVGOConfig, optimize } from 'svgo'

// import `optimize` function
const svgoConfig: SVGOConfig = {
  plugins: [
    {
      name: 'convertColors',
      params: { currentColor: true },
    },
  ],
}
const svgFiles = globSync('./source/*.svg')
const symbols: string[] = []

svgFiles.forEach(file => {
  const code = fs.readFileSync(file, 'utf-8')
  const result = optimize(code, svgoConfig).data
  // here goes `svgo` magic with optimization
  const svgElement = parse(result).querySelector('svg') as HTMLElement
  const symbolElement = parse('<symbol/>').querySelector(
    'symbol'
  ) as HTMLElement
  const fileName = path.basename(file, '.svg')

  svgElement.childNodes.forEach(child => {
    symbolElement.appendChild(child)
  })

  symbolElement.setAttribute('id', fileName)

  const { viewBox } = svgElement.attributes
  if (viewBox) {
    symbolElement.setAttribute('viewBox', viewBox)
  }

  symbols.push(symbolElement.toString())
})

const svgSprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join(
  ''
)}</svg>`
// const svgSprite = `<svg>${symbols.join('')}</svg>`

// fs.writeFileSync('./sprite.svg', svgSprite)

// const svgSpriteJs = `const SVG = \`${svgSprite}\`;document.body.insertAdjacentHTML("afterBegin", '' + SVG + '');`
// fs.writeFileSync('./sprite.js', svgSpriteJs)

// iconfont svg
const svgSpriteJs = `window._iconfont_svg_string_4437625='${svgSprite}',function(n){var t=(t=document.getElementsByTagName("script"))[t.length-1],e=t.getAttribute("data-injectcss"),t=t.getAttribute("data-disable-injectsvg");if(!t){var o,i,c,d,s,a=function(t,e){e.parentNode.insertBefore(t,e)};if(e&&!n.__iconfont__svg__cssinject__){n.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(t){console&&console.log(t)}}o=function(){var t,e=document.createElement("div");e.innerHTML=n._iconfont_svg_string_4437625,(e=e.getElementsByTagName("svg")[0])&&(e.setAttribute("aria-hidden","true"),e.style.position="absolute",e.style.width=0,e.style.height=0,e.style.overflow="hidden",e=e,(t=document.body).firstChild?a(e,t.firstChild):t.appendChild(e))},document.addEventListener?~["complete","loaded","interactive"].indexOf(document.readyState)?setTimeout(o,0):(i=function(){document.removeEventListener("DOMContentLoaded",i,!1),o()},document.addEventListener("DOMContentLoaded",i,!1)):document.attachEvent&&(c=o,d=n.document,s=!1,r(),d.onreadystatechange=function(){"complete"==d.readyState&&(d.onreadystatechange=null,l())})}function l(){s||(s=!0,c())}function r(){try{d.documentElement.doScroll("left")}catch(t){return void setTimeout(r,50)}l()}}(window);`
fs.writeFileSync('./sprite.js', svgSpriteJs)

// npx tsx generate-svg-sprite.ts
// or
// node generate-svg-sprite.js

// svg 相关：https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/
// svgo 精简 svg：https://www.zhangxinxu.com/wordpress/2016/02/svg-compress-tool-svgo-experience/

// TSX usage
// const Icon: React.FC<{ name: string }> = ({ name }) => {
//   return (<svg><use href={`/sprite.svg#${name}`} /></svg>)
// }

// const App = () => {
//   return <Icon name="pen" />
// };
