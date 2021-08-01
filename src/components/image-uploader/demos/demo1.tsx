import React, {useState} from 'react'
import {ImageUplader} from 'antd-mobile'
import {DemoBlock} from 'antd-mobile/src/demos/demo-block'
import {FileItem} from '..'

export default () => {
  const [fileList, setFileList] = useState<FileItem[]>([
    {
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])

  function onChange(files: FileItem[]) {
    setFileList(files)
  }

  function onDelete(files: FileItem[], index: number) {
    setFileList(files)
  }

  return (
    <>
      <DemoBlock title='基础用法'>
        <ImageUplader
          fileList={fileList}
          onChange={onChange}
          onDelete={onDelete}
        />
      </DemoBlock>
    </>
  )
}
