<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Basic Information</h3>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Supplier ID</label>
          <input 
            type="text" 
            v-model="form.id" 
            class="w-full p-2 border border-gray-300 rounded-md bg-gray-100" 
            disabled
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input 
            type="text" 
            v-model="form.name" 
            class="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <input 
            type="text" 
            v-model="form.description" 
            class="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select 
            v-model="form.category" 
            class="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="IT Equipment">IT Equipment</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Logistics">Logistics</option>
            <option value="Services">Services</option>
            <option value="Marketing">Marketing</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Performance Rating</label>
          <div class="flex items-center space-x-2">
            <input 
              type="range" 
              v-model.number="form.performance" 
              class="w-full" 
              min="0" 
              max="100" 
              step="5"
            />
            <span class="text-sm font-medium w-12 text-right">{{ form.performance }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Contact Information Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Contact Information</h3>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input 
            type="email" 
            v-model="form.email" 
            class="w-full p-2 border border-gray-300 rounded-md" 
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            v-model="form.phone" 
            class="w-full p-2 border border-gray-300 rounded-md" 
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input 
            type="url" 
            v-model="form.website" 
            class="w-full p-2 border border-gray-300 rounded-md" 
            placeholder="https://"
          />
        </div>
      </div>
      
      <!-- Address Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-800">Address</h3>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input 
            type="text" 
            v-model="form.address.street" 
            class="w-full p-2 border border-gray-300 rounded-md" 
          />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              v-model="form.address.city" 
              class="w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
            <input 
              type="text" 
              v-model="form.address.state" 
              class="w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input 
              type="text" 
              v-model="form.address.postalCode" 
              class="w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input 
              type="text" 
              v-model="form.address.country" 
              class="w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 pt-4 border-t">
        <button 
          type="button" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Supplier
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    supplier: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['save', 'cancel']);
  
  // Create a form object with default values
  const form = ref({
    id: '',
    name: '',
    description: '',
    category: '',
    performance: 0,
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    lastActivity: ''
  });
  
  // Initialize form with supplier data if available
  onMounted(() => {
    if (props.supplier) {
      // Copy basic properties
      form.value.id = props.supplier.id;
      form.value.name = props.supplier.name;
      form.value.description = props.supplier.description;
      form.value.category = props.supplier.category;
      form.value.performance = props.supplier.performance;
      form.value.lastActivity = props.supplier.lastActivity;
      
      // Copy extended properties if they exist
      form.value.email = props.supplier.email || '';
      form.value.phone = props.supplier.phone || '';
      form.value.website = props.supplier.website || '';
      
      // Initialize address object if it doesn't exist
      if (!props.supplier.address) {
        form.value.address = {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        };
      } else {
        form.value.address = { ...props.supplier.address };
      }
    }
  });
  
  // Handle form submission
  function handleSubmit() {
    emit('save', { ...form.value });
  }
  </script>