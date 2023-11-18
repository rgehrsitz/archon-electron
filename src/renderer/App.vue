<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import StyleView from '@/views/StyleView.vue';
import HomeView from '@/views/HomeView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import EquipmentView from '@/views/EquipmentView.vue';
import SnapshotsView from './views/SnapshotsView.vue';
import DiffView from './views/DiffView.vue';
import SettingsView from './views/SettingsView.vue';
// ... import other views as needed

const route = useRoute();

const routeComponents = {
  '/': StyleView,
  '/welcome': WelcomeView,
  '/dashboard': HomeView,
  '/equipment': EquipmentView,
  '/snapshots': SnapshotsView,
  '/diffview': DiffView,
  '/settings': SettingsView,
  // ... map other routes to components
};

const currentComponent = computed(() => routeComponents[route.path]);
</script>

<template>
  <component :is="currentComponent" />
</template>
