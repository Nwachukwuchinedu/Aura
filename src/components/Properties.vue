<script setup lang="ts">
import { ref, computed } from 'vue';
import PropertyCard from './PropertyCard.vue';
import { allProperties } from '../data/mockData';

const searchQuery = ref('');
const activeCategory = ref('All');
const filterPrice = ref('any');
const filterBeds = ref('any');

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'All';
  filterPrice.value = 'any';
  filterBeds.value = 'any';
};

const filteredProperties = computed(() => {
  return allProperties.filter(p => {
    // Category Match
    const matchCategory = activeCategory.value === 'All' || p.category === activeCategory.value;

    // Price Match
    let matchPrice = true;
    if (filterPrice.value === '0-2m') matchPrice = p.price < 2000000;
    if (filterPrice.value === '2m-5m') matchPrice = p.price >= 2000000 && p.price <= 5000000;
    if (filterPrice.value === '5m-plus') matchPrice = p.price > 5000000;

    // Beds Match
    let matchBeds = true;
    if (filterBeds.value !== 'any') matchBeds = p.beds >= parseInt(filterBeds.value);

    // Search Match
    const query = searchQuery.value.toLowerCase();
    const matchSearch = query === '' || 
                        p.title.toLowerCase().includes(query) || 
                        p.location.toLowerCase().includes(query);

    return matchCategory && matchPrice && matchBeds && matchSearch;
  });
});
</script>

<template>
  <section id="properties" class="py-24 px-4 md:px-8 max-w-7xl mx-auto">
    <div class="flex flex-col gap-6 mb-12 reveal-up">
      <div class="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 class="text-4xl font-bold tracking-tight text-brand-950 mb-4">Discover Top Picks</h2>
          <p class="text-brand-600 max-w-md">Handpicked premium properties curated just for you. Find your sanctuary among our exclusive listings.</p>
        </div>
        
        <!-- Search Bar -->
        <div class="relative w-full md:w-auto md:min-w-[300px]">
          <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 text-lg"></i>
          <input v-model="searchQuery" type="text" placeholder="Search name or location..." 
                 class="w-full pl-11 pr-4 py-3 rounded-full border border-brand-200 bg-white shadow-sm focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm font-medium">
        </div>
      </div>

      <!-- Advanced Filter Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-100/50 p-2 rounded-[2rem] md:rounded-full border border-brand-200/50">
        <!-- Tabs -->
        <div class="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
          <button v-for="tab in ['All', 'Houses', 'Apartments', 'Villas']" 
                  :key="tab"
                  @click="activeCategory = tab"
                  class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap"
                  :class="activeCategory === tab ? 'bg-white text-brand-950 shadow-sm' : 'text-brand-500 hover:text-brand-950 hover:bg-white/50'">
            {{ tab }}
          </button>
        </div>

        <!-- Filter Dropdowns -->
        <div class="flex gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar">
          <div class="relative min-w-[140px]">
            <select v-model="filterPrice" class="w-full appearance-none bg-white border border-brand-200 rounded-full pl-5 pr-10 py-2.5 text-sm font-medium text-brand-700 outline-none focus:border-brand-950 transition-colors cursor-pointer shadow-sm">
              <option value="any">Any Price</option>
              <option value="0-2m">Under $2M</option>
              <option value="2m-5m">$2M - $5M</option>
              <option value="5m-plus">$5M+</option>
            </select>
            <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none"></i>
          </div>
          <div class="relative min-w-[130px]">
            <select v-model="filterBeds" class="w-full appearance-none bg-white border border-brand-200 rounded-full pl-5 pr-10 py-2.5 text-sm font-medium text-brand-700 outline-none focus:border-brand-950 transition-colors cursor-pointer shadow-sm">
              <option value="any">Any Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>
            <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 pointer-events-none"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Reactive Property Grid -->
    <transition-group name="property-list" tag="div" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative min-h-[400px]">
      <PropertyCard v-for="property in filteredProperties" :key="property.title" :property="property" />
    </transition-group>

    <!-- Empty State -->
    <div v-if="filteredProperties.length === 0" class="w-full py-20 text-center flex flex-col items-center justify-center bg-white rounded-[2rem] border border-brand-100 reveal-up">
      <div class="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
        <i class="ph ph-house-line text-2xl text-brand-400"></i>
      </div>
      <h3 class="text-xl font-bold text-brand-950 mb-2">No properties found</h3>
      <p class="text-brand-500 max-w-sm">We couldn't find any properties matching your exact criteria. Try adjusting your filters.</p>
      <button @click="resetFilters" class="mt-6 px-6 py-2.5 bg-brand-950 text-white rounded-full text-sm font-medium hover:bg-brand-800 transition-colors shadow-lg shadow-brand-950/20">
        Clear All Filters
      </button>
    </div>

    <div class="mt-12 flex justify-center reveal-up">
      <button class="px-8 py-3 rounded-full border-2 border-brand-200 text-brand-950 font-medium hover:border-brand-950 transition-colors">
        View All Properties
      </button>
    </div>
  </section>
</template>
