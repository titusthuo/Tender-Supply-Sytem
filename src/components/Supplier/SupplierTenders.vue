<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-3 flex justify-between items-center">
      <h1 class="text-xl font-bold">Supplier Portal</h1>
      <div class="flex space-x-2">
        <button class="bg-white bg-opacity-20 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button class="bg-white bg-opacity-20 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Nav Toggle -->
    <div class="lg:hidden bg-white p-2 border-b">
      <button @click="mobileNavOpen = !mobileNavOpen" class="flex items-center space-x-1 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Menu</span>
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col lg:flex-row">
      <!-- Sidebar Navigation -->
      <div :class="[
        'bg-white shadow-md',
        'lg:w-64 lg:min-h-screen',
        mobileNavOpen ? 'block' : 'hidden lg:block'
      ]">
        <nav class="w-48 bg-white p-4 shadow-sm">
          <div class="space-y-2">
            <router-link to="/SupplierDashboard" class="flex items-center w-full p-3 rounded-md bg-blue-500 text-white">
              <div class="w-6 h-6 rounded-full bg-white mr-3"></div>
              <span>Dashboard</span>
            </router-link>
            
            <router-link to="/SupplierProducts" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
              <span>Products</span>
            </router-link>
            
            <router-link to="/SupplierTenders" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
              <span>Tenders</span>
            </router-link>
            
            <router-link to="/SupplierProfile" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
              <span>Profile</span>
            </router-link>
            
            <router-link to="/orders" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
              <span>Orders</span>
            </router-link>
            
            <router-link to="/settings" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
              <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
              <span>Settings</span>
            </router-link>
          </div>
        </nav>
      </div>

      <!-- Content Area -->
      <div class=" p-6 bg-gray-50 border border-gray-200">
        <!-- Tenders Listing View -->
        <div v-if="!selectedTender">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 class="text-xl font-semibold">Available Tenders</h2>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search tenders..."
                  class="pl-8 pr-4 py-2 border rounded-md w-full"
                  v-model="searchQuery"
                  @input="searchTenders"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-2 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-600 mr-2">Filter by:</span>
                <select v-model="filterBy" @change="filterTenders" class="border rounded-md p-2 text-sm w-full sm:w-auto">
                  <option value="all">All</option>
                  <option value="it">IT Department</option>
                  <option value="facilities">Facilities</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div class="bg-white rounded-md shadow-sm mb-6">
            <div class="p-4 border-b">
              <h3 class="font-medium">Categories</h3>
            </div>
            <div class="p-4">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="category in categories"
                  :key="category.id"
                  @click="selectCategory(category.id)"
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                    selectedCategory === category.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  ]"
                >
                  {{ category.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- Tenders List -->
          <div class="bg-white rounded-md shadow-sm">
            <div class="p-4 border-b hidden md:block">
              <div class="grid grid-cols-1 md:grid-cols-4 text-sm font-medium text-gray-500">
                <div>Title</div>
                <div>Deadline</div>
                <div>Department</div>
                <div>Action</div>
              </div>
            </div>

            <!-- Tender Items -->
            <div v-if="filteredTenders.length > 0">
              <div v-for="tender in filteredTenders" :key="tender.id" class="p-4 border-b hover:bg-gray-50">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 md:items-center">
                  <div>
                    <h4 class="font-medium">{{ tender.title }}</h4>
                    <p class="text-sm text-gray-500">{{ tender.description }}</p>
                  </div>
                  <div class="text-sm">
                    <span class="md:hidden font-medium">Deadline: </span>{{ tender.deadline }}
                  </div>
                  <div class="text-sm">
                    <span class="md:hidden font-medium">Department: </span>{{ tender.department }}
                  </div>
                  <div>
                    <button
                      @click="viewTenderDetails(tender)"
                      class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors w-full md:w-auto"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-8 text-center text-gray-500">
              No tenders match your search criteria
            </div>
          </div>
        </div>

        <!-- Tender Details View -->
        <div v-else>
          <div class="mb-4">
            <button @click="backToList" class="text-blue-500 hover:text-blue-600 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-6 space-y-3 md:space-y-0">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">OPEN FOR BIDS</span>
                <span class="text-sm text-gray-500">Deadline: April 15, 2025</span>
              </div>
              <h2 class="text-xl font-semibold">{{ selectedTender.title }}</h2>
              <p class="text-sm text-gray-500">Published: March 20, 2025 | Closing: April 15, 2025 | Bids: 0</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-md shadow-sm p-4">
              <h3 class="font-medium mb-2">Tender Value</h3>
              <p class="text-xl font-semibold">{{ selectedTender.value }}</p>
            </div>
            <div class="bg-white rounded-md shadow-sm p-4 md:col-span-2">
              <h3 class="font-medium mb-2">Description</h3>
              <p class="text-sm">{{ selectedTender.fullDescription }}</p>
            </div>
          </div>

          <div class="bg-white rounded-md shadow-sm p-4 mb-8 overflow-x-auto">
            <h3 class="font-medium mb-4">Timeline</h3>
            <div class="relative min-w-[600px]">
              <!-- Timeline bar -->
              <div class="absolute h-1 bg-gray-200 left-0 right-0 top-3"></div>
              
              <!-- Timeline points -->
              <div class="flex justify-between relative">
                <div v-for="(point, index) in timelinePoints" :key="index" class="flex flex-col items-center">
                  <div :class="[
                    'w-6 h-6 rounded-full mb-1 z-10 flex items-center justify-center',
                    point.completed ? 'bg-blue-500' : 'bg-gray-300'
                  ]">
                    <svg v-if="point.completed" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="text-xs font-medium">{{ point.date }}</div>
                  <div class="text-xs text-gray-500 text-center">{{ point.label }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center md:justify-end">
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors w-full sm:w-auto">Submit Bid</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTender: null,
      mobileNavOpen: false,
      searchQuery: "",
      filterBy: "all",
      selectedCategory: "all",
      categories: [
        { id: "all", name: "All" },
        { id: "it", name: "IT Equipment" },
        { id: "office", name: "Office Supplies" },
        { id: "software", name: "Software" }
      ],
      navItems: [
        { name: "Dashboard", active: false },
        { name: "Products", active: false },
        { name: "Tenders", active: true },
        { name: "Profile", active: false },
        { name: "Orders", active: false },
        { name: "Settings", active: false }
      ],
      tenders: [
        {
          id: 1,
          title: "IT Equipment Supply - Q2 2025",
          description: "Supply of laptops, desktops, and peripherals for headquarters office refresh",
          fullDescription: "Supply of laptops, desktops, and peripherals for headquarters office refresh. This tender covers a total requirement of 150 laptops, 75 desktop units. Supplier must be able to provide enterprise-grade equipment repair and warranty services. All equipment must comply with 3-year warranty with next business day repairs.",
          deadline: "April 15, 2025",
          department: "IT Department",
          category: "it",
          value: "$75,000 - $100,000"
        },
        {
          id: 2,
          title: "Software Licenses Procurement",
          description: "Annual procurement of productivity software licenses for 500+ users",
          fullDescription: "Annual procurement of productivity software licenses covering office applications, project management tools, and design software for 500+ users across multiple departments.",
          deadline: "April 20, 2025",
          department: "IT Department",
          category: "software",
          value: "$120,000 - $150,000"
        },
        {
          id: 3,
          title: "Office Supplies Q2",
          description: "Regular quarterly office supplies procurement",
          fullDescription: "Regular quarterly procurement of standard office supplies including paper, stationery, printer consumables, and breakroom supplies.",
          deadline: "April 30, 2025",
          department: "Facilities",
          category: "office",
          value: "$20,000 - $25,000"
        }
      ],
      filteredTenders: [],
      timelinePoints: [
        { date: "Mar 20", label: "Published", completed: true },
        { date: "Apr 5", label: "Q&A Deadline", completed: false },
        { date: "Apr 15", label: "Bid Deadline", completed: false },
        { date: "Apr 22", label: "Evaluation", completed: false },
        { date: "May 1", label: "Award", completed: false }
      ]
    };
  },
  created() {
    this.filteredTenders = [...this.tenders];
  },
  methods: {
    viewTenderDetails(tender) {
      this.selectedTender = tender;
      this.mobileNavOpen = false; // Close mobile nav when viewing details
    },
    backToList() {
      this.selectedTender = null;
    },
    searchTenders() {
      this.applyFilters();
    },
    filterTenders() {
      this.applyFilters();
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.applyFilters();
    },
    applyFilters() {
      let results = [...this.tenders];
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        results = results.filter(tender =>
          tender.title.toLowerCase().includes(query) ||
          tender.description.toLowerCase().includes(query)
        );
      }
      
      // Apply department filter
      if (this.filterBy !== "all") {
        results = results.filter(tender => {
          if (this.filterBy === "it") return tender.department === "IT Department";
          if (this.filterBy === "facilities") return tender.department === "Facilities";
          return true;
        });
      }
      
      // Apply category filter
      if (this.selectedCategory !== "all") {
        results = results.filter(tender => tender.category === this.selectedCategory);
      }
      
      this.filteredTenders = results;
    }
  }
};
</script>