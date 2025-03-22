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
              <h2 class="text-lg font-semibold">
                {{ getModalTitle }}
              </h2>
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
              <!-- Contract ID if viewing or renewing -->
              <div v-if="modalMode !== 'create'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contract ID
                </label>
                <input 
                  type="text" 
                  v-model="formData.id" 
                  class="w-full p-2 border border-gray-300 rounded-md bg-gray-100" 
                  readonly
                />
              </div>
  
              <!-- Contract Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contract Title *
                </label>
                <input 
                  type="text" 
                  v-model="formData.title" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                  placeholder="Enter contract title"
                  :readonly="modalMode === 'view' && !isEditing"
                />
              </div>
  
              <!-- Contract Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Contract Type *
                </label>
                <select 
                  v-model="formData.type"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                  required
                  :disabled="modalMode === 'view' && !isEditing"
                >
                  <option value="" disabled>Select contract type</option>
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
                  v-model="formData.supplier"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                  required
                  :disabled="modalMode === 'view' && !isEditing"
                >
                  <option value="" disabled>Select supplier</option>
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
                  v-model="formData.template"
                  class="w-full p-2 border border-gray-300 rounded-md appearance-none"
                  :disabled="modalMode === 'view' && !isEditing"
                >
                  <option value="standard">Standard Services Agreement</option>
                  <option value="master">Master Services Agreement</option>
                  <option value="goods">Goods Purchase Agreement</option>
                </select>
              </div>
  
              <!-- Expiry Date for renewing contracts -->
              <div v-if="modalMode === 'renew'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Current Expiry Date
                </label>
                <input 
                  type="text" 
                  :value="contractData?.expiryDate" 
                  class="w-full p-2 border border-gray-300 rounded-md bg-gray-100" 
                  readonly
                />
              </div>
  
              <!-- New Expiry Date for renewing contracts -->
              <div v-if="modalMode === 'renew'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  New Expiry Date *
                </label>
                <input 
                  type="date" 
                  v-model="formData.newExpiryDate" 
                  class="w-full p-2 border border-gray-300 rounded-md" 
                  required
                />
              </div>
  
              <!-- Additional fields for renewing or viewing -->
              <div v-if="modalMode !== 'create'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  v-model="formData.notes"
                  rows="3"
                  class="w-full p-2 border border-gray-300 rounded-md"
                  :readonly="modalMode === 'view' && !isEditing"
                  placeholder="Add any additional notes here..."
                ></textarea>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                v-if="modalMode === 'view' && !isEditing"
                type="button" 
                class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                @click="isEditing = true"
              >
                Edit
              </button>
              <button 
                type="button" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button 
                v-if="modalMode !== 'view' || isEditing"
                type="submit" 
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {{ getSubmitButtonText }}
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
  import { ref, computed, watch, reactive } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    modalMode: {
      type: String,
      default: 'create',
      validator: (value) => ['create', 'view', 'renew'].includes(value)
    },
    contractData: {
      type: Object,
      default: null
    }
  });
  
  const emit = defineEmits(['close', 'submit']);
  
  // Track if user is editing in view mode
  const isEditing = ref(false);
  
  // Form data reactive object
  const formData = reactive({
    id: '',
    title: '',
    type: '',
    supplier: '',
    template: 'standard',
    notes: '',
    newExpiryDate: ''
  });
  
  // Compute modal title based on mode
  const getModalTitle = computed(() => {
    switch (props.modalMode) {
      case 'create':
        return 'Create New Contract';
      case 'view':
        return isEditing.value ? 'Edit Contract' : 'View Contract';
      case 'renew':
        return 'Renew Contract';
      default:
        return 'Contract';
    }
  });
  
  // Compute submit button text based on mode
  const getSubmitButtonText = computed(() => {
    switch (props.modalMode) {
      case 'create':
        return 'Continue';
      case 'view':
        return 'Save Changes';
      case 'renew':
        return 'Renew Contract';
      default:
        return 'Submit';
    }
  });
  
  // Watch for changes in contractData prop and update form
  watch(() => props.contractData, (newVal) => {
    if (newVal) {
      formData.id = newVal.id || '';
      formData.title = newVal.title || '';
      formData.type = newVal.type || '';
      formData.supplier = newVal.supplier || '';
      formData.notes = newVal.notes || '';
      
      // Set a default new expiry date 1 year from current expiry
      if (props.modalMode === 'renew' && newVal.expiryDate) {
        // This is a simple example that assumes the date format is consistent
        // In a real app, you would want more robust date parsing
        const currentYear = parseInt(newVal.expiryDate.split(' ')[2]);
        formData.newExpiryDate = `${currentYear + 1}-12-31`;
      }
    } else {
      // Reset form when creating new contract
      formData.id = '';
      formData.title = '';
      formData.type = '';
      formData.supplier = '';
      formData.template = 'standard';
      formData.notes = '';
      formData.newExpiryDate = '';
    }
    
    // Reset editing state when modal changes
    isEditing.value = false;
  }, { immediate: true });
  
  // Watch for modal open/close to reset editing state
  watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
      isEditing.value = false;
    }
  });
  
  const submitForm = () => {
    emit('submit', {...formData});
    
    // If we're in view mode and editing, switch back to view
    if (props.modalMode === 'view' && isEditing.value) {
      isEditing.value = false;
    } else {
      // Otherwise close the modal
      emit('close');
    }
  };
  </script>