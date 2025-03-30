<template>
  <div class="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
    <!-- Topbar with Action Elements -->
    <div class="bg-white shadow-md rounded-lg mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 md:p-6 border-b">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Buyer Management</h1>
        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div class="relative w-full sm:w-auto">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search buyers..." 
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
            <svg class="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Filter and Add Button Row -->
          <div class="flex flex-row w-full sm:w-auto justify-between sm:justify-start space-x-2 sm:space-x-4">
            <!-- Filter Dropdown -->
            <div class="relative">
              <button 
                @click="toggleFilterDropdown" 
                class="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition w-full justify-center"
              >
                <svg class="h-4 sm:h-5 w-4 sm:w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                <span class="text-sm sm:text-base">Filters</span>
              </button>
              
              <!-- Dropdown Content -->
              <div 
                v-if="isFilterDropdownOpen" 
                class="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50"
              >
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      v-model="filters.status" 
                      class="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending Verification</option>
                      <option value="Blacklisted">Blacklisted</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      v-model="filters.category" 
                      class="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">All Categories</option>
                      <option>IT Services</option>
                      <option>Office Supplies</option>
                      <option>Logistics</option>
                    </select>
                  </div>
                  
                  <button 
                    @click="applyFilters" 
                    class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Add New buyer Button -->
            <button 
              @click="openAddbuyerModal" 
              class="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-1 sm:space-x-2 bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <svg class="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="text-sm sm:text-base">Add New Buyer</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- buyers Table with Responsive Design -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="hidden md:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
              <th class="hidden lg:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
              <th class="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th class="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="buyer in filteredbuyers" 
              :key="buyer.id" 
              class="hover:bg-gray-50 transition"
            >
              <td class="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {{ buyer.id }}
              </td>
              <td class="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img 
                    :src="buyer.logo" 
                    class="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full mr-2 sm:mr-3" 
                  >
                  <div class="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                    {{ buyer.companyName }}
                  </div>
                </div>
              </td>
              <td class="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                <a 
                  :href="`mailto:${buyer.email}`" 
                  class="text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate block max-w-[150px] lg:max-w-none"
                >
                  {{ buyer.email }}
                </a>
              </td>
              <td class="hidden md:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  {{ buyer.categories.join(', ') }}
                </span>
              </td>
              <td class="hidden lg:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                {{ buyer.registrationDate }}
              </td>
              <td class="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                <span 
                  :class="{
                    'bg-green-100 text-green-800': buyer.status === 'Active',
                    'bg-yellow-100 text-yellow-800': buyer.status === 'Pending',
                    'bg-red-100 text-red-800': buyer.status === 'Blacklisted'
                  }"
                  class="px-1.5 sm:px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ buyer.status }}
                </span>
              </td>
              <td class="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <template v-for="n in 5" :key="n">
                    <svg 
                      :class="n <= buyer.performanceRating ? 'text-yellow-400' : 'text-gray-300'"
                      class="h-4 w-4 sm:h-5 sm:w-5"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </template>
                </div>
              </td>
              <td class="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                <div class="flex justify-center space-x-1 sm:space-x-2">
                  <button 
                    @click="viewbuyerDetails(buyer)" 
                    class="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                    title="View Details"
                  >
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="editbuyer(buyer)" 
                    class="text-green-600 hover:text-green-900 transition-colors duration-200"
                    title="Edit Buyer"
                  >
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="togglebuyerStatus(buyer)" 
                    class="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Toggle Status"
                  >
                    <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Responsive Buyer Details (Mobile View) -->
      <div class="sm:hidden mt-4">
        <div class="px-4 py-3 bg-gray-100 text-sm font-medium text-gray-700">
          Additional details available in table view on larger screens
        </div>
      </div>
      
      <!-- Pagination with Responsive Design -->
      <div class="bg-white px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between border-t">
        <div class="flex flex-1 flex-wrap justify-between mb-2 sm:mb-0">
          <button 
            @click="prevPage" 
            class="relative inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mb-2 sm:mb-0"
          >
            Previous
          </button>
          <span class="text-xs sm:text-sm text-gray-700 mx-2">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            @click="nextPage" 
            class="relative inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="w-full sm:w-auto">
          <p class="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
            Showing
            <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * pageSize, totalbuyers) }}</span>
            of
            <span class="font-medium">{{ totalbuyers }}</span>
            results
          </p>
        </div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 flex justify-center">
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <template v-for="page in displayedPageNumbers" :key="page">
              <button 
                @click="goToPage(page)"
                :class="{
                  'bg-blue-50 border-blue-500 text-blue-600': currentPage === page,
                  'border-gray-300 text-gray-500 hover:bg-gray-50': currentPage !== page
                }"
                class="relative inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 border text-xs sm:text-sm font-medium"
              >
                {{ page }}
              </button>
            </template>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span class="sr-only">Next</span>
              <svg class="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Add Buyer Slider (kept the same as original) -->
    <buyerAddSlider 
      :is-open="isAddbuyerModalOpen" 
      @close="closeAddbuyerModal"
      @add-buyer="addNewbuyer"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import buyerAddSlider from './buyerAddSlider.vue'

// buyer Data (Previous implementation remains the same)
const buyers = ref([
  {
    id: 'VEN001',
    companyName: 'TechSupplies Inc.',
    email: 'contact@techsupplies.com',
    logo: '/api/placeholder/40/40',
    categories: ['IT Services'],
    registrationDate: '2024-01-15',
    status: 'Active',
    performanceRating: 4
  },
  // ... other buyers
])

// Search and Filtering (Previous implementation remains the same)
const searchQuery = ref('')
const filters = ref({
  status: '',
  category: ''
})
const isFilterDropdownOpen = ref(false)

const filteredbuyers = computed(() => {
  return buyers.value.filter(buyer => {
    const matchesSearch = buyer.companyName.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filters.value.status || buyer.status === filters.value.status
    const matchesCategory = !filters.value.category || buyer.categories.includes(filters.value.category)
    
    return matchesSearch && matchesStatus && matchesCategory
  })
})

// Pagination (Previous implementation remains the same)
const currentPage = ref(1)
const pageSize = ref(10)
const totalbuyers = computed(() => filteredbuyers.value.length)
const totalPages = computed(() => Math.ceil(totalbuyers.value / pageSize.value))

const pageNumbers = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

// buyer Modal Management
const isAddbuyerModalOpen = ref(false)

const openAddbuyerModal = () => {
  isAddbuyerModalOpen.value = true
}

const closeAddbuyerModal = () => {
  isAddbuyerModalOpen.value = false
}

const addNewbuyer = (newbuyer) => {
  buyers.value.unshift(newbuyer)
}

// Existing methods (Previous implementation remains the same)
const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value
}

const applyFilters = () => {
  isFilterDropdownOpen.value = false
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const viewbuyerDetails = (buyer) => {
  console.log('View buyer Details', buyer)
}

const editbuyer = (buyer) => {
  console.log('Edit buyer', buyer)
}

const togglebuyerStatus = (buyer) => {
  console.log('Toggle buyer Status', buyer)
}
</script>