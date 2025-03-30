<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const crumbs = route.meta.breadcrumbs
  
  if (typeof crumbs === 'function') {
    return crumbs(route)
  } else if (!crumbs) {
    return []
  }
  
  return crumbs.map(crumb => {
    // Process dynamic values if needed
    if (typeof crumb.to === 'function') {
      crumb.to = crumb.to(route)
    }
    if (typeof crumb.text === 'function') {
      crumb.text = crumb.text(route)
    }
    return crumb
  })
})
</script>

<template>
  <div class="breadcrumb-container">
    <ul class="breadcrumb-list">
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index"
        class="breadcrumb-item"
      >
        <template v-if="!crumb.active">
          <a 
            @click="router.push(crumb.to)"
            class="breadcrumb-link"
          >
            <i v-if="crumb.text.toLowerCase() === 'home'" class="icon icon-home"></i>
            <span>{{ crumb.text }}</span>
          </a>
        </template>
        <span v-else class="breadcrumb-text">{{ crumb.text }}</span>
        <span v-if="index !== breadcrumbs.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.breadcrumb-container {
  padding: 0.5rem 1rem;
  width: 100%;
  overflow-x: auto;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: min-content;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  color: #3b82f6;
  cursor: pointer;
  text-decoration: none;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-text {
  color: #6b7280;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #9ca3af;
}

.icon {
  margin-right: 0.25rem;
  flex-shrink: 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  .breadcrumb-container {
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 576px) {
  .breadcrumb-container {
    padding: 0.5rem 0.5rem;
  }
  
  .breadcrumb-separator {
    margin: 0 0.25rem;
  }
}

@media (max-width: 480px) {
  .breadcrumb-container {
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  
  .breadcrumb-list {
    flex-wrap: nowrap;
  }
}
</style>