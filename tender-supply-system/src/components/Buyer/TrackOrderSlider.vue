<template>
  <div 
    class="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="bg-blue-500 text-white p-3 sm:p-4 flex justify-between items-center">
        <h2 class="text-lg sm:text-xl font-bold truncate">Order Tracking #{{ orderId }}</h2>
        <button @click="$emit('close')" class="text-white hover:text-gray-200 p-1">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-4 sm:p-6 overflow-y-auto flex-grow">
        <div class="mb-4 sm:mb-6">
          <div class="flex flex-col sm:flex-row sm:justify-between mb-4">
            <div class="mb-2 sm:mb-0">
              <h3 class="font-medium text-gray-700 text-sm sm:text-base">Supplier</h3>
              <p class="text-gray-900 font-medium">{{ orderDetails.supplier }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 text-sm sm:text-base">Expected Delivery</h3>
              <p class="text-gray-900 font-medium">{{ orderDetails.deliveryDate }}</p>
            </div>
          </div>
          
          <div class="p-3 sm:p-4 bg-blue-50 rounded-md mb-4 sm:mb-6">
            <div class="flex items-center">
              <span class="text-blue-700 mr-2">ℹ</span>
              <span class="text-blue-800 text-sm sm:text-base">Order is currently in transit and on schedule</span>
            </div>
          </div>
        </div>
        
        <!-- Tracking Timeline -->
        <div class="relative pb-6 sm:pb-8">
          <!-- Timeline Line -->
          <div class="absolute left-3 sm:left-6 top-0 h-full w-0.5 bg-gray-200"></div>
          
          <!-- Timeline Events -->
          <div 
            v-for="(event, index) in trackingEvents" 
            :key="index" 
            class="relative mb-4 sm:mb-6 flex items-start"
          >
            <!-- Status Dot -->
            <div 
              class="absolute left-3 sm:left-6 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full -translate-x-1.5 mt-1.5"
              :class="event.completed ? 'bg-green-500' : 'bg-gray-300'"
            ></div>
            
            <!-- Event Content -->
            <div class="ml-6 sm:ml-10">
              <h4 class="font-medium text-gray-900 text-sm sm:text-base">{{ event.title }}</h4>
              <p class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{{ event.date }}</p>
              <p v-if="event.description" class="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{{ event.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- Shipping Details -->
        <div class="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-md">
          <h3 class="font-medium text-gray-900 mb-2 text-sm sm:text-base">Shipping Details</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p class="text-xs sm:text-sm font-medium text-gray-700">Carrier</p>
              <p class="text-xs sm:text-sm text-gray-900">FastShip Logistics</p>
            </div>
            <div>
              <p class="text-xs sm:text-sm font-medium text-gray-700">Tracking Number</p>
              <p class="text-xs sm:text-sm text-blue-600 underline cursor-pointer">FS9284731092</p>
            </div>
            <div>
              <p class="text-xs sm:text-sm font-medium text-gray-700">Shipping Method</p>
              <p class="text-xs sm:text-sm text-gray-900">Express Ground</p>
            </div>
            <div>
              <p class="text-xs sm:text-sm font-medium text-gray-700">Contact</p>
              <p class="text-xs sm:text-sm text-blue-600 underline cursor-pointer">+1 (800) 555-7890</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-3 sm:p-4 border-t border-gray-200">
        <button 
          class="w-full py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
        >
          Contact Supplier
        </button>
      </div>
    </div>
  </div>
  
  <!-- Backdrop -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-white bg-opacity-25 z-30"
    @click="$emit('close')"
  ></div>
</template>
  <script>
  export default {
    name: 'TrackOrderSlider',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      orderId: {
        type: String,
        required: true
      }
    },
    emits: ['close'],
    data() {
      return {
        orderDetails: {
          supplier: 'TechSupplies Inc.',
          deliveryDate: 'Mar 15, 2025'
        },
        trackingEvents: [
          {
            title: 'Order Delivered',
            date: 'Expected Mar 15, 2025',
            description: '',
            completed: false
          },
          {
            title: 'In Transit',
            date: 'Mar 04, 2025 • 09:22 AM',
            description: 'Package has left distribution center',
            completed: true
          },
          {
            title: 'Processing',
            date: 'Mar 03, 2025 • 02:15 PM',
            description: 'Order has been processed for shipping',
            completed: true
          },
          {
            title: 'Order Confirmed',
            date: 'Mar 02, 2025 • 10:45 AM',
            description: 'Confirmation email sent',
            completed: true
          },
          {
            title: 'Order Placed',
            date: 'Mar 01, 2025 • 03:30 PM',
            description: '',
            completed: true
          }
        ]
      };
    }
  };
  </script>