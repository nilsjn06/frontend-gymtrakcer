<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
/* globale Grundfarben wie im Figma */
:root{
  --blue:#a7c7f4;
  --ink:#111827;
  --paper:#f3f4f6;
}
html,body,#app{ height: 100%; }
body{
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  color: var(--ink);
  background: var(--paper);
}
</style>
