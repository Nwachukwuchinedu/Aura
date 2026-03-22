<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const times = [
  { time: 'Morning', label: '7:45 AM', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ambient: 'rgba(234, 179, 8, 0.05)', desc: 'Soft golden light filters through Eucalyptus trees. The sound of a sprinkler in the distance. Your morning ritual, redefined.' },
  { time: 'Afternoon', label: '2:15 PM', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ambient: 'rgba(255, 255, 255, 0.1)', desc: 'Brilliant high-noon clarity. Floor-to-ceiling glass becomes a portal to the horizon. Energy, captured in architecture.' },
  { time: 'Evening', label: '8:30 PM', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ambient: 'rgba(30, 58, 138, 0.08)', desc: 'Twilight transitions into a private oasis. Subtle recessed lighting and a fading obsidian sky. Your sanctuary, absolute.' },
];

const scrollContainer = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const items = scrollContainer.value.children;
  const containerRect = scrollContainer.value.getBoundingClientRect();
  const centerX = containerRect.left + containerRect.width / 2;

  let closestIndex = 0;
  let minDiff = Infinity;

  Array.from(items).forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const diff = Math.abs(itemCenter - centerX);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = index;
    }
  });

  activeIndex.value = closestIndex;
};

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <section class="py-24 bg-brand-950 overflow-hidden relative">
    <!-- Ambient Light Shift Background -->
    <div class="absolute inset-0 transition-colors duration-1000" 
         :style="`background-color: ${times[activeIndex]?.ambient || 'transparent'}`"></div>
    
    <div class="max-w-7xl mx-auto px-4 md:px-8 mb-16 relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2 block">Cinematic narrative</span>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white">A Day In The Life.</h2>
        </div>
        <div class="flex gap-4 mb-4">
          <div v-for="(t, i) in times" :key="'indicator-'+i"
               class="h-1 rounded-full transition-all duration-500"
               :class="activeIndex === i ? 'w-12 bg-white' : 'w-4 bg-brand-800'"></div>
        </div>
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div ref="scrollContainer" 
         class="flex gap-8 overflow-x-auto hide-scrollbar px-[10%] md:px-[20%] snap-x snap-mandatory pb-12 relative z-10">
      <div v-for="(time, index) in times" :key="time.time"
           class="min-w-[80vw] md:min-w-[60vw] lg:min-w-[50vw] snap-center shrink-0">
        <div class="relative group h-[600px] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700"
             :class="activeIndex === index ? 'scale-105' : 'scale-90 opacity-40 grayscale-[0.5]'">
          
          <img :src="time.img" :alt="time.time" class="absolute inset-0 w-full h-full object-cover ken-burns">
          
          <!-- Overlay Graphics -->
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/20"></div>
          
          <div class="absolute top-8 left-8">
            <div class="glass-panel p-4 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center">
              <span class="text-xs font-bold text-brand-950 uppercase tracking-widest mb-1">{{ time.time }}</span>
              <span class="text-2xl font-bold text-brand-950">{{ time.label }}</span>
            </div>
          </div>

          <div class="absolute bottom-12 left-12 right-12">
            <p class="text-white text-xl font-bold max-w-lg leading-relaxed mb-6">{{ time.desc }}</p>
            <div class="flex gap-4">
              <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">Natural Lighting</span>
              <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">Ambient Noise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.snap-x {
  scroll-behavior: smooth;
}
</style>
