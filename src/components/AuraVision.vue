<script setup lang="ts">
import { ref, computed } from 'vue';
import { Wand2, Check, TrendingUp } from 'lucide-vue-next';

const parallaxCard = ref<HTMLElement | null>(null);
const cardRotateX = ref(0);
const cardRotateY = ref(0);
const mouseX = ref(50);
const mouseY = ref(50);

const cardTransformStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${cardRotateX.value}deg) rotateY(${cardRotateY.value}deg)`
}));

const cardGlowStyle = computed(() => ({
  background: `radial-gradient(circle at ${mouseX.value}% ${mouseY.value}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
}));

const handleCardHover = (e: MouseEvent) => {
  if (!parallaxCard.value) return;
  const rect = parallaxCard.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  mouseX.value = (x / rect.width) * 100;
  mouseY.value = (y / rect.height) * 100;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  cardRotateY.value = ((x - centerX) / centerX) * 12;
  cardRotateX.value = -((y - centerY) / centerY) * 12;
};

const resetCardHover = () => {
  cardRotateX.value = 0;
  cardRotateY.value = 0;
  mouseX.value = 50;
  mouseY.value = 50;
};
</script>

<template>
  <section class="py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden reveal-section border-t border-brand-200/50 mt-12">
    <div class="flex flex-col lg:flex-row items-center gap-16">
      <!-- Text Content -->
      <div class="lg:w-1/2">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50 text-purple-700 w-fit mb-6 reveal-up">
          <Wand2 :size="16" />
          <span class="text-xs font-bold tracking-wide uppercase">Aura Vision™ AI</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-bold tracking-tight text-brand-950 mb-6 reveal-up transition-delay-100">
          See the future of <br>your investment.
        </h2>
        <p class="text-brand-600 text-lg mb-8 reveal-up transition-delay-200 leading-relaxed">
          Our proprietary predictive model analyzes 10,000+ local data points to forecast neighborhood appreciation before it happens. Hover to analyze.
        </p>
        <ul class="space-y-4 mb-8 reveal-up transition-delay-300">
          <li class="flex items-center gap-3 text-brand-800 font-medium">
            <div class="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-950"><Check :size="14" /></div>
            Real-time demographic shifts
          </li>
          <li class="flex items-center gap-3 text-brand-800 font-medium">
            <div class="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-950"><Check :size="14" /></div>
            Infrastructure development tracking
          </li>
        </ul>
      </div>

      <!-- 3D Parallax Card Container -->
      <div class="lg:w-1/2 w-full perspective-1000 flex justify-center reveal-clip"
           @mousemove="handleCardHover" 
           @mouseleave="resetCardHover">
        <div ref="parallaxCard" 
             class="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] transform-style-3d shadow-2xl transition-transform duration-200 ease-out border border-white/40"
             :style="cardTransformStyle">
          
          <img src="https://images.unsplash.com/photo-1613490908571-9ce224a0d9b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="AI Property" class="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]">
          
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/40 to-transparent rounded-[2.5rem]"></div>

          <!-- 3D Floating Elements -->
          <div class="absolute inset-0 p-8 flex flex-col justify-end transform-style-3d pointer-events-none">
            <div class="absolute top-8 right-8 glass-panel px-4 py-2 rounded-full text-sm font-bold text-white translate-z-80 shadow-lg flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Analyzing Area
            </div>

            <div class="glass-panel p-5 rounded-3xl translate-z-100 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20">
              <p class="text-white/70 text-sm font-medium mb-1">Predicted 5-Year Growth</p>
              <div class="flex items-end gap-3 mb-4">
                <h4 class="text-4xl font-bold text-white">+24.8%</h4>
                <span class="text-green-400 flex items-center text-sm font-bold pb-1"><TrendingUp :size="16" class="mr-1" /> High Confidence</span>
              </div>
              
              <div class="w-full h-12 flex items-end justify-between gap-1 mt-2">
                <div class="w-full bg-white/20 rounded-t-sm h-[30%]"></div>
                <div class="w-full bg-white/30 rounded-t-sm h-[45%]"></div>
                <div class="w-full bg-white/40 rounded-t-sm h-[40%]"></div>
                <div class="w-full bg-white/50 rounded-t-sm h-[60%]"></div>
                <div class="w-full bg-white/70 rounded-t-sm h-[85%]"></div>
                <div class="w-full bg-white rounded-t-sm h-[100%] shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>
          </div>
          
          <div class="absolute inset-0 rounded-[2.5rem] opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-300"
               :style="cardGlowStyle"></div>
        </div>
      </div>
    </div>
  </section>
</template>
