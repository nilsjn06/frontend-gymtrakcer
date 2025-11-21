<template>
  <main class="wrap">
    <h1 class="title">Dein Workout</h1>

    <div v-if="workout.length === 0" class="empty">
      <button class="add" @click="pickerOpen = true">＋ Übung hinzufügen</button>
    </div>

    <div v-else class="list">
      <ExerciseCard
        v-for="(ex, i) in workout"
        :key="`${ex.id}-${i}`"
        :exercise="ex"
        @add-set="(s) => addSet(i, s)"
        @remove-set="(setIndex) => removeSet(i, setIndex)"
      />
      <button class="add ghost" @click="pickerOpen = true">＋ Übung hinzufügen</button>
    </div>

    <ExercisePicker
      v-if="pickerOpen"
      @close="pickerOpen = false"
      @pick="onPick"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import ExercisePicker from '@/components/ExercisePicker.vue'
import type { WorkoutExercise, WorkoutSet, CatalogExercise } from '@/types' // <-- CatalogExercise hinzu

const pickerOpen = ref(false)
const workout = ref<WorkoutExercise[]>([])

/** Vom Picker aufgerufen: eine Übung zum aktuellen Workout hinzufügen */
function onPick(ex: CatalogExercise) {
  // gleiche Übung mehrfach erlauben (wie im Figma)
  workout.value.push({
    id: ex.id,
    name: ex.name,
    category: ex.category,
    sets: [],
  })
  pickerOpen.value = false
}

/** Satz an eine bestimmte Übung anhängen */
function addSet(exIndex: number, set: WorkoutSet) {
  const ex = workout.value[exIndex]
  if (!ex) return            // Guard gegen "possibly undefined"
  ex.sets.push(set)
}

/** Satz löschen */
function removeSet(exIndex: number, setIndex: number) {
  const ex = workout.value[exIndex]
  if (!ex) return            // Guard
  ex.sets.splice(setIndex, 1)
}
</script>

<style scoped>
.wrap{
  min-height: calc(100dvh - 0px);
  padding: 3rem 1rem;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 1.25rem;
}
.title{
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  border-bottom: 4px solid #111827;
  padding-bottom: .25rem;
  margin-bottom: .5rem;
}
.empty{ display: grid; place-items: center; height: 40vh; }
.list{ display: grid; gap: 1rem; width: 100%; }
.add{
  display: inline-flex; align-items: center; gap: .5rem;
  background: transparent; color: #111827; border: 2px dashed #111827;
  padding: .75rem 1.25rem; border-radius: 999px; cursor: pointer;
  justify-self: center;
}
.add.ghost{ border-style: solid; background: #a7c7f4; }
</style>
