// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Role from '../components/Role.vue'
import BuyerDashboard from '../components/Buyer/BuyerDashboard.vue'
import Tenders from '../components/Buyer/Tenders.vue'
import SupplierManagement from '../components/Buyer/SupplierManagement.vue'
import ContractManagement from '../components/Buyer/ContractManagement.vue'
import SupplierDashboard from '../components/Supplier/supplierDashboard.vue'
import SupplierProducts from '../components/Supplier/SupplierProducts.vue'
import SupplierProfile from '../components/Supplier/SupplierProfile.vue'
import SupplierTenders from '../components/Supplier/SupplierTenders.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/role',
    name: 'role',
    component: Role
  },
  {
    path: '/buyers',
    name: 'buyers',
    component: BuyerDashboard
  },
  {
    path: '/SupplierDashboard',
    name: 'supplierDashboard',
    component: SupplierDashboard
  },
  {
    path: '/SupplierProducts',
    name: 'SupplierProducts',
    component: SupplierProducts
  },
  {
    path: '/SupplierProfile',
    name: 'SupplierProfile',
    component: SupplierProfile
  },
  {
    path: '/SupplierTenders',
    name: 'SupplierTenders',
    component: SupplierTenders
  },

  {
    path: '/tenders',
    name: 'tenders',
    component: Tenders
  },
  {
    path: '/supplierManagement',
    name: 'supplierManagement',
    component: SupplierManagement,
  },
  
  {
    path: '/contractManagement',
    name: 'contractManagement',
    component: ContractManagement,
  },
  // other routes...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router