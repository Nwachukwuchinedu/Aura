<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { store } from '../store';
import { animate } from 'motion';
import { Plus, Heart, MapPin, BedDouble, Bath, Maximize, ArrowUpRight } from 'lucide-vue-next';

interface Property {
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  category: string;
  tag: string;
  image: string;
  history?: number[];
}

const props = defineProps<{
  property: Property;
}>();

const showHistory = ref(false);

const mockHistory = props.property.history || [7.8, 8.1, 7.9, 8.4, 8.2, 8.6, 8.5, 8.9, 8.7, 9.1, 9.0, 9.4];

const handleCardClick = () => {
  store.addRecentlyViewed(props.property);
};

onMounted(() => {
  // Magnetic Effect for CTAs inside card
  const buttons = document.querySelectorAll('.magnetic-button');
  buttons.forEach((btn: any) => {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      animate(btn, { x: x * 0.3, y: y * 0.3 }, { duration: 0.2 });
    });
    btn.addEventListener('mouseleave', () => {
      animate(btn, { x: 0, y: 0 }, { duration: 0.5 });
    });
  });
});
</script>

<template>
  <div @click="handleCardClick" 
       class="group flex flex-col bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-brand-100 w-full relative">
    
    <div class="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-4">
      <img :src="property.image" 
           :alt="property.title" 
           class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s] ease-out">
      
      <div class="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full text-xs font-bold text-brand-950">
        {{ property.tag }}
      </div>
      
      <div class="absolute top-4 right-4 flex gap-2">
        <button @click.stop="store.addToCompare(property)" 
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-brand-950 hover:bg-brand-950 hover:text-white transition-all transform hover:scale-110">
          <Plus :size="20" />
        </button>
        <button class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-brand-950 hover:bg-white hover:text-red-500 transition-colors">
          <Heart :size="20" />
        </button>
      </div>
    </div>
    
    <div class="px-3 pb-3 flex flex-col flex-1 justify-between">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-bold text-brand-950 leading-tight transition-colors">{{ property.title }}</h3>
        </div>
        <p class="text-brand-500 text-sm flex items-center gap-1 mb-4">
          <MapPin :size="14" /> {{ property.location }}
        </p>
        
        <div class="flex items-center gap-4 text-sm font-medium text-brand-700 mb-6">
          <span class="flex items-center gap-1"><BedDouble :size="18" /> {{ property.beds }}</span>
          <span class="flex items-center gap-1"><Bath :size="18" /> {{ property.baths }}</span>
          <span class="flex items-center gap-1"><Maximize :size="18" /> {{ property.sqft }}</span>
        </div>

        <!-- NEW: Price History Mini Sparkline -->
        <div class="mb-6 p-3 bg-brand-50 rounded-2xl border border-brand-100 relative overflow-hidden group/history cursor-pointer"
             @click.stop="showHistory = !showHistory">
          <div class="flex justify-between items-center mb-1">
            <span class="text-[10px] font-bold text-brand-400 uppercase tracking-widest">12M History</span>
            <span class="text-[10px] font-bold text-green-500">+12.4%</span>
          </div>
          <div class="h-8 flex items-end justify-between gap-0.5">
            <template v-for="(val, i) in mockHistory" :key="i">
              <div class="flex-1 bg-brand-200 rounded-full transition-all duration-500" 
                   :style="`height: ${(val / 10) * 100}%`"
                   :class="{ 'bg-brand-950': i === mockHistory.length - 1 }"></div>
            </template>
          </div>
          <!-- Glow on last element -->
          <div class="absolute right-3 bottom-3 w-1.5 h-1.5 bg-brand-950 rounded-full shadow-[0_0_8px_#1a1a1a] animate-pulse"></div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-brand-100">
        <div class="text-2xl font-bold text-brand-950">${{ property.price.toLocaleString() }}</div>
        <button @click.stop="store.openMortgageModal(property)" 
                class="w-10 h-10 rounded-full bg-brand-950 text-white flex items-center justify-center hover:bg-brand-800 transition-colors magnetic-button">
          <ArrowUpRight :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
