<template>
  <v-app :class="{ 'liquid-bg': isDark }">
    <!-- Top bar — flat effect -->
    <v-app-bar density="comfortable" flat class="border-b">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-1" />

      <!-- AI Core Orb + Title -->
      <div class="d-flex align-center" style="gap: 12px;">
        <div
          class="d-flex align-center justify-center rounded-lg"
          style="width: 32px; height: 32px; background: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary));"
        >
          <v-icon size="18">mdi-forum</v-icon>
        </div>
        <v-app-bar-title class="pa-0">
          <span class="font-weight-bold text-primary" style="font-size: 1.1rem">Zalo CRM</span>
        </v-app-bar-title>
      </div>

      <!-- Global search -->
      <GlobalSearch class="mx-4" />

      <v-spacer />

      <!-- Status indicator -->
      <div
        class="d-flex align-center mr-4 px-3 py-1 rounded-pill bg-surface"
        style="border: 1px solid rgb(var(--v-theme-surface-variant));"
      >
        <span class="status-dot mr-2"></span>
        <span class="text-caption font-weight-bold text-success" style="letter-spacing: 0.5px;">ONLINE</span>
      </div>

      <span class="text-subtitle-2 font-weight-medium mr-3" v-if="authStore.user">{{ authStore.user.fullName }}</span>
      <NotificationBell />
      <v-btn icon variant="text" @click="toggleTheme" class="mr-1">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
      <v-btn icon variant="text" @click="logout" class="mr-2">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar navigation -->
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" class="border-r pt-2">
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.path"
          rounded="lg"
          class="mb-1 mx-2"
        />
      </v-list>

      <template #append>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-chevron-left"
            title="Thu gọn"
            @click.stop="rail = !rail"
            rounded="xl"
            class="mx-2"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import NotificationBell from '@/components/NotificationBell.vue';
import GlobalSearch from '@/components/GlobalSearch.vue';

const theme = useTheme();
const authStore = useAuthStore();
const router = useRouter();

const drawer = ref(true);
const rail = ref(false);
const isDark = ref(localStorage.getItem('theme') !== 'light');

onMounted(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'light';
});

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', path: '/' },
  { title: 'Tin nhắn', icon: 'mdi-message-text-outline', path: '/chat' },
  { title: 'Khách hàng', icon: 'mdi-account-group-outline', path: '/contacts' },
  { title: 'Tài khoản Zalo', icon: 'mdi-cellphone-link', path: '/zalo-accounts' },
  { title: 'Lịch hẹn', icon: 'mdi-calendar-clock-outline', path: '/appointments' },
  { title: 'Báo cáo', icon: 'mdi-chart-arc', path: '/reports' },
  { title: 'Nhân viên', icon: 'mdi-account-cog-outline', path: '/settings' },
  { title: 'API & Webhook', icon: 'mdi-api', path: '/api-settings' },
];

function toggleTheme() {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'dark' : 'light';
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>
