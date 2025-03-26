<template>
  <div class="flex flex-col h-screen bg-white">
    <!-- Header -->
    <header class="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 class="text-xl font-bold">Order Management</h1>
      <div class="flex items-center space-x-3">
        <button 
          class="hover:bg-blue-700 p-2 rounded-full transition-colors"
          @click="showHelp = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <div class="h-full flex flex-col p-6 bg-gray-50">
        <!-- Alerts Section -->
        <section v-if="criticalOrders.length" class="mb-4">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-center">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-red-800">
                {{ criticalOrders.length }} order(s) require immediate attention
              </span>
            </div>
            <button 
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              @click="resolveFirstCriticalOrder"
            >
              Resolve First
            </button>
          </div>
        </section>

        <!-- Filters and Search -->
        <section class="mb-4">
          <div class="flex space-x-4 mb-4">
            <div class="flex-grow">
              <input 
                v-model="searchTerm"
                type="text" 
                placeholder="Search orders by ID, supplier, or status..." 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button 
              @click="showNewOrderModal = true"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Order
            </button>
          </div>

          <!-- Status Tabs -->
          <div class="flex border-b border-gray-200 mb-4">
            <button 
              v-for="(label, status) in statusTabs" 
              :key="status"
              @click="activeTab = status"
              :class="[
                'py-2 px-4 font-medium transition-colors',
                activeTab === status 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ label }} ({{ getFilteredOrderCount(status) }})
            </button>
          </div>
        </section>

        <!-- Orders Table -->
        <section class="flex-1 overflow-auto">
          <div class="bg-white rounded-lg shadow-md">
            <table class="w-full">
              <thead class="bg-gray-100 sticky top-0">
                <tr>
                  <th class="py-3 px-4 text-left text-gray-600">Order ID</th>
                  <th class="py-3 px-4 text-left text-gray-600">Items</th>
                  <th class="py-3 px-4 text-left text-gray-600">Supplier</th>
                  <th class="py-3 px-4 text-left text-gray-600">Status</th>
                  <th class="py-3 px-4 text-right text-gray-600">Amount</th>
                  <th class="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="order in filteredOrders" 
                  :key="order.id"
                  class="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4">{{ order.id }}</td>
                  <td class="py-3 px-4">
                    <div>{{ order.itemDescription }}</div>
                    <div class="text-gray-500 text-sm">{{ order.itemCount }} items</div>
                  </td>
                  <td class="py-3 px-4">{{ order.supplier }}</td>
                  <td class="py-3 px-4">
                    <span 
                      :class="getStatusClass(order.status)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">${{ order.amount.toLocaleString() }}</td>
                  <td class="py-3 px-4">
                    <div class="flex space-x-2">
                      <button 
                        v-if="order.hasIssue"
                        @click="openResolveSlider(order.id, order.issueType)"
                        class="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Resolve
                      </button>
                      <button 
                        @click="openTrackSlider(order.id)"
                        class="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Track
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>

    <!-- Modals and Sliders (kept as before) -->
    <NewOrderModal
      v-if="showNewOrderModal"
      @close="showNewOrderModal = false"
      @submit="handleNewOrderSubmit"
    />

    <TrackOrderSlider 
      :is-open="trackSliderOpen" 
      :order-id="selectedOrderId"
      @close="closeTrackSlider"
    />
    
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
import NewOrderModal from './NewOrderModal.vue';

export default {
  name: 'OrderManagement',
  components: {
    TrackOrderSlider,
    ResolveIssueSlider,
    NewOrderModal
  },
  data() {
    return {
      showNewOrderModal: false,
      trackSliderOpen: false,
      resolveSliderOpen: false,
      selectedOrderId: '',
      selectedIssueType: 'delayed',
      searchTerm: '',
      activeTab: 'all',
      statusTabs: {
        all: 'All',
        pending: 'Pending',
        inTransit: 'In Transit',
        delivered: 'Delivered',
        issues: 'Issues'
      },
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
  computed: {
    criticalOrders() {
      return this.orders.filter(order => order.hasIssue);
    },
    filteredOrders() {
      return this.orders.filter(order => {
        const matchesSearch = this.searchTerm ? 
          order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.supplier.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;

        const matchesTab = 
          this.activeTab === 'all' ||
          (this.activeTab === 'pending' && order.status === 'Pending') ||
          (this.activeTab === 'inTransit' && order.status === 'In Transit') ||
          (this.activeTab === 'delivered' && order.status === 'Delivered') ||
          (this.activeTab === 'issues' && order.hasIssue);

        return matchesSearch && matchesTab;
      });
    }
  },
  methods: {
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
    resolveFirstCriticalOrder() {
      if (this.criticalOrders.length > 0) {
        const firstCriticalOrder = this.criticalOrders[0];
        this.openResolveSlider(firstCriticalOrder.id, firstCriticalOrder.issueType);
      }
    },
    getFilteredOrderCount(status) {
      switch(status) {
        case 'all': return this.orders.length;
        case 'pending': return this.orders.filter(o => o.status === 'Pending').length;
        case 'inTransit': return this.orders.filter(o => o.status === 'In Transit').length;
        case 'delivered': return this.orders.filter(o => o.status === 'Delivered').length;
        case 'issues': return this.orders.filter(o => o.hasIssue).length;
        default: return 0;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
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
      const orderIndex = this.orders.findIndex(order => order.id === resolutionData.orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].hasIssue = false;
        this.orders[orderIndex].status = 'Processing';
      }
    },
    handleNewOrderSubmit(orderData) {
      console.log('New order submitted:', orderData);
      
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
        isNew: true
      };
      
      this.orders.unshift(newOrder);
      this.showNewOrderModal = false;
      
      this.$nextTick(() => {
        alert(`Order ${orderData.orderNumber} created successfully!`);
        
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
      
      if (orderData.items.length === 1 || this.allSameProduct(orderData.items)) {
        return this.getProductName(orderData.items[0].product);
      }
      
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
/* Smooth scrolling for table */
tbody {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

/* Custom scrollbar */
tbody {
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.2) transparent;
}

tbody::-webkit-scrollbar {
  width: 8px;
}

tbody::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}
</style>