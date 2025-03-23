<!-- src/components/Bidding/BidSubmissionForm.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header -->
    <div class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Bidding System Dashboard</h1>
        <div class="text-sm text-blue-200">Pending Bids</div>
      </div>
    </div>

    <!-- Notification System -->
    <BidNotification
      :show="showNotification"
      :title="notification.title"
      :message="notification.message"
      :type="notification.type"
      :bid-details="submittedBidData"
      :auto-close="false"
      @close="hideNotification"
      @track-bid="handleTrackBid"
      @new-bid="handleNewBid"
    />

    <!-- Horizontal Navigation Menu -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto py-3">
        <nav class="flex space-x-8">
          <button 
            @click="$emit('view-change', 'submission')" 
            class="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Bid Submission
          </button>
          <button 
            @click="$emit('view-change', 'tracking')" 
            class="px-4 py-2 font-medium text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200"
          >
            Status Tracking
          </button>
          <button 
            @click="$emit('view-change', 'history')" 
            class="px-4 py-2 font-medium text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-colors duration-200"
          >
            Bid History
          </button>
        </nav>
      </div>
    </div>
    <!-- Bid Form -->
    <div class="flex-1 bg-gray-50">
      <div class="container mx-auto p-8 max-w-3xl">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">Bid Submission Form</h2>
        <form @submit.prevent="submitBid" class="bg-white p-6 rounded-lg shadow">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Title:</label>
            <input 
              v-model="bidData.projectTitle"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Office Building Renovation Project"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Bid Amount ($):</label>
            <input 
              v-model="bidData.bidAmount"
              type="number"
              step="0.01"
              min="0"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="125,000.00"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Bid Description:</label>
            <textarea 
              v-model="bidData.bidDescription"
              rows="5"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Complete renovation of 3rd floor offices including..."
              required
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Supporting Documents:</label>
            <div 
              class="w-full p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              @click="openFileDialog"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <div class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-sm">Drag files here or click to upload</p>
                <p class="text-xs text-gray-400">(PDF, Word, Excel documents)</p>
              </div>
            </div>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleFileSelect"
              multiple
            />
            
            <div v-if="uploadedFiles.length > 0" class="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
              <ul class="space-y-2">
                <li v-for="(file, index) in uploadedFiles" :key="index" class="flex items-center justify-between text-sm">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-gray-700">{{ file.name }}</span>
                  </div>
                  <span class="text-gray-500 text-xs">{{ formatFileSize(file.size) }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button 
              type="submit"
              class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Bid</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import BidNotification from './BidNotification.vue';

const emit = defineEmits(['submit-bid', 'view-change']);

const bidData = reactive({
  projectTitle: '',
  bidAmount: '',
  bidDescription: '',
});

const fileInput = ref(null);
const uploadedFiles = ref([]);
const isSubmitting = ref(false);
const showNotification = ref(false);
const submittedBidData = ref({});

const notification = reactive({
  title: '',
  message: '',
  type: 'success'
});

const openFileDialog = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  uploadedFiles.value = [...uploadedFiles.value, ...files];
};

const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  uploadedFiles.value = [...uploadedFiles.value, ...files];
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

const validateForm = () => {
  if (!bidData.projectTitle.trim()) {
    showErrorNotification('Missing Project Title', 'Please enter a project title for your bid.');
    return false;
  }
  
  const cleanBidAmount = bidData.bidAmount.toString().replace(/,/g, '');
  if (!cleanBidAmount || isNaN(cleanBidAmount) || parseFloat(cleanBidAmount) <= 0) {
    showErrorNotification('Invalid Bid Amount', 'Please enter a valid bid amount greater than zero.');
    return false;
  }
  
  if (!bidData.bidDescription.trim()) {
    showErrorNotification('Missing Description', 'Please enter a description for your bid.');
    return false;
  }
  
  return true;
};

const showErrorNotification = (title, message) => {
  notification.title = title;
  notification.message = message;
  notification.type = 'error';
  showNotification.value = true;
};

const submitBid = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  // Prepare the bid data object including files information
  const completeData = {
    ...bidData,
    files: uploadedFiles.value.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }))
  };
  
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate Bid ID
    const bidId = `BID-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    // Format submission date
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const submissionDate = now.toLocaleDateString('en-US', options);
    
    // Store the submitted data with additional information
    submittedBidData.value = { 
      ...completeData,
      bidId,
      submissionDate
    };
    
    // Display success notification
    notification.title = 'Bid Successfully Submitted!';
    notification.message = 'Your bid has been received and is now being processed. You\'ll receive email notifications at each review stage.';
    notification.type = 'success';
    showNotification.value = true;
    
    // Emit the event with the bid data
    emit('submit-bid', submittedBidData.value);
    
  } catch (error) {
    console.error('Error submitting bid:', error);
    showErrorNotification('Error Submitting Bid', 'There was an error submitting your bid. Please try again later.');
  } finally {
    isSubmitting.value = false;
  }
};

const hideNotification = () => {
  showNotification.value = false;
};

const handleTrackBid = () => {
  hideNotification();
  emit('view-change', 'tracking');
};

const handleNewBid = () => {
  hideNotification();
  resetForm();
};

const resetForm = () => {
  bidData.projectTitle = '';
  bidData.bidAmount = '';
  bidData.bidDescription = '';
  uploadedFiles.value = [];
};
</script>