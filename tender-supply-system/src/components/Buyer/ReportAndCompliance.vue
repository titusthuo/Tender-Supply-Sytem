<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Top Navigation Bar -->
      <div class="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 class="text-xl font-bold">Buyer Portal</h1>
        <div class="flex items-center space-x-2">
          <button class="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center">
            <span>?</span>
          </button>
          <button class="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center">
            <span>🔔</span>
          </button>
          <button class="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center">
            <span>JP</span>
          </button>
        </div>
      </div>
  
      <!-- Main Content Area -->
      <div class="flex">
        <!-- Sidebar -->
        
        
        <!-- Main Content -->
        <div class="flex-1 p-6">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Reports & Compliance</h1>
            <button 
              @click="openCreateReportModal" 
              class="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <span class="mr-1">+</span> Create Custom Report
            </button>
          </div>
  
          <!-- Filters -->
          <div class="bg-white p-4 rounded shadow-sm mb-4">
            <div class="flex items-center">
              <div class="mr-4">Filters:</div>
              <div class="mx-2">
                <button class="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center">
                  Report Type <span class="ml-1">▼</span>
                </button>
              </div>
              <div class="mx-2">
                <button class="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center">
                  Date Range <span class="ml-1">▼</span>
                </button>
              </div>
              <div class="mx-2">
                <button class="bg-blue-100 text-blue-800 px-3 py-1 rounded flex items-center">
                  Format <span class="ml-1">▼</span>
                </button>
              </div>
              <div class="ml-auto">
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search reports..."
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded w-64"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tab Navigation -->
          <div class="flex mb-4 border-b">
            <div 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-3 cursor-pointer',
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              ]"
            >
              {{ tab.name }}
            </div>
          </div>
  
          <!-- Spend by Category Chart -->
          <div class="bg-white p-4 rounded shadow-sm mb-6">
            <h2 class="text-lg font-bold mb-1">Spend by Category (2025 YTD)</h2>
            <div class="h-64">
              <div class="flex items-end h-48 pt-4">
                <div class="flex flex-col items-center justify-end mr-6">
                  <div class="text-xs text-gray-600 mb-1">$250,000</div>
                  <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="flex flex-col items-center justify-end mr-6">
                  <div class="text-xs text-gray-600 mb-1">$150,000</div>
                  <div class="w-px h-3/5 bg-gray-300"></div>
                </div>
                <div class="flex flex-col items-center justify-end mr-6">
                  <div class="text-xs text-gray-600 mb-1">$75,000</div>
                  <div class="w-px h-2/6 bg-gray-300"></div>
                </div>
                <div class="flex flex-col items-center justify-end mr-6">
                  <div class="text-xs text-gray-600 mb-1">$0</div>
                  <div class="w-px h-0 bg-gray-300"></div>
                </div>
  
                <div class="flex-1 flex items-end justify-around h-full">
                  <div class="flex flex-col items-center">
                    <div class="w-16 bg-blue-200 h-44"></div>
                    <div class="text-xs text-gray-600 mt-2">IT Hardware</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="w-16 bg-blue-200 h-32"></div>
                    <div class="text-xs text-gray-600 mt-2">Services</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="w-16 bg-blue-200 h-28"></div>
                    <div class="text-xs text-gray-600 mt-2">Logistics</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="w-16 bg-blue-200 h-24"></div>
                    <div class="text-xs text-gray-600 mt-2">Office Supplies</div>
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="w-16 bg-blue-200 h-16"></div>
                    <div class="text-xs text-gray-600 mt-2">Marketing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Recent Reports Table -->
          <div>
            <h2 class="text-lg font-bold mb-4">Recent Reports</h2>
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="py-3 px-4 text-left text-gray-600">Report Name</th>
                  <th class="py-3 px-4 text-left text-gray-600">Type</th>
                  <th class="py-3 px-4 text-left text-gray-600">Generated</th>
                  <th class="py-3 px-4 text-left text-gray-600">Format</th>
                  <th class="py-3 px-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reports" :key="report.id" class="border-b border-gray-200">
                  <td class="py-3 px-4">{{ report.name }}</td>
                  <td class="py-3 px-4">{{ report.type }}</td>
                  <td class="py-3 px-4">{{ report.generated }}</td>
                  <td class="py-3 px-4">{{ report.format }}</td>
                  <td class="py-3 px-4">
                    <div class="flex space-x-2">
                      <button 
                        @click="viewReport(report)" 
                        class="bg-blue-600 text-white px-4 py-1 rounded"
                      >
                        View
                      </button>
                      <button 
                        @click="downloadReport(report)" 
                        class="bg-gray-400 text-white px-4 py-1 rounded"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Create Report Modal -->
      <ReportModal
        v-if="showCreateReportModal"
        :report="editingReport"
        :isEdit="isEditing"
        @close="closeModal"
        @save="saveReport"
      />
    </div>
  </template>
  
  <script>
  import ReportModal from './ReportModal.vue';
  
  export default {
    name: 'ReportAndCompliance',
    components: {
      ReportModal
    },
    data() {
      return {
        activeTab: 'spend',
        tabs: [
          { id: 'spend', name: 'Spend Analytics' },
          { id: 'supplier', name: 'Supplier Performance' },
          { id: 'compliance', name: 'Compliance' },
          { id: 'audit', name: 'Audit' },
          { id: 'savings', name: 'Savings' },
          { id: 'custom', name: 'Custom' }
        ],
        reports: [
          { 
            id: 1, 
            name: 'Q1 Spend Analysis', 
            type: 'Spend Analytics', 
            generated: 'Mar 10, 2025', 
            format: 'XLSX, PDF'
          },
          { 
            id: 2, 
            name: 'Supplier Performance Review', 
            type: 'Performance', 
            generated: 'Mar 05, 2025', 
            format: 'PDF, PPTX'
          },
          { 
            id: 3, 
            name: 'Monthly Compliance Audit', 
            type: 'Compliance', 
            generated: 'Feb 28, 2025', 
            format: 'PDF'
          }
        ],
        showCreateReportModal: false,
        editingReport: null,
        isEditing: false
      };
    },
    methods: {
      openCreateReportModal() {
        this.editingReport = {
          name: '',
          type: 'Custom',
          format: 'PDF'
        };
        this.isEditing = false;
        this.showCreateReportModal = true;
      },
      closeModal() {
        this.showCreateReportModal = false;
        this.editingReport = null;
      },
      saveReport(report) {
        if (this.isEditing) {
          // Update existing report
          const index = this.reports.findIndex(r => r.id === report.id);
          if (index !== -1) {
            this.reports[index] = { ...report };
          }
        } else {
          // Create new report
          const newReport = {
            id: this.reports.length + 1,
            name: report.name,
            type: report.type,
            generated: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            format: report.format
          };
          this.reports.unshift(newReport);
        }
        this.closeModal();
      },
      viewReport(report) {
        this.editingReport = { ...report };
        this.isEditing = true;
        this.showCreateReportModal = true;
      },
      downloadReport(report) {
        // Simulate download
        alert(`Downloading "${report.name}" in ${report.format} format`);
      }
    }
  };
  </script>