<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const dot = ref<HTMLElement | null>(null);
const glow = ref<HTMLElement | null>(null);

const moveCursor = (e: MouseEvent) => {
  if (dot.value && glow.value) {
    dot.value.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    glow.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', moveCursor);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor);
});
</script>

<template>
  <div class="hidden lg:block">
    <div ref="dot" class="cursor-trail"></div>
    <div ref="glow" class="cursor-glow"></div>
  </div>
</template>

<style scoped>
.cursor-trail {
  will-change: transform;
}
.cursor-glow {
  will-change: transform;
}
</style>
