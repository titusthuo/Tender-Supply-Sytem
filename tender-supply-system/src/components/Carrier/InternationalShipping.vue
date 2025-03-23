<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                International Shipping Options
              </h2>
              <span class="bg-white bg-opacity-20 text-white text-sm py-1 px-3 rounded-full">
                Secure & Reliable
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Origin/Destination -->
            <div class="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
              <div class="relative">
                <div class="flex justify-center mb-6 relative">
                  <div class="absolute w-3/4 top-1/2 h-0.5 bg-gray-200"></div>
                  <svg viewBox="0 0 300 80" class="w-full h-20 relative">
                    <path d="M 60,40 C 120,10 180,10 240,40" stroke="#d1d5db" fill="transparent" stroke-width="2" />
                    <path d="M 60,40 C 120,70 180,70 240,40" stroke="#d1d5db" fill="transparent" stroke-width="2" />
                    <circle cx="60" cy="40" r="8" fill="#3b82f6" />
                    <circle cx="60" cy="40" r="4" fill="white" />
                    <circle cx="240" cy="40" r="8" fill="#3b82f6" />
                    <circle cx="240" cy="40" r="4" fill="white" />
                    
                    <!-- Animated plane -->
                    <g transform="translate(150, 40) scale(0.8)">
                      <path d="M25,0 L35,7 L35,17 L5,17 L0,12 L5,7 L25,7 L25,0" fill="#3b82f6" />
                      <path d="M8,17 L12,21 L28,21 L32,17" fill="#3b82f6" />
                    </g>
                  </svg>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">From Country</label>
                    <div class="relative">
                      <select class="w-full pl-4 pr-10 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm appearance-none bg-white text-gray-800">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>Australia</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">To Country</label>
                    <div class="relative">
                      <select class="w-full pl-4 pr-10 py-3 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm appearance-none bg-white text-gray-800">
                        <option>Japan</option>
                        <option>Australia</option>
                        <option>Brazil</option>
                        <option>France</option>
                        <option>Italy</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Shipping Methods -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Available Shipping Methods
              </h3>
              
              <div class="space-y-4">
                <!-- Express International -->
                <div class="border border-gray-200 hover:border-blue-400 transition-colors duration-200 rounded-xl p-4 shadow-sm hover:shadow">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 pt-1">
                      <input
                        id="express"
                        name="shipping-method"
                        type="radio"
                        checked
                        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div class="ml-3 flex flex-col md:flex-row justify-between w-full">
                      <div>
                        <label for="express" class="text-base font-medium text-gray-900 cursor-pointer">Express International</label>
                        <div class="mt-1 flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-600">
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            2-3 business days
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Full tracking
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Customs clearance included
                          </span>
                        </div>
                      </div>
                      <div class="mt-3 md:mt-0 flex flex-col md:items-end md:justify-center">
                        <span class="text-xl font-semibold text-gray-900">$120.50 USD</span>
                        <span class="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Recommended
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Standard International -->
                <div class="border border-gray-200 hover:border-blue-400 transition-colors duration-200 rounded-xl p-4 shadow-sm hover:shadow">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 pt-1">
                      <input
                        id="standard"
                        name="shipping-method"
                        type="radio"
                        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div class="ml-3 flex flex-col md:flex-row justify-between w-full">
                      <div>
                        <label for="standard" class="text-base font-medium text-gray-900 cursor-pointer">Standard International</label>
                        <div class="mt-1 flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-600">
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            5-7 business days
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tracking available
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Customs assistance
                          </span>
                        </div>
                      </div>
                      <div class="mt-3 md:mt-0 flex flex-col md:items-end md:justify-center">
                        <span class="text-xl font-semibold text-gray-900">$75.25 USD</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Economy International (Added) -->
                <div class="border border-gray-200 hover:border-blue-400 transition-colors duration-200 rounded-xl p-4 shadow-sm hover:shadow">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 pt-1">
                      <input
                        id="economy"
                        name="shipping-method"
                        type="radio"
                        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div class="ml-3 flex flex-col md:flex-row justify-between w-full">
                      <div>
                        <label for="economy" class="text-base font-medium text-gray-900 cursor-pointer">Economy International</label>
                        <div class="mt-1 flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-600">
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            10-14 business days
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Limited tracking
                          </span>
                          <span class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            No customs clearance
                          </span>
                        </div>
                      </div>
                      <div class="mt-3 md:mt-0 flex flex-col md:items-end md:justify-center">
                        <span class="text-xl font-semibold text-gray-900">$45.99 USD</span>
                        <span class="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Budget option
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
              <button type="button" class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save for Later
              </button>
              <button type="submit" class="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Continue to Payment
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Summary Info -->
        <div class="mt-4 px-1">
          <div class="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All prices include insurance up to $100 USD value
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Component state and logic can be added here
  // For example:
  import { ref } from 'vue';
  
  const selectedMethod = ref('express');
  </script>