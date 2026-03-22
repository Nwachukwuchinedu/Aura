<script setup lang="ts">
import { ref } from 'vue';

const activeZone = ref<any | null>(null);

const zones = [
  { id: 'bh', label: 'Beverly Hills', path: 'M50,150 Q150,50 250,150 T450,150 T650,150 T850,150 V350 H50 Z', color: 'rgba(26, 26, 26, 0.4)', price: '$2.4k/sqft', score: 98, schools: 9.5, night: 8.8 },
  { id: 'mb', label: 'Malibu', path: 'M150,150 Q250,250 350,150 T550,150 T750,150 T950,150 V50 H150 Z', color: 'rgba(26, 26, 26, 0.1)', price: '$3.1k/sqft', score: 94, schools: 9.2, night: 7.5 },
  { id: 'as', label: 'Aspen', path: 'M450,350 Q550,450 650,350 T850,350 T1050,350 V150 H450 Z', color: 'rgba(26, 26, 26, 0.6)', price: '$1.8k/sqft', score: 91, schools: 8.9, night: 9.2 },
];
</script>

<template>
  <section id="heat-map" class="py-24 px-4 md:px-8 max-w-7xl mx-auto reveal-section">
    <div class="bg-white rounded-[3rem] p-8 md:p-16 border border-brand-100 shadow-sm relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute -top-48 -left-48 w-96 h-96 bg-brand-50 rounded-full blur-[120px] opacity-60"></div>
      
      <div class="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div class="lg:w-1/3">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-brand-50 text-brand-950 w-fit mb-6">
            <i class="ph-fill ph-map-trifold"></i>
            <span class="text-[10px] font-bold tracking-[0.2em] uppercase">Market Intel</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-brand-950 mb-6">Explore the <br>Desirability Index.</h2>
          <p class="text-brand-600 mb-8 leading-relaxed">Our interactive proximity engine maps local movement, school performance, and real-time transaction density. Filter by the metrics that matter to you.</p>
          
          <div class="space-y-4">
            <div v-for="zone in zones" :key="zone.id" 
                 @mouseenter="activeZone = zone"
                 @mouseleave="activeZone = null"
                 class="group p-4 bg-brand-50 rounded-2xl border border-brand-100 cursor-pointer hover:bg-brand-950 hover:text-white transition-all duration-500 shadow-sm"
                 :class="{ 'bg-brand-950 text-white translate-x-3 scale-105': activeZone?.id === zone.id }">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm tracking-tight uppercase tracking-widest">{{ zone.label }}</span>
                <span class="text-xs font-bold opacity-60">Hover to pin</span>
              </div>
              <div class="flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-widest opacity-80">
                <span>{{ zone.price }}</span>
                <span class="w-1 h-1 bg-current rounded-full"></span>
                <span class="text-green-500">Peak ROI</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-2/3 w-full relative group/map">
          <!-- Mock Map (SVG/Canvas based layout) -->
          <div class="aspect-[4/3] bg-brand-50/50 rounded-[2.5rem] border border-brand-200 overflow-hidden relative shadow-inner">
            <svg viewBox="0 0 1000 600" class="w-full h-full">
              <!-- Grid Background Lines -->
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,26,26,0.03)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              <!-- Hot Zones -->
              <path v-for="zone in zones" :key="'path-'+zone.id"
                    :d="zone.path"
                    :fill="activeZone?.id === zone.id ? 'rgba(26,26,26,0.8)' : zone.color"
                    class="transition-all duration-700 ease-out cursor-pointer hover:fill-brand-950/90"
                    @mouseenter="activeZone = zone" />
              
              <!-- Custom Markers -->
              <circle v-for="i in 15" :key="'dot-'+i"
                      :cx="Math.random()*800 + 100" :cy="Math.random()*400 + 100"
                      r="4" fill="white" stroke="rgba(26,26,26,0.1)" stroke-width="2" class="opacity-40" />
            </svg>

            <!-- Floating Info Bubble -->
            <transition name="fade">
              <div v-if="activeZone" 
                   class="absolute pointer-events-none glass-panel p-6 rounded-3xl shadow-2xl border border-white/40 min-w-[240px] z-20"
                   :style="`top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.1);`" >
                <h4 class="text-xl font-bold text-brand-950 mb-3 tracking-tight">{{ activeZone.label }}</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-brand-100 pb-2">
                    <span class="text-brand-400">Walkability</span>
                    <span class="text-brand-950">{{ activeZone.score }}/100</span>
                  </div>
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-brand-100 pb-2">
                    <span class="text-brand-400">School Rating</span>
                    <span class="text-brand-950">{{ activeZone.schools }}/10</span>
                  </div>
                  <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span class="text-brand-400">Nightlife Index</span>
                    <span class="text-brand-950">{{ activeZone.night }}/10</span>
                  </div>
                </div>
                <div class="mt-4 pt-4 border-t border-brand-100">
                  <span class="text-[10px] font-extrabold text-brand-950 uppercase tracking-widest flex items-center justify-center gap-2">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Data Active
                  </span>
                </div>
              </div>
            </transition>

            <!-- Watermark UI -->
            <div class="absolute bottom-6 left-6 text-[10px] font-extrabold text-brand-200 uppercase tracking-[0.4em] pointer-events-none">
              Aura Intelligence V4.2
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translate(-50%, -50%) scale(0.9) !important; }

path {
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.05));
}
</style>
