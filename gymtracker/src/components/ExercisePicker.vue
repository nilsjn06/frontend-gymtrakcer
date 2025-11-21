<template>
  <div class="sheet" role="dialog" aria-modal="true">
    <div class="head">
      <div class="row">
        <div class="select">
          <button class="select-btn" @click="openCats = !openCats">▾ Kategorie</button>
          <ul v-if="openCats" class="menu">
            <li :class="{active: selectedCat===undefined}" @click="setCat(undefined)">Alle</li>
            <li v-for="c in catalogApi.categories" :key="c" :class="{active:selectedCat===c}" @click="setCat(c)">{{ c }}</li>
          </ul>
        </div>

        <button class="new" @click="showNew = !showNew">＋ neue Übung</button>
      </div>
    </div>

    <div v-if="showNew" class="newform">
      <input v-model="newName" placeholder="Name" class="in">
      <select v-model="newCat" class="in">
        <option v-for="c in catalogApi.categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <button class="primary wide" :disabled="!newName.trim()" @click="create">Übung hinzufügen</button>
    </div>

    <ul class="list">
      <li v-for="ex in listFiltered" :key="ex.id" @click="$emit('pick', ex)">
        {{ ex.name }}
      </li>
    </ul>

    <button class="ghost" @click="$emit('close')">Schließen</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CatalogExercise, Category } from '@/types'
import { useExerciseCatalog } from '@/composables/useExerciseCatalog'

const emit = defineEmits<{
  (e:'close'): void
  (e:'pick', ex: CatalogExercise): void
}>()

const catalogApi = useExerciseCatalog()
const selectedCat = ref<Category | undefined>(undefined)
const openCats = ref(false)

const listFiltered = computed(() => {
  return selectedCat.value
    ? catalogApi.catalog.value.filter(e => e.category === selectedCat.value)
    : catalogApi.catalog.value
})

function setCat(c?: Category){
  selectedCat.value = c
  openCats.value = false
}

/* Neue Übung */
const showNew = ref(false)
const newName = ref('')
const newCat = ref<Category>('Brust')

function create(){
  const ex = catalogApi.addExercise(newName.value, newCat.value)
  newName.value = ''
  showNew.value = false
  emit('pick', ex)
}
</script>

<style scoped>
.sheet{
  position: fixed; inset: 0;
  background: rgba(0,0,0,.35);
  display: grid; place-items: center; padding: 2rem;
}
.head{ width: min(800px, 95%); }
.row{ display: flex; gap: 1rem; justify-content: center; }

.select{ position: relative; }
.select-btn,
.new{
  background: #a7c7f4; border: 2px solid #1f2937; border-radius: 999px;
  padding: .75rem 1.25rem; font-weight: 700; cursor: pointer;
}
.menu{
  position: absolute; z-index: 2; top: calc(100% + .25rem); left: 0;
  background: #a7c7f4; border: 2px solid #1f2937; border-radius: 16px;
  list-style: none; margin: 0; padding: .5rem 0; width: 240px;
}
.menu li{ padding: .65rem 1rem; cursor: pointer; }
.menu li.active{ background: rgba(0,0,0,.06); }

.newform{
  width: min(800px, 95%); margin: 1rem auto 0;
  display: grid; grid-template-columns: 2fr 1fr auto; gap: .5rem;
}
.in{ padding: .75rem .9rem; border-radius: 12px; border: 2px solid #1f2937; background: #e3f0ff; }
.primary{ background: #3b5bcc; color: white; border: 0; border-radius: 12px; padding: .75rem 1rem; }
.wide{ grid-column: 1 / -1; }

.list{
  width: min(800px, 95%); margin: 1rem auto; list-style: none; padding: 0;
  border-radius: 16px; overflow: hidden; border: 2px solid #1f2937; background: #a7c7f4;
}
.list li{
  padding: 1rem 1.25rem; border-bottom: 1px solid rgba(0,0,0,.3); font-weight: 600; cursor: pointer;
}
.list li:last-child{ border-bottom: 0; }
.ghost{
  background: transparent; border: 0; color: white; font-weight: 600; cursor: pointer;
  margin-top: .5rem;
}
</style>
