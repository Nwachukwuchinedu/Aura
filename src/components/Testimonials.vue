<script setup lang="ts">
import { testimonials } from '../data/mockData';
import { Quote } from 'lucide-vue-next';
</script>

<template>
  <section class="py-24 px-4 md:px-8 max-w-7xl mx-auto reveal-section">
    <div class="text-center max-w-2xl mx-auto mb-16 reveal-up">
      <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-brand-950">What they actually say.</h2>
      <p class="text-brand-600 text-lg">Don't just take our word for it. Listen to our clients (and their slightly jealous neighbors).</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="(test, index) in testimonials" :key="index" 
           class="bg-white p-8 rounded-[2rem] border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
        <div>
          <div class="text-brand-300 text-4xl mb-6 group-hover:text-brand-950 transition-colors animate-float" :style="{ animationDelay: `${index * 0.5}s` }">
            <Quote :size="48" fill="currentColor" />
          </div>
          <p class="text-xl font-medium text-brand-900 leading-relaxed mb-8">
            "{{ test.quote }}"
          </p>
        </div>
        <div class="flex items-center gap-4 pt-6 border-t border-brand-100">
          <div class="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-950 font-bold text-lg">
            {{ test.author.charAt(0) }}
          </div>
          <div>
            <p class="font-bold text-brand-950">{{ test.author }}</p>
            <p class="text-sm text-brand-500">{{ test.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
