<template>
  <div v-if="contract" class="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Header Section -->
        <div class="bg-blue-600 text-white p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold">{{ contract.title }}</h1>
            <p class="text-blue-100 text-sm sm:text-base">{{ contract.id }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-2 sm:gap-4">
            <span 
              :class="{
                'bg-green-500': contract.status === 'Active',
                'bg-yellow-500': contract.status === 'Renewal'
              }" 
              class="px-3 py-1 rounded-full text-xs sm:text-sm"
            >
              {{ contract.status }}
            </span>
            <router-link 
              to="/contracts"
              class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors text-sm"
            >
              Back to Contracts
            </router-link>
          </div>
        </div>

        <!-- Contract Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
          <!-- Contract Information Card -->
          <div class="bg-gray-50 rounded-lg p-3 sm:p-5 border">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Contract Information</h2>
            <div class="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Supplier:</span>
                <span class="font-medium">{{ contract.supplier }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Contract Type:</span>
                <span class="font-medium capitalize">{{ contract.type }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Total Contract Value:</span>
                <span class="font-medium">{{ contract.totalValue }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Start Date:</span>
                <span class="font-medium">{{ contract.startDate }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Expiry Date:</span>
                <span class="font-medium">{{ contract.expiryDate }}</span>
              </div>
            </div>
          </div>

          <!-- Supplier Contact Card -->
          <div class="bg-gray-50 rounded-lg p-3 sm:p-5 border">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Supplier Contact</h2>
            <div class="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Contact Person:</span>
                <span class="font-medium">{{ contract.contactPerson }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Contact Email:</span>
                <span class="font-medium text-blue-600 break-all">{{ contract.contactEmail }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <span class="text-gray-600 font-medium sm:font-normal">Payment Terms:</span>
                <span class="font-medium">{{ contract.paymentTerms }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="p-3 sm:p-4 md:p-6 bg-white border-t">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Contract Description</h2>
          <p class="text-gray-600 text-sm sm:text-base">{{ contract.description }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="p-3 sm:p-4 md:p-6 bg-gray-50 flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
          <button 
            v-if="contract.status === 'Active'"
            class="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Manage Contract
          </button>
          <button 
            v-if="contract.status === 'Renewal'"
            class="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Renew Contract
          </button>
          <button 
            class="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
          >
            Cancel Contract
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="text-center">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Contract Not Found</h2>
      <router-link 
        to="/contracts" 
        class="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
      >
        Back to Contracts
      </router-link>
    </div>
  </div>
</template>
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'ContractDetails',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const contract = ref(null);
  
      // Sample contracts (in a real app, this would come from an API)
      const contracts = [
        {
          id: 'CT-2025-001',
          title: 'Office Supplies Agreement',
          supplier: 'Office Solutions Inc.',
          supplierValue: 'officesolutions',
          status: 'Active',
          expiryDate: 'Dec 31, 2025',
          type: 'goods',
          description: 'Comprehensive office supplies procurement contract for all office equipment and consumables. Includes annual review and volume-based pricing.',
          totalValue: '$75,000',
          startDate: 'Jan 1, 2023',
          paymentTerms: 'Net 30 Days',
          contactPerson: 'John Smith',
          contactEmail: 'john.smith@officesolutions.com'
        },
        // Add other contracts here...
      ];
  
      onMounted(() => {
        // Find the contract based on the route parameter
        const foundContract = contracts.find(c => c.id.replace('#', '') === route.params.id);
        
        if (foundContract) {
          contract.value = foundContract;
        } else {
          // Redirect to contracts page if no contract is found
          router.push('/contractManagement');
        }
      });
  
      return {
        contract
      };
    }
  };
  </script>