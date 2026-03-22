<script setup lang="ts">
import { store } from '../store';

const removeFromHistory = (title: string) => {
  store.recentlyViewed = store.recentlyViewed.filter(p => p.title !== title);
};
</script>

<template>
  <transition name="shelf">
    <div v-if="store.recentlyViewed.length > 0" 
         class="fixed bottom-4 left-4 z-[55] flex flex-col gap-2 pointer-events-none">
      <div class="flex items-center gap-2 mb-2 px-2">
        <span class="text-[10px] font-extrabold text-brand-950 uppercase tracking-[0.2em] bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-200">
          Recently Viewed
        </span>
      </div>
      <div class="flex flex-col gap-2 pointer-events-auto">
        <transition-group name="chip">
          <div v-for="property in store.recentlyViewed" 
               :key="property.title"
               class="flex items-center gap-3 bg-white/90 backdrop-blur-xl p-2 rounded-2xl border border-brand-200 shadow-xl group hover:scale-105 transition-all duration-300 w-fit pr-6 relative">
            <img :src="property.image" class="w-10 h-10 rounded-xl object-cover shrink-0">
            <div class="overflow-hidden">
              <p class="font-bold text-brand-950 text-[10px] uppercase truncate max-w-[120px]">{{ property.title }}</p>
              <p class="text-[10px] font-bold text-brand-500">${{ (property.price / 1000000).toFixed(1) }}M</p>
            </div>
            <button @click="removeFromHistory(property.title)" 
                    class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-950 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="ph ph-x text-[8px]"></i>
            </button>
          </div>
        </transition-group>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.shelf-enter-active, .shelf-leave-active { transition: all 0.6s ease; }
.shelf-enter-from, .shelf-leave-to { transform: translateX(-40px); opacity: 0; }

.chip-enter-active { animation: chip-spring 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
.chip-leave-active { transition: all 0.3s ease; position: absolute; }
.chip-leave-to { transform: translateX(-20px) scale(0.8); opacity: 0; }

@keyframes chip-spring {
  0% { transform: translateX(-20px) scale(0.8); opacity: 0; }
  100% { transform: translateX(0) scale(1); opacity: 1; }
}
</style>
