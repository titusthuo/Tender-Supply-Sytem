<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps({
  initialCollapsed: {
    type: Boolean,
    default: false
  }
})

const collapsed = ref(props.initialCollapsed)

const router = useRouter()
const route = useRoute()
const currentKey = ref('')

const menuItems = [
  {
    label: 'Home',
    key: 'home',
    icon: 'ph:house-duotone'
  },
  {
    label: 'Buyer',
    key: 'buyers',
    icon: 'ph:shopping-cart-duotone',
    children: [
      {
        label: 'Dashboard',
        key: 'buyers',
        icon: 'ph:chart-pie-slice-duotone'
      },
      {
        label: 'Tenders',
        key: 'tenders',
        icon: 'ph:file-text-duotone'
      },
      {
        label: 'Contract Management',
        key: 'contractManagement',
        icon: 'ph:file-lock-duotone'
      },
      {
        label: 'Order Management',
        key: 'orderManagement',
        icon: 'ph:shopping-bag-duotone'
      },
    ]
  },
  {
    label: 'Supplier',
    key: 'Supplier',
    icon: 'ph:storefront-duotone',
    children: [
      {
        label: 'Dashboard',
        key: 'SupplierDashboard',
        icon: 'ph:chart-line-duotone',
      },
      {
        label: 'Tenders',
        key: 'SupplierTenders',
        icon: 'ph:users-duotone'
      }
    ]
  },
  {
    label: 'Bidding',
    key: 'bidding',
    icon: 'ph:scales-duotone'
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: 'ph:user-circle-duotone'
  },
  {
    label: 'Role Selection',
    key: 'role',
    icon: 'ph:user-switch-duotone'
  }
]

// Find active menu item based on current route
function findActiveKey() {
  // First check exact match
  const exactMatch = route.name
  
  // If there's a match in the top level, return it
  if (menuItems.some(item => item.key === exactMatch)) {
    return exactMatch
  }
  
  // Check children
  for (const item of menuItems) {
    if (item.children) {
      if (item.children.some(child => child.key === exactMatch)) {
        return exactMatch
      }
    }
  }
  
  // If no exact match, find parent section
  for (const item of menuItems) {
    if (item.children) {
      if (item.children.some(child => child.key === exactMatch)) {
        return item.key
      }
    }
  }
  
  return 'home'
}

// Update active key when route changes
watch(
  () => route.name,
  () => {
    currentKey.value = findActiveKey()
  },
  { immediate: true }
)

function handleMenuSelection(key) {
  router.push({ name: key })
}

// Toggle sidebar collapse
function toggleSidebar() {
  collapsed.value = !collapsed.value
}

// Computed property to track expanded sections
const expandedSections = computed(() => {
  if (collapsed.value) {
    return [currentKey.value]
  }
  return menuItems.map(item => item.key)
})
</script>

<template>
  <div 
    class="fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 ease-in-out"
    :class="{
      'w-64': !collapsed,
      'w-20': collapsed
    }"
  >
    <div 
      class="flex flex-col h-full bg-gray-100 border-r border-gray-200 
             shadow-lg transform transition-transform duration-300 ease-in-out"
      :class="{
        '-translate-x-full': false,  // Always visible
        'w-64': !collapsed,
        'w-20': collapsed
      }"
    >
      <!-- Toggle Button -->
      <button 
        @click="toggleSidebar"
        class="absolute top-4 right-0 translate-x-full bg-gray-200 
               p-2 rounded-r-lg shadow-md z-50 transition-all duration-300"
      >
        <Icon 
          :icon="collapsed ? 'ph:arrow-right-bold' : 'ph:arrow-left-bold'" 
          class="w-5 h-5 text-gray-600"
        />
      </button>

      <!-- Logo Container -->
      <div class="flex justify-center items-center p-4 border-b border-gray-200">
        <div 
          class="text-xl font-bold text-gray-800"
        >
          {{ collapsed ? 'YL' : 'Your Logo' }}
        </div>
      </div>

      <!-- Menu Container -->
      <div class="flex-grow overflow-y-auto py-4">
        <nav>
          <ul class="space-y-1">
            <li 
              v-for="item in menuItems" 
              :key="item.key"
              class="px-4"
            >
              <!-- Top Level Menu Item -->
              <div 
                @click="item.children ? null : handleMenuSelection(item.key)"
                class="flex items-center p-2 rounded-lg cursor-pointer 
                       hover:bg-gray-200 
                       transition-colors duration-200"
                :class="{
                  'bg-gray-200': currentKey === item.key
                }"
              >
                <Icon 
                  :icon="item.icon" 
                  class="w-5 h-5 mr-3 text-gray-600"
                />
                <span 
                  v-if="!collapsed" 
                  class="flex-grow text-sm font-medium text-gray-800"
                >
                  {{ item.label }}
                </span>
              </div>

              <!-- Submenu -->
              <ul 
                v-if="item.children && 
                       (!collapsed || currentKey === item.key)"
                class="mt-1 space-y-1"
              >
                <li 
                  v-for="child in item.children" 
                  :key="child.key"
                  class="pl-8"
                >
                  <div 
                    @click="handleMenuSelection(child.key)"
                    class="flex items-center p-2 rounded-lg cursor-pointer 
                           hover:bg-gray-200 
                           transition-colors duration-200"
                    :class="{
                      'bg-gray-200': route.name === child.key
                    }"
                  >
                    <Icon 
                      :icon="child.icon" 
                      class="w-4 h-4 mr-3 text-gray-600"
                    />
                    <span 
                      v-if="!collapsed" 
                      class="text-sm text-gray-700"
                    >
                      {{ child.label }}
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <!-- User Profile Section -->
      <div 
        class="p-4 border-t border-gray-200 
               flex items-center space-x-3"
      >
        <div 
          class="w-10 h-10 rounded-full bg-gray-300 
                 flex items-center justify-center"
        >
          <Icon 
            icon="ph:user-circle-duotone" 
            class="w-6 h-6 text-gray-600" 
          />
        </div>
        <div v-if="!collapsed" class="flex-grow">
          <p class="text-sm font-medium text-gray-800">
            User Name
          </p>
          <p class="text-xs text-gray-600">
            Role
          </p>
        </div>
      </div>
    </div>
  </div>
</template>