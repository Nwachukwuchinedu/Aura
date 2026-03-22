<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const sections = [
  { id: 'home', label: 'Hero' },
  { id: 'properties', label: 'Properties' },
  { id: 'vibe-match', label: 'Lifestyle' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
];

const activeSection = ref('home');

const handleScroll = () => {
  for (const section of [...sections].reverse()) {
    const el = document.getElementById(section.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="hidden lg:flex section-progress">
    <a v-for="section in sections" 
       :key="section.id" 
       :href="`#${section.id}`"
       class="progress-dot group"
       :class="{ 'active': activeSection === section.id }">
      <span class="progress-label">{{ section.label }}</span>
    </a>
  </div>
</template>
