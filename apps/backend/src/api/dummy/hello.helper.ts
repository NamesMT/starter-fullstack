import { i18nComposer } from '~/helpers/i18n'

// This isa sample for structuring guide
export const getHelloMessage = () => `${i18nComposer.t('hello-from-/x', { x: 'i18n and Hono' })}! - ${Date.now()}`
