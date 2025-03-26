<template>
    <div class="container mx-auto p-4">
      <!-- Navigation Breadcrumb -->
      <div class="mb-4 text-sm text-gray-600">
        <a href="/tenders" class="hover:text-blue-600">Tenders</a> / 
        <span>{{ tender.title }}</span>
      </div>
  
      <!-- Tender Header -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{{ tender.title }}</h1>
            <p class="text-gray-500">Tender ID: {{ tender.id }}</p>
          </div>
          
          <div class="flex space-x-2">
            <button 
              class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
            <button 
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
  
        <!-- Status and Timeline -->
        <div class="mb-6">
          <span 
            :class="getStageClass(tender.stage)"
            class="px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ tender.stage }}
          </span>
        </div>
  
        <!-- Timeline -->
        <div class="relative mt-6">
          <div class="absolute left-0 top-2 w-full h-1 bg-gray-200"></div>
          <div class="flex justify-between relative z-10">
            <div 
              v-for="(milestone, index) in milestones" 
              :key="index" 
              class="flex flex-col items-center"
            >
              <div 
                :class="[
                  'w-4 h-4 rounded-full',
                  milestone.completed ? 'bg-blue-500' : 'bg-gray-300'
                ]"
              ></div>
              <span class="text-xs text-gray-600 mt-2">
                {{ milestone.label }}
              </span>
              <span class="text-xs text-gray-400">
                {{ milestone.date }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Tender Details Section -->
      <div class="grid md:grid-cols-2 gap-6 mt-6">
        <!-- Left Column -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Tender Information</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Department:</span>
              <span class="font-medium">{{ tender.department }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Budget:</span>
              <span class="font-medium">{{ tender.budget }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Procurement Type:</span>
              <span class="font-medium">{{ tender.type }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Bid Submission:</span>
              <span class="font-medium">Electronic Only</span>
            </div>
          </div>
        </div>
  
        <!-- Right Column -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Additional Details</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Expected Delivery:</span>
              <span class="font-medium">{{ tender.deadline }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Location:</span>
              <span class="font-medium">Regional Network</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Evaluation Method:</span>
              <span class="font-medium">Technical & Financial</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Contact:</span>
              <span class="font-medium text-blue-600">procurement@hospital.org</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Description Section -->
      <div class="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Description</h2>
        <p class="text-gray-600">{{ tender.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const tender = ref({
    id: '#TE-25021',
    title: 'IT Equipment Tender',
    description: 'Procurement of IT equipment including laptops, monitors, and peripherals for department-wide upgrade.',
    department: 'IT Department',
    stage: 'RFP',
    type: 'Open Tender',
    budget: '$100,000 - $150,000',
    deadline: '2025-04-15'
  })
  
  const milestones = ref([
    { label: 'Published', date: 'Mar 10', completed: true },
    { label: 'Clarification', date: 'Mar 20', completed: true },
    { label: 'Today', date: 'Mar 24', completed: true },
    { label: 'Bids Due', date: 'Apr 05', completed: false },
    { label: 'Award', date: 'Apr 15', completed: false }
  ])
  
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
  
  // In a real application, you would fetch the tender details based on the route parameter
  onMounted(() => {
    // Simulating fetching tender details
    const tenderId = route.params.id
    // Fetch tender details from API using tenderId
  })
  </script>