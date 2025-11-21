<template>
  <button class="menu-btn" @click="$emit('click')">
    <span class="icon" v-if="icon" aria-hidden="true">{{ icon }}</span>
    <span class="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
}>()
defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.menu-btn{
  width: 100%;
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: 1rem 1.25rem;
  border-radius: 999px;
  border: 2px solid #1f2937;       /* fast schwarz */
  background: #a7c7f4;              /* helles Blau wie im Figma */
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 0 #1f2937;
  transition: transform .08s ease, filter .08s ease;
}
.menu-btn:hover{ filter: brightness(0.98); }
.menu-btn:active{ transform: translateY(1px); }
.icon{ font-size: 1.25rem; width: 1.5rem; text-align: center; }
.label{ line-height: 1; }
</style>
