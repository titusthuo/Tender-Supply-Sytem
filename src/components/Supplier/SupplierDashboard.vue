<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top navigation bar -->
    <header class="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Supplier Portal</h1>
      <div class="flex items-center space-x-2">
        <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span class="text-blue-500">👤</span>
        </button>
        <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500">?</button>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar navigation -->
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

      <!-- Main content area -->
      <main class="flex-1 p-6 bg-gray-50 border border-gray-200">
        <h2 class="text-2xl font-bold mb-6">Supplier Dashboard</h2>
        
        <!-- Summary cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white border rounded-md p-4">
            <div class="text-gray-600 mb-2">Active Products</div>
            <div class="flex justify-between items-center">
              <div class="text-4xl font-bold">24</div>
              <div class="text-green-500">
                <svg width="40" height="30" viewBox="0 0 40 30" class="text-green-600">
                  <path d="M0,20 L10,15 L20,25 L30,5 L40,10" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white border rounded-md p-4">
            <div class="text-gray-600 mb-2">Available Tenders</div>
            <div class="flex justify-between items-end">
              <div class="text-4xl font-bold">7</div>
              <div class="text-green-600 text-sm">+2 New</div>
            </div>
          </div>
          
          <div class="bg-white border rounded-md p-4">
            <div class="text-gray-600 mb-2">Pending Orders</div>
            <div class="flex justify-between items-end">
              <div class="text-4xl font-bold">3</div>
              <div class="text-orange-500 text-sm">1 Urgent</div>
            </div>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="mb-8">
          <h3 class="text-xl font-bold mb-4">Recent Activity</h3>
          
          <div class="bg-white border border-blue-300 rounded-md overflow-hidden">
            <div class="bg-blue-100 text-blue-800 py-2 px-4 border-b grid grid-cols-4">
              <div>Type</div>
              <div>Item</div>
              <div>Date</div>
              <div>Status</div>
            </div>
            <div class="divide-y">
              <div class="grid grid-cols-4 py-3 px-4">
                <div>Tender</div>
                <div>Office Supplies Q2</div>
                <div>Mar 10, 2025</div>
                <div>
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Open</span>
                </div>
              </div>
              <div class="grid grid-cols-4 py-3 px-4">
                <div>Product</div>
                <div>HP LaserJet Printer</div>
                <div>Mar 9, 2025</div>
                <div>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Updated</span>
                </div>
              </div>
              <div class="grid grid-cols-4 py-3 px-4">
                <div>Order</div>
                <div>Order #4592 - Acme Inc.</div>
                <div>Mar 8, 2025</div>
                <div>
                  <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="mb-8">
          <h3 class="text-xl font-bold mb-4">Quick Actions</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Add Product</button>
            <button class="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">View Tenders</button>
            <button class="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">View Orders</button>
          </div>
        </div>
        
        <!-- Alerts & Notifications -->
        <div>
          <h3 class="text-xl font-bold mb-4">Alerts & Notifications</h3>
          
          <div class="bg-green-100 border border-green-200 rounded-md p-4 flex justify-between items-center">
            <div>
              <div class="font-semibold text-green-800">New Tender Opportunity</div>
              <div class="text-green-700">A new tender matching your product categories is available. Deadline: March 20, 2025</div>
            </div>
            <button class="bg-green-600 text-white py-2 px-4 rounded-md text-sm">View Now</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>c

<script>
export default {
  name: 'SupplierDashboard',
  data() {
    return {
      // Data would be added here for a real application
    }
  }
}
</script>
