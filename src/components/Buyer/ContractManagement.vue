<!-- src/components/Buyer/ContractManagement.vue -->
<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 class="text-xl font-medium">Buyer Portal</h1>
        <div class="flex items-center space-x-2">
          <button class="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white">
            ?
          </button>
          <button class="rounded-full bg-amber-500 w-8 h-8 flex items-center justify-center text-white">
            !
          </button>
          <button class="rounded-full bg-blue-800 w-8 h-8 flex items-center justify-center text-white">
            JP
          </button>
        </div>
      </header>
  
      <!-- Sidebar and Main Content -->
      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-24 bg-white shadow-md">
          <nav class="flex flex-col">
            <router-link to="/buyers" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Dashboard</router-link>
            <router-link to="/tenders" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Tenders</router-link>
            <router-link to="/supplierManagement" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Suppliers</router-link>
            <router-link to="/contractManagement" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50 bg-blue-100">Contracts</router-link>
            <a href="#" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Orders</a>
            <a href="#" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Reports</a>
            <a href="#" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Collaboration</a>
            <a href="#" class="py-3 px-4 text-sm text-gray-500 hover:bg-blue-50">Settings</a>
          </nav>
        </aside>
  
        <!-- Main Content -->
        <main class="flex-1 p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Contract Management</h2>
            <button 
              @click="showCreateModal = true" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <span class="mr-1">+</span> Create New Contract
            </button>
          </div>
  
          <!-- Alert Banner -->
          <div class="bg-yellow-100 border border-yellow-200 rounded-md p-4 mb-4">
            <p class="text-yellow-800">
              <span class="font-bold">3 contracts require attention.</span> 2 are due for renewal and 1 expiring within 30 days.
              <button class="bg-orange-500 text-white px-3 py-1 rounded-md ml-4 text-sm">Review</button>
            </p>
          </div>
  
          <!-- Filters -->
          <div class="bg-white p-4 rounded-md shadow-sm mb-4">
            <div class="flex justify-between">
              <div>
                <span class="text-gray-500 mr-2">Filters:</span>
                <button class="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm">
                  All (28)
                </button>
              </div>
              <div>
                <input type="text" placeholder="Search contracts..." class="border border-gray-300 rounded-md px-3 py-1 text-sm" />
              </div>
            </div>
          </div>
  
          <!-- Contracts Table -->
          <div class="bg-white rounded-md shadow-sm overflow-hidden">
            <table class="min-w-full">
              <thead class="bg-gray-100">
                <tr>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Contract ID</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Contract Title</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Supplier</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Expiry Date</th>
                  <th class="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="py-3 px-4">#CT-2025-001</td>
                  <td class="py-3 px-4">Office Supplies Agreement</td>
                  <td class="py-3 px-4">Office Solutions Inc.</td>
                  <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                  <td class="py-3 px-4">Dec 31, 2025</td>
                  <td class="py-3 px-4">
                    <button class="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#CT-2024-023</td>
                  <td class="py-3 px-4">IT Support Services</td>
                  <td class="py-3 px-4">TechGuard Security</td>
                  <td class="py-3 px-4"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Renewal</span></td>
                  <td class="py-3 px-4">Apr 15, 2025</td>
                  <td class="py-3 px-4">
                    <button class="bg-orange-500 text-white px-4 py-1 rounded-md text-sm">Renew</button>
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#CT-2025-008</td>
                  <td class="py-3 px-4">Legal Consulting Services</td>
                  <td class="py-3 px-4">Hamilton & Partners LLP</td>
                  <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                  <td class="py-3 px-4">Jul 22, 2025</td>
                  <td class="py-3 px-4">
                    <button class="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4">#CT-2024-045</td>
                  <td class="py-3 px-4">Facilities Maintenance</td>
                  <td class="py-3 px-4">BuildRight Services</td>
                  <td class="py-3 px-4"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Renewal</span></td>
                  <td class="py-3 px-4">May 10, 2025</td>
                  <td class="py-3 px-4">
                    <button class="bg-orange-500 text-white px-4 py-1 rounded-md text-sm">Renew</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Features Section -->
          <div class="grid grid-cols-4 gap-4 mt-6">
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h3 class="text-blue-600 font-medium mb-1">Contract Templates</h3>
              <p class="text-sm text-gray-500">Create and manage templates</p>
            </div>
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h3 class="text-blue-600 font-medium mb-1">Milestone Tracking</h3>
              <p class="text-sm text-gray-500">Monitor contract deliverables</p>
            </div>
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h3 class="text-blue-600 font-medium mb-1">Digital Signatures</h3>
              <p class="text-sm text-gray-500">Secure document execution</p>
            </div>
            <div class="bg-white p-4 rounded-md shadow-sm">
              <h3 class="text-blue-600 font-medium mb-1">Auto Notifications</h3>
              <p class="text-sm text-gray-500">Renewal and expiry alerts</p>
            </div>
          </div>
        </main>
      </div>
  
      <!-- Create New Contract Modal -->
      <CreateContractModal 
        :isOpen="showCreateModal" 
        @close="showCreateModal = false"
        @submit="handleContractSubmit"
      />

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import CreateContractModal from '@/components/Buyer/CreateContractModal.vue';
  
  export default {
    name: 'ContractManagement',
    components: {
      CreateContractModal
    },
    setup() {
      const showCreateModal = ref(false);
      
      const handleContractSubmit = (formData) => {
        console.log('New contract submitted:', formData);
        // Here you would typically send this data to your backend
      };
  
      return {
        showCreateModal,
        handleContractSubmit
      };
    }
  };
  </script>