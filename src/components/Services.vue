<script setup lang="ts">
import { Glasses, TrendingUp, Handshake, Home } from 'lucide-vue-next';
</script>

<template>
  <section id="services" class="py-24 px-4 md:px-8 bg-brand-950 text-white rounded-[2.5rem] md:rounded-[4rem] mx-2 md:mx-4 my-8 reveal-section">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-16 reveal-up">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">Why Choose Aura?</h2>
        <p class="text-brand-300 text-lg">We blend innovative technology with white-glove service to redefine the real estate experience.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
        <!-- Bento Box 1 -->
        <div class="md:col-span-2 relative rounded-3xl overflow-hidden p-8 flex flex-col justify-end dark-glass reveal-up">
          <img src="https://images.unsplash.com/photo-1628611225249-6c0ea04f29e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Interior" class="absolute inset-0 w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-700">
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white">
              <Glasses :size="24" />
            </div>
            <h3 class="text-2xl font-bold mb-2">Virtual Tours</h3>
            <p class="text-brand-300 max-w-md">Experience properties in immersive 3D from the comfort of your current home.</p>
          </div>
        </div>

        <!-- Bento Box 2 -->
        <div class="bg-brand-900 rounded-3xl p-8 flex flex-col justify-between border border-brand-800 hover:border-brand-600 transition-colors reveal-up transition-delay-100">
          <div class="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center text-white">
            <TrendingUp :size="24" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Market Insights</h3>
            <p class="text-brand-400 text-sm">Real-time data and analytics to ensure you make the smartest investment.</p>
          </div>
        </div>

        <!-- Bento Box 3 -->
        <div class="bg-brand-900 rounded-3xl p-8 flex flex-col justify-between border border-brand-800 hover:border-brand-600 transition-colors reveal-up transition-delay-200">
          <div class="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center text-white">
            <Handshake :size="24" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">Expert Agents</h3>
            <p class="text-brand-400 text-sm">Work with top 1% local experts dedicated to your success.</p>
          </div>
        </div>

        <!-- Bento Box 4 -->
        <div class="md:col-span-2 bg-gradient-to-br from-brand-800 to-brand-950 rounded-3xl p-8 flex items-center justify-between border border-brand-700 reveal-up transition-delay-300 relative overflow-hidden group">
          <!-- Abstract Shape -->
          <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-brand-600 rounded-full mix-blend-overlay blur-3xl group-hover:scale-150 transition-transform duration-1000 animate-spin-slow"></div>
          
          <div class="relative z-10 max-w-md">
            <h3 class="text-3xl font-bold mb-4">Ready to sell your property?</h3>
            <p class="text-brand-300 mb-6">Get a free valuation and see how our marketing strategy can maximize your return.</p>
            <button class="bg-white text-brand-950 px-6 py-3 rounded-full font-medium hover:bg-brand-100 transition-colors">
              Get Free Valuation
            </button>
          </div>
          <Home :size="120" class="text-white/5 relative z-10 hidden sm:block" />
        </div>
      </div>
    </div>
  </section>
</template>
