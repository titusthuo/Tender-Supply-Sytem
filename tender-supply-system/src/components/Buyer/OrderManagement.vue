<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <h1 class="text-xl font-bold">Buyer Portal</h1>
      <div class="flex items-center space-x-2">
        <button class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white">?</span>
        </button>
        <button class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
          <span class="text-white">!</span>
        </button>
        <button class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white">JP</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 relative">
      <!-- Sidebar Navigation -->
      <div class="w-24 bg-white border-r border-gray-200">
        <nav class="flex flex-col py-4">
          <router-link to="/buyers" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Dashboard</span>
            </div>
          </router-link>
          <router-link to="/tenders" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Tenders</span>
            </div>
          </router-link>
          <router-link to="/supplierManagement" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Suppliers</span>
            </div>
          </router-link>
          <router-link to="/contractManagement" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Contracts</span>
            </div>
          </router-link>
          <router-link to="/orderManagement" class="py-3 px-4 bg-blue-50 text-blue-500 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Orders</span>
            </div>
          </router-link>
          <router-link to="/reports" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Reports</span>
            </div>
          </router-link>
          <router-link to="/collaboration" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Collaboration</span>
            </div>
          </router-link>
          <router-link to="/settings" class="py-3 px-4 text-gray-500 hover:bg-blue-50 text-center text-sm">
            <div class="flex flex-col items-center">
              <span>Settings</span>
            </div>
          </router-link>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="flex-1 p-6 bg-gray-50">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Order Management</h2>
          <button 
            class="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center space-x-1"
            @click="showNewOrderModal = true"
          >
            <span class="text-lg">+</span>
            <span>Create New Order</span>
          </button>
        </div>

        <!-- Alert section -->
        <div class="bg-red-100 border border-red-200 rounded-md p-4 mb-6 flex justify-between items-center">
          <div class="flex items-center">
            <span class="text-red-500 mr-2">⚠</span>
            <span class="text-red-800">2 orders require attention - 1 delayed delivery and 1 invoice discrepancy</span>
          </div>
          <button 
            class="px-3 py-1 bg-red-500 text-white rounded-md text-sm" 
            @click="openResolveSlider('PO-5330', 'delayed')"
          >
            Resolve
          </button>
        </div>

        <!-- Filters section -->
        <div class="mb-6">
          <div class="text-sm text-gray-600 mb-2">Filters:</div>
          <div class="flex space-x-4 mb-4">
            <div class="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <span class="text-blue-800">Status</span>
              <span class="ml-1 text-blue-800">▼</span>
            </div>
            <div class="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <span class="text-blue-800">Supplier</span>
              <span class="ml-1 text-blue-800">▼</span>
            </div>
            <div class="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <span class="text-blue-800">Date Range</span>
              <span class="ml-1 text-blue-800">▼</span>
            </div>
            <div class="flex-grow">
              <input 
                type="text" 
                placeholder="Search orders..." 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <!-- Tab filters -->
          <div class="flex border-b border-gray-200">
            <button class="py-2 px-6 bg-blue-100 text-blue-800 rounded-t-md font-medium">
              All ({{ orders.length }})
            </button>
            <button class="py-2 px-6 text-gray-600 hover:bg-gray-100">
              Pending ({{ countOrdersByStatus('Pending') }})
            </button>
            <button class="py-2 px-6 text-gray-600 hover:bg-gray-100">
              In Transit ({{ countOrdersByStatus('In Transit') }})
            </button>
            <button class="py-2 px-6 text-gray-600 hover:bg-gray-100">
              Delivered ({{ countOrdersByStatus('Delivered') }})
            </button>
            <button class="py-2 px-6 text-gray-600 hover:bg-gray-100">
              Issues ({{ countOrdersWithIssues() }})
            </button>
          </div>
        </div>

        <!-- Orders table -->
        <div class="bg-white rounded-md shadow overflow-hidden mb-6">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 text-left">
                <th class="py-3 px-4 text-gray-600 font-medium">Order ID</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Items</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Supplier</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Status</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Amount</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Order Date</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Delivery</th>
                <th class="py-3 px-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id" class="border-t border-gray-200" :class="{'bg-blue-50': order.isNew}">
                <td class="py-4 px-4">#{{ order.id }}</td>
                <td class="py-4 px-4">
                  <div>{{ order.itemDescription }}</div>
                  <div class="text-gray-500 text-sm">{{ order.itemCount }} items</div>
                </td>
                <td class="py-4 px-4">{{ order.supplier }}</td>
                <td class="py-4 px-4">
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-md text-sm">{{ order.status }}</span>
                </td>
                <td class="py-4 px-4">${{ order.amount.toLocaleString() }}</td>
                <td class="py-4 px-4">{{ formatDate(order.orderDate) }}</td>
                <td class="py-4 px-4">{{ formatDate(order.deliveryDate) }}</td>
                <td class="py-4 px-4">
                  <div class="flex space-x-2">
                    <button 
                      v-if="order.hasIssue"
                      class="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                      @click="openResolveSlider(order.id, order.issueType)"
                    >Resolve</button>
                    <button 
                      class="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                      @click="openTrackSlider(order.id)"
                    >Track</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- New Order Modal -->
    <NewOrderModal
      v-if="showNewOrderModal"
      @close="showNewOrderModal = false"
      @submit="handleNewOrderSubmit"
    />

    <!-- Track Order Slider -->
    <TrackOrderSlider 
      :is-open="trackSliderOpen" 
      :order-id="selectedOrderId"
      @close="closeTrackSlider"
    />
    
    <!-- Resolve Issue Slider -->
    <ResolveIssueSlider
      :is-open="resolveSliderOpen"
      :order-id="selectedOrderId"
      :issue-type="selectedIssueType"
      @close="closeResolveSlider"
      @resolved="handleIssueResolved"
    />
  </div>
