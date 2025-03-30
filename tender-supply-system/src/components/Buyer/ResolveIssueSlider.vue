<template>
  <div 
    class="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="bg-red-500 text-white p-3 sm:p-4 flex justify-between items-center">
        <h2 class="text-lg sm:text-xl font-bold truncate">Resolve Issue #{{ orderId }}</h2>
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
              <h3 class="font-medium text-gray-700 text-sm sm:text-base">Original Delivery Date</h3>
              <p class="text-gray-900 font-medium">{{ orderDetails.deliveryDate }}</p>
            </div>
          </div>
          
          <div class="p-3 sm:p-4 bg-red-50 rounded-md mb-4 sm:mb-6">
            <div class="flex items-center">
              <span class="text-red-700 mr-2">⚠</span>
              <span class="text-red-800 text-sm sm:text-base">{{ issueDetails.type === 'delayed' ? 'Delivery delayed by supplier' : 'Invoice discrepancy detected' }}</span>
            </div>
          </div>
        </div>
        
        <!-- Issue Details -->
        <div class="mb-4 sm:mb-6">
          <h3 class="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Issue Details</h3>
          
          <div v-if="issueDetails.type === 'delayed'" class="space-y-3 sm:space-y-4">
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Original Delivery Date</p>
              <p class="font-medium text-sm sm:text-base">Mar 05, 2025</p>
            </div>
            
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">New Estimated Delivery</p>
              <p class="font-medium text-red-600 text-sm sm:text-base">Mar 12, 2025 (7 days delay)</p>
            </div>
            
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Reason for Delay</p>
              <p class="font-medium text-sm sm:text-base">Supply chain disruption at supplier warehouse</p>
            </div>
          </div>
          
          <div v-else class="space-y-3 sm:space-y-4">
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Invoice Amount</p>
              <p class="font-medium text-sm sm:text-base">$4,120.00</p>
            </div>
            
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">PO Amount</p>
              <p class="font-medium text-sm sm:text-base">$3,850.00</p>
            </div>
            
            <div class="p-2 sm:p-3 border border-gray-200 rounded-md">
              <p class="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">Discrepancy</p>
              <p class="font-medium text-red-600 text-sm sm:text-base">+$270.00 (7% higher)</p>
            </div>
          </div>
        </div>
        
        <!-- Resolution Options -->
        <div class="mb-4 sm:mb-6">
          <h3 class="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Resolution Options</h3>
          
          <div class="space-y-2 sm:space-y-3">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <input type="radio" id="option1" v-model="selectedResolution" value="option1" class="text-blue-500" />
              <label for="option1" class="text-gray-800 text-sm sm:text-base">
                {{ issueDetails.type === 'delayed' ? 'Accept new delivery date' : 'Request updated invoice' }}
              </label>
            </div>
            
            <div class="flex items-center space-x-2 sm:space-x-3">
              <input type="radio" id="option2" v-model="selectedResolution" value="option2" class="text-blue-500" />
              <label for="option2" class="text-gray-800 text-sm sm:text-base">
                {{ issueDetails.type === 'delayed' ? 'Request expedited shipping' : 'Dispute charge' }}
              </label>
            </div>
            
            <div class="flex items-center space-x-2 sm:space-x-3">
              <input type="radio" id="option3" v-model="selectedResolution" value="option3" class="text-blue-500" />
              <label for="option3" class="text-gray-800 text-sm sm:text-base">Contact supplier directly</label>
            </div>
          </div>
        </div>
        
        <!-- Additional Notes -->
        <div class="mb-4 sm:mb-6">
          <label class="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Additional Notes</label>
          <textarea 
            v-model="notes" 
            rows="3" 
            class="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            placeholder="Add any specific instructions or notes for resolution..."
          ></textarea>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-3 sm:p-4 border-t border-gray-200 flex space-x-2 sm:space-x-3">
        <button 
          class="flex-1 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm sm:text-base"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button 
          class="flex-1 py-1.5 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm sm:text-base"
          @click="resolveIssue"
        >
          Resolve Issue
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
    name: 'ResolveIssueSlider',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      orderId: {
        type: String,
        required: true
      },
      issueType: {
        type: String,
        default: 'delayed',
        validator: (value) => ['delayed', 'invoice'].includes(value)
      }
    },
    emits: ['close', 'resolved'],
    data() {
      return {
        orderDetails: {
          supplier: 'Office Solutions Ltd.',
          deliveryDate: 'Mar 05, 2025'
        },
        issueDetails: {
          type: this.issueType,
          description: this.issueType === 'delayed' ? 
            'Delivery has been delayed due to supplier warehouse issues' :
            'Invoice amount is higher than the purchase order amount'
        },
        selectedResolution: 'option1',
        notes: ''
      };
    },
    methods: {
      resolveIssue() {
        // Here you would typically call an API to update the issue status
        console.log('Resolving issue with:', {
          orderId: this.orderId,
          resolution: this.selectedResolution,
          notes: this.notes
        });
        
        // Emit an event to inform parent component
        this.$emit('resolved', {
          orderId: this.orderId,
          resolution: this.selectedResolution,
          notes: this.notes
        });
        
        // Close the slider
        this.$emit('close');
      }
    }
  };
  </script>