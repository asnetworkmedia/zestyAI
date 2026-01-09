import { createRouter, createWebHistory } from 'vue-router';
import Listing from './pages/listing/Listing.vue';
import Property from './pages/property/Property.vue';

const routes = [
  { path: '/', name: 'listing', component: Listing },
  { path: '/property/:id', name: 'property', component: Property, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
