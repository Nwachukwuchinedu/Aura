<script setup lang="ts">
import { ref, computed } from 'vue';

const roiInvestment = ref(850000);
const roiYears = ref(5);
const roiRate = ref(6.8); // 6.8% assumed market average

const projectedValue = computed(() => {
  const p = Number(roiInvestment.value);
  const r = Number(roiRate.value) / 100;
  const t = Number(roiYears.value);
  return Math.round(p * Math.pow(1 + r, t));
});

const projectedProfit = computed(() => {
  return projectedValue.value - Number(roiInvestment.value);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};
</script>

<template>
  <section class="py-24 px-4 md:px-8 bg-white reveal-section border-t border-brand-100">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
      
      <div class="lg:col-span-5 reveal-up">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-brand-950 mb-6">Numbers that make sense.</h2>
        <p class="text-brand-600 mb-8 text-lg">Don't guess your returns. Use our live intelligence calculator to model your wealth trajectory based on historical zip-code performance.</p>
        
        <div class="glass-panel bg-brand-50 p-6 rounded-[2rem] border border-brand-200 mb-6">
          <div class="flex justify-between items-center mb-4">
            <label class="font-bold text-brand-950">Initial Investment</label>
            <span class="text-xl font-bold text-brand-600">${{ formatCurrency(roiInvestment) }}</span>
          </div>
          <input type="range" v-model="roiInvestment" min="100000" max="5000000" step="50000" class="premium-slider mb-2">
          <div class="flex justify-between text-xs font-medium text-brand-400">
            <span>$100k</span>
            <span>$5M+</span>
          </div>
        </div>

        <div class="glass-panel bg-brand-50 p-6 rounded-[2rem] border border-brand-200">
          <div class="flex justify-between items-center mb-4">
            <label class="font-bold text-brand-950">Holding Period (Years)</label>
            <span class="text-xl font-bold text-brand-600">{{ roiYears }} Years</span>
          </div>
          <input type="range" v-model="roiYears" min="1" max="30" step="1" class="premium-slider mb-2">
          <div class="flex justify-between text-xs font-medium text-brand-400">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 reveal-clip">
        <div class="bg-brand-950 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <!-- Abstract bg -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          
          <p class="text-brand-400 font-medium tracking-widest uppercase text-sm mb-2">Projected Valuation</p>
          <h3 class="text-5xl md:text-7xl font-bold mb-12 tracking-tight">
            ${{ formatCurrency(projectedValue) }}
          </h3>

          <div class="grid grid-cols-2 gap-8 border-t border-brand-800 pt-8">
            <div>
              <p class="text-brand-400 text-sm mb-1">Estimated Profit</p>
              <p class="text-3xl font-bold text-green-400">+${{ formatCurrency(projectedProfit) }}</p>
            </div>
            <div>
              <p class="text-brand-400 text-sm mb-1">Est. Annual Yield</p>
              <p class="text-3xl font-bold text-white">{{ roiRate }}%</p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mt-12">
            <div class="flex justify-between text-xs text-brand-400 mb-2">
              <span>Principal ({{ Math.round((roiInvestment / projectedValue) * 100) }}%)</span>
              <span>Gain ({{ Math.round((projectedProfit / projectedValue) * 100) }}%)</span>
            </div>
            <div class="w-full h-4 bg-brand-800 rounded-full overflow-hidden flex">
              <div class="bg-white h-full transition-all duration-500 ease-out" :style="`width: ${(roiInvestment / projectedValue) * 100}%`"></div>
              <div class="bg-green-500 h-full transition-all duration-500 ease-out" :style="`width: ${(projectedProfit / projectedValue) * 100}%`"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
