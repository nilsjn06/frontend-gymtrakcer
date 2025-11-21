<template>
  <article class="card">
    <header class="title">{{ exercise.name }}</header>

    <ol class="sets">
      <li v-for="(s, idx) in exercise.sets" :key="idx">
        <span class="idx">{{ idx + 1 }}</span>
        <span>{{ s.weight }} kg × {{ s.reps }}</span>
        <button class="small danger" @click="$emit('remove-set', idx)">✕</button>
      </li>
    </ol>

    <div class="adder">
      <input class="in" placeholder="Wdh" type="number" min="1" v-model.number="draft.reps">
      <input class="in" placeholder="kg"  type="number" min="0" step="0.5" v-model.number="draft.weight">
      <button class="primary" @click="add">Satz hinzufügen</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { WorkoutExercise, WorkoutSet } from '@/types'
import {reactive} from "vue";

const props = defineProps<{
  exercise: WorkoutExercise
}>()

const emit = defineEmits<{
  (e:'add-set', value: WorkoutSet): void
  (e:'remove-set', index: number): void
}>()

const draft = reactive<WorkoutSet>({ reps: 0, weight: 0 })

function add(){
  const r = Math.max(1, Math.floor(draft.reps || 0))
  const w = Number.isFinite(draft.weight) ? Number(draft.weight) : 0
  emit('add-set', { reps: r, weight: w })
  draft.reps = 0
  draft.weight = 0
}
</script>

<style scoped>
.card{
  width: min(560px, 95%);
  background: #0b0b0b;
  color: #f3f4f6;
  border-radius: 12px;
  padding: 1rem 1rem 1.25rem;
  box-shadow: 0 2px 0 rgba(0,0,0,.5);
  margin-inline: auto;
}
.title{
  font-size: 1.5rem; font-weight: 800; margin-bottom: .5rem;
}
.sets{
  list-style: none; padding: 0; margin: 0 0 .75rem;
}
.sets li{
  display: grid; grid-template-columns: 2ch 1fr auto;
  align-items: center; gap: .75rem;
  padding: .25rem 0;
}
.idx{ opacity: .6; }
.adder{
  display: grid; grid-template-columns: 1fr 1fr auto; gap: .5rem;
}
.in{
  background: #fff; border: 0; border-radius: 8px; padding: .65rem .75rem; font-size: 1rem;
}
.primary{
  background: #3b5bcc; color: #fff; border: 0; border-radius: 8px;
  padding: .65rem .9rem; font-weight: 700; cursor: pointer;
}
.small{ border: 0; background: transparent; color: #e5e7eb; cursor: pointer; }
.small.danger{ color: #fca5a5; }
</style>
