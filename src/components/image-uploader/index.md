# ImageUploader 图片上传

<code src="./demos/demo1.tsx"></code>

## API

### ImageUploader

| 属性          | 说明                                                                  | 类型                                          | 默认值    |
| ------------- | --------------------------------------------------------------------- | --------------------------------------------- | --------- |
| value         | 已上传的文件列表                                                      | `FileItem[]`                                  | -         |
| defaultValue  | 默认已上传的文件列表                                                  | `FileItem[]`                                  | -         |
| onChange      | 已上传的文件列表变化时触发                                            | `(files: FileItem[]) => void`                 | -         |
| accept        | 文件类型，`image/gif` `image/jpeg` `image/jpg` `image/png`            | `string`                                      | `image/*` |
| multiple      | 是否支持选择多张图片                                                  | `boolean`                                     | `false`   |
| maxCount      | 最多上传几张图片，超出数量会自动隐藏上传按钮，`0` 表示不做限制        | `number`                                      | `0`       |
| onCountExceed | 用户选择的图片数量超出最大限制时触发                                  | `(exceed: number) => void`                    | -         |
| disableUpload | 是否禁用上传按钮                                                      | `boolean`                                     | `false`   |
| showUpload    | 是否展示上传按钮                                                      | `boolean`                                     | `true`    |
| deletable     | 是否展示删除按钮                                                      | `boolean`                                     | `true`    |
| capture       | 图片选取模式，可选值为 `camera`（直接调起摄像头）                     | 同原生 `input` 的 `capture` 属性              | -         |
| onPreview     | 点击预览图片                                                          | `(index: number) => void`                     | -         |
| beforeUpload  | 文件读取前的回调函数，返回 `false` 可终止文件读取，支持返回 `Promise` | `(file: File[]) => Promise<File[]> \| File[]` | -         |
| upload        | 上传方法，入参是需要被上传的文件对象，经过异步处理之后，返回上传结果  | `(file: File) => Promise<FileItem>`           | -         |
| onDelete      | 用户点击删除按钮时触发，返回 `false` 表示阻止删除                     | `(file: FileItem) => boolean \| undefined`    | -         |

### FileItem

| 属性 | 说明           | 类型     | 默认值 |
| ---- | -------------- | -------- | ------ |
| url  | 图片的资源地址 | `string` | -      |
