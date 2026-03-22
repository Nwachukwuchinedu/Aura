<script setup lang="ts">
import { onMounted } from 'vue';
import { animate, inView } from 'motion';

onMounted(() => {
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
    <div class="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <div class="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style="animation-delay: 2s;"></div>

    <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
      <!-- Hero Content -->
      <div class="flex flex-col gap-6 lg:pr-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white/50 w-fit reveal-up">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span class="text-xs font-semibold tracking-wide uppercase text-brand-600">Premium Properties Available</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-brand-950 reveal-up">
          Find the place <br>
          where you <span class="text-brand-400 italic font-light">belong.</span>
        </h1>
        
        <p class="text-lg text-brand-600 max-w-lg leading-relaxed reveal-up">
          Discover extraordinary homes in the world's most desired locations. Experience a seamless journey to your perfect lifestyle.
        </p>

        <!-- Search Bar Widget -->
        <div class="mt-4 glass-panel p-2 rounded-full flex flex-col sm:flex-row gap-2 max-w-2xl reveal-up shadow-lg shadow-stone-200/50">
          <div class="flex-1 flex items-center px-4 py-2 bg-white rounded-full">
            <i class="ph ph-map-pin text-xl text-brand-400 mr-2"></i>
            <input type="text" placeholder="Location, City, or Zip" class="w-full bg-transparent border-none outline-none text-brand-900 placeholder:text-brand-400 text-sm">
          </div>
          <button class="bg-brand-950 text-white px-8 py-3 rounded-full font-medium hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 group">
            <span>Search</span>
            <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        <div class="flex gap-8 mt-8 reveal-up">
          <div>
            <p class="text-3xl font-bold text-brand-950">2k+</p>
            <p class="text-sm text-brand-500 font-medium">Properties Sold</p>
          </div>
          <div class="w-px h-12 bg-brand-200"></div>
          <div>
            <p class="text-3xl font-bold text-brand-950">98%</p>
            <p class="text-sm text-brand-500 font-medium">Happy Clients</p>
          </div>
        </div>
      </div>

      <!-- Hero Image Grid -->
      <div class="relative h-[600px] rounded-[2.5rem] overflow-hidden reveal-clip shadow-2xl">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Modern luxury home" 
             class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110 ease-out">
        
        <!-- Floating Badge -->
        <div class="absolute bottom-8 left-8 glass-panel rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-500 cursor-pointer animate-float shadow-xl">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Agent" class="w-12 h-12 rounded-full object-cover border-2 border-white">
          <div>
            <p class="text-sm font-bold text-brand-950">Sarah Jenkins</p>
            <p class="text-xs text-brand-600">Top Rated Agent</p>
          </div>
          <div class="ml-2 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
            <i class="ph ph-phone text-brand-950"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
