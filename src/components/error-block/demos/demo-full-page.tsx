import React, { useEffect } from 'react'
import { ErrorBlock, Button } from 'antd-mobile'

export default () => {
  useEffect(() => {
    document.body.style.background = 'var(--adm-color-background)'
  }, [])
  return (
    <ErrorBlock fullPage>
      <Button color='primary'>返回首页</Button>
    </ErrorBlock>
  )
}
