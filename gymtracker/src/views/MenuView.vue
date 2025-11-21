<template>
  <main class="wrapper">
    <section class="left">
      <img class="logo" src="/src/assets/logo-gymtracker.svg" alt="GymTracker Logo" />
      <h1 class="brand">GYM<br/>TRACKER</h1>
    </section>

    <div class="divider" />

    <section class="right">
      <h2 class="sr-only">Hauptmenü</h2>

      <!-- v-for rendert unsere eigene Unterkomponente -->
      <MenuButton
        v-for="item in items"
        :key="item.to"
        :label="item.label"
        :icon="item.icon"
        @click="go(item.to)"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuButton from '@/components/MenuButton.vue'

const router = useRouter()

type MenuItem = { label: string; to: string; icon: string }
const items: MenuItem[] = [
  { label: 'Profil',          to: '/profile',  icon: '👤' },
  { label: 'Workout Verlauf', to: '/history',  icon: '🕘' },
  { label: 'Handbuch',        to: '/handbuch', icon: '📘' },
  { label: 'Workout starten', to: '/workout',  icon: '🏋️' },
]

function go (to: string){
  router.push(to)
}
</script>

<style scoped>
.wrapper{
  min-height: calc(100dvh - 0px);
  display: grid;
  grid-template-columns: 1fr 2px 1fr;
  align-items: center;
  gap: 3rem;
  padding: 3rem 2rem;
  background: #f3f4f6;               /* hellgrauer Hintergrund wie Figma */
}
.left{
  display: grid;
  place-items: center;
  gap: 1rem;
}
.logo{
  width: clamp(220px, 40vw, 380px);
  height: auto;
  filter: grayscale(1) contrast(1.2);
}
.brand{
  font-size: clamp(2rem, 6vw, 3.25rem);
  line-height: .9;
  letter-spacing: .02em;
  font-weight: 800;
}
.divider{
  width: 2px;
  height: 70vh;
  margin-inline: auto;
  background: #111827;
  border-radius: 2px;
}
.right{
  max-width: 560px;
  width: min(90%, 560px);
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}
.sr-only{
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
@media (max-width: 900px){
  .wrapper{
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .divider{ display: none; }
}
</style>
