<template>
  <div class="p-6 w-full">
    <!-- Header with Title and Create Button -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Tender Management</h1>
      <button @click="openCreateTenderSlider" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center">
        <span class="mr-1">+</span> Create New Tender
      </button>
    </div>

    <!-- Filters Section -->
    <div class="bg-white p-4 rounded-md shadow-sm mb-4">
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-gray-700">Filters:</span>
        
        <div class="flex gap-2 flex-wrap">
          <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center">
            <span>Status: All</span>
            <span class="ml-1">▼</span>
          </div>
          
          <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center">
            <span>Department</span>
            <span class="ml-1">▼</span>
          </div>
          
          <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center">
            <span>Date Range</span>
            <span class="ml-1">▼</span>
          </div>
          
          <div class="bg-blue-100 text-blue-800 rounded-full px-3 py-1 flex items-center">
            <span>Type</span>
            <span class="ml-1">▼</span>
          </div>
        </div>
        
        <div class="ml-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="Search tenders..."
              class="border rounded-md py-1 px-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Tabs -->
    <div class="flex mb-4 border-b">
      <div class="bg-blue-100 text-blue-800 py-2 px-4 rounded-t-md font-medium">
        All (24)
      </div>
      <div class="text-gray-600 py-2 px-4 hover:bg-gray-100 cursor-pointer">
        Draft (3)
      </div>
      <div class="text-gray-600 py-2 px-4 hover:bg-gray-100 cursor-pointer">
        RFI (5)
      </div>
      <div class="text-gray-600 py-2 px-4 hover:bg-gray-100 cursor-pointer">
        RFP/RFQ (10)
      </div>
      <div class="text-gray-600 py-2 px-4 hover:bg-gray-100 cursor-pointer">
        Evaluation (4)
      </div>
      <div class="text-gray-600 py-2 px-4 hover:bg-gray-100 cursor-pointer">
        Closed (2)
      </div>
    </div>

    <!-- Tenders Table -->
    <div class="bg-white rounded-md shadow-sm overflow-hidden mb-8">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-gray-600">
            <th class="py-3 px-4 font-medium">Tender ID</th>
            <th class="py-3 px-4 font-medium">Title</th>
            <th class="py-3 px-4 font-medium">Department</th>
            <th class="py-3 px-4 font-medium">Stage</th>
            <th class="py-3 px-4 font-medium">Deadline</th>
            <th class="py-3 px-4 font-medium">Responses</th>
            <th class="py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="tender in tenders" :key="tender.id" class="hover:bg-gray-50">
            <td class="py-3 px-4 font-medium">{{ tender.id }}</td>
            <td class="py-3 px-4">
              <div class="font-medium">{{ tender.title }}</div>
              <div class="text-sm text-gray-500">{{ tender.description }}</div>
            </td>
            <td class="py-3 px-4">{{ tender.department }}</td>
            <td class="py-3 px-4">
              <span :class="getStageClass(tender.stage)" class="rounded-full px-3 py-1 text-sm">
                {{ tender.stage }}
              </span>
            </td>
            <td class="py-3 px-4">{{ tender.deadline }}</td>
            <td class="py-3 px-4">{{ tender.responses }}</td>
            <td class="py-3 px-4">
              <button 
                @click="openManageTenderSlider(tender)" 
                class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md text-sm"
              >
                {{ tender.stage === 'Closed' ? 'View' : 'Manage' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tender Process Templates -->
    <div>
      <h2 class="text-xl font-bold mb-4">Tender Process Templates</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Standard Goods RFQ -->
        <div class="bg-white p-6 rounded-md shadow-sm">
          <h3 class="text-lg font-bold mb-3">Standard Goods RFQ</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Single-stage evaluation</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Price comparison matrix</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Automated scoring</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>14-day timeline</span>
            </li>
          </ul>
        </div>
        
        <!-- Complex Service RFP -->
        <div class="bg-white p-6 rounded-md shadow-sm">
          <h3 class="text-lg font-bold mb-3">Complex Service RFP</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Multi-stage evaluation</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Technical + commercial scoring</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Weighted evaluation matrix</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>30-day timeline</span>
            </li>
          </ul>
        </div>
        
        <!-- IT Security Solutions -->
        <div class="bg-white p-6 rounded-md shadow-sm">
          <h3 class="text-lg font-bold mb-3">IT Security Solutions</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Three-stage process (RFI→RFP→POC)</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Security compliance checklist</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>Technical demonstrations</span>
            </li>
            <li class="flex items-start">
              <span class="text-gray-600 mr-2">•</span>
              <span>60-day timeline</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tender Form Slider Component -->
    <TenderFormSlider
      v-if="sliderVisible"
      :is-edit-mode="isEditMode"
      :is-open="sliderVisible"
      :tender-data="currentTenderData"
      @close="closeSlider"
      @submit="handleTenderSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TenderFormSlider from '@/components/Buyer/TenderFormSlider.vue';

// Sample data
const tenders = ref([
  {
    id: '#TE-25021',
    title: 'IT Equipment Tender',
    description: 'Laptops, monitors, peripherals',
    department: 'IT Department',
    stage: 'RFP',
    deadline: 'Apr 15, 2025',
    responses: '5 / 12',
    requirements: [
      'Laptops must have at least 16GB RAM',
      'Monitors must be minimum 24 inches',
      'All equipment must have 3-year warranty'
    ],
    type: 'RFP'
  },
  {
    id: '#TE-25020',
    title: 'Office Supplies Contract',
    description: '2-year supply agreement',
    department: 'Operations',
    stage: 'Eval',
    deadline: 'Mar 30, 2025',
    responses: '8 / 8',
    requirements: [
      'Monthly delivery schedule',
      'Eco-friendly options required',
      'Volume-based pricing'
    ],
    type: 'RFQ'
  },
  {
    id: '#TE-25019',
    title: 'Software License Tender',
    description: 'Enterprise productivity suite',
    department: 'IT Department',
    stage: 'Closed',
    deadline: 'Mar 1, 2025',
    responses: '6 / 6',
    requirements: [
      'Cloud-based solution',
      'Support for minimum 1000 users',
      'Training and onboarding included'
    ],
    type: 'RFP'
  }
]);

// Slider state
const sliderVisible = ref(false);
const isEditMode = ref(false);
const currentTenderId = ref(null);
const currentTenderData = ref(null);

// Get CSS class for stage badge
const getStageClass = (stage) => {
  switch (stage) {
    case 'RFP':
      return 'bg-green-100 text-green-800';
    case 'Eval':
      return 'bg-yellow-100 text-yellow-800';
    case 'Closed':
      return 'bg-red-100 text-red-800';
    case 'Draft':
      return 'bg-gray-100 text-gray-800';
    case 'RFI':
      return 'bg-blue-100 text-blue-800';
    case 'RFQ':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Open slider for creating a new tender
const openCreateTenderSlider = () => {
  isEditMode.value = false;
  currentTenderId.value = null;
  currentTenderData.value = {
    title: '',
    description: '',
    department: '',
    type: '',
    deadline: '',
    stage: 'Draft',
    requirements: ['']
  };
  sliderVisible.value = true;
};

// Open slider for managing an existing tender
const openManageTenderSlider = (tender) => {
  isEditMode.value = true;
  currentTenderId.value = tender.id;
  currentTenderData.value = { ...tender };
  sliderVisible.value = true;
};

// Close the slider
const closeSlider = () => {
  sliderVisible.value = false;
};

// Handle form submission from the slider component
const handleTenderSubmit = (formData) => {
  if (isEditMode.value) {
    // Update existing tender
    const index = tenders.value.findIndex(t => t.id === currentTenderId.value);
    if (index !== -1) {
      tenders.value[index] = {
        ...tenders.value[index],
        ...formData
      };
    }
  } else {
    // Create new tender
    const newId = `#TE-${25021 + tenders.value.length}`;
    const formattedDate = new Date(formData.deadline).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    tenders.value.unshift({
      id: newId,
      ...formData,
      deadline: formattedDate,
      responses: '0 / 0',
      stage: 'Draft'
    });
  }
  
  // Close the slider after submission
  closeSlider();
};
</script>