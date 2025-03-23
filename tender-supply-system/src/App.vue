<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from './components/Layout/DashboardLayout.vue'
import FlatLayout from './components/Layout/FlatLayout.vue'
import Breadcrumb from './components/Layout/Breadcrumb.vue'

// Make sure this is working correctly
const route = useRoute()

// Add a fallback in case route is undefined
const layout = computed(() => {
  return route?.meta?.layout || DashboardLayout
})

// Add a fallback in case route is undefined
const topLeftSlot = computed(() => {
  return route?.meta?.topLeftSlot || Breadcrumb
})
</script>

<template>
  <component :is="layout">
    <template #pageTopLeft>
      <component :is="topLeftSlot" />
    </template>
    <router-view />
  </component>
</template>