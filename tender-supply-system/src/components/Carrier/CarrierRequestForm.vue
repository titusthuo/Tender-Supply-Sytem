<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Header with gradient -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-5">
            <h1 class="text-2xl font-bold text-white">Transportation Request Form</h1>
            <p class="text-blue-100 mt-1">Complete the details below to schedule your shipment</p>
          </div>
  
          <!-- Form content -->
          <div class="p-6">
            <!-- Progress indicator -->
            <div class="mb-8">
              <div class="flex items-center justify-between">
                <div v-for="(step, index) in ['Shipment', 'Schedule', 'Requirements']" :key="index"
                     class="flex flex-col items-center space-y-1">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm text-gray-500">{{ step }}</span>
                </div>
              </div>
              <div class="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 33%;"></div>
              </div>
            </div>
  
            <!-- Shipment Details Section -->
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
                <span class="text-blue-500 mr-2">1.</span>Shipment Details
              </h2>
              
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter pickup address" 
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Shipment Type</label>
                    <div class="relative">
                      <select class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition">
                        <option value="" disabled selected>Select shipment type</option>
                        <option value="parcel">Parcel</option>
                        <option value="pallet">Pallet</option>
                        <option value="full_truck">Full Truck</option>
                        <option value="ltl">Less Than Truckload (LTL)</option>
                        <option value="container">Container</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter delivery address" 
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                      <div class="relative">
                        <input 
                          type="text" 
                          placeholder="Enter weight" 
                          class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span class="text-gray-400 text-sm">kg</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                      <input 
                        type="text" 
                        placeholder="L × W × H (cm)" 
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Schedule Section -->
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
                <span class="text-blue-500 mr-2">2.</span>Schedule
              </h2>
              
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder="MM/DD/YYYY" 
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div class="relative">
                      <select class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition">
                        <option value="" disabled selected>Select time</option>
                        <option value="morning">Morning (8-12)</option>
                        <option value="afternoon">Afternoon (12-4)</option>
                        <option value="evening">Evening (4-8)</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Earliest available pickup time</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Date & Time</label>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder="MM/DD/YYYY" 
                        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div class="relative">
                      <select class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition">
                        <option value="" disabled selected>Select time</option>
                        <option value="morning">Morning (8-12)</option>
                        <option value="afternoon">Afternoon (12-4)</option>
                        <option value="evening">Evening (4-8)</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Expected delivery timeframe</p>
                </div>
              </div>
            </div>
            
            <!-- Special Requirements Section -->
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-gray-800 pb-2 border-b border-gray-200 mb-4">
                <span class="text-blue-500 mr-2">3.</span>Special Requirements
              </h2>
              
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-900 mb-3">Handling Requirements</h3>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Temperature controlled</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Fragile items</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Hazardous materials</span>
                    </label>
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-900 mb-3">Delivery Options</h3>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Lift gate required</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Inside delivery</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input type="checkbox" class="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition" />
                      <span class="text-gray-700">Call before delivery</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea 
                  placeholder="Enter any special instructions or additional information here..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <button class="py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                Save as Draft
              </button>
              <button class="py-2.5 px-6 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                Submit Request
              </button>
            </div>
          </div>
        </div>
        
        <!-- Help text -->
        <div class="mt-4 text-center text-sm text-gray-500">
          Need assistance? <a href="#" class="text-blue-600 hover:text-blue-800">Contact support</a> or call (555) 123-4567
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // You can add Vue 3 logic and reactivity here
  import { ref } from 'vue';
  
  // Form state could be managed here
  const formData = ref({
    origin: '',
    destination: '',
    shipmentType: '',
    weight: '',
    dimensions: '',
    pickupDate: '',
    pickupTime: '',
    deliveryDate: '',
    deliveryTime: '',
    specialRequirements: {
      temperatureControlled: false,
      fragileItems: false,
      hazardousMaterials: false,
      liftGateRequired: false,
      insideDelivery: false,
      callBeforeDelivery: false
    },
    notes: ''
  });
  
  // Form submission handling
  const submitForm = () => {
    // Handle form submission
    console.log('Form submitted:', formData.value);
  };
  </script>