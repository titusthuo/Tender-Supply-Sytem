<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Navigation/Sidebar.vue'
import TopBar from '@/components/Navigation/TopBar.vue'

const router = useRouter()
const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)

// Toggle sidebar on mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu when route changes
onMounted(() => {
  router.afterEach(() => {
    mobileMenuOpen.value = false
  })
})

// You can add loading indicators or other router hooks if needed
// const loadingBar = ref(null)
// router.beforeEach(() => { /* start loading */ })
// router.afterEach(() => { /* finish loading */ })
</script>

<template>
  <div class="layout-container">
    <!-- Mobile menu toggle button -->
    <button 
      class="mobile-menu-toggle" 
      @click="toggleMobileMenu"
      aria-label="Toggle menu"
    >
      <span class="menu-icon"></span>
    </button>

    <!-- Sidebar section -->
    <div 
      class="sidebar" 
      :class="{ 
        'sidebar-collapsed': sidebarCollapsed,
        'sidebar-mobile-open': mobileMenuOpen 
      }"
    >
      <Sidebar :collapsed="sidebarCollapsed" />
    </div>

    <!-- Main content section -->
    <div class="main-content">
      <TopBar>
        <template #topLeft>
          <slot name="pageTopLeft">
            <!-- Empty space by default -->
          </slot>
        </template>
      </TopBar>
      <div class="content-area">
        <slot />
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div 
      v-if="mobileMenuOpen" 
      class="mobile-overlay"
      @click="mobileMenuOpen = false"
    ></div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
  position: relative;
}

.sidebar {
  width: 220px;
  transition: all 0.3s;
  border-right: 1px solid #e5e7eb;
  overflow: hidden;
  background-color: #fff;
  z-index: 20;
}

.sidebar-collapsed {
  width: 80px;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1.5rem;
}

.content-area {
  margin-top: 1rem;
  padding: 1rem 0;
}

.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 30;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  display: block;
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #333;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #333;
  left: 0;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .main-content {
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -220px;
    height: 100%;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar-mobile-open {
    left: 0;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-overlay {
    display: block;
  }
  
  .main-content {
    padding: 0 0.75rem;
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0 0.5rem;
  }
  
  .content-area {
    margin-top: 0.5rem;
    padding: 0.5rem 0;
  }
}
</style>