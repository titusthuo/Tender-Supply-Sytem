<!-- TenderManagement.vue -->
<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Tender Management</h1>
      <button 
        @click="openCreateTender" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Create New Tender
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="mb-4 flex justify-between items-center">
      <div class="flex space-x-2">
        <select 
          v-model="selectedStage" 
          class="border rounded px-2 py-1"
        >
          <option value="">All Stages</option>
          <option v-for="stage in stages" :key="stage" :value="stage">
            {{ stage }}
          </option>
        </select>
        <select 
          v-model="selectedDepartment" 
          class="border rounded px-2 py-1"
        >
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
      </div>
      
      <div class="relative">
        <input 
          v-model="searchQuery" 
          placeholder="Search tenders..." 
          class="border rounded px-3 py-2 pl-8 w-64"
          @input="performSearch"
        />
        <span class="absolute left-2 top-3 text-gray-400">🔍</span>
      </div>
    </div>

    <!-- Tenders Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-100">
          <tr>
            <th @click="sortBy('id')" class="px-4 py-2 text-left cursor-pointer">
              Tender ID ↕
            </th>
            <th @click="sortBy('title')" class="px-4 py-2 text-left cursor-pointer">
              Title ↕
            </th>
            <th @click="sortBy('department')" class="px-4 py-2 text-left cursor-pointer">
              Department ↕
            </th>
            <th @click="sortBy('stage')" class="px-4 py-2 text-left cursor-pointer">
              Stage ↕
            </th>
            <th @click="sortBy('deadline')" class="px-4 py-2 text-left cursor-pointer">
              Deadline ↕
            </th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="tender in filteredAndSortedTenders" 
            :key="tender.id" 
          >
          <td class="px-4 py-2">
          <button 
            @click="viewTenderDetails(tender)" 
            class="text-blue-600 hover:underline hover:text-blue-800 font-medium"
          >
            {{ tender.id }}
          </button>
        </td>
            <td class="px-4 py-2">
              <div>{{ tender.title }}</div>
              <small class="text-gray-500">{{ tender.description }}</small>
            </td>
            <td class="px-4 py-2">{{ tender.department }}</td>
            <td class="px-4 py-2">
              <span 
                :class="getStageClass(tender.stage)" 
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ tender.stage }}
              </span>
            </td>
            <td class="px-4 py-2">{{ tender.deadline }}</td>
            <td class="px-4 py-2">
              <button 
                @click="manageTender(tender)" 
                class="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
              >
                {{ tender.stage === 'Closed' ? 'View' : 'Manage' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tender Slider -->
    <TenderSlider 
      :tender="currentTender"
      :is-open="isTenderSliderOpen"
      @close="closeTenderSlider"
      @save="saveTender"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TenderSlider from '@/components/Buyer/TenderSlider.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const viewTenderDetails = (tender) => {
  router.push({ name: 'TenderDetails', params: { id: tender.id } })
}

// Initialize tenders with some sample data
const tenders = ref([
  {
    id: '#TE-25021',
    title: 'IT Equipment Tender',
    description: 'Laptops, monitors, peripherals',
    department: 'IT Department',
    stage: 'RFP',
    deadline: '2025-04-15',
    type: 'RFP'
  }
])

const stages = ['Draft', 'RFI', 'RFP', 'Evaluation', 'Closed']
const departments = ['IT Department', 'Operations', 'Finance', 'Procurement']

const searchQuery = ref('')
const selectedStage = ref('')
const selectedDepartment = ref('')
const sortKey = ref('id')
const sortDirection = ref('asc')
const isTenderSliderOpen = ref(false)
const currentTender = ref(null)

// Perform search function
const performSearch = () => {
  // This method is just to trigger the computed property
  // No additional logic needed as the computed property handles filtering
}

const openCreateTender = () => {
  currentTender.value = {
    title: '',
    description: '',
    department: '',
    stage: 'Draft',
    deadline: '',
    type: ''
  }
  isTenderSliderOpen.value = true
}

const manageTender = (tender) => {
  currentTender.value = { ...tender }
  isTenderSliderOpen.value = true
}

const closeTenderSlider = () => {
  isTenderSliderOpen.value = false
  currentTender.value = null
}

const saveTender = (updatedTender) => {
  const index = tenders.value.findIndex(t => t.id === updatedTender.id)
  if (index !== -1) {
    // Update existing tender
    tenders.value[index] = { ...updatedTender }
  } else {
    // Add new tender at the beginning of the array
    tenders.value.unshift({ ...updatedTender })
  }
  closeTenderSlider()
}

// Stage badge coloring method
const getStageClass = (stage) => {
  const stageColors = {
    'Draft': 'bg-gray-100 text-gray-800',
    'RFI': 'bg-blue-100 text-blue-800',
    'RFP': 'bg-green-100 text-green-800',
    'Evaluation': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-red-100 text-red-800'
  }
  return stageColors[stage] || 'bg-gray-100 text-gray-800'
}

// Sorting method
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

// Computed property for filtered and sorted tenders
const filteredAndSortedTenders = computed(() => {
  return tenders.value
    .filter(tender => 
      (!searchQuery.value || 
        tender.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        tender.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        tender.id.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!selectedStage.value || tender.stage === selectedStage.value) &&
      (!selectedDepartment.value || tender.department === selectedDepartment.value)
    )
    .sort((a, b) => {
      const modifier = sortDirection.value === 'asc' ? 1 : -1
      return a[sortKey.value] > b[sortKey.value] ? modifier : -modifier
    })
})
</script>