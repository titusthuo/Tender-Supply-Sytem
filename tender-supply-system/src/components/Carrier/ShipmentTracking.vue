<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation Bar -->
      <nav class="bg-blue-600 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V9a3 3 0 00-3-3h-3V4a1 1 0 00-1-1H3z" />
              </svg>
              <h1 class="text-2xl font-bold text-white">Shipment Tracker</h1>
            </div>
            <div class="flex items-center">
              <button class="p-2 rounded-full text-white hover:bg-blue-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-5">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Shipment Tracking
              </h2>
            </div>
  
            <!-- Search Bar -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex flex-col sm:flex-row">
                <div class="relative flex-grow">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter tracking number"
                    class="pl-10 pr-4 py-3 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  />
                </div>
                <button class="mt-3 sm:mt-0 sm:ml-3 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Track
                </button>
              </div>
            </div>
  
            <!-- Shipment Info -->
            <div class="p-6">
              <div class="bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                <div class="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-1">Shipment #TR-12345678</h3>
                    <div class="flex flex-col sm:flex-row sm:space-x-6 text-sm">
                      <div class="flex items-center text-gray-600 mb-2 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span><span class="font-medium">Origin:</span> Chicago, IL</span>
                      </div>
                      <div class="flex items-center text-gray-600 mb-2 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span><span class="font-medium">Destination:</span> New York, NY</span>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:space-x-6 text-sm mt-2">
                      <div class="flex items-center text-gray-600 mb-2 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span><span class="font-medium">Carrier:</span> ABC Freight</span>
                      </div>
                      <div class="flex items-center text-gray-600 mb-2 sm:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span><span class="font-medium">Est. Delivery:</span> Mar 18, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 md:mt-0">
                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span class="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      In Transit
                    </span>
                  </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="relative mb-8">
                  <div class="overflow-hidden h-2 flex rounded-full bg-gray-200">
                    <div class="shadow-none flex flex-col justify-center bg-blue-500 rounded-full" style="width: 60%"></div>
                  </div>
                  
                  <!-- Timeline Markers -->
                  <div class="mt-6 grid grid-cols-5 gap-2">
                    <div class="text-center">
                      <div class="flex flex-col items-center">
                        <div class="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div class="h-12 flex items-center">
                          <span class="text-xs font-medium text-gray-700">Order Placed</span>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="flex flex-col items-center">
                        <div class="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div class="h-12 flex items-center">
                          <span class="text-xs font-medium text-gray-700">Picked Up</span>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="flex flex-col items-center">
                        <div class="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div class="h-12 flex items-center">
                          <span class="text-xs font-medium text-gray-700">Departed</span>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="flex flex-col items-center">
                        <div class="bg-blue-500 h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div class="h-12 flex items-center">
                          <span class="text-xs font-medium text-blue-700">In Transit</span>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="flex flex-col items-center">
                        <div class="bg-gray-300 h-5 w-5 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div class="h-12 flex items-center">
                          <span class="text-xs font-medium text-gray-500">Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <!-- Detailed Updates -->
              <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Detailed Updates
                </h3>
                <div class="space-y-6">
                  <div class="relative pl-8 pb-6 border-l-2 border-green-400">
                    <div class="absolute -left-2 mt-1">
                      <div class="bg-green-500 h-4 w-4 rounded-full border-4 border-white shadow"></div>
                    </div>
                    <div>
                      <h4 class="text-base font-semibold text-gray-900">Mar 15, 2025 - 08:30 AM</h4>
                      <p class="mt-1 text-sm text-gray-600">Package in transit - New Jersey sorting facility</p>
                    </div>
                  </div>
                  <div class="relative pl-8 pb-6 border-l-2 border-green-400">
                    <div class="absolute -left-2 mt-1">
                      <div class="bg-green-500 h-4 w-4 rounded-full border-4 border-white shadow"></div>
                    </div>
                    <div>
                      <h4 class="text-base font-semibold text-gray-900">Mar 14, 2025 - 06:15 PM</h4>
                      <p class="mt-1 text-sm text-gray-600">Departed from Ohio distribution center</p>
                    </div>
                  </div>
                  <div class="relative pl-8">
                    <div class="absolute -left-2 mt-1">
                      <div class="bg-green-500 h-4 w-4 rounded-full border-4 border-white shadow"></div>
                    </div>
                    <div>
                      <h4 class="text-base font-semibold text-gray-900">Mar 13, 2025 - 10:45 AM</h4>
                      <p class="mt-1 text-sm text-gray-600">Package picked up from Chicago warehouse</p>
                    </div>
                  </div>
                </div>
                
                <!-- View More Button -->
                <div class="mt-6 text-center">
                  <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition duration-200">
                    View more updates
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="mt-8 py-6 border-t border-gray-200">
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-500 hover:text-blue-600 transition duration-200">Help</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition duration-200">FAQ</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition duration-200">Contact Us</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition duration-200">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Component logic can be added here
  // Example Vue 3 setup script
  import { ref, onMounted } from 'vue';
  
  const trackingStatus = ref('In Transit');
  const progressPercentage = ref(60);
  const isLoading = ref(false);
  
  const trackShipment = () => {
    // Logic for tracking shipment would go here
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  };
  
  onMounted(() => {
    // Any initialization logic goes here
  });
  </script>