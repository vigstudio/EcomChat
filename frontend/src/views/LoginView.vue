<template>
  <div class="w-100">
    <div class="text-center mb-8">
      <div
        class="mx-auto mb-4 d-flex align-center justify-center rounded-lg"
        style="width: 48px; height: 48px; background: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary)); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
      >
        <v-icon size="24">mdi-message-text</v-icon>
      </div>
      <h1 class="text-h4 font-weight-bold text-primary mb-2">Đăng nhập</h1>
      <p class="text-body-2 text-secondary">Chào mừng bạn quay lại ZaloCRM</p>
    </div>

    <v-card class="pa-8 pa-sm-10" elevation="0">
      <v-form @submit.prevent="handleLogin">
        <div class="text-subtitle-2 text-primary font-weight-medium mb-1">Email làm việc</div>
        <v-text-field
          v-model="email"
          placeholder="name@company.com"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          required
          class="mb-4"
          bg-color="surface"
        />
        
        <div class="text-subtitle-2 text-primary font-weight-medium mb-1 d-flex justify-space-between">
          <span>Mật khẩu</span>
        </div>
        <v-text-field
          v-model="password"
          placeholder="••••••••"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          required
          class="mb-6"
          bg-color="surface"
        />
        
        <v-btn type="submit" color="primary" block size="large" :loading="loading" class="text-capitalize font-weight-bold" elevation="0">
          Tiếp tục
        </v-btn>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-6" density="compact" closable variant="tonal">
        {{ error }}
      </v-alert>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const needs = await authStore.checkSetup();
    if (needs) router.replace('/setup');
  } catch {}
});

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Đăng nhập thất bại';
  } finally {
    loading.value = false;
  }
}
</script>
