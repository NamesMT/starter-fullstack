import {
  type AsyncStorage,
  experimental_createPersister,
  type PersistedQuery,
} from '@tanstack/query-persist-client-core'
import { createStore, del, get, set, type UseStore } from 'idb-keyval'

function newIdbStorage(idbStore: UseStore): AsyncStorage<PersistedQuery> {
  return {
    getItem: async key => await get(key, idbStore),
    setItem: async (key, value) => await set(key, value, idbStore),
    removeItem: async key => await del(key, idbStore),
  }
}

export default defineVueQueryPluginHook(({ queryClient }) => {
  const maxAge = 1000 * 60 * 60 * 12 // 12 hours

  queryClient.setDefaultOptions({ queries: {
    // Only enable Tanstack Query on client-side
    enabled: import.meta.client,
    // Set default staleTime to Infinity to manually invalidate the query only when needed
    staleTime: Infinity,
    // Set client-side persister to IndexedDB
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
