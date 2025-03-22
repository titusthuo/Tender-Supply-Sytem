<template>
    <div>
      <!-- Modal Backdrop -->
      <transition name="fade">
        <div 
          v-if="isOpen" 
          class="fixed inset-0 bg-white bg-opacity-50 z-40"
          @click="$emit('close')"
        ></div>
      </transition>
      
      <!-- Modal Panel -->
      <transition name="modal">
        <div 
          v-if="isOpen"
          class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md"
        >
          <!-- Header -->
          <div class="p-4 border-b bg-blue-600 text-white rounded-t-md">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold">Create New Contract</h2>
              <button 
                class="text-white hover:text-gray-300 focus:outline-none"
                @click="$emit('close')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Content -->
          <form @submit.prevent="submitForm" class="p-4">
            <div class="space-y-4">
              <!-- Contract Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contract Title *
                </label>
                <input 
                  type="text" 
                  v-model="contractTitle" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                  placeholder="Enter contract title"
                />
              </div>
  
              <!-- Contract Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contract Type *
                </label>
                <select 
                  v-model="contractType"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                  required
                >
                  <option value="" disabled selected>Select contract type</option>
                  <option value="service">Service Agreement</option>
                  <option value="goods">Goods Agreement</option>
                  <option value="subscription">Subscription</option>
                </select>
              </div>
  
              <!-- Supplier -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Supplier *
                </label>
                <select 
                  v-model="supplier"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                  required
                >
                  <option value="" disabled selected>Select supplier</option>
                  <option value="officesolutions">Office Solutions Inc.</option>
                  <option value="techguard">TechGuard Security</option>
                  <option value="hamilton">Hamilton & Partners LLP</option>
                  <option value="buildright">BuildRight Services</option>
                </select>
              </div>
  
              <!-- Template -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <select 
                  v-model="template"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                >
                  <option value="standard">Standard Services Agreement</option>
                  <option value="master">Master Services Agreement</option>
                  <option value="goods">Goods Purchase Agreement</option>
                </select>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                type="button" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </template>
  
  <style scoped>
  /* Fade effect for backdrop */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  /* Slide-in effect for modal */
  .modal-enter-active, .modal-leave-active {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .modal-enter-from, .modal-leave-to {
    transform: translate(-50%, -55%);
    opacity: 0;
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  
  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'submit']);
  
  // Form fields
  const contractTitle = ref('');
  const contractType = ref('');
  const supplier = ref('');
  const template = ref('standard'); // Default template
  
  const submitForm = () => {
    emit('submit', {
      title: contractTitle.value,
      type: contractType.value,
      supplier: supplier.value,
      template: template.value
    });
  
    emit('close'); // Close modal after submission
  };
  </script>
  