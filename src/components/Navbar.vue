<script setup lang="ts">
import { ref, onMounted } from 'vue';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 transition-all duration-300" 
       :class="{ 'py-2': scrolled }">
    <div class="max-w-7xl mx-auto rounded-full glass-panel px-6 py-3 md:py-4 flex justify-between items-center shadow-sm">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 group">
        <div class="w-8 h-8 rounded-full bg-brand-950 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-90">
          <i class="ph ph-buildings text-xl"></i>
        </div>
        <span class="font-bold text-xl tracking-tight">Aura</span>
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8 font-medium text-sm text-brand-600">
        <a href="#home" class="hover:text-brand-950 transition-colors">Home</a>
        <a href="#properties" class="hover:text-brand-950 transition-colors">Properties</a>
        <a href="#services" class="hover:text-brand-950 transition-colors">Services</a>
        <a href="#about" class="hover:text-brand-950 transition-colors">About</a>
      </div>

      <!-- CTA & Mobile Toggle -->
      <div class="flex items-center gap-4">
        <a href="#contact" class="hidden md:flex bg-brand-950 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-800 transition-colors hover:scale-105 duration-300 ease-out active:scale-95">
          Let's Talk
        </a>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-2xl p-1 text-brand-950">
          <i class="ph" :class="mobileMenuOpen ? 'ph-x' : 'ph-list'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="mobileMenuOpen" 
         class="md:hidden absolute top-full left-4 right-4 mt-2 glass-panel rounded-3xl p-6 flex flex-col gap-4 shadow-xl origin-top transition-all duration-300">
      <a href="#home" @click="mobileMenuOpen = false" class="text-lg font-medium p-2">Home</a>
      <a href="#properties" @click="mobileMenuOpen = false" class="text-lg font-medium p-2">Properties</a>
      <a href="#services" @click="mobileMenuOpen = false" class="text-lg font-medium p-2">Services</a>
      <a href="#contact" @click="mobileMenuOpen = false" class="bg-brand-950 text-white text-center px-6 py-3 rounded-full mt-4 font-medium">Let's Talk</a>
    </div>
  </nav>
</template>
