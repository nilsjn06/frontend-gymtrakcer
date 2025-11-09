<script setup lang="ts">
defineProps<{
  name: string
  muskelgruppe: string
  satz: number
  wiederholungen: number
  gewicht: number
}>()
</script>

<template>
  <div class="Uebung">
    <h3>{{ name }}</h3>
    <ul>
      <li><strong>Muskelgruppe:</strong> {{ muskelgruppe }}</li>
      <li><strong>Sätze:</strong> {{ satz }}</li>
      <li><strong>Wiederholungen:</strong> {{ wiederholungen }}</li>
      <li><strong>Gewicht:</strong> {{ gewicht }} kg</li>
    </ul>
  </div>
</template>

<style scoped>
.Uebung {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  background: #000000;
}
</style>
