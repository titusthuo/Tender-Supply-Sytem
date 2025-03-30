<script setup>
import { ref } from 'vue'

// You can add props or logic here as needed
</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <slot name="topLeft"></slot>
    </div>
    <div class="topbar-right">
      <!-- Add your right-side elements here -->
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input" />
      </div>
      
      <div class="actions-container">
        <button class="action-button">
          <!-- Notifications icon -->
          <i class="icon icon-bell"></i>
        </button>
        
        <button class="action-button">
          <!-- Settings icon -->
          <i class="icon icon-cog"></i>
        </button>
        
        <div class="theme-toggle">
          <!-- Theme switcher -->
          <label class="switch">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 1rem;
}

.topbar-left {
  flex: 1;
  min-width: 150px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
}

.search-input {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  width: 200px;
  max-width: 100%;
}

.actions-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: nowrap;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  background-color: #f3f4f6;
}

.theme-toggle {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Responsive styles */
@media (max-width: 768px) {
  .topbar {
    padding: 1rem;
  }
  
  .topbar-left, .topbar-right {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 576px) {
  .search-input {
    width: 150px;
  }
  
  .actions-container {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .topbar-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-container {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>