<template>
  <div class="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
    <div class="bg-white rounded-lg shadow-md">
      <!-- Header and Search/Filter Section -->
      <div class="p-3 sm:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Contract Management</h2>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center w-full sm:w-auto">
          <!-- Search Input -->
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search contracts..." 
            class="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-64"
          />
          
          <!-- Status Filter -->
          <select 
            v-model="statusFilter" 
            class="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto mt-2 sm:mt-0"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Renewal">Renewal</option>
          </select>

          <!-- Add Contract Button -->
          <button 
            @click="openNewContractModal" 
            class="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors w-full sm:w-auto mt-2 sm:mt-0"
          >
            + Add Contract
          </button>
        </div>
      </div>

      <!-- Contracts Table for Desktop/Tablet -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract ID</th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Title</th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="contract in filteredContracts" 
              :key="contract.id" 
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-3 py-3 whitespace-nowrap">
                <button 
                  @click="viewContractDetails(contract)"
                  class="text-blue-600 hover:underline hover:text-blue-800 font-medium text-left"
                >
                  {{ contract.id }}
                </button>
              </td>
              <td class="px-3 py-3">{{ contract.title }}</td>
              <td class="px-3 py-3">{{ contract.supplier }}</td>
              <td class="px-3 py-3">
                <span 
                  :class="{
                    'bg-green-100 text-green-800': contract.status === 'Active',
                    'bg-yellow-100 text-yellow-800': contract.status === 'Renewal'
                  }" 
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ contract.status }}
                </span>
              </td>
              <td class="px-3 py-3">{{ contract.expiryDate }}</td>
              <td class="px-3 py-3">
                <button 
                  v-if="contract.status === 'Active'"
                  @click="openViewContractModal(contract)" 
                  class="bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm mr-2"
                >
                  View
                </button>
                <button 
                  v-else-if="contract.status === 'Renewal'"
                  @click="openRenewContractModal(contract)" 
                  class="bg-orange-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
                >
                  Renew
                </button>
              </td>
            </tr>
            <tr v-if="filteredContracts.length === 0">
              <td colspan="6" class="text-center py-4 text-gray-500">
                No contracts found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="sm:hidden">
        <div 
          v-for="contract in filteredContracts" 
          :key="contract.id"
          class="border-b p-3"
        >
          <div class="flex justify-between items-center mb-2">
            <button 
              @click="viewContractDetails(contract)"
              class="text-blue-600 hover:underline hover:text-blue-800 font-medium text-left"
            >
              {{ contract.id }}
            </button>
            <span 
              :class="{
                'bg-green-100 text-green-800': contract.status === 'Active',
                'bg-yellow-100 text-yellow-800': contract.status === 'Renewal'
              }" 
              class="px-2 py-1 rounded-full text-xs"
            >
              {{ contract.status }}
            </span>
          </div>
          
          <div class="space-y-1 text-sm">
            <div><span class="font-medium">Title:</span> {{ contract.title }}</div>
            <div><span class="font-medium">Supplier:</span> {{ contract.supplier }}</div>
            <div><span class="font-medium">Expiry:</span> {{ contract.expiryDate }}</div>
          </div>
          
          <div class="mt-3">
            <button 
              v-if="contract.status === 'Active'"
              @click="openViewContractModal(contract)" 
              class="bg-blue-600 text-white px-3 py-1 rounded-md text-xs w-full"
            >
              View
            </button>
            <button 
              v-else-if="contract.status === 'Renewal'"
              @click="openRenewContractModal(contract)" 
              class="bg-orange-500 text-white px-3 py-1 rounded-md text-xs w-full"
            >
              Renew
            </button>
          </div>
        </div>
        
        <div v-if="filteredContracts.length === 0" class="text-center py-4 text-gray-500">
          No contracts found
        </div>
      </div>
    </div>

    <!-- Contract Modal (Create/View/Renew) -->
    <ContractModal 
      :isOpen="showContractModal" 
      :modalMode="modalMode"
      :contractData="selectedContract"
      @close="showContractModal = false"
      @submit="handleContractSubmit"
    />
  </div>
