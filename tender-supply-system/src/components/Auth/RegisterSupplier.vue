<script setup>
import { ref, onMounted, watch } from 'vue';

// Props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['close', 'register']);

// Form data
const formData = ref({
  companyName: '',
  email: '',
  password: '',
  businessType: '',
  servicesOffered: '',
  businessRegistrationNumber: '',
  yearsInBusiness: '',
  agreeToTerms: false
});

// Form states
const isSlideIn = ref(false);
const isSlideOut = ref(false);

// Business type options
const businessTypes = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company (LLC)',
  'Corporation',
  'Non-profit Organization',
  'Government Entity',
  'Other'
];

// Validation
const errors = ref({});
const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.companyName) errors.value.companyName = 'Company name is required';
  if (!formData.value.email) errors.value.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(formData.value.email)) errors.value.email = 'Email is invalid';
  if (!formData.value.password) errors.value.password = 'Password is required';
  else if (formData.value.password.length < 8) errors.value.password = 'Password must be at least 8 characters';
  if (!formData.value.businessType) errors.value.businessType = 'Business type is required';
  if (!formData.value.servicesOffered) errors.value.servicesOffered = 'Services/Products offered is required';
  if (!formData.value.businessRegistrationNumber) errors.value.businessRegistrationNumber = 'Business registration number is required';
  if (!formData.value.yearsInBusiness) errors.value.yearsInBusiness = 'Years in business is required';
  if (!formData.value.agreeToTerms) errors.value.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
  
  return Object.keys(errors.value).length === 0;
};

// Improved close function with better animation handling
const closeModal = () => {
  isSlideOut.value = true;
  
  // Wait for animation to complete before emitting close event
  setTimeout(() => {
    emit('close');
    isSlideOut.value = false;
    isSlideIn.value = false;
  }, 500);
};

// Handle form submission with improved animation
const handleSubmit = () => {
  if (validateForm()) {
    // Trigger slide out animation
    isSlideOut.value = true;
    
    // Wait for animation to complete before emitting register event
    setTimeout(() => {
      emit('register', formData.value);
      // Reset form
      formData.value = {
        companyName: '',
        email: '',
        password: '',
        businessType: '',
        servicesOffered: '',
        businessRegistrationNumber: '',
        yearsInBusiness: '',
        agreeToTerms: false
      };
      isSlideOut.value = false;
    }, 500);
  }
};

// Watch for visibility changes with improved animation flow
watch(() => props.isVisible, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // Coming into view - start slide in animation
    isSlideOut.value = false;
    // Small delay to ensure CSS transitions work properly
    setTimeout(() => {
      isSlideIn.value = true;
    }, 50);
  } else if (!newVal && oldVal) {
    // Going out of view - start slide out animation
    isSlideOut.value = true;
    
    // Reset states after animation completes
    setTimeout(() => {
      isSlideIn.value = false;
      isSlideOut.value = false;
    }, 500);
  }
});

// Initialize component with improved animation sequence
onMounted(() => {
  if (props.isVisible) {
    // Small delay to ensure CSS transitions work properly
    setTimeout(() => {
      isSlideIn.value = true;
    }, 50);
  }
});
</script>
<template>
  <div v-if="isVisible || isSlideIn || isSlideOut" 
       class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
       :class="{ 'opacity-0': !isVisible && !isSlideIn, 'opacity-100': isVisible || isSlideIn }"
       @click="closeModal">
    
    <!-- Form container with improved slide animations and mobile responsiveness -->
    <div class="relative w-full max-w-md transform transition-all duration-500 ease-out px-4 sm:px-0"
         :class="{
           'translate-x-0 opacity-100 scale-100': isSlideIn && !isSlideOut,
           'translate-x-full opacity-0 scale-95': !isSlideIn || isSlideOut
         }"
         @click.stop>
      
      <!-- Registration form with improved mobile responsiveness -->
      <div class="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 overflow-y-auto max-h-screen sm:max-h-90vh">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Register as a Supplier</h2>
        <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Bid on tenders and offer your services</p>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Company Name -->
          <div>
            <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input 
              id="companyName" 
              v-model="formData.companyName" 
              type="text" 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.companyName }"
            >
            <p v-if="errors.companyName" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.companyName }}</p>
          </div>
          
          <!-- Email Address -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              id="email" 
              v-model="formData.email" 
              type="email" 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.email }"
            >
            <p v-if="errors.email" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.email }}</p>
          </div>
          
          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="password" 
              v-model="formData.password" 
              type="password" 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.password }"
            >
            <p v-if="errors.password" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.password }}</p>
          </div>
          
          <!-- Business Type -->
          <div>
            <label for="businessType" class="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
            <div class="relative">
              <select 
                id="businessType" 
                v-model="formData.businessType" 
                class="w-full px-3 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                :class="{ 'border-red-500': errors.businessType }"
              >
                <option value="" disabled selected>Select your business type</option>
                <option v-for="type in businessTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.businessType" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.businessType }}</p>
          </div>
          
          <!-- Services/Products Offered -->
          <div>
            <label for="servicesOffered" class="block text-sm font-medium text-gray-700 mb-1">Services/Products Offered</label>
            <input 
              id="servicesOffered" 
              v-model="formData.servicesOffered" 
              type="text" 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.servicesOffered }"
            >
            <p v-if="errors.servicesOffered" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.servicesOffered }}</p>
          </div>
          
          <!-- Business Registration Number -->
          <div>
            <label for="businessRegistrationNumber" class="block text-sm font-medium text-gray-700 mb-1">Business Registration Number</label>
            <input 
              id="businessRegistrationNumber" 
              v-model="formData.businessRegistrationNumber" 
              type="text" 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.businessRegistrationNumber }"
            >
            <p v-if="errors.businessRegistrationNumber" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.businessRegistrationNumber }}</p>
          </div>
          
          <!-- Years in Business -->
          <div>
            <label for="yearsInBusiness" class="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
            <input 
              id="yearsInBusiness" 
              v-model="formData.yearsInBusiness" 
              type="number" 
              min="0"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
              :class="{ 'border-red-500': errors.yearsInBusiness }"
            >
            <p v-if="errors.yearsInBusiness" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.yearsInBusiness }}</p>
          </div>
          
          <!-- Terms Agreement -->
          <div class="pt-2">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  id="terms" 
                  v-model="formData.agreeToTerms" 
                  type="checkbox" 
                  class="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  :class="{ 'border-red-500': errors.agreeToTerms }"
                >
              </div>
              <div class="ml-3 text-xs sm:text-sm">
                <label for="terms" class="font-medium text-gray-700">
                  I agree to the Terms of Service and Privacy Policy
                </label>
                <p v-if="errors.agreeToTerms" class="mt-1 text-xs sm:text-sm text-red-600">{{ errors.agreeToTerms }}</p>
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-purple-600 text-white py-2 sm:py-3 px-4 rounded-md text-sm sm:text-base font-medium hover:bg-purple-700 transition duration-300 mt-4"
          >
            Register as Supplier
          </button>
        </form>
      </div>
    </div>
  </div>
</template>