<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { animate, inView } from 'motion';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import Properties from './components/Properties.vue';
import VibeMatchmaker from './components/VibeMatchmaker.vue';
import AuraVision from './components/AuraVision.vue';
import ROICalculator from './components/ROICalculator.vue';
import Services from './components/Services.vue';
import Testimonials from './components/Testimonials.vue';
import Footer from './components/Footer.vue';

onMounted(() => {
  nextTick(() => {
    // Global Section-level Reveal Effect
    inView(".reveal-section", (element) => {
      animate(element, 
        { opacity: [0, 1], y: [60, 0], scale: [0.98, 1] }, 
        { duration: 1, ease: [0.16, 1, 0.3, 1] }
      );
    });

    // Sub-elements Reveal
    inView(".reveal-up", (element) => {
      animate(element, 
        { opacity: [0, 1], y: [40, 0] }, 
        { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      );
    });
  });
});
</script>

<template>
  <div class="antialiased">
    <Navbar />
    <main>
      <Hero />
      <Marquee />
      <Properties />
      <VibeMatchmaker />
      <AuraVision />
      <ROICalculator />
      <Services />
      <Testimonials />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global styles are in assets/main.css */
</style>
