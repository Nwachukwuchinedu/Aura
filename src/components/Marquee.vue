<script setup lang="ts">
import { Home, Building2, Compass, Key, Landmark } from 'lucide-vue-next';
</script>

<template>
  <section class="py-10 border-y border-brand-200/50 bg-white overflow-hidden flex items-center">
    <div class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <div class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]"
           style="animation: slide 30s linear infinite;">
        <!-- Using template to repeat the list for seamless loop -->
        <ul v-for="i in 2" :key="i" class="flex items-center justify-center space-x-12 px-6">
          <li class="text-2xl font-bold text-brand-300 flex items-center gap-2"><Home :size="24" fill="currentColor" /> Zillow</li>
          <li class="text-2xl font-bold text-brand-300 flex items-center gap-2"><Building2 :size="24" fill="currentColor" /> Trulia</li>
          <li class="text-2xl font-bold text-brand-300 flex items-center gap-2"><Compass :size="24" fill="currentColor" /> Compass</li>
          <li class="text-2xl font-bold text-brand-300 flex items-center gap-2"><Key :size="24" fill="currentColor" /> Redfin</li>
          <li class="text-2xl font-bold text-brand-300 flex items-center gap-2"><Landmark :size="24" fill="currentColor" /> Chase</li>
        </ul>
      </div>
    </div>
  </section>
</template>
