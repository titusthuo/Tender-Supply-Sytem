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
import BiddingDashboard from '../components/Bidding/Dashboard.vue'
import CarrierDashboard from '../components/Carrier/CarrierDashboard.vue'
import CarrierRequestForm from '../components/Carrier/CarrierRequestForm.vue'
import CarrierSelection from '../components/Carrier/CarrierSelection.vue'
import ShipmentTracking from '../components/Carrier/ShipmentTracking.vue'
import InternationalShipping from '../components/Carrier/InternationalShipping.vue'
import CarrierRegistration from '../components/Carrier/CarrierRegistration.vue'
import SupplierDashboard from '../components/Supplier/SupplierDashboard.vue'
import SupplierProducts from '../components/Supplier/SupplierProducts.vue'
import SupplierProfile from '../components/Supplier/SupplierProfile.vue'
import SupplierTenders from '../components/Supplier/SupplierTenders.vue'


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
    path: '/SupplierProducts',
    name: 'SupplierProducts',
    component: SupplierProducts,
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
          text: 'Supplier Products',
          active: true
        }
      ]
    }
  },
  {
    path: '/SupplierProfile',
    name: 'SupplierProfile',
    component: SupplierProfile,
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
          text: 'Supplier Profile',
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
  {
    path: '/reportAndCompliance',
    name: 'reportAndCompliance',
    component: ReportAndCompliance,
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
          text: 'Reports & Compliance',
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
  // Carrier routes
  {
    path: '/carrier',
    name: 'carrier',
    component: CarrierDashboard,
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
          text: 'Carrier Dashboard',
          active: true
        }
      ]
    }
  },
  {
    path: '/carrier/request-form',
    name: 'carrierRequestForm',
    component: CarrierRequestForm,
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
          text: 'Carrier',
          active: false,
          to: { name: 'carrier' }
        },
        {
          text: 'Request Form',
          active: true
        }
      ]
    }
  },
  {
    path: '/carrier/selection',
    name: 'carrierSelection',
    component: CarrierSelection,
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
          text: 'Carrier',
          active: false,
          to: { name: 'carrier' }
        },
        {
          text: 'Carrier Selection',
          active: true
        }
      ]
    }
  },
  {
    path: '/carrier/tracking',
    name: 'shipmentTracking',
    component: ShipmentTracking,
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
          text: 'Carrier',
          active: false,
          to: { name: 'carrier' }
        },
        {
          text: 'Shipment Tracking',
          active: true
        }
      ]
    }
  },
  {
    path: '/carrier/international',
    name: 'internationalShipping',
    component: InternationalShipping,
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
          text: 'Carrier',
          active: false,
          to: { name: 'carrier' }
        },
        {
          text: 'International Shipping',
          active: true
        }
      ]
    }
  },
  {
    path: '/carrier/registration',
    name: 'carrierRegistration',
    component: CarrierRegistration,
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
          text: 'Carrier',
          active: false,
          to: { name: 'carrier' }
        },
        {
          text: 'Registration',
          active: true
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router