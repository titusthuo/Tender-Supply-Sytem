<!-- src/components/Bidding/BidHistoryArchive.vue -->
<template>
    <div class="min-h-screen flex flex-col bg-white">
      <!-- Header -->
      <div class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto">
          <h1 class="text-2xl font-bold">Bidding System Dashboard</h1>
        </div>
      </div>
  
      <!-- Horizontal Navigation Menu -->
      <div class="bg-white border-b border-gray-200 shadow-sm">
        <div class="container mx-auto py-4 px-6">
          <div class="flex space-x-8 items-center">
            <div class="flex items-center text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
              
              <button @click="$emit('view-change', 'submission')" class="hover:underline">Bid Submission</button>
            </div>
            <div class="flex items-center text-gray-600 cursor-pointer hover:text-blue-600 transition-colors">
              
              <button @click="$emit('view-change', 'tracking')" class="hover:underline">Status Tracking</button>
            </div>
            <div class="flex items-center text-blue-600 font-medium cursor-pointer">
             
              <button @click="$emit('view-change', 'history')" class="hover:underline">Bid History</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bid History & Archive Content -->
      <div class="flex-1 bg-gray-50">
        <div class="container mx-auto p-6">
          <h2 class="text-xl font-semibold mb-6 text-gray-800">Bid History & Archive</h2>
          
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-4 border-b border-gray-200">
              <div class="flex flex-wrap gap-4">
                <div class="flex-grow">
                  <input 
                    v-model="searchTerm"
                    class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by project name, ID, or status..."
                  />
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="sortBids"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <span class="flex items-center">
                      Sort
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                    </span>
                  </button>
                  <button 
                    @click="filterBids"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <span class="flex items-center">
                      Filter
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Project Name
                    </th>
                    <th class="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Bid Amount
                    </th>
                    <th class="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Submission Date
                    </th>
                    <th class="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="bid in displayedBids" :key="bid.id" class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="font-medium text-gray-800">{{ bid.projectName }}</div>
                      <div class="text-xs text-gray-500">ID: {{ bid.id }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                      ${{ bid.bidAmount.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                      {{ bid.submissionDate }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="{
                          'bg-yellow-100 text-yellow-800': bid.status === 'Under Review',
                          'bg-green-100 text-green-800': bid.status === 'Accepted',
                          'bg-red-100 text-red-800': bid.status === 'Rejected'
                        }"
                      >
                        {{ bid.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="currentPage--" 
                  :disabled="currentPage === 1"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
                  :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  Previous
                </button>
                <button 
                  @click="currentPage++" 
                  :disabled="currentPage >= totalPages"
                  class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
                  :class="currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{{ startItem }}</span> to 
                    <span class="font-medium">{{ endItem }}</span> of 
                    <span class="font-medium">{{ filteredBids.length }}</span> results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      @click="currentPage--" 
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''"
                    >
                      <span class="sr-only">Previous</span>
                      &laquo;
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                      {{ currentPage }}
                    </span>
                    <button 
                      @click="currentPage++" 
                      :disabled="currentPage >= totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      :class="currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''"
                    >
                      <span class="sr-only">Next</span>
                      &raquo;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    bids: {
      type: Array,
      required: true
    }
  });
  
  defineEmits(['view-change']);
  
  const searchTerm = ref('');
  const sortDirection = ref('desc'); // 'asc' or 'desc'
  const sortField = ref('submissionDate');
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const filteredBids = ref([...props.bids]);
  
  // Reset pagination when search or filter changes
  watch(searchTerm, () => {
    currentPage.value = 1;
  });
  
  // Apply sorting
  const sortBids = () => {
    // Toggle sort direction
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    
    filteredBids.value = [...filteredBids.value].sort((a, b) => {
      // Convert dates to timestamps for comparison
      if (sortField.value === 'submissionDate') {
        const dateA = new Date(a.submissionDate);
        const dateB = new Date(b.submissionDate);
        
        return sortDirection.value === 'asc' 
          ? dateA - dateB 
          : dateB - dateA;
      }
      
      // Sort by amount
      if (sortField.value === 'bidAmount') {
        return sortDirection.value === 'asc' 
          ? a.bidAmount - b.bidAmount 
          : b.bidAmount - a.bidAmount;
      }
      
      // Default sorting by project name
      return sortDirection.value === 'asc' 
        ? a.projectName.localeCompare(b.projectName) 
        : b.projectName.localeCompare(a.projectName);
    });
    
    // Reset to first page after sorting
    currentPage.value = 1;
  };
  
  // Apply filtering
  const filterBids = () => {
    if (!searchTerm.value.trim()) {
      filteredBids.value = [...props.bids];
    } else {
      const term = searchTerm.value.toLowerCase();
      filteredBids.value = props.bids.filter(bid => 
        bid.projectName.toLowerCase().includes(term) || 
        bid.id.toLowerCase().includes(term) ||
        bid.status.toLowerCase().includes(term)
      );
    }
    
    // Reset to first page after filtering
    currentPage.value = 1;
  };
  
  // Pagination
  const totalPages = computed(() => Math.ceil(filteredBids.value.length / itemsPerPage));
  const startItem = computed(() => filteredBids.value.length === 0 ? 0 : ((currentPage.value - 1) * itemsPerPage) + 1);
  const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, filteredBids.value.length));
  
  // Get current page items
  const displayedBids = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredBids.value.slice(start, end);
  });
  </script>