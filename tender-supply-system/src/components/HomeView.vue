<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Login from '@/components/Auth/Login.vue'; // Import the Login component

// Get router instance
const router = useRouter();

// Component data
const options = ref([
  'Post a Tender',
  'Browse Tenders',
  'Become a Supplier'
]);

const stats = ref([
  { value: '100+', label: 'VERIFIED<br/>SUPPLIERS' },
  { value: '30+', label: 'SUCCESSFUL<br/>TENDERS' }
]);

// Control visibility of login panel
const showLoginPanel = ref(false);

// Methods
const handleGetStarted = () => {
  console.log('Navigating to Role selection page');
  router.push('/role'); // This assumes you have a route configured for the Role component
};

const handleLogin = () => {
  console.log('Login clicked');
  showLoginPanel.value = true;
};

const closeLoginPanel = () => {
  showLoginPanel.value = false;
};
</script>

<template>
  <div class="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-500 to-purple-600">
    <div class="md:py-20">
      <!-- Main content container -->
      <div class="flex flex-col items-center justify-center">
        <!-- Header -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
          Tender Supply Management
        </h1>
        <!-- Logo and tagline section -->
        <div class="flex flex-col items-center mt-8 mb-12">
          <div class="flex items-center justify-center mb-6">
            <div class="bg-white p-3 rounded-full">
              <svg class="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 7L20 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 7L4 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-3xl font-bold text-white ml-3">T.S.M.</span>
          </div>
          
          <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-white text-center">
            Find the Best Tenders from<br/>
            the Most Trusted Suppliers
          </h2>
        </div>
        
        <!-- Options list -->
        <div class="w-full max-w-md mb-12">
          <div v-for="(option, index) in options" :key="index" class="flex items-center mb-4">
            <div class="bg-white rounded-full p-1 mr-3">
              <svg class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-lg font-medium text-white">{{ option }}</span>
          </div>
        </div>
        
        <!-- Stats section -->
        <div class="flex justify-center w-full mb-12">
          <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
            <div v-for="(stat, index) in stats" :key="index" class="flex flex-col items-center">
              <span class="text-4xl font-bold text-yellow-300">{{ stat.value }}</span>
              <span class="text-sm font-medium text-white text-center" v-html="stat.label"></span>
            </div>
          </div>
        </div>
        
        <!-- CTA button -->
        <button class="w-full max-w-md bg-white text-blue-600 py-3 px-4 rounded-md font-medium shadow hover:bg-gray-100 transition duration-300" @click="handleGetStarted">
          GET STARTED TODAY!
        </button>
        
        <!-- Login link -->
        <div class="mt-4 text-sm text-white">
          Already have an account? <a href="#" class="underline font-medium" @click.prevent="handleLogin">Log in</a>
        </div>
      </div>
    </div>
    
    <!-- Slide-in Login panel -->
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <Login v-if="showLoginPanel" @close="closeLoginPanel" />
    </Transition>
    
    <!-- Overlay for when login panel is open -->
    <div 
      v-if="showLoginPanel" 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
      @click="closeLoginPanel"
    ></div>
  </div>
</template>