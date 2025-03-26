<!-- src/views/BidConfirmation.vue -->
<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
      <!-- Header -->
      <header class="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-md">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 class="text-3xl font-bold tracking-tight">Bid Submission Confirmation</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-green-200">Bid Successfully Submitted</span>
          </div>
        </div>
      </header>
  
      <!-- Confirmation Content -->
      <div v-if="submittedBid" class="container mx-auto px-4 py-8 flex-1">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-2xl font-semibold text-gray-800 mt-4">Bid Submitted Successfully</h2>
            <p class="text-gray-600 mt-2">Your bid has been received and is now under review</p>
          </div>
  
          <!-- Bid Details Summary -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Bid Summary</h3>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Tender ID</p>
                <p class="font-semibold">TEN-2025-{{ randomTenderSuffix }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Company Name</p>
                <p class="font-semibold">{{ submittedBid.companyDetails.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Project Title</p>
                <p class="font-semibold">{{ submittedBid.bidDetails.projectTitle }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Bid Amount</p>
                <p class="font-semibold">${{ submittedBid.bidDetails.bidAmount }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Contact Person</p>
                <p class="font-semibold">{{ submittedBid.companyDetails.contactPerson }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Contact Email</p>
                <p class="font-semibold">{{ submittedBid.companyDetails.email }}</p>
              </div>
            </div>
          </div>
  
          <!-- Uploaded Documents -->
          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Uploaded Documents</h3>
            <div v-if="submittedBid.uploadedFiles.length" class="space-y-2">
              <div 
                v-for="(file, index) in submittedBid.uploadedFiles" 
                :key="index" 
                class="flex justify-between items-center bg-blue-50 p-3 rounded-md"
              >
                <div class="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm text-gray-700">{{ file.name }}</span>
                </div>
                <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
              </div>
            </div>
            <p v-else class="text-gray-500 italic">No documents uploaded</p>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-between mt-8">
            <button 
              @click="goToDashboard"
              class="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go to Dashboard
            </button>
            
            <button 
              @click="downloadConfirmation"
              class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Download Confirmation
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <p class="text-gray-600">No bid submission found. Please submit a bid first.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const submittedBid = ref(null);
  const router = useRouter();
  const randomTenderSuffix = ref(Math.floor(Math.random() * 999).toString().padStart(3, '0'));
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  const goToDashboard = () => {
    router.push('/SupplierTenders');
  };
  
  const downloadConfirmation = () => {
    const confirmationData = {
      tenderId: `TEN-2025-${randomTenderSuffix.value}`,
      ...submittedBid.value.companyDetails,
      ...submittedBid.value.bidDetails,
      submissionDate: new Date().toLocaleDateString()
    };
  
    const blob = new Blob([JSON.stringify(confirmationData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bid_confirmation.json';
    link.click();
  };
  
  onMounted(() => {
    // Retrieve bid details from Pinia/Vuex store
    // This is a placeholder. Replace with actual state management logic
    const storedBid = localStorage.getItem('submittedBid');
    if (storedBid) {
      submittedBid.value = JSON.parse(storedBid);
    }
  });
  </script>