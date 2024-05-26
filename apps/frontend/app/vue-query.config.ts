import {
  type AsyncStorage,
  type PersistedQuery,
  experimental_createPersister,
} from '@tanstack/query-persist-client-core'
import { type UseStore, createStore, del, get, set } from 'idb-keyval'

function newIdbStorage(idbStore: UseStore): AsyncStorage<PersistedQuery> {
  return {
    getItem: async key => await get(key, idbStore),
    setItem: async (key, value) => await set(key, value, idbStore),
    removeItem: async key => await del(key, idbStore),
  }
}

export default defineVueQueryPluginHook(({ queryClient }) => {
  const maxAge = 1000 * 60 * 60 * 12 // 12 hours

  // If is not server-side, set persister to IndexedDB
  queryClient.setDefaultOptions({ queries: {
    staleTime: Infinity,
    persister: !import.meta.client
      ? undefined
      : experimental_createPersister<PersistedQuery>({
        storage: newIdbStorage(createStore('tsq_db', 'tsq_store')),
        maxAge,
        serialize: persistedQuery => persistedQuery,
        deserialize: cached => cached,
      }),
  } })

  return { pluginReturn: { }, vueQueryPluginOptions: { } }
})
