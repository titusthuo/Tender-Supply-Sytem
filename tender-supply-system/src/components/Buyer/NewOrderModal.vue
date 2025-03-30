<template>
  <div class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center border-b border-gray-200 p-4 sm:p-6">
        <h2 class="text-lg sm:text-xl font-bold">Create New Order</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="submitOrder" class="p-4 sm:p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium mb-4">Order Information</h3>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Order Type</label>
              <select v-model="orderForm.type" class="w-full border border-gray-300 rounded-md p-2">
                <option value="standard">Standard Order</option>
                <option value="rush">Rush Order</option>
                <option value="scheduled">Scheduled Order</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Supplier</label>
              <select v-model="orderForm.supplier" class="w-full border border-gray-300 rounded-md p-2">
                <option value="techsupplies">TechSupplies Inc.</option>
                <option value="officesolutions">Office Solutions Ltd.</option>
                <option value="globallogistics">Global Logistics Co.</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Payment Terms</label>
              <select v-model="orderForm.paymentTerms" class="w-full border border-gray-300 rounded-md p-2">
                <option value="net30">Net 30</option>
                <option value="net60">Net 60</option>
                <option value="net90">Net 90</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Expected Delivery Date</label>
              <input 
                type="date" 
                v-model="orderForm.deliveryDate" 
                class="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-4">Items</h3>
            
            <div v-for="(item, index) in orderForm.items" :key="index" class="mb-4 p-3 border border-gray-200 rounded-md">
              <div class="flex flex-wrap justify-between mb-2">
                <h4 class="font-medium">Item #{{ index + 1 }}</h4>
                <button 
                  type="button" 
                  @click="removeItem(index)" 
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div class="mb-2">
                <label class="block text-gray-700 text-sm font-medium mb-1">Product/Service</label>
                <select v-model="item.product" class="w-full border border-gray-300 rounded-md p-2 text-sm">
                  <option value="">Select product or service</option>
                  <option value="laptop">Laptop</option>
                  <option value="monitor">Monitor</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="officesupplies">Office Supplies Bundle</option>
                </select>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">Quantity</label>
                  <input 
                    type="number" 
                    v-model.number="item.quantity" 
                    min="1" 
                    class="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-1">Price per Unit</label>
                  <input 
                    type="number" 
                    v-model.number="item.price" 
                    step="0.01" 
                    min="0" 
                    class="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>
              </div>
              
              <div class="mt-2 text-right text-sm">
                <span class="font-medium">Subtotal: ${{ (item.quantity * item.price).toFixed(2) }}</span>
              </div>
            </div>
            
            <button 
              type="button" 
              @click="addItem" 
              class="w-full py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
            >
              + Add Another Item
            </button>
            
            <div class="mt-4 p-3 bg-gray-50 rounded-md">
              <div class="flex justify-between text-lg font-medium">
                <span>Total:</span>
                <span>${{ calculateTotal().toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  <script>
  export default {
    name: 'NewOrderModal',
    emits: ['close', 'submit'],
    data() {
      return {
        orderForm: {
          type: 'standard',
          supplier: '',
          paymentTerms: 'net30',
          deliveryDate: '',
          items: [
            {
              product: '',
              quantity: 1,
              price: 0
            }
          ]
        }
      };
    },
    methods: {
      addItem() {
        this.orderForm.items.push({
          product: '',
          quantity: 1,
          price: 0
        });
      },
      removeItem(index) {
        if (this.orderForm.items.length > 1) {
          this.orderForm.items.splice(index, 1);
        }
      },
      calculateTotal() {
        return this.orderForm.items.reduce((total, item) => {
          return total + (item.quantity * item.price);
        }, 0);
      },
      submitOrder() {
        const orderData = {
          ...this.orderForm,
          total: this.calculateTotal(),
          orderDate: new Date().toISOString().split('T')[0],
          orderNumber: `PO-${Math.floor(1000 + Math.random() * 9000)}`
        };
        
        this.$emit('submit', orderData);
      }
    },
    created() {
      // Set default delivery date to 14 days from now
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 14);
      this.orderForm.deliveryDate = futureDate.toISOString().split('T')[0];
    }
  };
  </script>