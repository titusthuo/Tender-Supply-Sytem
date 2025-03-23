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
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>