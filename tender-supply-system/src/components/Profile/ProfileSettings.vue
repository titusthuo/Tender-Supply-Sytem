<template>
    <div class="bg-gray-100 min-h-screen py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-center mb-8">User Settings</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Profile Photo Card -->
          <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div class="relative mb-4">
              <div v-if="profileImage" class="h-32 w-32 rounded-full overflow-hidden mb-2">
                <img :src="profileImage" alt="Profile" class="w-full h-full object-cover" />
              </div>
              <div v-else class="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="file" 
                ref="fileInput" 
                accept="image/*" 
                class="hidden" 
                @change="handleImageUpload"
              />
            </div>
            
            <p class="text-lg font-semibold">{{ userName }}</p>
            <p class="text-gray-500 mb-4">{{ userEmail }}</p>
            
            <button 
              @click="$refs.fileInput.click()" 
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition mb-2"
            >
              Upload Photo
            </button>
            
            <button 
              v-if="profileImage" 
              @click="removePhoto" 
              class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            >
              Remove Photo
            </button>
          </div>
          
          <!-- User Information Card -->
          <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 class="text-xl font-semibold mb-4">Details</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  v-model="firstName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="First Name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  v-model="lastName" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Last Name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email"
                />
              </div>
              
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input 
                    v-model="countryCode" 
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1"
                  />
                </div>
                
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    v-model="phoneNumber" 
                    type="tel" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
            
            <button 
              @click="saveUserDetails" 
              class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Save changes
            </button>
            
            <hr class="my-6" />
            
            <h2 class="text-xl font-semibold mb-4">Password</h2>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input 
                v-model="currentPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Current password"
              />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  v-model="newPassword" 
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="New password"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  v-model="confirmPassword" 
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <button 
                @click="changePassword" 
                class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                Save changes
              </button>
              
              <button 
                @click="showForgotPasswordModal = true"
                class="text-indigo-600 hover:text-indigo-800 transition"
              >
                Forgot your password?
              </button>
            </div>
            
            <hr class="my-6" />
            
            <h2 class="text-xl font-semibold mb-4">Preferences</h2>
            
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-700">Theme</span>
              <div class="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  v-model="darkMode" 
                  type="checkbox" 
                  id="toggle" 
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label 
                  for="toggle" 
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <span class="text-sm text-gray-700">{{ darkMode ? 'Dark' : 'Light' }}</span>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select 
                v-model="language" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <button 
              @click="savePreferences" 
              class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
      
      <!-- Forgot Password Component -->
      <ForgotPasswordModal 
        :showModal="showForgotPasswordModal" 
        :resetToken="resetToken"
        @close="showForgotPasswordModal = false"
      />
    </div>
  </template>
  
  <script>
  import ForgotPasswordModal from './ForgotPasswordModal.vue';
  
  export default {
    components: {
      ForgotPasswordModal
    },
    data() {
      return {
        // Profile data
        profileImage: null,
        firstName: 'Pepito',
        lastName: 'Coronel',
        email: 'pepito.c.sifuentes@uni.pe',
        countryCode: '+51',
        phoneNumber: '969 123 456',
        userName: '@User-Name',
        userEmail: 'user@email.com',
        
        // Password data
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        
        // Preferences
        darkMode: true,
        language: 'en',
        
        // Forgot Password Modal
        showForgotPasswordModal: false,
        resetToken: '' // This would come from URL query params in a real app
      }
    },
    created() {
      // In a real app, you would check if there's a reset token in the URL
      // const urlParams = new URLSearchParams(window.location.search);
      // this.resetToken = urlParams.get('reset_token') || '';
      // if (this.resetToken) {
      //   this.showForgotPasswordModal = true;
      // }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Create a URL for the image file
          this.profileImage = URL.createObjectURL(file);
          
          // In a real application, you would upload the file to your server here
          // using FormData and a fetch/axios request
        }
      },
      removePhoto() {
        this.profileImage = null;
        // In a real application, you would make an API call to remove the profile photo
      },
      saveUserDetails() {
        // Here you would make an API call to save user details
        alert('User details saved successfully');
        
        // Update the display name and email
        this.userName = `${this.firstName} ${this.lastName}`;
        this.userEmail = this.email;
      },
      changePassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert('New passwords do not match');
          return;
        }
        
        if (!this.currentPassword) {
          alert('Please enter your current password');
          return;
        }
        
        // Here you would make an API call to change the password
        alert('Password changed successfully');
        
        // Clear password fields
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      savePreferences() {
        // Here you would make an API call to save preferences
        alert('Preferences saved successfully');
        
        // In a real app, you would apply the theme change here
        document.documentElement.classList.toggle('dark-mode', this.darkMode);
      }
    }
  }
  </script>
  
  <style>
  /* Custom styles for the toggle switch */
  .toggle-checkbox:checked {
    right: 0;
    border-color: #4f46e5;
  }
  .toggle-checkbox:checked + .toggle-label {
    background-color: #4f46e5;
  }
  .toggle-label {
    transition: background-color 0.2s ease;
  }
  </style>