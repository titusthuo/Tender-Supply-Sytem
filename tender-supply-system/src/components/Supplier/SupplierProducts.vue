<template>
    <div class="min-h-screen flex flex-col">
      <!-- Top navigation bar - Kept the same -->
      <header class="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Supplier Portal</h1>
        <h1>hello world</h1>
        <div class="flex items-center space-x-2">
          <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span class="text-blue-500">👤</span>
          </button>
          <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500">?</button>
        </div>
      </header>
  
      <div class="flex flex-1">
        <!-- Sidebar navigation - Kept the same -->
        
  
        <!-- Main content area - Kept the same -->
        <main class="flex-1 p-6 bg-gray-50 border border-gray-200">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Products</h2>
            <button @click="openAddProductForm" class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <span class="mr-1">+</span> Add New
            </button>
          </div>
          
          <!-- Search and filters - Kept the same -->
          <div class="flex space-x-4 mb-6">
            <div class="flex-1 relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="search" placeholder="Search products..." class="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
            
            <div class="w-40">
              <button class="w-full px-4 py-2 border rounded-md flex justify-between items-center">
                <span>Category</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            <div class="w-40">
              <button class="w-full px-4 py-2 border rounded-md flex justify-between items-center">
                <span>Status</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Products table - Kept the same -->
          <div class="border rounded-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-white">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left w-10">
                    <input type="checkbox" class="rounded">
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in products" :key="product.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" class="rounded">
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-600">📄</div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        <div class="text-sm text-gray-500">{{ product.category }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ product.sku }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${{ product.price.toFixed(2) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ product.stock }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', 
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ product.stock > 0 ? 'Active' : 'Out of Stock' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-gray-400 hover:text-gray-600">
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Pagination - Kept the same -->
            <div class="bg-white px-4 py-3 flex items-center justify-center border-t">
              <nav class="flex space-x-2" aria-label="Pagination">
                <button class="bg-blue-500 text-white w-8 h-8 rounded-md flex items-center justify-center">1</button>
                <button class="text-gray-500 hover:bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center">2</button>
                <button class="text-gray-500 hover:bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center">3</button>
                <span class="text-gray-500 w-8 h-8 flex items-center justify-center">...</span>
                <button class="flex items-center px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100">
                  Next
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>
  
      <!-- Multi-Step Add Product Slide-in Form -->
      <Transition name="slide">
        <div v-if="showAddProductForm" class="fixed top-0 right-0 h-full w-1/2 bg-white shadow-xl z-50 flex flex-col overflow-hidden">
          <div class="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h2 class="text-xl font-bold">Add New Product</h2>
            <button @click="closeAddProductForm" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Progress Steps -->
          <div class="px-6 pt-6">
            <div class="flex items-center">
              <div 
                v-for="(step, index) in steps" 
                :key="index" 
                class="flex items-center"
              >
                <!-- Step Circle -->
                <div 
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                    currentStep > index ? 'bg-green-500 text-white' : 
                    currentStep === index ? 'bg-blue-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  ]"
                >
                  <span v-if="currentStep > index">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                
                <!-- Step Name -->
                <div 
                  class="ml-2 text-sm font-medium"
                  :class="currentStep === index ? 'text-blue-500' : 'text-gray-500'"
                >
                  {{ step.name }}
                </div>
                
                <!-- Connecting Line (not for last item) -->
                <div 
                  v-if="index < steps.length - 1" 
                  class="flex-1 h-1 mx-4"
                  :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'"
                ></div>
              </div>
            </div>
          </div>
          
          <div class="flex-1 p-6 overflow-y-auto">
            <!-- Step 1: Basic Information -->
            <div v-if="currentStep === 0">
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-700">Basic Information</h3>
                <p class="text-sm text-gray-500">Add your product details</p>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
                  <input 
                    type="text" 
                    id="productName" 
                    v-model="newProduct.name" 
                    required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                  <p v-if="validationErrors.name" class="mt-1 text-sm text-red-600">{{ validationErrors.name }}</p>
                </div>
                
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                  <select 
                    id="category" 
                    v-model="newProduct.category" 
                    required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Office Equipment">Office Equipment</option>
                    <option value="Computers">Computers</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Displays">Displays</option>
                    <option value="Supplies">Supplies</option>
                  </select>
                </div>
                
                <div>
                  <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    id="description" 
                    v-model="newProduct.description" 
                    rows="3"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <!-- Step 2: Pricing & Inventory -->
            <div v-if="currentStep === 1">
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-700">Pricing & Inventory</h3>
                <p class="text-sm text-gray-500">Set your product's price and stock level</p>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
                  <input 
                    type="text" 
                    id="sku" 
                    v-model="newProduct.sku" 
                    required
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                  <p v-if="validationErrors.sku" class="mt-1 text-sm text-red-600">{{ validationErrors.sku }}</p>
                </div>
                
                <div>
                  <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input 
                      type="number" 
                      id="price" 
                      v-model="newProduct.price" 
                      required
                      min="0.01" 
                      step="0.01"
                      class="pl-7 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                  <p v-if="validationErrors.price" class="mt-1 text-sm text-red-600">{{ validationErrors.price }}</p>
                </div>
                
                <div>
                  <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                  <input 
                    type="number" 
                    id="stock" 
                    v-model="newProduct.stock" 
                    required
                    min="0"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                  <p v-if="validationErrors.stock" class="mt-1 text-sm text-red-600">{{ validationErrors.stock }}</p>
                </div>
                
                <div>
                  <label for="reorderLevel" class="block text-sm font-medium text-gray-700">Reorder Level</label>
                  <input 
                    type="number" 
                    id="reorderLevel" 
                    v-model="newProduct.reorderLevel" 
                    min="0"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>
            
            <!-- Step 3: Product Images -->
            <div v-if="currentStep === 2">
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-700">Product Images</h3>
                <p class="text-sm text-gray-500">Upload images of your product</p>
              </div>
              
              <div class="grid grid-cols-3 gap-4 mb-6">
                <!-- Main image upload -->
                <div class="col-span-3">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600 mt-2">
                      <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only">
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                
                <!-- Additional images -->
                <div class="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                  <button type="button" class="text-blue-500">+ Add Image</button>
                </div>
                <div class="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                  <button type="button" class="text-blue-500">+ Add Image</button>
                </div>
                <div class="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                  <button type="button" class="text-blue-500">+ Add Image</button>
                </div>
              </div>
            </div>
            
            <!-- Step 4: Review & Submit -->
            <div v-if="currentStep === 3">
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-700">Review & Submit</h3>
                <p class="text-sm text-gray-500">Review your product details before submitting</p>
              </div>
              
              <div class="border rounded-md p-4 mb-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-gray-700">Basic Information</h4>
                    <div class="mt-2 text-sm">
                      <div><span class="font-medium">Name:</span> {{ newProduct.name }}</div>
                      <div><span class="font-medium">Category:</span> {{ newProduct.category }}</div>
                      <div><span class="font-medium">Description:</span> {{ newProduct.description || 'N/A' }}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="font-medium text-gray-700">Pricing & Inventory</h4>
                    <div class="mt-2 text-sm">
                      <div><span class="font-medium">SKU:</span> {{ newProduct.sku }}</div>
                      <div><span class="font-medium">Price:</span> ${{ parseFloat(newProduct.price).toFixed(2) }}</div>
                      <div><span class="font-medium">Stock:</span> {{ newProduct.stock }}</div>
                      <div><span class="font-medium">Reorder Level:</span> {{ newProduct.reorderLevel || 'N/A' }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <h4 class="font-medium text-gray-700">Images</h4>
                  <div class="mt-2 text-sm">
                    <span class="text-gray-500">No images uploaded</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Navigation Buttons -->
            <div class="pt-4 flex justify-between">
              <button 
                v-if="currentStep > 0" 
                type="button" 
                @click="prevStep" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <div v-else></div>
              
              <div class="flex space-x-3">
                <button 
                  type="button" 
                  @click="closeAddProductForm" 
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button 
                  v-if="currentStep < steps.length - 1" 
                  type="button"
                  @click="nextStep" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Continue
                </button>
                
                <button 
                  v-else 
                  type="button"
                  @click="submitProduct" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- Semi-transparent overlay -->
      <div 
        v-if="showAddProductForm" 
        @click="closeAddProductForm" 
        class="fixed inset-0 bg-white bg-opacity-5 z-40"
      ></div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue'
  
  export default {
    name: 'SupplierProducts',
    setup() {
      // Form visibility state
      const showAddProductForm = ref(false);
      
      // Multi-step form navigation
      const steps = [
        { name: 'Basic Info' },
        { name: 'Pricing' },
        { name: 'Images' },
        { name: 'Review' }
      ];
      const currentStep = ref(0);
      
      // Validation errors
      const validationErrors = reactive({
        name: '',
        sku: '',
        price: '',
        stock: ''
      });
      
      // Product data
      const products = ref([
        {
          id: 1,
          name: 'HP LaserJet Printer',
          category: 'Office Equipment',
          sku: 'LJ-20223349',
          price: 399.99,
          stock: 24
        },
        {
          id: 2,
          name: 'Dell XPS Laptop',
          category: 'Computers',
          sku: 'DL-XPS-15',
          price: 1299.99,
          stock: 12
        },
        {
          id: 3,
          name: 'Logitech Wireless Mouse',
          category: 'Accessories',
          sku: 'M-900',
          price: 49.99,
          stock: 87
        },
        {
          id: 4,
          name: 'Samsung Monitor 27"',
          category: 'Displays',
          sku: 'SM-27FHD',
          price: 249.99,
          stock: 0
        },
        {
          id: 5,
          name: 'HP Ink Cartridge Black',
          category: 'Supplies',
          sku: 'HP-BLK',
          price: 29.99,
          stock: 122
        }
      ]);
  
      // New product form data
      const newProduct = reactive({
        name: '',
        category: 'Office Equipment',
        description: '',
        sku: '',
        price: '',
        stock: 0,
        reorderLevel: 5
      });
  
      // Open the add product form
      const openAddProductForm = () => {
        showAddProductForm.value = true;
        currentStep.value = 0;
        resetForm();
      };
  
      // Close the add product form
      const closeAddProductForm = () => {
        showAddProductForm.value = false;
        resetForm();
      };
  
      // Reset the form data
      const resetForm = () => {
        Object.assign(newProduct, {
          name: '',
          category: 'Office Equipment',
          description: '',
          sku: '',
          price: '',
          stock: 0,
          reorderLevel: 5
        });
        
        // Clear validation errors
        Object.keys(validationErrors).forEach(key => {
          validationErrors[key] = '';
        });
      };
  
      // Validate the current step
      const validateCurrentStep = () => {
        let isValid = true;
        
        // Reset validation errors
        Object.keys(validationErrors).forEach(key => {
          validationErrors[key] = '';
        });
        
        // Step 0: Basic Information
        if (currentStep.value === 0) {
          if (!newProduct.name.trim()) {
            validationErrors.name = 'Product name is required';
            isValid = false;
          }
        }
        
        // Step 1: Pricing & Inventory
        else if (currentStep.value === 1) {
          if (!newProduct.sku.trim()) {
            validationErrors.sku = 'SKU is required';
            isValid = false;
          }
          
          if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
            validationErrors.price = 'Price must be greater than 0';
            isValid = false;
          }
          
          if (newProduct.stock === '' || parseInt(newProduct.stock) < 0) {
            validationErrors.stock = 'Stock must be 0 or greater';
            isValid = false;
          }
        }
        
        return isValid;
      };
  
      // Navigate to the next step
      const nextStep = () => {
        if (validateCurrentStep()) {
          currentStep.value++;
        }
      };
  
      // Navigate to the previous step
    const prevStep = () => {
      currentStep.value--;
    };

    // Submit the product
    const submitProduct = () => {
      if (validateCurrentStep()) {
        // Add the new product to the products list
        const id = Math.max(0, ...products.value.map(p => p.id)) + 1;
        
        products.value.unshift({
          id,
          name: newProduct.name,
          category: newProduct.category,
          sku: newProduct.sku,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          description: newProduct.description,
          reorderLevel: newProduct.reorderLevel
        });

        // Close the form and reset
        closeAddProductForm();
        
        // Show success notification (in a real app)
        // notifySuccess('Product added successfully');
      }
    };

    return {
      products,
      showAddProductForm,
      steps,
      currentStep,
      newProduct,
      validationErrors,
      openAddProductForm,
      closeAddProductForm,
      nextStep,
      prevStep,
      submitProduct
    };
  }
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>