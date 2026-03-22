<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const agents = [
  { name: 'Sarah Jenkins', specialty: 'Luxury Estates', status: 'online', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { name: 'Marcus Chen', specialty: 'First-Time Buyers', status: 'away', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { name: 'Elena Rodriguez', specialty: 'Investment ROI', status: 'online', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
];
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 px-4 md:px-0">
    <!-- Glass Panel -->
    <transition name="agent-panel">
      <div v-if="isOpen" 
           class="w-full max-w-[340px] glass-panel rounded-[2.5rem] p-6 shadow-2xl border border-white/40 mb-2 overflow-hidden relative">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-200/50 rounded-full blur-2xl"></div>
        
        <div class="relative z-10 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h4 class="text-xl font-bold text-brand-950 uppercase tracking-tight">Active Agents</h4>
            <button @click="isOpen = false" class="w-8 h-8 rounded-full hover:bg-brand-50 transition-colors flex items-center justify-center">
              <i class="ph ph-x"></i>
            </button>
          </div>
          
          <div class="flex flex-col gap-5">
            <div v-for="agent in agents" :key="agent.name" 
                 class="flex items-center gap-4 group cursor-pointer hover:bg-white/50 p-2 rounded-2xl transition-all">
              <div class="relative">
                <img :src="agent.img" alt="Agent" class="w-12 h-12 rounded-full object-cover ring-2 ring-white">
                <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white pointer-events-none"
                     :class="agent.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500 shadow-[0_0_8px_#eab308]'">
                  <div class="w-full h-full rounded-full animate-ping opacity-75"
                       :class="agent.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'"></div>
                </div>
              </div>
              <div>
                <p class="font-bold text-brand-950 text-sm tracking-tight">{{ agent.name }}</p>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest">{{ agent.specialty }}</span>
                </div>
              </div>
              <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="ph ph-chat-circle-dots text-xl text-brand-950"></i>
              </div>
            </div>
          </div>

          <button class="w-full bg-brand-950 text-white p-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-brand-800 transition-colors">
            Start Live Session
          </button>
        </div>
      </div>
    </transition>

    <!-- Floating Trigger -->
    <button @click="isOpen = !isOpen" 
            class="w-16 h-16 rounded-full bg-brand-950 text-white flex items-center justify-center shadow-[0_12px_32px_rgba(26,26,26,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 relative group overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-tr from-brand-900 to-brand-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <i class="ph ph-chats-circle text-3xl relative z-10 transition-transform group-hover:rotate-12"></i>
      <div class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-[0_0_12px_#22c55e] z-20 flex items-center justify-center text-[10px] font-bold">
        3
      </div>
    </button>
  </div>
</template>

<style scoped>
.agent-panel-enter-active { animation: agent-spring-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
.agent-panel-leave-active { animation: agent-spring-out 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }

@keyframes agent-spring-in {
  0% { transform: translateY(40px) scale(0.9) rotate3d(1, 0, 0, 45deg); opacity: 0; }
  100% { transform: translateY(0) scale(1) rotate3d(0, 0, 0, 0); opacity: 1; }
}
@keyframes agent-spring-out {
  100% { transform: scale(0.9) translateY(20px); opacity: 0; }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
  75%, 100% { transform: scale(3); opacity: 0; }
}
</style>
