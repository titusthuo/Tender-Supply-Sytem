<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Navigation/Sidebar.vue'
import TopBar from '@/components/Navigation/TopBar.vue'

const router = useRouter()
const sidebarCollapsed = ref(false)

// You can add loading indicators or other router hooks if needed
// const loadingBar = ref(null)
// router.beforeEach(() => { /* start loading */ })
// router.afterEach(() => { /* finish loading */ })
</script>

<template>
  <div class="layout-container">
    <!-- Sidebar section -->
    <div 
      class="sidebar" 
      :class="{ 'sidebar-collapsed': sidebarCollapsed }"
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
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  width: 220px;
  transition: width 0.3s;
  border-right: 1px solid #e5e7eb;
  overflow: hidden;
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
</style>