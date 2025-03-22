<script setup>
import { ref, onMounted } from 'vue';

// Mock data for dashboard statistics
const dashboardStats = ref({
  activeTenders: 14,
  tenderChange: 16,
  suppliersEngaged: 43,
  supplierChange: 8,
  openOrders: 8,
  orderChange: -5,
  savings: '12.4%',
  savingsTarget: 3.2
});

// Mock data for spend analysis chart
const spendData = ref([
  { month: 'Jan', actual: 45000, budget: 50000 },
  { month: 'Feb', actual: 52000, budget: 50000 },
  { month: 'Mar', actual: 38000, budget: 50000 },
  { month: 'Apr', actual: 61000, budget: 52000 },
  { month: 'May', actual: 55000, budget: 52000 },
  { month: 'Jun', actual: 67000, budget: 54000 },
  { month: 'Jul', actual: 72000, budget: 56000 },
  { month: 'Aug', actual: 76000, budget: 58000 }
]);

// Mock data for supplier performance
const supplierPerformance = ref([
  { name: 'TechSupplies Inc.', score: 80 },
  { name: 'Office Solutions Ltd.', score: 90 },
  { name: 'Global Logistics Co.', score: 70 },
  { name: 'ConsultingPros Group', score: 85 }
]);

// Mock data for recent activity
const recentActivity = ref([
  {
    date: 'Mar 10, 2025',
    activity: 'IT Equipment Tender Published',
    department: 'IT Department',
    status: 'Active'
  },
  {
    date: 'Mar 9, 2025',
    activity: 'Office Supplies Order Placed',
    department: 'Operations',
    status: 'Pending'
  }
]);

// Date period options
const periods = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];
const selectedPeriod = ref('Last 30 Days');

// Welcome message state
const showWelcome = ref(true);
const userName = ref('John'); // This would normally come from authentication

// Handle welcome message dismissal
const dismissWelcome = () => {
  showWelcome.value = false;
};

onMounted(() => {
  // Simulate API calls to fetch real data
  // In a real application, these would be actual API calls
  
  // Auto-dismiss welcome message after 5 seconds
  setTimeout(() => {
    showWelcome.value = false;
  }, 5000);
});
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Welcome message for new users -->
    <div v-if="showWelcome" class="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md flex justify-between items-center">
      <div>
        <h3 class="font-medium text-blue-800">Welcome to your Buyer Dashboard, {{ userName }}!</h3>
        <p class="text-blue-600">Your account has been successfully created. Start by exploring your dashboard or posting your first tender.</p>
      </div>
      <button @click="dismissWelcome" class="text-blue-500 hover:text-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Dashboard header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div class="relative">
        <div class="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 cursor-pointer">
          <span class="mr-2 text-sm text-gray-700">Period: {{ selectedPeriod }}</span>
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Key performance metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Active Tenders -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Active Tenders</h3>
        <div class="flex justify-between items-end">
          <span class="text-3xl font-bold text-gray-800">{{ dashboardStats.activeTenders }}</span>
          <span class="flex items-center text-sm" :class="dashboardStats.tenderChange >= 0 ? 'text-green-500' : 'text-red-500'">
            <svg v-if="dashboardStats.tenderChange >= 0" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ Math.abs(dashboardStats.tenderChange) }}% vs. last period
          </span>
        </div>
      </div>

      <!-- Suppliers Engaged -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Suppliers Engaged</h3>
        <div class="flex justify-between items-end">
          <span class="text-3xl font-bold text-gray-800">{{ dashboardStats.suppliersEngaged }}</span>
          <span class="flex items-center text-sm" :class="dashboardStats.supplierChange >= 0 ? 'text-green-500' : 'text-red-500'">
            <svg v-if="dashboardStats.supplierChange >= 0" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ Math.abs(dashboardStats.supplierChange) }}% vs. last period
          </span>
        </div>
      </div>

      <!-- Open Orders -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Open Orders</h3>
        <div class="flex justify-between items-end">
          <span class="text-3xl font-bold text-gray-800">{{ dashboardStats.openOrders }}</span>
          <span class="flex items-center text-sm" :class="dashboardStats.orderChange >= 0 ? 'text-green-500' : 'text-red-500'">
            <svg v-if="dashboardStats.orderChange >= 0" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ Math.abs(dashboardStats.orderChange) }}% vs. last period
          </span>
        </div>
      </div>

      <!-- Savings This Month -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-2">Savings This Month</h3>
        <div class="flex justify-between items-end">
          <span class="text-3xl font-bold text-gray-800">{{ dashboardStats.savings }}</span>
          <span class="flex items-center text-sm text-green-500">
            <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            {{ dashboardStats.savingsTarget }}% vs. target
          </span>
        </div>
      </div>
    </div>

    <!-- Spend Analysis and Supplier Performance -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Spend Analysis -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Spend Analysis</h3>
        <div class="flex justify-end space-x-2 mb-4">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span class="text-sm text-gray-600">Actual Spend</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span class="text-sm text-gray-600">Budget</span>
          </div>
        </div>
        <!-- Simulated Chart Area - In a real app, use a charting library -->
        <div class="h-64 w-full">
          <div class="relative h-full">
            <!-- Simplified chart visualization -->
            <div class="absolute inset-0 flex items-end">
              <div v-for="(data, index) in spendData" :key="index" class="flex flex-col items-center flex-1">
                <div class="h-full w-6 flex flex-col justify-end space-y-1">
                  <div 
                    class="w-full bg-blue-500 rounded-t" 
                    :style="{height: `${(data.actual / 80000) * 100}%`}"
                  ></div>
                </div>
                <div class="mt-2 text-xs text-gray-500">{{ data.month }}</div>
              </div>
            </div>
            <!-- Green line for budget (simplified) -->
            <div class="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
                <path 
                  d="M0,40 L12.5,38 L25,40 L37.5,39 L50,37 L62.5,35 L75,33 L87.5,30 L100,28" 
                  stroke="rgb(34, 197, 94)" 
                  stroke-width="0.5" 
                  fill="none" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Supplier Performance -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Top Supplier Performance</h3>
        <div class="space-y-4">
          <div v-for="(supplier, index) in supplierPerformance" :key="index" class="space-y-1">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-700">{{ supplier.name }}</span>
              <span class="text-sm text-gray-500">{{ supplier.score }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full" 
                :style="{ width: `${supplier.score}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-6 pb-3 border-b">
        <h3 class="text-lg font-medium text-gray-800">Recent Activity</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(activity, index) in recentActivity" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ activity.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ activity.activity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ activity.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="activity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ activity.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-blue-600 hover:text-blue-800 font-medium">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="recentActivity.length === 0" class="p-6 text-center text-gray-500">
        No recent activity to display
      </div>
    </div>

    <!-- Quick Actions Button -->
    <div class="fixed bottom-6 right-6">
      <button class="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>
</template>