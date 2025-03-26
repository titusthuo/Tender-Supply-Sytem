<template>
  <div 
    v-if="isOpen"
    class="fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="h-full flex flex-col">
      <!-- Slider Header -->
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold flex items-center">
          <svg class="h-6 w-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Buyer
        </h2>
        <button 
          @click="$emit('close')" 
          class="text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full p-2 hover:bg-gray-200"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    
      <!-- Buyer Form -->
      <form @submit.prevent="submitBuyer" class="p-6 overflow-y-auto flex-grow space-y-6">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input 
              v-model="localBuyer.companyName" 
              type="text" 
              required 
              placeholder="Enter company name"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="localBuyer.email" 
              type="email" 
              required 
              placeholder="buyer@example.com"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div class="relative">
              <button 
                type="button"
                @click="toggleCategoriesDropdown"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>
                  {{ selectedCategoriesText }}
                </span>
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Categories Dropdown -->
              <div 
                v-if="isCategoriesDropdownOpen" 
                class="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
              >
                <div class="p-4 space-y-2">
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">Services</h3>
                    <div class="space-y-1">
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="IT Services"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">IT Services</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Consulting"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Consulting</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Marketing"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Marketing</span>
                      </label>
                    </div>
                  </div>
                  <div class="border-t my-2"></div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">Supplies</h3>
                    <div class="space-y-1">
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Office Supplies"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Office Supplies</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Equipment"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Equipment</span>
                      </label>
                    </div>
                  </div>
                  <div class="border-t my-2"></div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">Logistics</h3>
                    <div class="space-y-1">
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Logistics"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Logistics</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Shipping"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Shipping</span>
                      </label>
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          value="Transportation"
                          v-model="localBuyer.categories"
                          class="form-checkbox h-4 w-4 text-blue-600"
                        >
                        <span class="ml-2 text-sm text-gray-700">Transportation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                v-model="localBuyer.status" 
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Performance Rating</label>
              <select 
                v-model="localBuyer.performanceRating" 
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              >
                <option value="" disabled>Rate the Company</option>
                <option :value="1">1 Star</option>
                <option :value="2">2 Stars</option>
                <option :value="3">3 Stars</option>
                <option :value="4">4 Stars</option>
                <option :value="5">5 Stars</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex space-x-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Buyer</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  buyer: {
    type: Object,
    default: () => ({
      companyName: '',
      email: '',
      categories: [],
      status: '',
      performanceRating: ''
    })
  }
})

const emit = defineEmits(['close', 'save'])

// Local buyer data
const localBuyer = ref({
  companyName: '',
  email: '',
  categories: [],
  status: '',
  performanceRating: '',
  ...props.buyer
})

// Categories dropdown management
const isCategoriesDropdownOpen = ref(false)

const toggleCategoriesDropdown = () => {
  isCategoriesDropdownOpen.value = !isCategoriesDropdownOpen.value
}

// Computed property for categories text
const selectedCategoriesText = computed(() => {
  if (localBuyer.value.categories.length === 0) {
    return 'Select Categories'
  }
  return localBuyer.value.categories.join(', ')
})

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    isCategoriesDropdownOpen.value = false
  }
}

// Add and remove click outside listener
watch(isCategoriesDropdownOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Reset form when slider opens or buyer prop changes
watch([() => props.isOpen, () => props.buyer], ([isOpen, newBuyer]) => {
  if (isOpen) {
    localBuyer.value = {
      companyName: '',
      email: '',
      categories: [],
      status: '',
      performanceRating: '',
      ...newBuyer
    }
    isCategoriesDropdownOpen.value = false
  }
})

// Submit buyer method
const submitBuyer = () => {
  // Validate form
  if (!localBuyer.value.companyName || !localBuyer.value.email) {
    alert('Please fill in required fields')
    return
  }

  // Generate ID if not exists
  if (!localBuyer.value.id) {
    localBuyer.value.id = `VEN${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  }

  // Prepare buyer data with additional info
  const buyerToSave = {
    ...localBuyer.value,
    logo: '/api/placeholder/40/40',
    registrationDate: new Date().toISOString().split('T')[0]
  }

  // Emit the save event
  emit('save', buyerToSave)
  
  // Close the slider
  emit('close')
}
</script>