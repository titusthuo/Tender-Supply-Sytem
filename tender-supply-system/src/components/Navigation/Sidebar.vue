<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()
const currentKey = ref('')

const menuItems = [
  {
    label: 'Home',
    key: 'home',
    icon: 'home',
  },
  {
    label: 'Buyer',
    key: 'buyers',
    icon: 'shopping-cart',
    children: [
      {
        label: 'Dashboard',
        key: 'buyers',
        icon: 'dashboard'
      },
      {
        label: 'Tenders',
        key: 'tenders',
        icon: 'file-text'
      },
      {
        label: 'Supplier Management',
        key: 'supplierManagement',
        icon: 'users'
      },
      {
        label: 'Contract Management',
        key: 'contractManagement',
        icon: 'file-contract'
      },
      {
        label: 'Order Management',
        key: 'orderManagement',
        icon: 'shopping-bag'
      },
      {
        label: 'Reports & Compliance',
        key: 'reportAndCompliance',
        icon: 'chart-bar'
      }
    ]
  },
  {
    label: 'Bidding',
    key: 'bidding',
    icon: 'gavel'
  },
  {
    label: 'Carrier',
    key: 'carrier',
    icon: 'truck',
    children: [
      {
        label: 'Dashboard',
        key: 'carrier',
        icon: 'dashboard'
      },
      {
        label: 'Request Form',
        key: 'carrierRequestForm',
        icon: 'file-alt'
      },
      {
        label: 'Carrier Selection',
        key: 'carrierSelection',
        icon: 'truck-loading'
      },
      {
        label: 'Shipment Tracking',
        key: 'shipmentTracking',
        icon: 'map-marker'
      },
      {
        label: 'International Shipping',
        key: 'internationalShipping',
        icon: 'globe'
      },
      {
        label: 'Registration',
        key: 'carrierRegistration',
        icon: 'user-plus'
      }
    ]
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: 'user'
  },
  {
    label: 'Role Selection',
    key: 'role',
    icon: 'user-tag'
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

// Function to render icon (you'll need to implement this with your icon library)
function renderIcon(iconName) {
  // Placeholder for your icon rendering
  return `<i class="icon icon-${iconName}"></i>`
}
</script>

<template>
  <div class="sidebar-container">
    <div class="logo-container">
      <!-- Your logo here -->
    </div>
    
    <div class="menu-container">
      <!-- Implement your menu component here -->
      <ul class="menu-list">
        <li 
          v-for="item in menuItems" 
          :key="item.key"
          :class="{ 
            'menu-item': true,
            'active': currentKey === item.key,
            'has-children': item.children
          }"
          @click="item.children ? null : handleMenuSelection(item.key)"
        >
          <div class="menu-item-content">
            <span class="menu-icon" v-html="renderIcon(item.icon)"></span>
            <span v-if="!collapsed" class="menu-label">{{ item.label }}</span>
          </div>
          
          <ul v-if="item.children && (!collapsed || currentKey === item.key)" class="submenu">
            <li 
              v-for="child in item.children" 
              :key="child.key"
              :class="{ 
                'submenu-item': true,
                'active': route.name === child.key
              }"
              @click.stop="handleMenuSelection(child.key)"
            >
              <div class="submenu-item-content">
                <span class="submenu-icon" v-html="renderIcon(child.icon)"></span>
                <span v-if="!collapsed" class="submenu-label">{{ child.label }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div class="user-profile">
      <!-- User profile display -->
      <div class="user-avatar">
        <!-- Avatar -->
      </div>
      <span v-if="!collapsed" class="username">User Name</span>
    </div>
  </div>
</template>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f9fa;
}

.logo-container {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  max-width: 150px;
  height: auto;
}

.logo-small {
  max-width: 40px;
  height: auto;
}

.menu-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #e5e7eb;
}

.menu-item.active {
  background-color: #e5e7eb;
  font-weight: 600;
}

.menu-item-content {
  display: flex;
  align-items: center;
}

.menu-icon {
  margin-right: 0.75rem;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 1.5rem;
}

.submenu-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.submenu-item:hover {
  background-color: #e5e7eb;
}

.submenu-item.active {
  background-color: #e5e7eb;
  font-weight: 600;
}

.submenu-item-content {
  display: flex;
  align-items: center;
}

.submenu-icon {
  margin-right: 0.75rem;
  font-size: 0.85em;
}

.user-profile {
  padding: 1rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e7eb;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 0.75rem;
}
</style>