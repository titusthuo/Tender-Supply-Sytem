<template>
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Header with gradient background -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-xl shadow-lg">
          <div class="px-6 py-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h1 class="text-2xl font-bold text-white">Carrier Registration</h1>
          </div>
        </div>
        
        <div class="bg-white rounded-b-xl shadow-lg">
          <!-- Navigation Tabs -->
          <div class="border-b border-gray-200">
            <nav class="flex px-6" aria-label="Tabs">
              <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                :class="[
                  currentTab === index 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center transition-all duration-200'
                ]"
                @click="currentTab = index"
              >
                <span class="flex items-center justify-center w-6 h-6 rounded-full mr-2" 
                  :class="currentTab >= index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'">
                  {{ index + 1 }}
                </span>
                {{ tab }}
                <svg v-if="completedTabs.includes(index)" class="ml-2 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
          
          <!-- Form Content -->
          <div class="p-6">
            <transition name="fade" mode="out-in">
              <div v-if="currentTab === 0">
                <!-- Company Information Section -->
                <div class="space-y-8">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 flex items-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Company Information
                    </h3>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Company Name</label>
                        <input 
                          type="text" 
                          v-model="companyName"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Enter company name"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Business Type</label>
                        <div class="relative">
                          <select 
                            v-model="businessType"
                            class="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                          >
                            <option v-for="type in businessTypes" :key="type" :value="type">{{ type }}</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="pt-4">
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Tax ID / EIN</label>
                        <input 
                          type="text" 
                          v-model="taxId"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="XX-XXXXXXX"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">MC Number</label>
                        <input 
                          type="text" 
                          v-model="mcNumber"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="MC-XXXXXX"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">USDOT Number</label>
                        <input 
                          type="text" 
                          v-model="usdotNumber"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="XXXXXXX"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-200 pt-6 mt-6">
                    <h3 class="text-lg font-semibold text-gray-900 flex items-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Contact Information
                    </h3>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Contact Name</label>
                        <input 
                          type="text" 
                          v-model="contactName"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Full name"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                          type="email" 
                          v-model="email"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>
                    
                    <div class="mt-6">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                          type="tel" 
                          v-model="phone"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-200 pt-6 mt-6">
                    <h3 class="text-lg font-semibold text-gray-900 flex items-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Business Address
                    </h3>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Street Address</label>
                        <input 
                          type="text" 
                          v-model="streetAddress"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="123 Main St"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Suite/Apt</label>
                        <input 
                          type="text" 
                          v-model="suite"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="Suite 100"
                        />
                      </div>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">City</label>
                        <input 
                          type="text" 
                          v-model="city"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="City"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">State/Province</label>
                        <input 
                          type="text" 
                          v-model="state"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="State"
                        />
                      </div>
                      
                      <div class="space-y-1">
                        <label class="block text-sm font-medium text-gray-700">Zip/Postal Code</label>
                        <input 
                          type="text" 
                          v-model="zip"
                          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Placeholder for other tabs -->
              <div v-else class="py-10 text-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-xl font-medium mb-2">{{ tabs[currentTab] }} Section</h3>
                <p>This section will be available after completing the Company Info section.</p>
              </div>
            </transition>
            
            <!-- Bottom Action Buttons -->
            <div class="flex justify-between mt-10 border-t border-gray-200 pt-6">
              <div>
                <button 
                  v-if="currentTab > 0"
                  @click="currentTab--"
                  class="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Previous
                </button>
              </div>
              <div class="flex space-x-3">
                <button 
                  @click="saveForm"
                  class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save
                </button>
                <button 
                  @click="nextTab"
                  class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Completion indicator -->
        <div class="mt-4 flex justify-between items-center text-sm text-gray-500 px-2">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Your information is securely encrypted</span>
          </div>
          <div>
            <span>Registration progress: {{ Math.round((completedTabs.length / tabs.length) * 100) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Tab navigation
  const tabs = ['Company Info', 'Fleet Details', 'Services', 'Documents', 'Review'];
  const currentTab = ref(0);
  const completedTabs = ref([]);
  
  // Form data
  const companyName = ref('');
  const businessType = ref('Corporation');
  const businessTypes = ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'];
  const taxId = ref('');
  const mcNumber = ref('');
  const usdotNumber = ref('');
  const contactName = ref('');
  const email = ref('');
  const phone = ref('');
  const streetAddress = ref('');
  const suite = ref('');
  const city = ref('');
  const state = ref('');
  const zip = ref('');
  
  // Form methods
  const saveForm = () => {
    if (!completedTabs.value.includes(currentTab.value)) {
      completedTabs.value.push(currentTab.value);
    }
    // In a real app, you would save the data to your backend here
    alert('Form data saved successfully!');
  };
  
  const nextTab = () => {
    if (currentTab.value < tabs.length - 1) {
      if (!completedTabs.value.includes(currentTab.value)) {
        completedTabs.value.push(currentTab.value);
      }
      currentTab.value++;
    }
  };
  
  // CSS transitions
  const fadeTransition = {
    'enter-active-class': 'transition ease-out duration-200',
    'enter-from-class': 'opacity-0 transform translate-y-1',
    'enter-to-class': 'opacity-100 transform translate-y-0',
    'leave-active-class': 'transition ease-in duration-150',
    'leave-from-class': 'opacity-100 transform translate-y-0',
    'leave-to-class': 'opacity-0 transform translate-y-1',
  };
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>