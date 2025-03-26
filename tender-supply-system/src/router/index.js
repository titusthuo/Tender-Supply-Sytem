// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Role from '../components/Role.vue'
import BuyerDashboard from '../components/Buyer/BuyerDashboard.vue'
import Tenders from '../components/Buyer/Tenders.vue'
import SupplierManagement from '../components/Buyer/SupplierManagement.vue'
import ContractManagement from '../components/Buyer/ContractManagement.vue'
import OrderManagement from '../components/Buyer/OrderManagement.vue'
import ProfileSettings from '../components/Profile/ProfileSettings.vue'
import BiddingDashboard from '../components/Bidding/Dashboard.vue'
import SupplierDashboard from '../components/Supplier/SupplierDashboard.vue'
import SupplierTenders from '../components/Supplier/SupplierTenders.vue'
import TenderDetails from '../components/Buyer/TenderDetails.vue'
import SupplierDetails from '../components/Supplier/SupplierDetails.vue'
import BidConfirmation from '../components/Bidding/BidConfirmation.vue'
import ContractDetails from '../components/Buyer/ContractDetails.vue'
// Import layouts and components
import DashboardLayout from '../components/Layout/DashboardLayout.vue'
import FlatLayout from '../components/Layout/FlatLayout.vue'
import Breadcrumb from '../components/Layout/Breadcrumb.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: FlatLayout, 
      breadcrumbs: [
        {
          text: 'Home',
          active: true
        }
      ]
    }
  },
  {
    path: '/role',
    name: 'role',
    component: Role,
    meta: {
      layout: FlatLayout, // Flat layout for role selection
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Role Selection',
          active: true
        }
      ]
    }
  },
  // Buyer routes
  {
    path: '/buyers',
    name: 'buyers',
    component: BuyerDashboard,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer Dashboard',
          active: true
        }
      ]
    }
  },
  {
    path: '/tenders',
    name: 'tenders',
    component: Tenders,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'buyers' }
        },
        {
          text: 'Tenders',
          active: true
        }
      ]
    }
  },
  {
    path: '/tenders/:id', // Dynamic route for tender details
    name: 'TenderDetails',
    component: TenderDetails,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Tenders',
          active: false,
          to: { name: 'tenders' }
        },
        {
          text: 'Tender Details',
          active: true
        }
      ]
    }
  },
  {
    path: '/contract/:id',
    name: 'ContractDetails',
    component: ContractDetails,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'contractManagement',
          active: false,
          to: { name: 'contractManagement' }
        },
        {
          text: 'Contract Details',
          active: true
        }
      ]
    }
  },
  {
    path: '/supplierManagement',
    name: 'supplierManagement',
    component: SupplierManagement,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'buyers' }
        },
        {
          text: 'Supplier Management',
          active: true
        }
      ]
    }
  },
  {
    path: '/SupplierDashboard',
    name: 'SupplierDashboard',
    component: SupplierDashboard,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'Supplier' }
        },
        {
          text: 'Supplier Dashboard',
          active: true
        }
      ]
    }
  },
  {
    path: '/SupplierTenders',
    name: 'SupplierTenders',
    component: SupplierTenders,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'Supplier' }
        },
        {
          text: 'Supplier Tenders',
          active: true
        }
      ]
    }
  },
  {
    path: '/supplier/:id',
    name: 'SupplierDetails',
    component: SupplierDetails,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Suppliers',
          active: false,
          to: { name: 'SupplierDashboard' }
        },
        {
          text: 'Supplier Details',
          active: true
        }
      ]
    }
  },
  {
    path: '/contractManagement',
    name: 'contractManagement',
    component: ContractManagement,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'buyers' }
        },
        {
          text: 'Contract Management',
          active: true
        }
      ]
    }
  },
  {
    path: '/orderManagement',
    name: 'orderManagement',
    component: OrderManagement,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Buyer',
          active: false,
          to: { name: 'buyers' }
        },
        {
          text: 'Order Management',
          active: true
        }
      ]
    }
  },
  // Profile route
  {
    path: '/profile',
    name: 'profile',
    component: ProfileSettings,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Profile Settings',
          active: true
        }
      ]
    }
  },
  // Bidding route
  {
    path: '/bidding',
    name: 'bidding',
    component: BiddingDashboard,
    meta: {
      layout: DashboardLayout,
      topLeftSlot: Breadcrumb,
      breadcrumbs: [
        {
          text: 'Home',
          active: false,
          to: { name: 'home' }
        },
        {
          text: 'Bidding Dashboard',
          active: true
        }
      ]
    }
  },
    // Bid Confirmation Route
    {
      path: '/bid-confirmation',
      name: 'bidConfirmation',
      component: BidConfirmation,
      meta: {
        layout: DashboardLayout,
        topLeftSlot: Breadcrumb,
        breadcrumbs: [
          {
            text: 'Home',
            active: false,
            to: { name: 'home' }
          },
          {
            text: 'Bidding',
            active: false,
            to: { name: 'bidding' }
          },
          {
            text: 'Bid Confirmation',
            active: true
          }
        ]
      }
    },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router