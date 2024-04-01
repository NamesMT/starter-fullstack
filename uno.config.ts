import type { UserConfig } from 'unocss'
import { mergeConfigs } from 'unocss'
import frontendConfig from 'frontend/unoConfig'

export default mergeConfigs([frontendConfig])
