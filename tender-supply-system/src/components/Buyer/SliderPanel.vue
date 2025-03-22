<template>
    <div>
      <!-- Overlay -->
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-grey-100 bg-opacity-50 z-40 transition-opacity duration-500"
        :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
        @click="$emit('close')"
      ></div>
      
      <!-- Slider Panel -->
      <div 
        class="fixed top-0 right-0 h-full bg-white shadow-xl z-50 transition-transform transform duration-500 ease-out w-full md:w-1/2 lg:w-2/5"
        :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      >
        <!-- Header -->
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-4 overflow-y-auto" style="height: calc(100vh - 4rem);">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Panel'
    }
  });
  
  defineEmits(['close']);
  </script>