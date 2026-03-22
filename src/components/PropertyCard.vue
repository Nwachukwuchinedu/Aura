<script setup lang="ts">
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
}

defineProps<{
  property: Property;
}>();
</script>

<template>
  <div class="group flex flex-col bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-brand-100 w-full">
    <div class="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-4">
      <img :src="property.image" :alt="property.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full text-xs font-bold text-brand-950">
        {{ property.tag }}
      </div>
      <button class="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-brand-950 hover:bg-white hover:text-red-500 transition-colors">
        <i class="ph ph-heart text-xl"></i>
      </button>
    </div>
    
    <div class="px-3 pb-3 flex flex-col flex-1 justify-between">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-bold text-brand-950 leading-tight group-hover:text-brand-600 transition-colors">{{ property.title }}</h3>
        </div>
        <p class="text-brand-500 text-sm flex items-center gap-1 mb-4">
          <i class="ph ph-map-pin"></i> {{ property.location }}
        </p>
        
        <div class="flex items-center gap-4 text-sm font-medium text-brand-700 mb-6">
          <span class="flex items-center gap-1"><i class="ph ph-bed text-lg"></i> {{ property.beds }} Beds</span>
          <span class="flex items-center gap-1"><i class="ph ph-shower text-lg"></i> {{ property.baths }} Baths</span>
          <span class="flex items-center gap-1"><i class="ph ph-squares-four text-lg"></i> {{ property.sqft }} sqft</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-brand-100">
        <div class="text-2xl font-bold text-brand-950">${{ property.price.toLocaleString() }}</div>
        <button class="w-10 h-10 rounded-full bg-brand-950 text-white flex items-center justify-center hover:bg-brand-800 transition-colors">
          <i class="ph ph-arrow-up-right text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>
