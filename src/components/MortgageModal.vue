<script setup lang="ts">
import { ref, computed } from 'vue';
import { store } from '../store';

const downPaymentPercent = ref(20);
const interestRate = ref(6.5);
const years = ref(30);

const propertyPrice = computed(() => store.selectedProperty?.price || 0);
const downPaymentAmount = computed(() => (propertyPrice.value * downPaymentPercent.value) / 100);
const loanAmount = computed(() => propertyPrice.value - downPaymentAmount.value);

const monthlyPayment = computed(() => {
  const r = interestRate.value / 100 / 12;
  const n = years.value * 12;
  if (r === 0) return loanAmount.value / n;
  return (loanAmount.value * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
});

const totalInterest = computed(() => (monthlyPayment.value * years.value * 12) - loanAmount.value);

const closeModal = () => {
  store.closeMortgageModal();
};

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US').format(Math.round(val));

const chartOffset = computed(() => {
  const total = loanAmount.value + totalInterest.value;
  const principalPercent = (loanAmount.value / total) * 100;
  return 100 - principalPercent; // For the dashoffset logic
});
</script>

<template>
  <transition name="modal-overlay">
    <div v-if="store.isMortgageModalOpen" 
         class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
         @click.self="closeModal">
      
      <!-- Blurred Background -->
      <div class="absolute inset-0 bg-brand-950/40 backdrop-blur-md"></div>
      
      <transition name="modal-content">
        <div class="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[800px] border border-white/20">
          <!-- Close Button -->
          <button @click="closeModal" 
                  class="absolute top-8 right-8 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-brand-950 hover:bg-brand-50 transition-colors z-20">
            <i class="ph ph-x text-2xl"></i>
          </button>

          <!-- Left Panel: Form -->
          <div class="flex-1 p-8 md:p-12 overflow-y-auto hide-scrollbar bg-brand-50/50">
            <div class="mb-8">
              <span class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2 block">Mortgage Intelligence</span>
              <h2 class="text-3xl font-bold text-brand-950 leading-tight">Plan your <br>financial future.</h2>
            </div>
            
            <div class="space-y-8">
              <!-- Property Info -->
              <div class="flex items-center gap-4 bg-white p-4 rounded-3xl border border-brand-100 shadow-sm">
                <img :src="store.selectedProperty?.image" class="w-16 h-16 rounded-2xl object-cover shrink-0">
                <div class="min-w-0">
                  <p class="font-bold text-brand-950 truncate">{{ store.selectedProperty?.title }}</p>
                  <p class="text-xl font-bold text-brand-500">${{ formatCurrency(propertyPrice) }}</p>
                </div>
              </div>

              <!-- Sliders -->
              <div class="space-y-6">
                <div class="glass-panel p-6 rounded-3xl bg-white border border-brand-100">
                  <div class="flex justify-between items-center mb-4">
                    <label class="font-bold text-brand-950 text-sm">Down Payment</label>
                    <span class="text-lg font-bold text-brand-950">{{ downPaymentPercent }}%</span>
                  </div>
                  <input type="range" v-model="downPaymentPercent" min="0" max="100" class="premium-slider">
                  <p class="mt-2 text-xs font-bold text-brand-400 text-right">${{ formatCurrency(downPaymentAmount) }}</p>
                </div>

                <div class="glass-panel p-6 rounded-3xl bg-white border border-brand-100">
                  <div class="flex justify-between items-center mb-4">
                    <label class="font-bold text-brand-950 text-sm">Interest Rate</label>
                    <span class="text-lg font-bold text-brand-950">{{ interestRate }}%</span>
                  </div>
                  <input type="range" v-model="interestRate" min="1" max="15" step="0.1" class="premium-slider">
                </div>

                <div class="glass-panel p-6 rounded-3xl bg-white border border-brand-100">
                  <div class="flex justify-between items-center mb-4">
                    <label class="font-bold text-brand-950 text-sm">Loan Term (Years)</label>
                    <span class="text-lg font-bold text-brand-950">{{ years }} Yrs</span>
                  </div>
                  <div class="flex gap-2">
                    <button v-for="y in [15, 20, 30]" :key="y" 
                            @click="years = y"
                            class="flex-1 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm"
                            :class="years === y ? 'bg-brand-950 text-white' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'">
                      {{ y }}Y
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Panel: Summary -->
          <div class="hidden md:flex flex-1 bg-brand-950 p-8 md:p-12 flex-col justify-between text-white relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            
            <div class="relative z-10">
              <span class="text-xs font-bold text-brand-400 uppercase tracking-widest mb-6 block">Monthly Commitment</span>
              <h3 class="text-6xl font-bold text-white mb-2">${{ formatCurrency(monthlyPayment) }}</h3>
              <p class="text-brand-400 font-medium">Estimated Principal & Interest</p>
            </div>

            <!-- SVG Donut Chart -->
            <div class="relative w-full aspect-square max-w-[240px] mx-auto z-10 flex items-center justify-center">
              <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" class="stroke-brand-800 stroke-[5]"></circle>
                <circle cx="18" cy="18" r="15.5" fill="none" class="stroke-white stroke-[5] transition-all duration-1000 ease-out" 
                        stroke-dasharray="100 100" :stroke-dashoffset="chartOffset"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p class="text-[10px] font-bold text-brand-400 uppercase tracking-[0.2em]">Principal</p>
                <p class="text-2xl font-bold">{{ Math.round((loanAmount / (loanAmount + totalInterest)) * 100) }}%</p>
              </div>
            </div>

            <div class="relative z-10 grid grid-cols-2 gap-8 border-t border-brand-800 pt-8">
              <div>
                <p class="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Total Loan</p>
                <p class="text-2xl font-bold text-white">${{ formatCurrency(loanAmount) }}</p>
              </div>
              <div>
                <p class="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Total Interest</p>
                <p class="text-2xl font-bold text-white">${{ formatCurrency(totalInterest) }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay-enter-active, .modal-overlay-leave-active { transition: opacity 0.5s ease; }
.modal-overlay-enter-from, .modal-overlay-leave-to { opacity: 0; }

.modal-content-enter-active { animation: modal-zoom-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.modal-content-leave-active { animation: modal-zoom-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes modal-zoom-in {
  0% { transform: scale(0.9) translateY(40px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes modal-zoom-out {
  100% { transform: scale(0.9) translateY(20px); opacity: 0; }
}

input[type=range].premium-slider {
  accent-color: #1a1a1a;
}
</style>
