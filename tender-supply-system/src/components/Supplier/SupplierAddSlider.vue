<template>
  <div 
    v-if="isOpen"
    class="fixed inset-y-0 right-0 w-full sm:w-[80%] md:w-[60%] lg:w-[500px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="h-full flex flex-col">
      <!-- Slider Header -->
      <div class="p-4 sm:p-6 border-b flex justify-between items-center bg-blue-600 text-white">
        <h2 class="text-lg sm:text-xl font-bold flex items-center">
          <svg class="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {{ isEditing ? 'Edit Supplier' : 'Register as a Supplier' }}
        </h2>
        <button 
          @click="$emit('close')" 
          class="text-white hover:text-blue-200 transition-colors duration-200 rounded-full p-1 sm:p-2 hover:bg-blue-700"
        >
          <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    
      <!-- Supplier Registration/Edit Form -->
      <form @submit.prevent="submitSupplierRegistration" class="p-4 sm:p-6 overflow-y-auto flex-grow space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Company Name</label>
            <input 
              v-model="supplierData.companyName" 
              type="text" 
              required 
              placeholder="Enter company name"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address</label>
            <input 
              v-model="supplierData.email" 
              type="email" 
              required 
              placeholder="supplier@example.com"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Password</label>
            <input 
              v-model="supplierData.password" 
              type="password" 
              :required="!isEditing"
              placeholder="Enter password"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Business Type</label>
            <select 
              v-model="supplierData.businessType" 
              required 
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
              <option value="" disabled>Select your business type</option>
              <option>IT Services</option>
              <option>Consulting</option>
              <option>Manufacturing</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Services/Products Offered</label>
            <input 
              v-model="supplierData.servicesOffered" 
              type="text" 
              required 
              placeholder="Describe your services or products"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Business Registration Number</label>
            <input 
              v-model="supplierData.registrationNumber" 
              type="text" 
              required 
              placeholder="Enter registration number"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Years in Business</label>
            <input 
              v-model="supplierData.yearsInBusiness" 
              type="number" 
              min="0" 
              required 
              placeholder="Years of operation"
              class="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 text-sm sm:text-base"
            >
          </div>
          
          <div v-if="!isEditing" class="flex items-start sm:items-center">
            <input 
              v-model="supplierData.agreedToTerms" 
              type="checkbox" 
              required 
              class="mt-1 sm:mt-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label class="ml-2 block text-xs sm:text-sm text-gray-900">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
        </div>
        
        <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="w-full bg-gray-100 text-gray-800 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition duration-300 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
          >
            <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>{{ isEditing ? 'Update Supplier' : 'Register Supplier' }}</span>
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
  supplier: {
    type: Object,
    default: () => ({
      companyName: '',
      email: '',
      password: '',
      businessType: '',
      servicesOffered: '',
      registrationNumber: '',
      yearsInBusiness: null,
      agreedToTerms: false
    })
  }
})

const emit = defineEmits(['close', 'add-supplier', 'update-supplier'])

// Determine if we're editing an existing supplier
const isEditing = computed(() => props.supplier && props.supplier.id)

// Supplier Registration/Edit Data
const supplierData = ref({
  companyName: '',
  email: '',
  password: '',
  businessType: '',
  servicesOffered: '',
  registrationNumber: '',
  yearsInBusiness: null,
  agreedToTerms: false,
  ...props.supplier
})

// Reset form when slider opens or supplier prop changes
watch([() => props.isOpen, () => props.supplier], ([isOpen, newSupplier]) => {
  if (isOpen) {
    supplierData.value = {
      companyName: '',
      email: '',
      password: '',
      businessType: '',
      servicesOffered: '',
      registrationNumber: '',
      yearsInBusiness: null,
      agreedToTerms: false,
      ...newSupplier
    }
  }
})

// Submit Registration or Update
const submitSupplierRegistration = () => {
  // Validate form
  if (!supplierData.value.companyName || !supplierData.value.email) {
    alert('Please fill in all required fields')
    return
  }

  // If not editing (registering), require agreement and password
  if (!isEditing.value) {
    if (!supplierData.value.password) {
      alert('Please enter a password')
      return
    }

    if (!supplierData.value.agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy')
      return
    }
  }

  // Generate ID if not exists (for new suppliers)
  if (!supplierData.value.id) {
    supplierData.value.id = `SUP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  }

  // Prepare supplier data with additional info
  const supplierToSave = {
    ...supplierData.value,
    logo: supplierData.value.logo || '/api/placeholder/40/40',
    registrationDate: supplierData.value.registrationDate || new Date().toISOString().split('T')[0]
  }

  // Emit the supplier data based on whether we're editing or adding
  if (isEditing.value) {
    emit('update-supplier', supplierToSave)
  } else {
    emit('add-supplier', supplierToSave)
  }
  
  // Close the slider
  emit('close')
}
</script>