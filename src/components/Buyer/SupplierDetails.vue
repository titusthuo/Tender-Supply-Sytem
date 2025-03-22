<template>
    <div class="space-y-6">
      <!-- Company Information Section -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-800">Company Information</h3>
          <button 
            @click="$emit('edit')" 
            class="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-md">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Supplier ID</p>
              <p class="font-medium">{{ supplier.id }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Category</p>
              <p class="font-medium">{{ supplier.category }}</p>
            </div>
          </div>
          
          <div class="mt-4">
            <p class="text-sm text-gray-500">Company Name</p>
            <p class="font-medium">{{ supplier.name }}</p>
          </div>
          
          <div class="mt-4">
            <p class="text-sm text-gray-500">Description</p>
            <p class="font-medium">{{ supplier.description }}</p>
          </div>
          
          <div class="mt-4">
            <p class="text-sm text-gray-500">Performance Rating</p>
            <div class="flex items-center mt-1">
              <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  class="h-2.5 rounded-full" 
                  :class="getPerformanceColorClass(supplier.performance)"
                  :style="{ width: supplier.performance + '%' }"
                ></div>
              </div>
              <span class="font-medium">{{ supplier.performance }}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Information Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Contact Information</h3>
        
        <div class="bg-gray-50 p-4 rounded-md">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium">{{ supplier.email || 'Not provided' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="font-medium">{{ supplier.phone || 'Not provided' }}</p>
            </div>
          </div>
          
          <div class="mt-4">
            <p class="text-sm text-gray-500">Website</p>
            <p class="font-medium">{{ supplier.website || 'Not provided' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Address Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Address</h3>
        
        <div class="bg-gray-50 p-4 rounded-md">
          <div v-if="hasAddress">
            <div class="mt-2">
              <p>{{ supplier.address.street }}</p>
              <p>{{ supplier.address.city }}, {{ supplier.address.state }} {{ supplier.address.postalCode }}</p>
              <p>{{ supplier.address.country }}</p>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500">No address information provided</p>
          </div>
        </div>
      </div>
      
      <!-- Activity History Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Activity</h3>
        
        <div class="bg-gray-50 p-4 rounded-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Last Activity</p>
              <p class="font-medium">{{ supplier.lastActivity }}</p>
            </div>
            
            <button class="text-blue-600 hover:text-blue-800">
              View Full History
            </button>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 pt-4 border-t">
        <button 
          type="button" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click="$emit('close')"
        >
          Close
        </button>
        <button 
          type="button" 
          class="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
          @click="$emit('edit')"
        >
          Edit Supplier
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    supplier: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['edit', 'close']);
  
  // Computed property to check if address is available
  const hasAddress = computed(() => {
    return props.supplier.address && 
           (props.supplier.address.street || 
            props.supplier.address.city || 
            props.supplier.address.state || 
            props.supplier.address.postalCode || 
            props.supplier.address.country);
  });
  
  // Utility function for performance color
  function getPerformanceColorClass(performance) {
    if (performance >= 80) return 'bg-green-500';
    if (performance >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }
  </script>