<script setup>
import { ref } from 'vue';
import BuyerRegistrationForm from '@/components/Auth/RegisterBuyer.vue';
import SupplierRegistrationForm from '@/components/Auth/RegisterSupplier.vue';

const selectedOption = ref(null);
const showBuyerForm = ref(false);
const showSupplierForm = ref(false);

function selectOption(option) {
  selectedOption.value = option;
}

function continueRegistration() {
  if (selectedOption.value === 'buyer') {
    showBuyerForm.value = true;
  } else if (selectedOption.value === 'supplier') {
    showSupplierForm.value = true;
  }
}

function handleClose() {
  showBuyerForm.value = false;
  showSupplierForm.value = false;
}

function handleRegister(data) {
  console.log('Registration data:', data);
  // Here you would typically send the data to your backend
  // After successful registration, redirect the user or show a success message
  showBuyerForm.value = false;
  showSupplierForm.value = false;
  // Reset selection
  selectedOption.value = null;
}
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <div class="w-full max-w-xl mx-auto p-6 flex flex-col justify-center">
      <div class="border rounded-lg p-8 bg-white shadow-sm">
        <h1 class="text-2xl font-bold text-gray-800 mb-8 text-center">
          What Would You Like to do in TSM?
        </h1>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Buyer option -->
          <div 
            class="p-6 bg-gray-100 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col items-center relative"
            :class="{ 'border-2 border-blue-500 scale-105': selectedOption === 'buyer' }"
            @click="selectOption('buyer')"
          >
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                 :class="{ 'bg-blue-200': selectedOption === 'buyer' }">
              <div v-if="selectedOption === 'buyer'" class="w-4 h-4 bg-blue-500 transform rotate-45 transition-all duration-300"></div>
            </div>
            <p class="text-center text-gray-800">
              I want to post Tenders and want to find Suppliers
            </p>
          </div>
          
          <!-- Supplier option -->
          <div 
            class="p-6 bg-gray-100 rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 flex flex-col items-center relative"
            :class="{ 'border-2 border-blue-500 scale-105': selectedOption === 'supplier' }"
            @click="selectOption('supplier')"
          >
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                 :class="{ 'bg-blue-200': selectedOption === 'supplier' }">
              <div v-if="selectedOption === 'supplier'" class="w-4 h-4 bg-blue-500 rounded-full transition-all duration-300"></div>
            </div>
            <p class="text-center text-gray-800">
              I want to bid on Tenders and offer my services
            </p>
          </div>
        </div>
        
        <!-- Continue button -->
        <div class="flex flex-col items-center">
          <button 
            class="bg-purple-600 text-white py-3 px-12 rounded-full font-medium hover:bg-purple-700 transition-colors duration-300 transform"
            :class="{ 
              'opacity-70 cursor-not-allowed': !selectedOption,
              'hover:scale-105 active:scale-95': selectedOption
            }"
            :disabled="!selectedOption"
            @click="continueRegistration"
          >
            Continue
          </button>
          
          <p class="text-gray-500 text-sm mb-4 mt-4">or continue with</p>
          
          <!-- Social login options -->
          <div class="flex space-x-6">
            <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-300">
              G
            </button>
            <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-300">
              f
            </button>
            <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-300">
              in
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right side background gradient (light blue) -->
    <div class="hidden lg:block w-1/3 bg-blue-50"></div>
    
    <!-- Registration Forms -->
    <BuyerRegistrationForm 
      :is-visible="showBuyerForm" 
      @close="handleClose" 
      @register="handleRegister"
    />
    
    <SupplierRegistrationForm 
      :is-visible="showSupplierForm" 
      @close="handleClose" 
      @register="handleRegister"
    />
  </div>
</template>