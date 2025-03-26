<template>
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Header with Back Button and Actions -->
        <div class="bg-gray-100 px-6 py-4 flex justify-between items-center border-b">
          <button 
            @click="goBack" 
            class="flex items-center text-gray-600 hover:text-gray-800 transition"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Suppliers
          </button>
          <div class="flex space-x-3">
            <button 
              @click="openEditSlider" 
              class="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Supplier
            </button>
            <button 
              @click="toggleSupplierStatus" 
              :class="{
                'text-green-600 hover:text-green-800': supplier.status === 'Suspended',
                'text-red-600 hover:text-red-800': supplier.status === 'Active'
              }"
              class="flex items-center"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
              {{ supplier.status === 'Active' ? 'Suspend' : 'Activate' }}
            </button>
          </div>
        </div>
  
        <!-- Supplier Profile Section -->
        <div class="p-6 grid md:grid-cols-3 gap-6">
          <!-- Supplier Logo and Basic Info -->
          <div class="md:col-span-1 flex flex-col items-center">
            <img 
              :src="supplier.logo" 
              alt="Supplier Logo" 
              class="w-48 h-48 object-cover rounded-lg shadow-md mb-4"
            >
            <h1 class="text-2xl font-bold text-gray-800 mb-2">
              {{ supplier.companyName }}
            </h1>
            <div class="flex items-center space-x-2 mb-4">
              <span 
                :class="{
                  'bg-green-100 text-green-800': supplier.status === 'Active',
                  'bg-yellow-100 text-yellow-800': supplier.status === 'Pending',
                  'bg-red-100 text-red-800': supplier.status === 'Suspended'
                }"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ supplier.status }}
              </span>
              <div class="flex">
                <template v-for="n in 5" :key="n">
                  <svg 
                    :class="n <= supplier.performanceRating ? 'text-yellow-400' : 'text-gray-300'"
                    class="h-5 w-5"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </template>
              </div>
            </div>
          </div>
  
          <!-- Supplier Details -->
          <div class="md:col-span-2 grid md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h2 class="text-sm font-semibold text-gray-600 mb-2">Company Information</h2>
              <div class="space-y-2">
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Registration Number: {{ supplier.registrationNumber }}
                </p>
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Years in Business: {{ supplier.yearsInBusiness }}
                </p>
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h2 class="text-sm font-semibold text-gray-600 mb-2">Contact Information</h2>
              <div class="space-y-2">
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <a :href="`mailto:${supplier.email}`" class="text-blue-600 hover:underline">
                    {{ supplier.email }}
                  </a>
                </p>
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h2 class="text-sm font-semibold text-gray-600 mb-2">Business Details</h2>
              <div class="space-y-2">
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Business Type: {{ supplier.businessType }}
                </p>
                <p class="flex items-center">
                  <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Services Offered: {{ supplier.servicesOffered }}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Supplier Performance Tabs -->
        <div class="border-t">
          <nav class="flex space-x-4 p-4 bg-gray-100">
            <button 
              v-for="tab in tabs" 
              :key="tab"
              @click="currentTab = tab"
              :class="{
                'border-blue-500 text-blue-600': currentTab === tab,
                'border-transparent text-gray-500 hover:text-gray-700': currentTab !== tab
              }"
              class="px-3 py-2 border-b-2 font-medium text-sm focus:outline-none"
            >
              {{ tab }}
            </button>
          </nav>
  
          <!-- Tab Content -->
          <div class="p-6">
            <!-- Performance Tab -->
            <div v-if="currentTab === 'Performance'" class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-semibold text-gray-600 mb-2">Performance Metrics</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span>On-Time Delivery</span>
                      <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                        <div class="bg-green-500 h-2.5 rounded-full" style="width: 85%"></div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>Quality of Service</span>
                      <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-500 h-2.5 rounded-full" style="width: 75%"></div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span>Cost Competitiveness</span>
                      <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                        <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 65%"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-semibold text-gray-600 mb-2">Key Performance Indicators</h3>
                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div class="text-2xl font-bold text-green-600">95%</div>
                      <div class="text-xs text-gray-500">Fulfillment Rate</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-blue-600">7</div>
                      <div class="text-xs text-gray-500">Days Avg. Delivery</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-yellow-600">$45K</div>
                      <div class="text-xs text-gray-500">Total Spend</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Contracts Tab -->
            <div v-if="currentTab === 'Contracts'" class="space-y-4">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contract ID</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b hover:bg-gray-50">
                      <td class="px-4 py-3">CNT-2024-001</td>
                      <td class="px-4 py-3">2024-01-15</td>
                      <td class="px-4 py-3">2025-01-14</td>
                      <td class="px-4 py-3">$120,000</td>
                      <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                    <!-- Add more contract rows as needed -->
                  </tbody>
                </table>
              </div>
            </div>
  
            <!-- Documents Tab -->
            <div v-if="currentTab === 'Documents'" class="space-y-4">
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <div class="font-medium text-gray-800">Vendor Registration</div>
                      <div class="text-xs text-gray-500">PDF, 2.3 MB</div>
                    </div>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                </div>
                <!-- Add more document items -->
              </div>
            </div>
          </div>
        </div>
      </div>
          <!-- Supplier Edit Slider -->
    <SupplierAddSlider 
      :is-open="isEditSliderOpen" 
      :supplier="supplier"
      @close="closeEditSlider"
      @update-supplier="updateSupplierDetails"
    />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SupplierAddSlider from './SupplierAddSlider.vue'
  
  const supplier = ref({
    id: 'SUP001',
    companyName: 'TechServices Ltd.',
    email: 'contact@techservices.com',
    logo: '/api/placeholder/192/192',
    businessType: 'IT Services',
    registrationDate: '2024-01-15',
    status: 'Active',
    performanceRating: 4,
    servicesOffered: 'Cloud Solutions',
    registrationNumber: 'REG12345',
    yearsInBusiness: 5
  })
  
  const tabs = ['Performance', 'Contracts', 'Documents']
  const currentTab = ref('Performance')
  const isEditSliderOpen = ref(false)
  
  const goBack = () => {
    // Implement navigation back to supplier list
    console.log('Navigate back to supplier list')
  }
  
  const openEditSlider = () => {
  isEditSliderOpen.value = true
}

const closeEditSlider = () => {
  isEditSliderOpen.value = false
}
  
const toggleSupplierStatus = () => {
    // Toggle between Active and Suspended
    supplier.value.status = supplier.value.status === 'Active' ? 'Suspended' : 'Active'
}
const updateSupplierDetails = (updatedSupplier) => {
  // Update supplier details
  supplier.value = { ...supplier.value, ...updatedSupplier }
  closeEditSlider()
}
  </script>