</template>

<script>
import TrackOrderSlider from './TrackOrderSlider.vue';
import ResolveIssueSlider from './ResolveIssueSlider.vue';
import NewOrderModal from './NewOrderModal.vue'; // Import the NewOrderModal component

export default {
  name: 'OrderManagement',
  components: {
    TrackOrderSlider,
    ResolveIssueSlider,
    NewOrderModal // Register the component
  },
  data() {
    return {
      showNewOrderModal: false,
      trackSliderOpen: false,
      resolveSliderOpen: false,
      selectedOrderId: '',
      selectedIssueType: 'delayed', // 'delayed' or 'invoice'
      orders: [
        {
          id: 'PO-5328',
          itemDescription: 'IT Hardware Bundle',
          itemCount: 12,
          supplier: 'TechSupplies Inc.',
          status: 'In Transit',
          amount: 12450,
          orderDate: '2025-03-01',
          deliveryDate: '2025-03-15',
          hasIssue: false,
          isNew: false
        },
        {
          id: 'PO-5329',
          itemDescription: 'Office Furniture',
          itemCount: 8,
          supplier: 'Modern Office Ltd.',
          status: 'Delivered',
          amount: 8750,
          orderDate: '2025-02-25',
          deliveryDate: '2025-03-10',
          hasIssue: false,
          isNew: false
        },
        {
          id: 'PO-5330',
          itemDescription: 'Office Supplies',
          itemCount: 42,
          supplier: 'Office Solutions Ltd.',
          status: 'Delayed',
          amount: 3850,
          orderDate: '2025-03-01',
          deliveryDate: '2025-03-12',
          hasIssue: true,
          issueType: 'delayed',
          isNew: false
        },
        {
          id: 'PO-5331',
          itemDescription: 'Software Licenses',
          itemCount: 25,
          supplier: 'DigiTech Solutions',
          status: 'Invoice Issue',
          amount: 4120,
          orderDate: '2025-03-02',
          deliveryDate: '2025-03-03',
          hasIssue: true,
          issueType: 'invoice',
          isNew: false
        }
      ]
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    getStatusClass(status) {
      const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'In Transit': 'bg-blue-100 text-blue-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Delayed': 'bg-red-100 text-red-800',
        'Invoice Issue': 'bg-red-100 text-red-800',
        'Processing': 'bg-purple-100 text-purple-800'
      };
      return statusClasses[status] || 'bg-gray-100 text-gray-800';
    },
    countOrdersByStatus(status) {
      return this.orders.filter(order => order.status === status).length;
    },
    countOrdersWithIssues() {
      return this.orders.filter(order => order.hasIssue).length;
    },
    openTrackSlider(orderId) {
      this.selectedOrderId = orderId;
      this.trackSliderOpen = true;
    },
    closeTrackSlider() {
      this.trackSliderOpen = false;
    },
    openResolveSlider(orderId, issueType) {
      this.selectedOrderId = orderId;
      this.selectedIssueType = issueType;
      this.resolveSliderOpen = true;
    },
    closeResolveSlider() {
      this.resolveSliderOpen = false;
    },
    handleIssueResolved(resolutionData) {
      console.log('Issue resolved:', resolutionData);
      // Find and update the order with resolved issue
      const orderIndex = this.orders.findIndex(order => order.id === resolutionData.orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].hasIssue = false;
        this.orders[orderIndex].status = 'Processing'; // Or another appropriate status
      }
    },
    handleNewOrderSubmit(orderData) {
      console.log('New order submitted:', orderData);
      
      // Create a new order object from the form data
      const newOrder = {
        id: orderData.orderNumber,
        itemDescription: this.getItemDescriptionFromOrder(orderData),
        itemCount: orderData.items.length,
        supplier: this.getSupplierName(orderData.supplier),
        status: 'Pending',
        amount: orderData.total,
        orderDate: orderData.orderDate,
        deliveryDate: orderData.deliveryDate,
        hasIssue: false,
        isNew: true // Highlight as new
      };
      
      // Add to the beginning of the orders array
      this.orders.unshift(newOrder);
      
      // Close the modal
      this.showNewOrderModal = false;
      
      // Success notification
      this.$nextTick(() => {
        // In a real app, you might use a proper notification system instead of alert
        alert(`Order ${orderData.orderNumber} created successfully!`);
        
        // Remove highlight after a few seconds
        setTimeout(() => {
          const orderIndex = this.orders.findIndex(order => order.id === newOrder.id);
          if (orderIndex !== -1) {
            this.orders[orderIndex].isNew = false;
          }
        }, 5000);
      });
    },
    getItemDescriptionFromOrder(orderData) {
      if (orderData.items.length === 0) return 'No items';
      
      // If there's just one product type
      if (orderData.items.length === 1 || this.allSameProduct(orderData.items)) {
        return this.getProductName(orderData.items[0].product);
      }
      
      // If there are multiple different products
      return 'Multiple Items';
    },
    allSameProduct(items) {
      if (items.length <= 1) return true;
      const firstProduct = items[0].product;
      return items.every(item => item.product === firstProduct);
    },
    getProductName(productCode) {
      const productNames = {
        'laptop': 'Laptop',
        'monitor': 'Monitor',
        'keyboard': 'Keyboard',
        'officesupplies': 'Office Supplies Bundle'
      };
      return productNames[productCode] || 'Unknown Product';
    },
    getSupplierName(supplierCode) {
      const supplierNames = {
        'techsupplies': 'TechSupplies Inc.',
        'officesolutions': 'Office Solutions Ltd.',
        'globallogistics': 'Global Logistics Co.'
      };
      return supplierNames[supplierCode] || supplierCode;
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
@keyframes highlight {
  0% { background-color: rgba(191, 219, 254, 0.8); } /* Light blue highlight */
  100% { background-color: rgba(191, 219, 254, 0); }
}

.bg-blue-50 {
  animation: highlight 2s ease-in-out;
}
</style>