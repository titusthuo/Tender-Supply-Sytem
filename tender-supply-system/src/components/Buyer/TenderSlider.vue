<!-- TenderSlider.vue -->
<template>
  <div 
    v-if="isOpen"
    class="fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="h-full flex flex-col">
      <!-- Slider Header -->
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold">
          {{ localTender.id ? 'Edit' : 'Create' }} Tender
        </h2>
        <button 
          @click="$emit('close')" 
          class="text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>

      <!-- Slider Content -->
      <div class="p-6 flex-grow overflow-y-auto">
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Tender ID</label>
            <input 
              v-model="localTender.id" 
              class="w-full border rounded px-3 py-2"
              :disabled="!!localTender.id"
              placeholder="Auto-generated"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Title</label>
            <input 
              v-model="localTender.title" 
              class="w-full border rounded px-3 py-2"
              required
              placeholder="Enter tender title"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Description</label>
            <textarea 
              v-model="localTender.description" 
              class="w-full border rounded px-3 py-2"
              rows="4"
              placeholder="Enter tender description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Department</label>
            <select 
              v-model="localTender.department" 
              class="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Department</option>
              <option>IT Department</option>
              <option>Operations</option>
              <option>Finance</option>
              <option>Procurement</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Stage</label>
            <select 
              v-model="localTender.stage" 
              class="w-full border rounded px-3 py-2"
            >
              <option>Draft</option>
              <option>RFI</option>
              <option>RFP</option>
              <option>Evaluation</option>
              <option>Closed</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Deadline</label>
            <input 
              type="date" 
              v-model="localTender.deadline" 
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Tender Type</label>
            <select 
              v-model="localTender.type" 
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select Type</option>
              <option>RFQ (Request for Quotation)</option>
              <option>RFP (Request for Proposal)</option>
              <option>RFI (Request for Information)</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button 
              type="button" 
              @click="$emit('close')" 
              class="border px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {{ localTender.id ? 'Update Tender' : 'Create Tender' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tender: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      department: '',
      stage: 'Draft',
      deadline: '',
      type: ''
    })
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

// Initialize localTender with a default object if props.tender is null
const localTender = ref({
  title: '',
  description: '',
  department: '',
  stage: 'Draft',
  deadline: '',
  type: '',
  ...props.tender
})

const saveChanges = () => {
  // Validate form before saving
  if (!localTender.value.title || !localTender.value.department) {
    alert('Please fill in required fields')
    return
  }

  // Generate ID if not exists
  if (!localTender.value.id) {
    localTender.value.id = `#TE-${Math.floor(Math.random() * 90000) + 10000}`
  }

  emit('save', localTender.value)
}

// Watch for external changes to tender prop
watch(() => props.tender, (newTender) => {
  localTender.value = { 
    title: '',
    description: '',
    department: '',
    stage: 'Draft',
    deadline: '',
    type: '',
    ...newTender 
  }
}, { deep: true })
</script>