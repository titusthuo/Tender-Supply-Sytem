<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-0">Bid Submission Portal</h1>
        <div class="flex items-center space-x-4">
          <span class="text-xs sm:text-sm text-blue-200">Welcome, Bidder</span>
          <button 
            class="bg-white/20 hover:bg-white/30 px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors text-sm"
            @click="resetForm"
          >
            Reset Form
          </button>
        </div>
      </div>
    </header>

    <!-- Progress Stepper -->
    <div class="container mx-auto px-4 mt-4 sm:mt-6 overflow-x-auto">
      <div class="flex justify-between items-center space-x-2 sm:space-x-4 min-w-max">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="flex-1 flex items-center"
          :class="{
            'opacity-50': currentStep < index,
            'font-bold text-blue-600': currentStep === index
          }"
        >
          <div 
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 border-2 flex-shrink-0"
            :class="{
              'bg-blue-600 text-white border-blue-600': currentStep >= index,
              'border-gray-300': currentStep < index
            }"
          >
            {{ index + 1 }}
          </div>
          <span class="text-xs sm:text-sm md:text-base truncate">{{ step }}</span>
        </div>
      </div>
    </div>

    <!-- Bid Submission Form -->
    <div class="container mx-auto px-4 py-4 sm:py-8 flex-1">
      <form 
        @submit.prevent="submitBid" 
        class="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto"
      >
        <!-- Step 1: Company Details -->
        <div v-if="currentStep === 0" class="space-y-4 sm:space-y-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Company Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Company Name</label>
              <input 
                v-model="companyDetails.name"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter company name"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Registration Number</label>
              <input 
                v-model="companyDetails.registrationNumber"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Company registration ID"
                required
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Contact Person</label>
              <input 
                v-model="companyDetails.contactPerson"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Name of primary contact"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address</label>
              <input 
                v-model="companyDetails.email"
                type="email"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="contact@company.com"
                required
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Bid Details -->
        <div v-if="currentStep === 1" class="space-y-4 sm:space-y-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Bid Proposal Details</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Project Title</label>
            <input 
              v-model="bidDetails.projectTitle"
              class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Office Building Renovation Project"
              required
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Bid Amount ($)</label>
              <input 
                v-model="bidDetails.bidAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="125,000.00"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Project Duration</label>
              <input 
                v-model="bidDetails.projectDuration"
                type="text"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 3 months"
                required
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Bid Description</label>
            <textarea 
              v-model="bidDetails.description"
              rows="4"
              class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Provide a comprehensive description of your proposed solution..."
              required
            ></textarea>
          </div>
        </div>

        <!-- Step 3: Supporting Documents -->
        <div v-if="currentStep === 2" class="space-y-4 sm:space-y-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Supporting Documents</h2>
          
          <div 
            class="w-full p-4 sm:p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:bg-gray-100 transition-colors"
            @click="triggerFileUpload"
            @dragover.prevent
            @drop.prevent="handleFileDrop"
          >
            <div class="space-y-2 sm:space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 sm:h-16 sm:w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-sm sm:text-base text-gray-600">Drag and drop files here or click to upload</p>
              <p class="text-xs text-gray-500">Accepted file types: PDF, Word, Excel (Max 10MB per file)</p>
            </div>
          </div>
          
          <input 
            type="file" 
            ref="fileInput"
            class="hidden" 
            multiple 
            @change="handleFileUpload"
          />
          
          <div v-if="uploadedFiles.length" class="mt-2 sm:mt-4">
            <h3 class="text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-2">Uploaded Files:</h3>
            <ul class="space-y-1 sm:space-y-2">
              <li 
                v-for="(file, index) in uploadedFiles" 
                :key="index" 
                class="flex justify-between items-center bg-blue-50 p-2 sm:p-3 rounded-md"
              >
                <div class="flex items-center space-x-2 sm:space-x-3 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-xs sm:text-sm text-gray-700 truncate">{{ file.name }}</span>
                </div>
                <span class="text-xs text-gray-500 ml-2 flex-shrink-0">{{ formatFileSize(file.size) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 4: Review & Submit -->
        <div v-if="currentStep === 3" class="space-y-4 sm:space-y-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Review Submission</h2>
          
          <div class="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <h3 class="text-md sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Bid Summary</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p class="text-xs sm:text-sm text-gray-600">Company Name</p>
                <p class="text-sm sm:text-base font-semibold break-words">{{ companyDetails.name }}</p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-gray-600">Contact Person</p>
                <p class="text-sm sm:text-base font-semibold break-words">{{ companyDetails.contactPerson }}</p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-gray-600">Project Title</p>
                <p class="text-sm sm:text-base font-semibold break-words">{{ bidDetails.projectTitle }}</p>
              </div>
              <div>
                <p class="text-xs sm:text-sm text-gray-600">Bid Amount</p>
                <p class="text-sm sm:text-base font-semibold">${{ bidDetails.bidAmount }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-start sm:items-center space-x-2 sm:space-x-3">
            <input 
              type="checkbox" 
              v-model="termsAccepted"
              class="h-4 w-4 mt-1 sm:mt-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="text-xs sm:text-sm text-gray-700">
              I confirm that all information provided is accurate and I agree to the terms of submission
            </label>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-6 sm:mt-8">
          <button 
            type="button" 
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 sm:px-6 sm:py-3 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          
          <button 
            type="button" 
            v-if="currentStep < 3"
            @click="nextStep"
            class="ml-auto px-4 py-2 sm:px-6 sm:py-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
          
          <button 
            type="submit" 
            v-if="currentStep === 3"
            :disabled="!termsAccepted"
            class="ml-auto px-4 py-2 sm:px-6 sm:py-3 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Submit Bid
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter();

const steps = [
  'Company Details', 
  'Bid Details', 
  'Supporting Documents', 
  'Review & Submit'
];

const currentStep = ref(0);
const termsAccepted = ref(false);
const uploadedFiles = ref([]);
const fileInput = ref(null);

const companyDetails = reactive({
  name: '',
  registrationNumber: '',
  contactPerson: '',
  email: ''
});

const bidDetails = reactive({
  projectTitle: '',
  bidAmount: '',
  projectDuration: '',
  description: ''
});

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value = Math.min(currentStep.value + 1, steps.length - 1);
  }
};

const prevStep = () => {
  currentStep.value = Math.max(currentStep.value - 1, 0);
};

const validateCurrentStep = () => {
  switch (currentStep.value) {
    case 0:
      return companyDetails.name && 
             companyDetails.registrationNumber && 
             companyDetails.contactPerson && 
             companyDetails.email;
    case 1:
      return bidDetails.projectTitle && 
             bidDetails.bidAmount && 
             bidDetails.projectDuration && 
             bidDetails.description;
    default:
      return true;
  }
};

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  uploadedFiles.value = [...uploadedFiles.value, ...files];
};

const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  uploadedFiles.value = [...uploadedFiles.value, ...files];
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

const submitBid = () => {
  if (!termsAccepted.value) {
    alert('Please accept the terms before submitting');
    return;
  }

  const bidSubmission = {
    companyDetails,
    bidDetails,
    uploadedFiles: uploadedFiles.value.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }))
  };

  // Store bid submission details in localStorage
  localStorage.setItem('submittedBid', JSON.stringify(bidSubmission));

  // Use Vue Router to navigate to confirmation page
  router.push({ name: 'bidConfirmation' });

};

const resetForm = () => {
  currentStep.value = 0;
  termsAccepted.value = false;
  uploadedFiles.value = [];
  
  Object.keys(companyDetails).forEach(key => {
    companyDetails[key] = '';
  });
  
  Object.keys(bidDetails).forEach(key => {
    bidDetails[key] = '';
  });
};
</script>