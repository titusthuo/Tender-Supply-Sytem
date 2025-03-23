<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Supplier Portal</h1>
        <div class="flex space-x-2">
          <button class="bg-white bg-opacity-20 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="bg-white bg-opacity-20 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>
  
      <!-- Main Content Area -->
      <div class="flex">
        <!-- Sidebar Navigation -->
        <div class="w-64 bg-white shadow-md h-screen">
          <nav class="w-48 bg-white p-4 shadow-sm">
            <div class="space-y-2">
          <router-link to="/SupplierDashboard" class="flex items-center w-full p-3 rounded-md bg-blue-500 text-white">
            <div class="w-6 h-6 rounded-full bg-white mr-3"></div>
            <span>Dashboard</span>
          </router-link>
          
          <router-link to="/SupplierProducts" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
            <span>Products</span>
          </router-link>
          
          <router-link to="/SupplierTenders" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
            <span>Tenders</span>
          </router-link>
          
          <router-link to="/SupplierProfile" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
            <span>Profile</span>
          </router-link>
          
          <router-link to="/orders" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
            <span>Orders</span>
          </router-link>
          
          <router-link to="/settings" class="flex items-center w-full p-3 rounded-md hover:bg-gray-100">
            <div class="w-6 h-6 rounded-full bg-gray-700 mr-3"></div>
            <span>Settings</span>
          </router-link>
        </div>
          </nav>
        </div>
  
        <!-- Content Area -->
        <div class="flex-1 p-8">
          <h2 class="text-2xl font-semibold mb-6">Company Profile</h2>
  
          <!-- Tabs -->
          <div class="flex border-b mb-6">
            <button @click="activeTab = 'company'" :class="{'border-b-2 border-blue-500 text-blue-500': activeTab === 'company'}" class="px-4 py-2 font-medium">
              Company
            </button>
            <button @click="activeTab = 'contact'" :class="{'border-b-2 border-blue-500 text-blue-500': activeTab === 'contact'}" class="px-4 py-2 font-medium">
              Contact
            </button>
            <button @click="activeTab = 'shipping'" :class="{'border-b-2 border-blue-500 text-blue-500': activeTab === 'shipping'}" class="px-4 py-2 font-medium">
              Shipping
            </button>
            <button @click="activeTab = 'banking'" :class="{'border-b-2 border-blue-500 text-blue-500': activeTab === 'banking'}" class="px-4 py-2 font-medium">
              Banking
            </button>
          </div>
  
          <!-- Company Tab -->
          <div v-if="activeTab === 'company'" class="bg-white p-6 rounded shadow">
            <h3 class="font-medium mb-4">Company Details</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.name">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.regNumber">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">VAT/Tax ID</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.taxId">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                  <select class="w-full p-2 border rounded" v-model="company.businessType">
                    <option>Limited Company</option>
                    <option>Sole Proprietorship</option>
                    <option>Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Company Address *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.address">
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Year Founded</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.yearFounded">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="company.employees">
                </div>
              </div>
            </div>
  
            <div class="flex justify-end mt-6 space-x-4">
              <p class="text-xs text-gray-500 self-center">* Required fields</p>
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded">Discard</button>
              <button @click="activeTab = 'contact'" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </div>
  
          <!-- Contact Tab -->
          <div v-if="activeTab === 'contact'" class="bg-white p-6 rounded shadow">
            <h3 class="font-medium mb-4">Primary Contact</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="contact.primaryName">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="contact.primaryPosition">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" class="w-full p-2 border rounded" v-model="contact.primaryEmail">
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" class="w-full p-2 border rounded" v-model="contact.primaryPhone">
                </div>
              </div>
            </div>
            
            <h3 class="font-medium mb-4 mt-8">Secondary Contact (Optional)</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="contact.secondaryName">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="contact.secondaryPosition">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" class="w-full p-2 border rounded" v-model="contact.secondaryEmail">
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" class="w-full p-2 border rounded" v-model="contact.secondaryPhone">
                </div>
              </div>
            </div>
  
            <div class="flex justify-end mt-6 space-x-4">
              <p class="text-xs text-gray-500 self-center">* Required fields</p>
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
              <button @click="activeTab = 'shipping'" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </div>
  
          <!-- Shipping Tab -->
          <div v-if="activeTab === 'shipping'" class="bg-white p-6 rounded shadow">
            <h3 class="font-medium mb-4">Primary Shipping Address</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="shipping.addressLine1">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="shipping.addressLine2">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="shipping.state">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="shipping.city">
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="shipping.postalCode">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select class="w-full p-2 border rounded" v-model="shipping.country">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="mt-6">
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm">+ Add Address</button>
            </div>
  
            <div class="flex justify-end mt-6 space-x-4">
              <p class="text-xs text-gray-500 self-center">* Required fields</p>
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
              <button @click="activeTab = 'banking'" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </div>
  
          <!-- Banking Tab -->
          <div v-if="activeTab === 'banking'" class="bg-white p-6 rounded shadow">
            <h3 class="font-medium mb-4">Banking Information</h3>
            <p class="text-sm text-gray-500 mb-6">★ Bank Account Details are used for payment and need to be verified.</p>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.bankName">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Account Holder Name *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.accountName">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.accountNumber">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.currency">
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sort Code *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.sortCode">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">SWIFT/BIC Code *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.swiftCode">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
                  <input type="text" class="w-full p-2 border rounded" v-model="banking.iban">
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">USD - US Dollar ▼</label>
                  <input type="text" class="w-full p-2 border rounded" value="Primary" disabled>
                </div>
              </div>
            </div>
  
            <div class="flex justify-end mt-6 space-x-4">
              <p class="text-xs text-gray-500 self-center">* Required fields</p>
              <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
              <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'company',
        company: {
          name: 'Acme Corporation',
          regNumber: 'REG12345678',
          taxId: 'VAT9876543',
          businessType: 'Limited Company',
          address: '123 Business Street',
          yearFounded: '2010',
          employees: '50-100'
        },
        contact: {
          primaryName: 'John Smith',
          primaryPosition: 'Procurement Manager',
          primaryEmail: 'john.smith@acme.com',
          primaryPhone: '+1 (555) 123-4567',
          secondaryName: '',
          secondaryPosition: '',
          secondaryEmail: '',
          secondaryPhone: ''
        },
        shipping: {
          addressLine1: '123 Shipping Lane',
          addressLine2: 'Unit 4B',
          city: 'Metropolis',
          state: 'California',
          postalCode: '90210',
          country: 'United States'
        },
        banking: {
          bankName: 'International Bank',
          accountName: 'Acme Corporation',
          accountNumber: '1234567890',
          sortCode: '12-34-56',
          swiftCode: 'INTLBANK123',
          iban: 'US1234567890123456',
          currency: 'USD'
        }
      }
    }
  }
  </script>