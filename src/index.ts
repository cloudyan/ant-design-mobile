import './global'

export { default as Button } from './components/button'
export type { ButtonProps, ButtonRef } from './components/button'

export {
  default as ConfigProvider,
  setDefaultConfig,
  useConfig,
} from './components/config-provider'
export type { ConfigProviderProps } from './components/config-provider'

export { reduceMotion, restoreMotion } from './utils/reduce-and-restore-motion'
