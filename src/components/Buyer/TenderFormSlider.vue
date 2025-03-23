<template>
  <div>
    <!-- Gray Overlay with smooth fade transition -->
    <Transition name="fade">
      <div 
        v-if="showSlider"
        @click="closeWithAnimation"
        class="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-40"
      ></div>
    </Transition>

    <!-- Right Slider Component with improved transitions -->
    <Transition name="slide">
      <div 
        v-if="showSlider"
        class="fixed top-0 right-0 h-full bg-white shadow-xl z-50 flex flex-col w-full md:w-1/2 lg:w-1/3 overflow-hidden"
      >
        <!-- Slider Header with subtle shadow for depth -->
        <div class="p-6 border-b bg-white sticky top-0 z-10 shadow-sm">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-800">{{ isEditMode ? 'Manage Tender' : 'Create New Tender' }}</h2>
            <button 
              @click="closeWithAnimation" 
              class="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Slider Body with Form -->
        <div class="p-6 flex-grow overflow-y-auto scroll-smooth" style="height: calc(100vh - 9rem);">
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Title with improved focus state -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="title">
                Tender Title
              </label>
              <input 
                v-model="form.title" 
                type="text" 
                id="title" 
                placeholder="Enter tender title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              >
            </div>

            <!-- Description with improved textarea -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="description">
                Description
              </label>
              <textarea 
                v-model="form.description" 
                id="description" 
                placeholder="Brief description of the tender"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-24 resize-y"
                required
              ></textarea>
            </div>

            <!-- Department with improved select -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="department">
                Department
              </label>
              <select 
                v-model="form.department" 
                id="department" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                required
              >
                <option value="">Select department</option>
                <option value="IT Department">IT Department</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <!-- Tender Type with improved select -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="type">
                Tender Type
              </label>
              <select 
                v-model="form.type" 
                id="type" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                required
              >
                <option value="">Select type</option>
                <option value="RFI">Request for Information (RFI)</option>
                <option value="RFP">Request for Proposal (RFP)</option>
                <option value="RFQ">Request for Quotation (RFQ)</option>
              </select>
            </div>

            <!-- Deadline with improved date input -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2" for="deadline">
                Deadline
              </label>
              <input 
                v-model="form.deadline" 
                type="date" 
                id="deadline" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              >
            </div>

            <!-- Requirements Section with improved interactions -->
            <div>
              <label class="block text-gray-700 text-sm font-medium mb-2">
                Requirements
              </label>
              <div class="border border-gray-300 rounded-md p-4 bg-gray-50">
                <div class="space-y-3">
                  <div 
                    v-for="(req, index) in form.requirements" 
                    :key="index" 
                    class="flex items-center gap-2"
                  >
                    <input 
                      v-model="form.requirements[index]" 
                      type="text" 
                      placeholder="Enter requirement"
                      class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                    <button 
                      @click="removeRequirement(index)" 
                      type="button"
                      class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label="Remove requirement"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button 
                  @click="addRequirement" 
                  type="button"
                  class="mt-4 text-blue-600 hover:text-blue-800 flex items-center p-2 rounded-md hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Requirement
                </button>
              </div>
            </div>

            <!-- Additional Fields for Manage Mode with improved select -->
            <div v-if="isEditMode">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="stage">
                Current Stage
              </label>
              <select 
                v-model="form.stage" 
                id="stage" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                required
              >
                <option value="Draft">Draft</option>
                <option value="RFI">RFI</option>
                <option value="RFP">RFP</option>
                <option value="RFQ">RFQ</option>
                <option value="Eval">Evaluation</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </form>
        </div>

        <!-- Slider Footer with Action Buttons -->
        <div class="p-6 border-t bg-gray-50 sticky bottom-0 z-10 shadow-inner">
          <div class="flex justify-end gap-3">
            <button 
              @click="closeWithAnimation" 
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              @click="submitForm" 
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              {{ isEditMode ? 'Update Tender' : 'Create Tender' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

// Define props
const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  tenderData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      department: '',
      type: '',
      deadline: '',
      stage: 'Draft',
      requirements: ['']
    })
  }
});

// Define emits
const emit = defineEmits(['close', 'submit']);

// Form state with reactive data
const form = reactive({
  title: '',
  description: '',
  department: '',
  type: '',
  deadline: '',
  stage: 'Draft',
  requirements: ['']
});

// Animation state - controlled by isOpen prop
const showSlider = ref(props.isOpen);

// Watch for changes to isOpen prop
watch(() => props.isOpen, (newValue) => {
  showSlider.value = newValue;
});

// Initialize form with props data
onMounted(() => {
  if (props.tenderData) {
    Object.keys(form).forEach(key => {
      if (props.tenderData[key] !== undefined) {
        if (key === 'requirements') {
          form.requirements = [...props.tenderData.requirements];
        } else {
          form[key] = props.tenderData[key];
        }
      }
    });
  }
});

// Handle animation on close
const closeWithAnimation = () => {
  showSlider.value = false;
  setTimeout(() => {
    emit('close');
  }, 300); // Match the duration in the CSS transition
};

// Add a new requirement field
const addRequirement = () => {
  form.requirements.push('');
};

// Remove a requirement field
const removeRequirement = (index) => {
  form.requirements = form.requirements.filter((_, i) => i !== index);
  
  // Always keep at least one requirement field
  if (form.requirements.length === 0) {
    form.requirements.push('');
  }
};

// Submit the form
const submitForm = () => {
  // Filter out empty requirements
  const filteredRequirements = form.requirements.filter(req => req.trim() !== '');
  
  // Emit the form data to parent component
  emit('submit', {
    title: form.title,
    description: form.description,
    department: form.department,
    type: form.type,
    deadline: form.deadline,
    stage: form.stage,
    requirements: filteredRequirements
  });
  
  // Close the slider after submission
  closeWithAnimation();
};
</script>

<style scoped>
/* Smooth fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth slide transition for slider */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>