</template>
<script>
import { ref, reactive, computed } from 'vue';
import ContractModal from '@/components/Buyer/ContractModal.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ContractManagement',
  components: {
    ContractModal
  },
  setup() {
    const router = useRouter();

    const showContractModal = ref(false);
    const modalMode = ref('create');
    const selectedContract = ref(null);
    const searchQuery = ref('');
    const statusFilter = ref('');
    
    // Reactive array of contracts
    const contracts = reactive([
      {
        id: '#CT-2025-001',
        title: 'Office Supplies Agreement',
        supplier: 'Office Solutions Inc.',
        supplierValue: 'officesolutions',
        status: 'Active',
        expiryDate: 'Dec 31, 2025',
        type: 'goods'
      },
      {
        id: '#CT-2024-023',
        title: 'IT Support Services',
        supplier: 'TechGuard Security',
        supplierValue: 'techguard',
        status: 'Renewal',
        expiryDate: 'Apr 15, 2025',
        type: 'service'
      },
      {
        id: '#CT-2025-008',
        title: 'Legal Consulting Services',
        supplier: 'Hamilton & Partners LLP',
        supplierValue: 'hamilton',
        status: 'Active',
        expiryDate: 'Jul 22, 2025',
        type: 'service'
      },
      {
        id: '#CT-2024-045',
        title: 'Facilities Maintenance',
        supplier: 'BuildRight Services',
        supplierValue: 'buildright',
        status: 'Renewal',
        expiryDate: 'May 10, 2025',
        type: 'service'
      }
    ]);

    // Computed property for filtered contracts
    const filteredContracts = computed(() => {
      return contracts.filter(contract => {
        const matchesSearch = contract.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                               contract.supplier.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                               contract.id.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesStatus = !statusFilter.value || contract.status === statusFilter.value;
        
        return matchesSearch && matchesStatus;
      });
    });
    
    const viewContractDetails = (contract) => {
      router.push({ 
        name: 'ContractDetails', 
        params: { id: contract.id.replace('#', '') } 
      });
    };

    // Open modal for new contract
    const openNewContractModal = () => {
      modalMode.value = 'create';
      selectedContract.value = null;
      showContractModal.value = true;
    };
    
    // Open modal for viewing contract details
    const openViewContractModal = (contract) => {
      modalMode.value = 'view';
      selectedContract.value = {
        title: contract.title,
        type: contract.type,
        supplier: contract.supplierValue,
        id: contract.id,
        expiryDate: contract.expiryDate
      };
      showContractModal.value = true;
    };
    
    // Open modal for renewing contract
    const openRenewContractModal = (contract) => {
      modalMode.value = 'renew';
      selectedContract.value = {
        title: contract.title,
        type: contract.type,
        supplier: contract.supplierValue,
        id: contract.id,
        expiryDate: contract.expiryDate
      };
      showContractModal.value = true;
    };
    
    const handleContractSubmit = (formData) => {
      if (modalMode.value === 'create') {
        // Generate a new contract ID 
        const newContractId = `#CT-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`;
        
        // Create a new contract object
        const newContract = {
          id: newContractId,
          title: formData.title,
          supplier: formData.supplier,
          supplierValue: formData.supplierValue,
          status: 'Active', // Default to Active for new contracts
          expiryDate: formData.expiryDate,
          type: formData.type
        };

        // Add the new contract to the contracts array
        contracts.push(newContract);
        
        console.log('New contract added:', newContract);
      } else if (modalMode.value === 'view') {
        // Find and update the existing contract
        const index = contracts.findIndex(c => c.id === formData.id);
        if (index !== -1) {
          contracts[index] = { ...contracts[index], ...formData };
          console.log('Contract updated:', contracts[index]);
        }
      } else if (modalMode.value === 'renew') {
        // Find the contract to renew
        const index = contracts.findIndex(c => c.id === formData.id);
        if (index !== -1) {
          // Update the contract status and expiry date
          contracts[index].status = 'Active';
          contracts[index].expiryDate = formData.expiryDate;
          console.log('Contract renewed:', contracts[index]);
        }
      }
      
      // Close the modal
      showContractModal.value = false;
    };

    return {
      showContractModal,
      modalMode,
      selectedContract,
      contracts,
      searchQuery,
      statusFilter,
      filteredContracts,
      openNewContractModal,
      openViewContractModal,
      openRenewContractModal,
      handleContractSubmit,
      viewContractDetails
    };
  }
};
</script>