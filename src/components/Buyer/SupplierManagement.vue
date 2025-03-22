<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top navbar -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Buyer Portal</h1>
      <div class="flex items-center gap-2">
        <button class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span class="text-xl">?</span>
        </button>
        <button class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span class="text-xl">🔔</span>
        </button>
        <button class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span>JP</span>
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="p-6">
      <!-- Title and Add New Supplier button -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">Supplier Management</h2>
        <button 
          class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          @click="openAddSupplierSlider"
        >
          <span class="mr-1">+</span> Add New Supplier
        </button>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-md p-4 shadow-sm mb-4">
        <div class="flex justify-between">
          <div class="flex items-center">
            <span class="text-gray-600 mr-2">Filters:</span>
            <div class="flex gap-2">
              <div class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                <span>Status: Active</span>
                <span class="ml-1">▼</span>
              </div>
              <div class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                <span>Category</span>
                <span class="ml-1">▼</span>
              </div>
              <div class="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                <span>Performance</span>
                <span class="ml-1">▼</span>
              </div>
            </div>
          </div>
          <div>
            <div class="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                class="border rounded-md pl-8 pr-4 py-1"
                v-model="searchQuery"
              />
              <span class="absolute left-2 top-2 text-gray-500">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Supplier Categories Tabs -->
      <div class="flex border-b mb-4">
        <button 
          class="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium"
        >
          All Suppliers ({{ suppliers.length }})
        </button>
        <button class="px-4 py-2 text-gray-600">
          Strategic (12)
        </button>
        <button class="px-4 py-2 text-gray-600">
          Preferred (18)
        </button>
        <button class="px-4 py-2 text-gray-600">
          Standard (13)
        </button>
        <button class="px-4 py-2 text-gray-600">
          New/Onboarding (5)
        </button>
      </div>

      <!-- Suppliers Table -->
      <div class="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b text-gray-600 font-medium">
          <div>Supplier ID</div>
          <div>Name</div>
          <div>Category</div>
          <div>Performance</div>
          <div>Last Activity</div>
          <div>Actions</div>
        </div>

        <!-- Table Rows -->
        <div 
          v-for="supplier in suppliers" 
          :key="supplier.id" 
          class="border-b p-4 grid grid-cols-6 gap-4 items-center"
        >
          <div class="text-gray-800">{{ supplier.id }}</div>
          <div>
            <div class="font-medium">{{ supplier.name }}</div>
            <div class="text-sm text-gray-500">{{ supplier.description }}</div>
          </div>
          <div>{{ supplier.category }}</div>
          <div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="h-2.5 rounded-full" 
                :class="getPerformanceColorClass(supplier.performance)"
                :style="{ width: supplier.performance + '%' }"
              ></div>
            </div>
            <div class="text-right text-sm mt-1">{{ supplier.performance }}%</div>
          </div>
          <div>{{ supplier.lastActivity }}</div>
          <div class="flex gap-2">
            <button 
              class="bg-blue-600 text-white px-4 py-1 rounded"
              @click="viewSupplier(supplier)"
            >View</button>
            <button 
              class="border border-blue-600 text-blue-600 px-4 py-1 rounded"
              @click="openContactModal(supplier)"
            >Contact</button>
          </div>
        </div>
      </div>

      <!-- Risk Assessment Section -->
      <h2 class="text-xl font-bold text-gray-800 mb-4">Risk Assessment</h2>
      
      <div class="grid grid-cols-2 gap-6">
        <!-- Supply Risk Card -->
        <div class="bg-white rounded-md shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Supply Risk</h3>
          
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Financial Stability</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Geographical Concentration</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-green-500 h-2.5 rounded-full" style="width: 30%"></div>
              </div>
            </div>
            
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-gray-600">Market Volatility</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-red-500 h-2.5 rounded-full" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Compliance Status Card -->
        <div class="bg-white rounded-md shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Compliance Status</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Code of Conduct</span>
              <div class="flex items-center">
                <span class="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span class="text-gray-500">Verified Mar 1</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Insurance Certificates</span>
              <div class="flex items-center">
                <span class="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span class="text-gray-500">Verified Feb 15</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">ESG Compliance</span>
              <div class="flex items-center">
                <span class="bg-red-100 text-red-800 p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span class="text-red-500">Action Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Right Side Slider Component -->
    <SliderPanel 
      :is-open="isSliderOpen" 
      :title="sliderTitle" 
      @close="closeSlider"
    >
      <template v-if="isAddingSupplier">
        <SupplierForm 
          :supplier="editingSupplier" 
          @save="saveSupplier" 
          @cancel="closeSlider"
        />
      </template>
      <template v-else-if="isViewingSupplier">
        <SupplierDetails 
          :supplier="editingSupplier" 
          @edit="startEditingSupplier" 
          @close="closeSlider"
        />
      </template>
    </SliderPanel>

    <!-- Contact Modal Component -->
    <ContactModal 
      :is-open="isContactModalOpen" 
      :supplier="selectedSupplier" 
      @close="closeContactModal"
      @submit="submitContactForm"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SliderPanel from '@/components/Buyer/SliderPanel.vue';
