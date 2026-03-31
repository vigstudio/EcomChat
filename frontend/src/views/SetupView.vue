<template>
  <div class="w-100">
    <div class="text-center mb-8">
      <div
        class="mx-auto mb-4 d-flex align-center justify-center rounded-lg"
        style="width: 48px; height: 48px; background: rgb(var(--v-theme-primary)); color: rgb(var(--v-theme-on-primary)); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
      >
        <v-icon size="24">mdi-domain</v-icon>
      </div>
      <h1 class="text-h4 font-weight-bold text-primary mb-2">Thiết lập ban đầu</h1>
      <p class="text-body-2 text-secondary">Tạo tổ chức và tài khoản quản trị hệ thống</p>
    </div>

    <v-card class="pa-8 pa-sm-10" elevation="0">
      <v-form @submit.prevent="handleSetup" ref="form">
        <div class="text-subtitle-2 text-primary font-weight-medium mb-1">Tên tổ chức / doanh nghiệp</div>
        <v-text-field 
          v-model="orgName" 
          placeholder="Công ty TNHH ABC" 
          prepend-inner-icon="mdi-office-building-outline" 
          :rules="[v => !!v || 'Bắt buộc']" 
          class="mb-4"
          bg-color="surface"
        />

        <div class="text-subtitle-2 text-primary font-weight-medium mb-1">Họ tên quản trị viên</div>
        <v-text-field 
          v-model="fullName" 
          placeholder="Nguyễn Văn A" 
          prepend-inner-icon="mdi-account-outline" 
          :rules="[v => !!v || 'Bắt buộc']" 
          class="mb-4"
          bg-color="surface"
        />

        <div class="text-subtitle-2 text-primary font-weight-medium mb-1">Email quản trị</div>
        <v-text-field 
          v-model="email" 
          placeholder="admin@company.com" 
          type="email" 
          prepend-inner-icon="mdi-email-outline" 
          :rules="[v => !!v || 'Bắt buộc']" 
          class="mb-4"
          bg-color="surface"
        />

        <div class="text-subtitle-2 text-primary font-weight-medium mb-1">Mật khẩu</div>
        <v-text-field 
          v-model="password" 
          placeholder="••••••••" 
          type="password" 
          prepend-inner-icon="mdi-lock-outline" 
          :rules="[v => v.length >= 6 || 'Tối thiểu 6 ký tự']" 
          class="mb-8"
          bg-color="surface"
        />

        <v-btn type="submit" color="primary" block size="large" :loading="loading" class="text-capitalize font-weight-bold" elevation="0">
          Hoàn tất thiết lập
        </v-btn>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-6" density="compact" closable variant="tonal">
        {{ error }}
      </v-alert>
      <v-alert v-if="success" type="success" class="mt-6" density="compact" variant="tonal">
        <template v-slot:prepend><v-icon>mdi-check-circle-outline</v-icon></template>
        Thiết lập thành công! Đang chuyển hướng...
      </v-alert>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const orgName = ref('');
const fullName = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);
const router = useRouter();
const authStore = useAuthStore();

async function handleSetup() {
  loading.value = true;
  error.value = '';
  try {
    await authStore.setup({ orgName: orgName.value, fullName: fullName.value, email: email.value, password: password.value });
    success.value = true;
    setTimeout(() => router.push('/'), 1000);
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Thiết lập thất bại';
  } finally {
    loading.value = false;
  }
}
</script>
