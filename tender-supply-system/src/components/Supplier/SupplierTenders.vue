<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-[#2c3e50] text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      <h1 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">Procurement Portal</h1>
      <div class="flex space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
        <button class="bg-[#3498db] px-3 sm:px-4 py-2 rounded text-sm sm:text-base">Profile</button>
        <button class="border border-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base">Logout</button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-[#2c3e50] mb-4 sm:mb-6 text-center sm:text-left">Open Tenders</h2>

      <!-- Filter Section -->
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <!-- Category Filter -->
          <div class="relative">
            <select 
              v-model="selectedCategory" 
              @change="applyFilters"
              class="w-full px-3 sm:px-4 py-2 border rounded-md appearance-none text-sm sm:text-base"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in categories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <!-- Status Filter -->
          <div class="relative">
            <select 
              v-model="selectedStatus" 
              @change="applyFilters"
              class="w-full px-3 sm:px-4 py-2 border rounded-md appearance-none text-sm sm:text-base"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              @input="applyFilters"
              placeholder="Search tenders..." 
              class="w-full px-3 sm:px-4 py-2 border rounded-md pl-8 sm:pl-10 text-sm sm:text-base"
            />
            <svg class="absolute left-2 sm:left-3 top-2 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Tenders Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div 
          v-for="tender in filteredTenders" 
          :key="tender.id" 
          class="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-lg sm:text-xl font-bold text-[#2c3e50] mb-2 line-clamp-2">
            {{ tender.title }}
          </h3>
          <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">{{ tender.description }}</p>
          
          <div class="flex flex-wrap justify-between items-center mb-3 sm:mb-4 gap-2">
            <div class="flex flex-wrap gap-1 sm:gap-2">
              <span 
                class="px-2 py-1 bg-[#ecf0f1] text-xs rounded-full truncate max-w-[120px]"
              >
                {{ tender.department }}
              </span>
              <span 
                class="px-2 py-1 bg-[#ecf0f1] text-xs rounded-full truncate max-w-[120px]"
              >
                {{ tender.category }}
              </span>
            </div>
            <span 
              class="text-xs sm:text-sm text-red-500 font-semibold"
            >
              {{ calculateDeadline(tender.deadline) }}
            </span>
          </div>

          <button 
            @click="viewTenderDetails(tender)"
            class="w-full bg-[#3498db] text-white py-1.5 sm:py-2 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            Apply Tender
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCategory: '',
      selectedStatus: '',
      searchQuery: '',
      categories: [
        { id: 'it', name: 'IT Equipment' },
        { id: 'office', name: 'Office Supplies' },
        { id: 'software', name: 'Software' },
        { id: 'infrastructure', name: 'Infrastructure' },
        { id: 'medical', name: 'Medical Supplies' }
      ],
      tenders: [
        {
          id: 1,
          title: 'IT Equipment Procurement',
          description: 'Supply of laptops, desktops, and peripherals for headquarters office refresh',
          deadline: 'April 15, 2025',
          department: 'Department of Technology',
          category: 'it',
          value: '$75,000 - $100,000'
        },
        {
          id: 2,
          title: 'Road Construction Project',
          description: 'Large-scale infrastructure development project for city highways',
          deadline: 'April 20, 2025',
          department: 'Department of Infrastructure',
          category: 'infrastructure',
          value: '$5,000,000 - $7,500,000'
        },
        {
          id: 3,
          title: 'Medical Supplies Contract',
          description: 'Annual medical supplies and equipment procurement',
          deadline: 'April 30, 2025',
          department: 'Department of Health',
          category: 'medical',
          value: '$250,000 - $500,000'
        }
      ]
    }
  },
  computed: {
    filteredTenders() {
      return this.tenders.filter(tender => {
        const matchesCategory = !this.selectedCategory || tender.category === this.selectedCategory
        const matchesSearch = !this.searchQuery || 
          tender.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          tender.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        
        return matchesCategory && matchesSearch
      })
    }
  },
  methods: {
    viewTenderDetails(tender) {
      // Navigate to the bidding page
      this.$router.push({ 
        name: 'bidding', 
        params: { 
          tenderId: tender.id 
        } 
      })
    },
    calculateDeadline(deadline) {
      // Simple deadline calculation logic
      const deadlineDate = new Date(deadline)
      const now = new Date()
      const diffTime = deadlineDate - now
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return diffDays > 0 ? `${diffDays} days remaining` : 'Expired'
    },
    applyFilters() {
      // Existing filter logic
    }
  }
}
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>