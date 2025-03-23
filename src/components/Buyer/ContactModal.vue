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
          <div class="p-4 border-b">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold">Contact Supplier</h2>
              <button 
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
                @click="$emit('close')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p class="text-gray-600 mt-1" v-if="supplier">
              You are about to contact {{ supplier.name }}
            </p>
          </div>
          
          <!-- Content -->
          <form @submit.prevent="handleSubmit" class="p-4">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Your Email *
                </label>
                <input 
                  type="email" 
                  v-model="email" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input 
                  type="text" 
                  v-model="subject" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                  placeholder="Request for information"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea 
                  v-model="message" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                  rows="4"
                  placeholder="Enter your message here..."
                ></textarea>
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
                Send Message
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
    transition: opacity 0.3s ease;
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
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    supplier: {
      type: Object,
      default: null
    }
  });
  
  const emit = defineEmits(['close', 'submit']);
  
  // Form fields
  const email = ref('');
  const subject = ref('');
  const message = ref('');
  
  // Reset form when modal closes
  watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
      resetForm();
    } else if (props.supplier) {
      subject.value = `Inquiry about ${props.supplier.name}`;
    }
  });
  
  function resetForm() {
    email.value = '';
    subject.value = '';
    message.value = '';
  }
  
  function handleSubmit() {
    emit('submit', {
      email: email.value,
      subject: subject.value,
      message: message.value,
      supplier: props.supplier
    });
    
    resetForm();
  }
  </script>
  