<template>
  <div>
    <!-- Modal Backdrop -->
    <transition name="fade">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-white bg-opacity-50 z-40"
        @click="close"
      ></div>
    </transition>
    
    <!-- Modal Panel -->
    <transition name="modal">
      <div 
        v-if="show"
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md"
      >
        <div class="p-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Report' : 'Create Custom Report' }}</h2>
            <button 
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
              @click="close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-4">
          <form @submit.prevent="saveReport">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="report-name">
                Report Name
              </label>
              <input
                id="report-name"
                v-model="formData.name"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter report name"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="report-type">
                Report Type
              </label>
              <select
                id="report-type"
                v-model="formData.type"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="Custom">Custom</option>
                <option value="Spend Analytics">Spend Analytics</option>
                <option value="Performance">Supplier Performance</option>
                <option value="Compliance">Compliance</option>
                <option value="Audit">Audit</option>
                <option value="Savings">Savings</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="date-range">
                Date Range
              </label>
              <div class="flex space-x-2">
                <input
                  type="date"
                  v-model="formData.startDate"
                  class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                  type="date"
                  v-model="formData.endDate"
                  class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Export Format
              </label>
              <div class="flex flex-wrap">
                <label class="inline-flex items-center mr-4 mb-2">
                  <input type="checkbox" v-model="formats.pdf" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">PDF</span>
                </label>
                <label class="inline-flex items-center mr-4 mb-2">
                  <input type="checkbox" v-model="formats.xlsx" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">XLSX</span>
                </label>
                <label class="inline-flex items-center mr-4 mb-2">
                  <input type="checkbox" v-model="formats.csv" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">CSV</span>
                </label>
                <label class="inline-flex items-center mb-2">
                  <input type="checkbox" v-model="formats.pptx" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">PPTX</span>
                </label>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Data to Include
              </label>
              <div class="flex flex-wrap">
                <label class="inline-flex items-center w-1/2 mb-2">
                  <input type="checkbox" v-model="dataToInclude.spend" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">Spend Data</span>
                </label>
                <label class="inline-flex items-center w-1/2 mb-2">
                  <input type="checkbox" v-model="dataToInclude.suppliers" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">Suppliers</span>
                </label>
                <label class="inline-flex items-center w-1/2 mb-2">
                  <input type="checkbox" v-model="dataToInclude.categories" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">Categories</span>
                </label>
                <label class="inline-flex items-center w-1/2 mb-2">
                  <input type="checkbox" v-model="dataToInclude.contracts" class="form-checkbox h-5 w-5 text-blue-600">
                  <span class="ml-2 text-gray-700">Contracts</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="close"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {{ isEdit ? 'Update Report' : 'Create Report' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Fade effect for backdrop */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide and fade effect for modal */
.modal-enter-active, .modal-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.modal-enter-from, .modal-leave-to {
  transform: translate(-50%, -55%);
  opacity: 0;
}
</style>

<script>
export default {
  name: 'ReportModal',
  props: {
    report: {
      type: Object,
      default: () => ({
        name: '',
        type: 'Custom',
        format: 'PDF'
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false, // Start with false to enable proper fade-in
      formData: {
        name: '',
        type: 'Custom',
        startDate: '',
        endDate: ''
      },
      formats: {
        pdf: true,
        xlsx: false,
        csv: false,
        pptx: false
      },
      dataToInclude: {
        spend: true,
        suppliers: false,
        categories: true,
        contracts: false
      }
    };
  },
  computed: {
    formattedFormats() {
      const selected = [];
      if (this.formats.pdf) selected.push('PDF');
      if (this.formats.xlsx) selected.push('XLSX');
      if (this.formats.csv) selected.push('CSV');
      if (this.formats.pptx) selected.push('PPTX');
      return selected.join(', ');
    }
  },
  mounted() {
    // Initialize form data first
    if (this.report) {
      this.formData.name = this.report.name || '';
      this.formData.type = this.report.type || 'Custom';
      
      // Parse format string to set checkboxes
      if (this.report.format) {
        const formatList = this.report.format.split(', ');
        this.formats.pdf = formatList.includes('PDF');
        this.formats.xlsx = formatList.includes('XLSX');
        this.formats.csv = formatList.includes('CSV');
        this.formats.pptx = formatList.includes('PPTX');
      }
      
      // Set dates to the current month if creating a new report
      if (!this.isEdit) {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        this.formData.startDate = this.formatDate(firstDay);
        this.formData.endDate = this.formatDate(lastDay);
      }
    }
    
    // Trigger animation after component is mounted and data is initialized
    this.$nextTick(() => {
      setTimeout(() => {
        this.show = true;
      }, 20); // Small delay to ensure DOM is ready
    });
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split('T')[0];
    },
    saveReport() {
      const reportData = {
        ...this.report,
        ...this.formData,
        format: this.formattedFormats
      };
      
      this.$emit('save', reportData);
    },
    close() {
      // Trigger animation by setting show to false first
      this.show = false;
      
      // Delay the actual closing event to allow animation to complete
      setTimeout(() => {
        this.$emit('close');
      }, 300); // Match this with the animation duration
    }
  }
};
</script>