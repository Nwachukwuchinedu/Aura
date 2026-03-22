<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { animate, inView } from 'motion';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import Properties from './components/Properties.vue';
import HeatMap from './components/HeatMap.vue';
import VibeMatchmaker from './components/VibeMatchmaker.vue';
import AuraVision from './components/AuraVision.vue';
import DayInTheLife from './components/DayInTheLife.vue';
import ROICalculator from './components/ROICalculator.vue';
import Services from './components/Services.vue';
import Testimonials from './components/Testimonials.vue';
import Footer from './components/Footer.vue';
import AgentWidget from './components/AgentWidget.vue';
import CursorTrail from './components/CursorTrail.vue';
import SectionProgress from './components/SectionProgress.vue';

onMounted(() => {
  nextTick(() => {
    // Global Section-level Reveal Effect
    inView(".reveal-section", (element) => {
      animate(element, 
        { opacity: [0, 1], y: [60, 0], scale: [0.98, 1] }, 
        { duration: 1, ease: [0.16, 1, 0.3, 1] }
      );
    });

    // Global Sub-elements Reveal
    inView(".reveal-up", (element) => {
      animate(element, 
        { opacity: [0, 1], y: [40, 0] }, 
        { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      );
    });
    
    // Magnetic Effect Global Application
    const magneticBtns = document.querySelectorAll('.magnetic-button');
    magneticBtns.forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        animate(btn, { x, y }, { duration: 0.2 });
      });
      btn.addEventListener('mouseleave', () => {
        animate(btn, { x: 0, y: 0 }, { duration: 0.4 });
      });
    });
  });
});
</script>

<template>
  <div class="antialiased min-h-screen relative">
    <CursorTrail />
    <SectionProgress />
    <Navbar />
    
    <main>
      <Hero />
      <Marquee />
      <Properties />
      <HeatMap />
      <VibeMatchmaker />
      <AuraVision />
      <DayInTheLife />
      <ROICalculator />
      <Services />
      <Testimonials />
    </main>

    <Footer />
    <AgentWidget />
  </div>
</template>

<style>
/* Global styles are in assets/main.css */
html {
  scroll-behavior: smooth;
}
</style>
