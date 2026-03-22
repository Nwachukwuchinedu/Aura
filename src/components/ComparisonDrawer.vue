<script setup lang="ts">
import { store } from '../store';

const removeFromCompare = (title: string) => {
  store.removeFromCompare(title);
};
</script>

<template>
  <transition name="drawer">
    <div v-if="store.comparedProperties.length > 0" 
         class="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 pointer-events-none">
      <div class="max-w-4xl mx-auto glass-panel rounded-[2rem] p-4 shadow-2xl pointer-events-auto border border-brand-200">
        <div class="flex items-center justify-between mb-4 px-2">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-brand-950 text-white flex items-center justify-center font-bold text-xs">
              {{ store.comparedProperties.length }}
            </span>
            <span class="font-bold text-brand-950 uppercase tracking-widest text-xs">Property Comparison Drawer</span>
          </div>
          <button @click="store.comparedProperties = []" class="text-brand-400 hover:text-brand-950 text-xs font-bold transition-colors uppercase tracking-widest">
            Clear All
          </button>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <transition-group name="pulsing-pill">
            <div v-for="property in store.comparedProperties" 
                 :key="property.title"
                 class="relative p-2 bg-white rounded-2xl border border-brand-100 flex items-center gap-3 group animate-pulse-once">
              <img :src="property.image" :alt="property.title" class="w-12 h-12 rounded-xl object-cover shrink-0">
              <div class="overflow-hidden min-w-0">
                <p class="font-bold text-brand-950 text-[10px] truncate leading-tight uppercase tracking-tight">{{ property.title }}</p>
                <p class="text-[10px] text-brand-400 font-bold">${{ (property.price / 1000000).toFixed(1) }}M</p>
              </div>
              <button @click="removeFromCompare(property.title)" 
                      class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-950 text-white flex items-center justify-center shadow-lg hover:bg-brand-800 transition-colors">
                <i class="ph ph-x text-[10px]"></i>
              </button>
            </div>
          </transition-group>
          
          <!-- Empty Slots -->
          <template v-if="store.comparedProperties.length < 3">
            <div v-for="i in (3 - store.comparedProperties.length)" :key="'empty-'+i"
                 class="p-2 border border-dashed border-brand-200 rounded-2xl flex items-center justify-center text-brand-300 text-[10px] font-bold uppercase tracking-widest italic bg-brand-50/50">
              Empty Slot
            </div>
          </template>
        </div>
        
        <div class="mt-4">
          <button class="w-full bg-brand-950 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-800 transition-colors shadow-lg active:scale-95 duration-200">
            Compare Selected Properties
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.drawer-enter-active, .drawer-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from, .drawer-leave-to {
  transform: translateY(100%) scale(0.95);
  opacity: 0;
}

.pulsing-pill-enter-active {
  animation: pulse-entry 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pulse-entry {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.animate-pulse-once {
  animation: pulse-once 0.3s ease-out;
}

@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
</style>
