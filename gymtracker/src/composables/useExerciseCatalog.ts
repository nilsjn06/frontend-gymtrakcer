import { ref, computed } from 'vue'
import type { CatalogExercise, Category } from '@/types.ts'

const LS_KEY = 'gymtracker.catalog.v1'

const defaultCatalog: CatalogExercise[] = [
  { id: crypto.randomUUID(), name: 'Bankdrücken',   category: 'Brust' },
  { id: crypto.randomUUID(), name: 'Hammer Curls',  category: 'Bizeps' },
  { id: crypto.randomUUID(), name: 'Latziehen',     category: 'Rücken' },
  { id: crypto.randomUUID(), name: 'Trizeps drücken', category: 'Trizeps' },
]

function load(): CatalogExercise[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) as CatalogExercise[] : defaultCatalog
  } catch {
    return defaultCatalog
  }
}
function save(list: CatalogExercise[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

const catalog = ref<CatalogExercise[]>(load())

export function useExerciseCatalog(){
  const categories: Category[] = ['Brust','Bizeps','Rücken','Beine','Bauch','Trizeps','Schultern']
  const byCategory = (cat?: Category) =>
    computed(() => !cat ? catalog.value : catalog.value.filter(e => e.category === cat))
  function addExercise(name: string, category: Category){
    const exists = catalog.value.some(e => e.name.toLowerCase() === name.trim().toLowerCase())
    const ex: CatalogExercise = { id: crypto.randomUUID(), name: name.trim(), category }
    if (!exists) {
      catalog.value.push(ex)
      save(catalog.value)
    }
    return ex
  }
  return { catalog, categories, byCategory, addExercise }
}
