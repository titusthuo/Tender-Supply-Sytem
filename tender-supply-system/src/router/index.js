// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Role from '../components/Role.vue'
import BuyerDashboard from '../components/Buyer/BuyerDashboard.vue'
import Tenders from '../components/Buyer/Tenders.vue'
import SupplierManagement from '../components/Buyer/SupplierManagement.vue'
import ContractManagement from '../components/Buyer/ContractManagement.vue'
import OrderManagement from '../components/Buyer/OrderManagement.vue'
import ReportAndCompliance from '../components/Buyer/ReportAndCompliance.vue'
import ProfileSettings from '../components/Profile/ProfileSettings.vue'

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
  {
    path: '/orderManagement',
    name: 'orderManagement',
    component: OrderManagement,
  },
  {
    path: '/reportAndCompliance',
    name: 'reportAndCompliance',
    component: ReportAndCompliance
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileSettings
  }
  // other routes...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router