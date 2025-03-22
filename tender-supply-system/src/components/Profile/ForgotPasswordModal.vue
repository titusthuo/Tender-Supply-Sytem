<template>
    <div>
      <!-- Modal Backdrop -->
      <div 
        v-if="showModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="closeModalOnBackdropClick"
      >
        <!-- Reset Password Modal -->
        <div v-if="currentStep === 'request'" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" @click.stop>
          <h2 class="text-xl font-bold mb-4">Reset Password</h2>
          <p class="text-gray-600 mb-4">Enter your email to receive a reset link</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your email"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          
          <div class="flex justify-between items-center">
            <button 
              @click="sendResetLink" 
              class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Reset Link</span>
            </button>
            
            <button 
              @click="closeModal" 
              class="text-gray-600 hover:text-gray-800 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
        
        <!-- Check Email Modal -->
        <div v-if="currentStep === 'confirmation'" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center" @click.stop>
          <div class="flex justify-center mb-4">
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <h2 class="text-xl font-bold mb-2">Check Your Email</h2>
          <p class="text-gray-600 mb-4">We've sent a password reset link to:<br>{{ maskedEmail }}</p>
          
          <button 
            @click="resendEmail" 
            class="text-indigo-600 hover:text-indigo-800 transition"
            :disabled="resendCooldown > 0"
          >
            {{ resendCooldown > 0 ? `Resend Email (${resendCooldown}s)` : 'Resend Email' }}
          </button>
        </div>
        
        <!-- Create New Password Modal -->
        <div v-if="currentStep === 'reset'" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" @click.stop>
          <h2 class="text-xl font-bold mb-4">Create New Password</h2>
          <p class="text-gray-600 mb-4">Please create a strong, unique password</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div class="relative">
              <input 
                v-model="newPassword" 
                :type="showPassword ? 'text' : 'password'" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="New password"
                @input="checkPasswordStrength"
              />
              <button 
                @click="togglePasswordVisibility" 
                type="button" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            
            <div class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  class="h-2.5 rounded-full" 
                  :class="{
                    'bg-red-500': passwordStrength === 'weak',
                    'bg-yellow-500': passwordStrength === 'medium',
                    'bg-green-500': passwordStrength === 'strong'
                  }"
                  :style="{ width: passwordStrengthWidth }"
                ></div>
              </div>
              <p class="text-sm mt-1" :class="{
                'text-red-500': passwordStrength === 'weak',
                'text-yellow-500': passwordStrength === 'medium',
                'text-green-500': passwordStrength === 'strong'
              }">
                {{ passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1) }} strength
              </p>
            </div>
            
            <p v-if="errors.newPassword" class="mt-1 text-sm text-red-600">{{ errors.newPassword }}</p>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm new password"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>
          
          <button 
            @click="resetPassword" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Resetting...</span>
            <span v-else>Reset Password</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
      resetToken: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentStep: 'request',
        email: '',
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        passwordStrength: 'weak',
        resendCooldown: 0,
        resendTimer: null,
        isSubmitting: false,
        errors: {
          email: '',
          newPassword: '',
          confirmPassword: ''
        }
      }
    },
    computed: {
      passwordStrengthWidth() {
        switch(this.passwordStrength) {
          case 'weak': return '33%';
          case 'medium': return '66%';
          case 'strong': return '100%';
          default: return '0%';
        }
      },
      maskedEmail() {
        if (!this.email) return '';
        const [username, domain] = this.email.split('@');
        if (!username || !domain) return this.email;
        
        const maskedUsername = username.charAt(0) + 
          '*'.repeat(Math.max(1, username.length - 2)) + 
          (username.length > 1 ? username.charAt(username.length - 1) : '');
        
        return `${maskedUsername}@${domain}`;
      }
    },
    watch: {
      resetToken: {
        immediate: true,
        handler(token) {
          if (token) {
            this.currentStep = 'reset';
          }
        }
      }
    },
    methods: {
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email) {
          this.errors.email = 'Email is required';
          return false;
        } else if (!emailRegex.test(this.email)) {
          this.errors.email = 'Please enter a valid email address';
          return false;
        }
        
        this.errors.email = '';
        return true;
      },
      
      validateNewPassword() {
        if (!this.newPassword) {
          this.errors.newPassword = 'New password is required';
          return false;
        } else if (this.newPassword.length < 8) {
          this.errors.newPassword = 'Password must be at least 8 characters long';
          return false;
        }
        
        this.errors.newPassword = '';
        return true;
      },
      
      validateConfirmPassword() {
        if (!this.confirmPassword) {
          this.errors.confirmPassword = 'Please confirm your password';
          return false;
        } else if (this.newPassword !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match';
          return false;
        }
        
        this.errors.confirmPassword = '';
        return true;
      },
      
      checkPasswordStrength() {
        const password = this.newPassword;
        
        if (!password) {
          this.passwordStrength = 'weak';
          return;
        }
        
        // Calculate password strength
        let strength = 0;
        
        // Add points for length
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Add points for complexity
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Determine strength category
        if (strength <= 2) {
          this.passwordStrength = 'weak';
        } else if (strength <= 4) {
          this.passwordStrength = 'medium';
        } else {
          this.passwordStrength = 'strong';
        }
      },
      
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      
      startResendCooldown() {
        this.resendCooldown = 30;
        this.resendTimer = setInterval(() => {
          this.resendCooldown -= 1;
          if (this.resendCooldown <= 0) {
            clearInterval(this.resendTimer);
          }
        }, 1000);
      },
      
      async sendResetLink() {
        // Validate email
        if (!this.validateEmail()) return;
        
        this.isSubmitting = true;
        
        try {
          // In a real application, you would make an API call here
          // Example: await axios.post('/api/auth/reset-password', { email: this.email });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Move to confirmation step
          this.currentStep = 'confirmation';
          this.startResendCooldown();
          
          // Auto-close confirmation after 5 seconds
          setTimeout(() => {
            if (this.currentStep === 'confirmation') {
              this.closeModal();
            }
          }, 5000);
        } catch (error) {
          // Handle error
          console.error('Failed to send reset link:', error);
          this.errors.email = 'Failed to send reset link. Please try again.';
        } finally {
          this.isSubmitting = false;
        }
      },
      
      async resendEmail() {
        if (this.resendCooldown > 0) return;
        
        this.isSubmitting = true;
        
        try {
          // In a real application, you would make an API call here
          // Example: await axios.post('/api/auth/resend-reset', { email: this.email });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Start cooldown timer
          this.startResendCooldown();
        } catch (error) {
          // Handle error
          console.error('Failed to resend email:', error);
        } finally {
          this.isSubmitting = false;
        }
      },
      
      async resetPassword() {
        // Validate password fields
        const isNewPasswordValid = this.validateNewPassword();
        const isConfirmPasswordValid = this.validateConfirmPassword();
        
        if (!isNewPasswordValid || !isConfirmPasswordValid) return;
        
        this.isSubmitting = true;
        
        try {
          // In a real application, you would make an API call here
          // Example: await axios.post('/api/auth/set-new-password', { 
          //   token: this.resetToken, 
          //   password: this.newPassword 
          // });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Show success message and close modal
          alert('Password reset successfully! You can now log in with your new password.');
          this.closeModal();
        } catch (error) {
          // Handle error
          console.error('Failed to reset password:', error);
          alert('Failed to reset password. Please try again or request a new reset link.');
        } finally {
          this.isSubmitting = false;
        }
      },
      
      closeModal() {
        // Clear form data
        this.email = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.errors = { email: '', newPassword: '', confirmPassword: '' };
        
        // Clear timers
        if (this.resendTimer) {
          clearInterval(this.resendTimer);
          this.resendTimer = null;
        }
        
        // Reset to initial step
        this.currentStep = 'request';
        
        // Emit close event
        this.$emit('close');
      },
      
      closeModalOnBackdropClick(event) {
        // Close modal when clicking on backdrop
        if (event.target === event.currentTarget) {
          this.closeModal();
        }
      }
    },
    beforeDestroy() {
      // Clean up timers
      if (this.resendTimer) {
        clearInterval(this.resendTimer);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Transitions for smooth feedback */
  .bg-red-500, .bg-yellow-500, .bg-green-500 {
    transition: width 0.3s ease-in-out;
  }
  </style>