import SupplierForm from '@/components/Buyer/SupplierForm.vue';
import SupplierDetails from '@/components/Buyer/SupplierDetails.vue';
import ContactModal from '@/components/Buyer/ContactModal.vue';

// Initial sample data
const suppliers = ref([
  {
    id: 'SUP-10032',
    name: 'TechSupplies Inc.',
    description: 'IT Hardware & Peripherals',
    category: 'IT Equipment',
    performance: 80,
    lastActivity: 'Mar 10, 2025'
  },
  {
    id: 'SUP-10045',
    name: 'Office Solutions Ltd.',
    description: 'Office Supplies & Furniture',
    category: 'Office Supplies',
    performance: 90,
    lastActivity: 'Mar 8, 2025'
  },
  {
    id: 'SUP-10029',
    name: 'Global Logistics Co.',
    description: 'Shipping & Logistics',
    category: 'Logistics',
    performance: 70,
    lastActivity: 'Mar 5, 2025'
  }
]);

// Search functionality
const searchQuery = ref('');

// Slider states
const isSliderOpen = ref(false);
const isAddingSupplier = ref(false);
const isViewingSupplier = ref(false);
const editingSupplier = ref(null);
const sliderTitle = computed(() => {
  if (isAddingSupplier.value) return 'Add New Supplier';
  if (isViewingSupplier.value) return 'Supplier Details';
  return '';
});

// Contact modal states
const isContactModalOpen = ref(false);
const selectedSupplier = ref(null);

// Utility functions
function getPerformanceColorClass(performance) {
  if (performance >= 80) return 'bg-green-500';
  if (performance >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

// Slider actions
function openAddSupplierSlider() {
  editingSupplier.value = {
    id: generateSupplierId(),
    name: '',
    description: '',
    category: '',
    performance: 0,
    lastActivity: formatDate(new Date())
  };
  isAddingSupplier.value = true;
  isViewingSupplier.value = false;
  isSliderOpen.value = true;
}

function viewSupplier(supplier) {
  editingSupplier.value = { ...supplier };
  isViewingSupplier.value = true;
  isAddingSupplier.value = false;
  isSliderOpen.value = true;
}

function startEditingSupplier() {
  isAddingSupplier.value = true;
  isViewingSupplier.value = false;
}

function closeSlider() {
  isSliderOpen.value = false;
  setTimeout(() => {
    isAddingSupplier.value = false;
    isViewingSupplier.value = false;
    editingSupplier.value = null;
  }, 300); // Wait for animation to complete
}

function saveSupplier(supplierData) {
  const index = suppliers.value.findIndex(s => s.id === supplierData.id);
  
  if (index >= 0) {
    // Update existing supplier
    suppliers.value[index] = supplierData;
  } else {
    // Add new supplier
    suppliers.value.push({
      ...supplierData,
      lastActivity: formatDate(new Date())
    });
  }
  
  closeSlider();
}

// Contact modal actions
function openContactModal(supplier) {
  selectedSupplier.value = supplier;
  isContactModalOpen.value = true;
}

function closeContactModal() {
  isContactModalOpen.value = false;
  setTimeout(() => {
    selectedSupplier.value = null;
  }, 300); // Wait for animation to complete
}

function submitContactForm(data) {
  console.log('Contact form submitted:', data);
  // Here you would typically send the data to your backend
  alert(`Contact request sent to ${selectedSupplier.value.name}`);
  closeContactModal();
}

// Helper functions
function generateSupplierId() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `SUP-${num}`;
}

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
</script>