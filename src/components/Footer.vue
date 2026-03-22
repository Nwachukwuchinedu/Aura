<template>
  <footer id="contact" class="pt-24 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
    <div class="bg-brand-100 rounded-[3rem] p-12 md:p-20 text-center flex flex-col items-center justify-center reveal-section">
      <div class="w-16 h-16 rounded-full bg-brand-950 text-white flex items-center justify-center text-3xl mb-8 -mt-24 shadow-xl shadow-brand-950/20">
        <i class="ph-fill ph-paper-plane-tilt"></i>
      </div>
      <h2 class="text-4xl md:text-6xl font-bold tracking-tight text-brand-950 mb-6 max-w-2xl">
        Let's find your dream home together.
      </h2>
      <p class="text-brand-600 text-lg mb-10 max-w-xl">
        Join thousands of satisfied homeowners. Sign up to our exclusive newsletter to get first access to premium listings.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input type="email" placeholder="Enter your email address" class="flex-1 px-6 py-4 rounded-full border border-brand-300 bg-white/50 focus:bg-white focus:outline-none focus:border-brand-950 transition-colors">
        <button class="bg-brand-950 text-white px-8 py-4 rounded-full font-medium hover:bg-brand-800 transition-colors whitespace-nowrap">
          Subscribe
        </button>
      </div>
    </div>

    <!-- Footer Links -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-24 mb-16 border-b border-brand-200 pb-16 text-sm">
      <div class="col-span-2 lg:col-span-2">
        <a href="#" class="flex items-center gap-2 mb-6">
          <div class="w-8 h-8 rounded-full bg-brand-950 flex items-center justify-center text-white">
            <i class="ph ph-buildings"></i>
          </div>
          <span class="font-bold text-2xl tracking-tight text-brand-950">Aura</span>
        </a>
        <p class="text-brand-500 max-w-xs mb-6">Reimagining the real estate experience through exceptional design, modern tech, and personalized service.</p>
        <div class="flex gap-4 text-brand-400">
          <a href="#" class="hover:text-brand-950 transition-colors"><i class="ph-fill ph-twitter-logo text-2xl"></i></a>
          <a href="#" class="hover:text-brand-950 transition-colors"><i class="ph-fill ph-instagram-logo text-2xl"></i></a>
          <a href="#" class="hover:text-brand-950 transition-colors"><i class="ph-fill ph-linkedin-logo text-2xl"></i></a>
        </div>
      </div>
      
      <div>
        <h4 class="font-bold text-brand-950 mb-6 uppercase tracking-wider text-xs">Company</h4>
        <ul class="flex flex-col gap-4 text-brand-600">
          <li><a href="#" class="hover:text-brand-950 transition-colors">About Us</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Careers</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Press</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-brand-950 mb-6 uppercase tracking-wider text-xs">Services</h4>
        <ul class="flex flex-col gap-4 text-brand-600">
          <li><a href="#" class="hover:text-brand-950 transition-colors">Buy a House</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Rent a House</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Sell a House</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Property Valuation</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold text-brand-950 mb-6 uppercase tracking-wider text-xs">Legal</h4>
        <ul class="flex flex-col gap-4 text-brand-600">
          <li><a href="#" class="hover:text-brand-950 transition-colors">Terms of Service</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="hover:text-brand-950 transition-colors">Cookie Policy</a></li>
        </ul>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center text-sm text-brand-400 gap-4">
      <p>&copy; 2026 Aura Real Estate. All rights reserved.</p>
      <div class="flex gap-6">
        <span>Designed with precision.</span>
      </div>
    </div>
  </footer>
</template>
