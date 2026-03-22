<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { animate, inView, stagger } from 'motion';
import { MapPin, ArrowRight, Phone } from 'lucide-vue-next';

const heroText = "Find the place where you belong.";
const words = heroText.split(' ');

onMounted(() => {
  // Staggered word reveal
  animate(
    ".hero-word",
    { opacity: [0, 1], y: [20, 0] },
    { delay: stagger(0.12), duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  );

  inView(".reveal-clip", (element) => {
    animate(element, 
      { clipPath: ["inset(100% 0 0 0 round 2.5rem)", "inset(0% 0 0 0 round 2.5rem)"], opacity: [0.8, 1] }, 
      { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
    );
  });
});
</script>

<template>
  <section id="home" class="relative min-h-[95vh] flex items-center pt-24 pb-12 px-4 md:px-8 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <div class="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-brand-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
      <!-- Hero Content -->
      <div class="flex flex-col gap-6 lg:pr-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white/50 w-fit reveal-up">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span class="text-[10px] font-extrabold tracking-widest uppercase text-brand-600">Premium Properties Available</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-bold tracking-tight leading-[1] text-brand-950 flex flex-wrap gap-x-[0.3em]">
          <span v-for="(word, i) in words" 
                :key="i" 
                class="hero-word opacity-0"
                :class="{ 'text-brand-400 italic font-light': word === 'belong.' }">
            {{ word }}
          </span>
        </h1>
        
        <p class="text-xl text-brand-600 max-w-lg leading-relaxed reveal-up transition-delay-500">
          Discover extraordinary homes in the world's most desired locations. Experience a seamless journey to your perfect lifestyle.
        </p>

        <!-- Search Bar Widget -->
        <div class="mt-4 glass-panel p-2 rounded-full flex flex-col sm:flex-row gap-2 max-w-2xl reveal-up shadow-2xl border border-white/40">
          <div class="flex-1 flex items-center px-6 py-2 bg-white/80 rounded-full">
            <MapPin class="w-5 h-5 text-brand-400 mr-3" />
            <input type="text" placeholder="Location, City, or Zip" class="w-full bg-transparent border-none outline-none text-brand-900 placeholder:text-brand-400 text-sm font-medium">
          </div>
          <button class="bg-brand-950 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-800 transition-colors flex items-center justify-center gap-3 group magnetic-button">
            <span>Search</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div class="flex gap-12 mt-8 reveal-up">
          <div>
            <p class="text-4xl font-bold text-brand-950 tracking-tighter">2k+</p>
            <p class="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest">Properties Sold</p>
          </div>
          <div class="w-px h-12 bg-brand-200"></div>
          <div>
            <p class="text-4xl font-bold text-brand-950 tracking-tighter">98%</p>
            <p class="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest">Happy Clients</p>
          </div>
        </div>
      </div>

      <!-- Hero Image Grid -->
      <div class="relative h-[650px] rounded-[3rem] overflow-hidden reveal-clip shadow-2xl border border-white/20">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Modern luxury home" 
             class="absolute inset-0 w-full h-full object-cover transition-transform duration-[15s] hover:scale-110 ease-out ken-burns">
        
        <!-- Floating Badge -->
        <div class="absolute bottom-12 left-12 glass-panel rounded-3xl p-6 flex items-center gap-5 hover:scale-105 transition-transform duration-500 cursor-pointer animate-float shadow-2xl border border-white/40">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Agent" class="w-16 h-16 rounded-full object-cover border-2 border-white">
          <div>
            <p class="text-lg font-bold text-brand-950 tracking-tight">Sarah Jenkins</p>
            <p class="text-xs font-bold text-brand-400 uppercase tracking-widest">Top Rated Agent</p>
          </div>
          <div class="ml-4 w-10 h-10 rounded-full bg-brand-950 text-white flex items-center justify-center shadow-lg magnetic-button">
            <Phone :size="20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-word {
  display: inline-block;
  will-change: transform, opacity;
}
</style>
