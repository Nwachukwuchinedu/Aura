<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { animate } from 'motion';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const mobileMenu = ref<HTMLElement | null>(null);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen && mobileMenu.value) {
    animate(mobileMenu.value, 
      { clipPath: ["inset(0 0 100%)", "inset(0 0 0%)"] }, 
      { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
    );
  }
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 transition-all duration-500" 
       :class="{ 'py-2': scrolled }">
    <div class="max-w-7xl mx-auto rounded-full glass-panel px-8 py-3 md:py-4 flex justify-between items-center shadow-lg border border-white/40">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-full bg-brand-950 flex items-center justify-center text-white transition-transform duration-700 group-hover:rotate-180 shadow-lg">
          <i class="ph ph-buildings text-2xl"></i>
        </div>
        <span class="font-black text-2xl tracking-tighter uppercase text-brand-950">Aura</span>
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.2em] text-brand-400">
        <a href="#home" class="hover:text-brand-950 transition-colors relative group">
          Home
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-950 group-hover:w-full transition-all duration-500"></span>
        </a>
        <a href="#properties" class="hover:text-brand-950 transition-colors relative group">
          Properties
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-950 group-hover:w-full transition-all duration-500"></span>
        </a>
        <a href="#services" class="hover:text-brand-950 transition-colors relative group">
          Services
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-950 group-hover:w-full transition-all duration-500"></span>
        </a>
        <a href="#about" class="hover:text-brand-950 transition-colors relative group">
          About
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-950 group-hover:w-full transition-all duration-500"></span>
        </a>
      </div>

      <!-- CTA & Mobile Toggle -->
      <div class="flex items-center gap-6">
        <a href="#contact" class="hidden md:flex bg-brand-950 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-800 transition-all hover:scale-105 duration-300 ease-out active:scale-95 shadow-xl magnetic-button">
          Let's Talk
        </a>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-3xl p-1 text-brand-950 transform active:scale-90 transition-transform">
          <i class="ph" :class="mobileMenuOpen ? 'ph-x' : 'ph-list-bold'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileMenuOpen" 
         ref="mobileMenu"
         class="md:hidden absolute top-full left-4 right-4 mt-4 glass-panel rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl origin-top border border-white/40 overflow-hidden">
      <a href="#home" @click="mobileMenuOpen = false" class="text-2xl font-black uppercase tracking-tighter text-brand-950 transition-delay-100">Home</a>
      <a href="#properties" @click="mobileMenuOpen = false" class="text-2xl font-black uppercase tracking-tighter text-brand-950 transition-delay-200">Properties</a>
      <a href="#services" @click="mobileMenuOpen = false" class="text-2xl font-black uppercase tracking-tighter text-brand-950 transition-delay-300">Services</a>
      <a href="#contact" @click="mobileMenuOpen = false" class="bg-brand-950 text-white text-center px-8 py-4 rounded-full mt-8 font-black uppercase tracking-widest shadow-2xl">Let's Talk</a>
    </div>
  </nav>
</template>

<style scoped>
/* Navigation items entrance */
a {
  will-change: transform, opacity;
}
</style>
