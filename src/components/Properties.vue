<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import PropertyCard from './PropertyCard.vue';
import ComparisonDrawer from './ComparisonDrawer.vue';
import MortgageModal from './MortgageModal.vue';
import RecentlyViewed from './RecentlyViewed.vue';
import { allProperties } from '../data/mockData';
import { store } from '../store';
import { Search, Loader2, ChevronDown, Home } from 'lucide-vue-next';

const searchQuery = ref('');
const activeCategory = ref('All');
const filterPrice = ref('any');
const filterBeds = ref('any');

const tabRefs = ref<HTMLElement[]>([]);
const tabIndicatorStyle = ref({ width: '0px', left: '0px' });

const updateTabIndicator = () => {
  const index = ['All', 'Houses', 'Apartments', 'Villas'].indexOf(activeCategory.value);
  if (tabRefs.value[index]) {
    const el = tabRefs.value[index];
    tabIndicatorStyle.value = {
      width: `${el.offsetWidth}px`,
      left: `${el.offsetLeft}px`
    };
  }
};

watch(activeCategory, () => {
  updateTabIndicator();
});

onMounted(() => {
  updateTabIndicator();
  window.addEventListener('resize', updateTabIndicator);
});

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'All';
  filterPrice.value = 'any';
  filterBeds.value = 'any';
};

const filteredProperties = computed(() => {
  return allProperties.filter(p => {
    const matchCategory = activeCategory.value === 'All' || p.category === activeCategory.value;
    let matchPrice = true;
    if (filterPrice.value === '0-2m') matchPrice = p.price < 2000000;
    if (filterPrice.value === '2m-5m') matchPrice = p.price >= 2000000 && p.price <= 5000000;
    if (filterPrice.value === '5m-plus') matchPrice = p.price > 5000000;
    let matchBeds = true;
    if (filterBeds.value !== 'any') matchBeds = p.beds >= parseInt(filterBeds.value);
    const query = searchQuery.value.toLowerCase();
    const matchSearch = query === '' || p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query);
    return matchCategory && matchPrice && matchBeds && matchSearch;
  });
});

const isFiltering = ref(false);
watch([searchQuery, activeCategory, filterPrice, filterBeds], () => {
  isFiltering.value = true;
  setTimeout(() => {
    isFiltering.value = false;
  }, 400);
});
</script>

<template>
  <section id="properties" class="py-24 px-4 md:px-8 max-w-7xl mx-auto">
    <div class="flex flex-col gap-6 mb-12 reveal-up">
      <div class="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter text-brand-950 mb-4 uppercase">Discover <br>Top Picks.</h2>
          <p class="text-brand-600 max-w-md font-medium text-lg">Handpicked premium properties curated for the world's elite seekers.</p>
        </div>
        
        <div class="relative w-full md:w-auto md:min-w-[340px]">
          <Search class="absolute left-6 top-1/2 -translate-y-1/2 text-brand-400 w-5 h-5" />
          <input v-model="searchQuery" type="text" placeholder="Search name or location..." 
                 class="w-full pl-14 pr-12 py-5 rounded-full border border-brand-200 bg-white shadow-xl focus:outline-none focus:border-brand-950 focus:ring-1 focus:ring-brand-950 transition-all text-sm font-bold uppercase tracking-widest placeholder:text-brand-300">
          
          <div v-show="isFiltering" class="absolute right-6 top-1/2 -translate-y-1/2 text-brand-400">
            <Loader2 class="animate-spin w-5 h-5" />
          </div>
        </div>
      </div>

      <!-- Advanced Filter Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-brand-100/50 p-2 rounded-[2.5rem] md:rounded-full border border-white/40 backdrop-blur-md relative overflow-hidden">
        <!-- Sliding Tab Indicator (NEW) -->
        <div class="absolute bg-white rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
             :style="tabIndicatorStyle"></div>

        <div class="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar relative z-10">
          <button v-for="(tab, i) in ['All', 'Houses', 'Apartments', 'Villas']" 
                  :key="tab"
                  ref="tabRefs"
                  @click="activeCategory = tab"
                  class="px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap"
                  :class="activeCategory === tab ? 'text-brand-950' : 'text-brand-400 hover:text-brand-950'">
            {{ tab }}
          </button>
        </div>

        <div class="flex gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar relative z-10">
          <div class="relative min-w-[150px]">
            <select v-model="filterPrice" class="w-full appearance-none bg-white/80 border border-brand-200 rounded-full pl-6 pr-12 py-3.5 text-[10px] font-black uppercase tracking-widest text-brand-700 outline-none focus:border-brand-950 transition-colors cursor-pointer shadow-lg hover:bg-white transition-all">
              <option value="any">Any Price</option>
              <option value="0-2m">Under $2M</option>
              <option value="2m-5m">$2M - $5M</option>
              <option value="5m-plus">$5M+</option>
            </select>
            <ChevronDown class="absolute right-6 top-1/2 -translate-y-1/2 text-brand-400 w-5 h-5 pointer-events-none" />
          </div>
          <div class="relative min-w-[140px]">
            <select v-model="filterBeds" class="w-full appearance-none bg-white/80 border border-brand-200 rounded-full pl-6 pr-12 py-3.5 text-[10px] font-black uppercase tracking-widest text-brand-700 outline-none focus:border-brand-950 transition-colors cursor-pointer shadow-lg hover:bg-white transition-all">
              <option value="any">Any Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>
            <ChevronDown class="absolute right-6 top-1/2 -translate-y-1/2 text-brand-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>

    <!-- Reactive Property Grid -->
    <div class="relative min-h-[400px]">
      <transition-group name="property-list" tag="div" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-if="isFiltering">
          <div v-for="i in 6" :key="'skeleton-'+i" 
               class="bg-white rounded-[3rem] p-4 shadow-xl border border-brand-100 w-full h-[450px] flex flex-col gap-6 animate-pulse">
            <div class="w-full aspect-[4/3] rounded-[2rem] skeleton-shimmer bg-brand-50"></div>
            <div class="px-3 space-y-4">
              <div class="h-8 w-3/4 skeleton-shimmer bg-brand-50 rounded-xl"></div>
              <div class="h-4 w-1/2 skeleton-shimmer bg-brand-50 rounded-xl"></div>
              <div class="pt-6 flex justify-between">
                <div class="h-10 w-1/3 skeleton-shimmer bg-brand-50 rounded-xl"></div>
                <div class="h-12 w-12 skeleton-shimmer bg-brand-50 rounded-full"></div>
              </div>
            </div>
          </div>
        </template>
        
        <PropertyCard v-else-if="filteredProperties.length > 0" 
                     v-for="property in filteredProperties" 
                     :key="property.title" 
                     :property="property" />
      </transition-group>

      <div v-if="!isFiltering && filteredProperties.length === 0" class="w-full py-32 text-center flex flex-col items-center justify-center bg-white rounded-[4rem] border border-brand-100 reveal-up shadow-2xl">
        <div class="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <Home class="w-10 h-10 text-brand-200" />
        </div>
        <h3 class="text-3xl font-black text-brand-950 mb-3 uppercase tracking-tighter">Zero results matched.</h3>
        <p class="text-brand-500 max-w-sm font-medium">Try broadening your search or resetting all filters for a fresh look.</p>
        <button @click="resetFilters" class="mt-10 px-10 py-4 bg-brand-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95">
          Clear All Parameters
        </button>
      </div>
    </div>

    <ComparisonDrawer />
    <RecentlyViewed />
    <MortgageModal />
  </section>
</template>
