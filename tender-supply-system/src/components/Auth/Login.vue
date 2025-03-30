<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);
const router = useRouter();

// Form data
const email = ref('');
const password = ref('');
const rememberMe = ref(false);

// Handle standard login
const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value);
  // Here you would typically make an API call to verify credentials
  
  // For demo purposes, just redirect
  redirectToBuyerDashboard();
};

// Social login handlers
const handleGoogleSignIn = () => {
  console.log('Google sign-in clicked');
  // Implement Google OAuth here
  redirectToBuyerDashboard();
};

const handleAppleSignIn = () => {
  console.log('Apple sign-in clicked');
  // Implement Apple OAuth here
  redirectToBuyerDashboard();
};

const handleFacebookSignIn = () => {
  console.log('Facebook sign-in clicked');
  // Implement Facebook OAuth here
  redirectToBuyerDashboard();
};

// Common redirect function
const redirectToBuyerDashboard = () => {
  // Close the login panel
  emit('close');
  
  // Redirect to buyers component
  router.push('/buyers');
};

// Handle sign up click
const handleSignUp = () => {
  console.log('Sign up clicked');
  emit('close');
  router.push('/signup');
};

// Handle forgot password
const handleForgotPassword = () => {
  console.log('Forgot password clicked');
  // Implement your forgot password flow
};
</script>
<template>
  <div class="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col overflow-y-auto">
    <!-- Blue accent bar at the top (on mobile) or left (on larger screens) -->
    <div class="h-2 w-full md:w-2 md:h-full bg-blue-600 absolute top-0 left-0 md:top-0"></div>
    
    <!-- Close button -->
    <button 
      @click="$emit('close')" 
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
      aria-label="Close login panel"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    
    <!-- Login form -->
    <div class="flex-1 p-4 sm:p-6 md:p-8 pt-8 md:ml-2">
      <div class="mb-6 md:mb-8">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p class="text-gray-600 text-xs sm:text-sm">Enter your Credentials to access your account</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="mb-4 sm:mb-6">
        <div class="mb-3 sm:mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="your@email.com"
          />
        </div>
        
        <div class="mb-3 sm:mb-4">
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <button 
              type="button" 
              @click="handleForgotPassword"
              class="text-xs text-blue-600 hover:underline"
            >
              forgot password?
            </button>
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
        
        <div class="mb-4 sm:mb-6">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-xs sm:text-sm text-gray-700">
              Remember for 30 days
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          class="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Login
        </button>
      </form>
      
      <div class="relative my-4 sm:my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-xs sm:text-sm">
          <span class="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>
      
      <!-- Social login buttons -->
      <div class="space-y-2 sm:space-y-3">
        <button
          @click="handleGoogleSignIn"
          class="w-full flex items-center justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
          </svg>
          <span class="truncate">Sign in with Google</span>
        </button>
        
        <button
          @click="handleAppleSignIn"
          class="w-full flex items-center justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" fill="#000000"/>
          </svg>
          <span class="truncate">Sign in with Apple</span>
        </button>
        
        <button
          @click="handleFacebookSignIn"
          class="w-full flex items-center justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
          </svg>
          <span class="truncate">Continue with Facebook</span>
        </button>
      </div>
      
      <div class="mt-4 sm:mt-6 text-center">
        <span class="text-xs sm:text-sm text-gray-600">Don't have an account?</span>
        <button @click="handleSignUp" class="ml-1 text-xs sm:text-sm text-blue-600 hover:underline">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>