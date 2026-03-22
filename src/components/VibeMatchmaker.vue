<script setup lang="ts">
import { ref } from 'vue';
import { vibes } from '../data/mockData';

interface Vibe {
  id: string;
  icon: string;
  label: string;
  desc: string;
  img: string;
}

const activeVibe = ref<Vibe>(vibes[0]);
</script>

<template>
  <section id="vibe-match" class="py-24 px-4 md:px-8 max-w-7xl mx-auto reveal-section">
    <div class="bg-brand-100 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      
      <div class="lg:w-1/2 relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-300 bg-white/50 w-fit mb-6">
          <span class="text-xl">✨</span>
          <span class="text-xs font-semibold tracking-wide uppercase text-brand-800">The Vibe Check</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-brand-950 mb-6">
          Match your lifestyle to a home.
        </h2>
        <p class="text-brand-600 mb-8">
          Forget square footage for a second. What's your actual weekend aesthetic? Click below to find your perfect architectural match.
        </p>
        
        <div class="flex flex-wrap gap-3">
          <button v-for="vibe in vibes" :key="vibe.id"
                  @click="activeVibe = vibe"
                  class="px-6 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3 border shadow-sm hover:-translate-y-1"
                  :class="activeVibe.id === vibe.id ? 'bg-brand-950 text-white border-brand-950 scale-105' : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'">
            <span class="text-2xl">{{ vibe.icon }}</span>
            <span>{{ vibe.label }}</span>
          </button>
        </div>
      </div>

      <div class="lg:w-1/2 w-full relative z-10 reveal-clip">
        <div class="bg-white p-4 rounded-[2.5rem] shadow-xl relative overflow-hidden transition-all duration-500">
          <div class="aspect-[4/3] rounded-3xl overflow-hidden relative">
            <transition name="fade" mode="out-in">
              <img :key="activeVibe.id" :src="activeVibe.img" :alt="activeVibe.label" 
                   class="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110">
            </transition>
          </div>
          <div class="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl shadow-lg transform transition-all duration-500">
            <h3 class="text-2xl font-bold text-brand-950 mb-2">{{ activeVibe.label }} Match</h3>
            <p class="text-brand-600 font-medium">{{ activeVibe.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
