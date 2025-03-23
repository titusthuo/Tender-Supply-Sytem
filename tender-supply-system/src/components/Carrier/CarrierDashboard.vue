<template>
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Carrier Dashboard</h1>
        
        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Transportation Request Form -->
          <CarrierRequestForm />
          
          <!-- Carrier Selection -->
          <CarrierSelection />
        </div>
        
        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Shipment Tracking -->
          <ShipmentTracking />
          
          <!-- International Shipping Options -->
          <InternationalShipping />
        </div>
        
        <div class="mt-6">
          <!-- Carrier Registration -->
          <CarrierRegistration />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import CarrierRequestForm from './CarrierRequestForm.vue'
  import CarrierSelection from './CarrierSelection.vue'
  import ShipmentTracking from './ShipmentTracking.vue'
  import InternationalShipping from './InternationalShipping.vue'
  import CarrierRegistration from './CarrierRegistration.vue'
  </script>