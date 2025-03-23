<!-- src/components/Bidding/BidNotification.vue -->
<template>
  <Transition name="notification-fade">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50 p-4">
      <!-- Overlay with lower opacity -->
      <div class="absolute inset-0 bg-black bg-opacity-30" @click="closeIfClickable"></div>
      
      <!-- Success Notification -->
      <div v-if="type === 'success'" class="bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden">
        <div class="bg-green-500 py-4 px-6 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <h2 class="text-xl font-bold">{{ title }}</h2>
            </div>
            <button @click="close" class="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Message Content -->
          <p class="text-gray-700 mb-6">{{ message }}</p>
          
          <!-- Bid Details -->
          <div v-if="showDetails" class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="text-gray-500">Bid ID:</div>
              <div class="font-medium text-gray-700">{{ bidDetails.bidId }}</div>
              
              <div class="text-gray-500">Submitted on:</div>
              <div class="font-medium text-gray-700">{{ bidDetails.submissionDate }}</div>
              
              <div class="text-gray-500">Project:</div>
              <div class="font-medium text-gray-700">{{ bidDetails.projectTitle }}</div>
              
              <div class="text-gray-500">Amount:</div>
              <div class="font-medium text-gray-700">${{ formatAmount(bidDetails.bidAmount) }}</div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              class="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              @click="$emit('track-bid')"
            >
              Track Bid Status
            </button>
            <button 
              class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              @click="$emit('new-bid')"
            >
              Submit Another Bid
            </button>
          </div>
        </div>
      </div>
      
      <!-- Error Notification -->
      <div v-else-if="type === 'error'" class="bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden">
        <div class="bg-red-500 py-4 px-6 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 class="text-xl font-bold">{{ title }}</h2>
            </div>
            <button @click="close" class="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <p class="text-gray-700 mb-6">{{ message }}</p>
          <button 
            class="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            @click="close"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </Transition>
  
  <!-- Small status notification at top of screen -->
  <Transition name="slide-down">
    <div v-if="showFloatingStatus" 
         :class="[
           'fixed top-0 right-0 m-4 py-2 px-4 max-w-xs rounded-md shadow-lg z-40 transition-all duration-300',
           type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
         ]">
      <div class="flex items-center">
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-sm font-medium">{{ title }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  bidDetails: {
    type: Object,
    default: () => ({})
  },
  autoClose: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 8000
  }
});

const emit = defineEmits(['close', 'track-bid', 'new-bid']);

const visible = ref(props.show);
const showFloatingStatus = ref(false);
const timer = ref(null);
const floatingTimer = ref(null);

const showDetails = computed(() => {
  return props.type === 'success' && props.bidDetails && 
         props.bidDetails.bidId && props.bidDetails.projectTitle;
});

const formatAmount = (amount) => {
  if (!amount) return '0.00';
  return parseFloat(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const startAutoCloseTimer = () => {
  clearTimeout(timer.value);
  if (props.autoClose) {
    timer.value = setTimeout(() => {
      close();
    }, props.duration);
  }
};

const close = () => {
  visible.value = false;
  clearTimeout(timer.value);
  
  // Show the floating notification after closing the main notification
  if (props.type === 'success') {
    showFloatingStatus.value = true;
    clearTimeout(floatingTimer.value);
    floatingTimer.value = setTimeout(() => {
      showFloatingStatus.value = false;
    }, 5000); // Show floating notification for 5 seconds
  }
  
  emit('close');
};

const closeIfClickable = () => {
  if (props.type === 'error') {
    close();
  }
};

// Watch for show prop changes
watch(() => props.show, (newValue) => {
  visible.value = newValue;
  if (newValue && props.autoClose) {
    startAutoCloseTimer();
  } else {
    clearTimeout(timer.value);
  }
});

onMounted(() => {
  if (props.show && props.autoClose) {
    startAutoCloseTimer();
  }
});

onUnmounted(() => {
  clearTimeout(timer.value);
  clearTimeout(floatingTimer.value);
});
</script>

<style scoped>
.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: opacity 0.4s ease;
}

.notification-fade-enter-from,
.notification-fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>