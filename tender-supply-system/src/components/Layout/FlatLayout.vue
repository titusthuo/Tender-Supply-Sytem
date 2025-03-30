<script setup>
// A simple layout without sidebar
</script>

<template>
  <div class="flat-layout">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.flat-layout {
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .flat-layout {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .flat-layout {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .flat-layout {
    padding: 0.75rem;
  }
}
</style>