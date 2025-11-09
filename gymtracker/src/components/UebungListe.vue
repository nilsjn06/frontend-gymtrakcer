<script setup lang="ts">
import Uebung from './Uebung.vue'

const exercises = [
  {
    name: 'Bankdrücken',
    muskelgruppe: 'Brust',
    satz: 3,
    wiederholungen: 10,
    gewicht: 60.0
  },
  {
    name: 'Kniebeuge',
    muskelgruppe: 'Beine',
    satz: 4,
    wiederholungen: 8,
    gewicht: 80.0
  },
  {
    name: 'Klimmzüge',
    muskelgruppe: 'Rücken',
    satz: 3,
    wiederholungen: 12,
    gewicht: 0.0
  }
]
</script>

<template>
  <section>
    <h2>Meine Übungen</h2>
    <Uebung
      v-for="(ex, index) in exercises"
      :key="index"
      :name="ex.name"
      :muskelgruppe="ex.muskelgruppe"
      :satz="ex.satz"
      :wiederholungen="ex.wiederholungen"
      :gewicht="ex.gewicht"
    />
  </section>
</template>
