<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="bg-blue-700 text-white p-3 sm:p-5 shadow-lg">
      <div class="container mx-auto px-4 sm:px-6">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">Bidding System Dashboard</h1>
      </div>
    </div>

    <!-- Horizontal Navigation Menu -->
    <div class="bg-white border-b border-gray-200 shadow-md">
      <div class="container mx-auto py-2 sm:py-4 px-4 sm:px-6 overflow-x-auto">
        <div class="flex space-x-4 sm:space-x-10 items-center min-w-max">
          <div class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <button @click="$emit('view-change', 'submission')" class="text-sm sm:text-base md:text-lg hover:underline whitespace-nowrap">Bid Submission</button>
          </div>
          <div class="flex items-center text-blue-700 font-medium">
            <button @click="$emit('view-change', 'tracking')" class="text-sm sm:text-base md:text-lg hover:underline whitespace-nowrap">Status Tracking</button>
          </div>
          <div class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <button @click="$emit('view-change', 'history')" class="text-sm sm:text-base md:text-lg hover:underline whitespace-nowrap">Bid History</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bid Status Tracking Content -->
    <div class="flex-1 bg-gray-50 overflow-y-auto">
      <div class="container mx-auto p-4 sm:p-6 md:p-8">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800">Bid Status Tracking</h2>
        
        <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row mb-4 sm:mb-6 gap-3 sm:gap-0">
            <input 
              v-model="searchTerm"
              class="w-full sm:flex-1 p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm sm:text-base"
              placeholder="Search by project name or ID..."
            />
            <button 
              @click="filterBids"
              class="bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 sm:ml-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium shadow-md text-sm sm:text-base w-full sm:w-auto"
            >
              <span class="flex items-center justify-center">
                Filter
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
            </button>
          </div>
          
          <div v-if="filteredBids.length === 0" class="text-center py-8 sm:py-16 text-gray-500 text-base sm:text-lg">
            No bids found matching your search criteria.
          </div>
          
          <div v-else class="space-y-4 sm:space-y-6">
            <div v-for="bid in filteredBids" :key="bid.id" class="border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div class="bg-gray-50 p-3 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 gap-2">
                <h3 class="font-semibold text-gray-800 text-base sm:text-xl break-words">{{ bid.projectName }}</h3>
                <span 
                  class="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto"
                  :class="{
                    'bg-yellow-100 text-yellow-800': bid.status === 'Under Review',
                    'bg-green-100 text-green-800': bid.status === 'Accepted',
                    'bg-red-100 text-red-800': bid.status === 'Rejected'
                  }"
                >
                  {{ bid.status }}
                </span>
              </div>
              
              <div class="p-3 sm:p-5 border-b border-gray-200 bg-white">
                <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6">
                  <div class="text-sm sm:text-base">
                    <span class="text-gray-500">Bid ID:</span> 
                    <span class="font-medium text-gray-800 break-all">{{ bid.id }}</span>
                  </div>
                  <div class="text-sm sm:text-base">
                    <span class="text-gray-500">Submitted:</span> 
                    <span class="font-medium text-gray-800">{{ bid.submissionDate }}</span>
                  </div>
                </div>
              </div>
              
              <div class="p-3 sm:p-6 bg-white">
                <h4 class="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Timeline</h4>
                <div v-for="(step, index) in bid.timeline" :key="index" class="flex mb-3 sm:mb-4 last:mb-0">
                  <div class="w-8 sm:w-10 flex-shrink-0 text-center rounded-full bg-gray-100 h-8 sm:h-10 flex items-center justify-center font-medium mr-2 sm:mr-4 text-sm sm:text-base">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div 
                      class="font-medium text-base sm:text-lg break-words"
                      :class="{
                        'text-green-600': step.completed && !step.rejection,
                        'text-red-600': step.completed && step.rejection,
                        'text-gray-600': !step.completed
                      }"
                    >
                      {{ step.step }}
                    </div>
                    <div class="text-sm sm:text-base text-gray-500 mt-1">{{ step.date }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  bids: {
    type: Array,
    required: true
  }
});

defineEmits(['view-change']);

const searchTerm = ref('');
const filteredBids = ref([...props.bids]);

const filterBids = () => {
  if (!searchTerm.value.trim()) {
    filteredBids.value = [...props.bids];
    return;
  }
  
  const term = searchTerm.value.toLowerCase();
  filteredBids.value = props.bids.filter(bid => 
    bid.projectName.toLowerCase().includes(term) || 
    bid.id.toLowerCase().includes(term)
  );
};
</script>