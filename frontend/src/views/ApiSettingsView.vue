<template>
  <div style="max-width: 700px;">
    <h1 class="text-h5 font-weight-bold mb-6">API & Webhook</h1>

    <!-- API Key section -->
    <v-card class="mb-4">
      <v-card-title class="text-subtitle-1 font-weight-bold pt-4 px-4">API Key</v-card-title>
      <v-card-text class="pa-4">
        <v-text-field
          v-model="apiKey"
          label="API Key"
          readonly
          append-inner-icon="mdi-content-copy"
          class="mb-4"
          @click:append-inner="copyKey"
        />
        <v-btn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-refresh"
          :loading="generatingKey"
          @click="generateKey"
        >
          Tạo key mới
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Webhook section -->
    <v-card class="mb-4">
      <v-card-title class="text-subtitle-1 font-weight-bold pt-4 px-4">Webhook</v-card-title>
      <v-card-text class="pa-4">
        <v-text-field
          v-model="webhookUrl"
          label="Webhook URL"
          placeholder="https://your-server.com/webhook"
          class="mb-3"
          autocomplete="off"
        />
        <v-text-field
          v-model="webhookSecret"
          label="Secret (HMAC)"
          type="password"
          class="mb-4"
          autocomplete="new-password"
        />
        <div class="d-flex flex-wrap align-center mt-4">
          <v-btn color="primary" variant="flat" :loading="saving" class="mr-3 mb-2" @click="saveWebhook">Lưu cấu hình</v-btn>
          <v-btn variant="tonal" color="info" :loading="testing" class="mb-2" @click="testWebhook">Test Webhook</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- API Docs -->
    <v-card>
      <v-card-title class="text-subtitle-1 font-weight-bold pt-4 px-4">Tài liệu API cơ bản</v-card-title>
      <v-card-text class="pa-4">
        <v-sheet class="bg-surface-variant pa-4 rounded-lg" style="overflow-x: auto;">
          <pre style="font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap;"
>Header: X-API-Key: your-key

<span class="text-success font-weight-bold">GET</span>  /api/public/contacts
<span class="text-info font-weight-bold">POST</span> /api/public/contacts
<span class="text-success font-weight-bold">GET</span>  /api/public/conversations
<span class="text-info font-weight-bold">POST</span> /api/public/messages/send
<span class="text-success font-weight-bold">GET</span>  /api/public/appointments
<span class="text-info font-weight-bold">POST</span> /api/public/appointments

<span class="font-weight-bold opacity-70">Webhook events:</span>
- message.received
- message.sent
- contact.created
- zalo.connected
- zalo.disconnected</pre>
        </v-sheet>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snack.show" :color="snack.color" :timeout="3000">
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/api';

const apiKey = ref('');
const generatingKey = ref(false);
const webhookUrl = ref('');
const webhookSecret = ref('');
const saving = ref(false);
const testing = ref(false);

const snack = ref({ show: false, text: '', color: 'success' });

function showSnack(text: string, color = 'success') {
  snack.value = { show: true, text, color };
}

async function loadApiKey() {
  try {
    const res = await api.get('/settings/api-key');
    apiKey.value = res.data.apiKey ?? '';
  } catch {
    apiKey.value = '';
  }
}

async function loadWebhook() {
  try {
    const res = await api.get('/settings/webhook');
    webhookUrl.value = res.data.webhookUrl ?? '';
    webhookSecret.value = res.data.webhookSecret ?? '';
  } catch {
    webhookUrl.value = '';
    webhookSecret.value = '';
  }
}

async function generateKey() {
  generatingKey.value = true;
  try {
    const res = await api.post('/settings/api-key/generate');
    apiKey.value = res.data.apiKey ?? '';
    showSnack('API key mới đã được tạo');
  } catch {
    showSnack('Tạo key thất bại', 'error');
  } finally {
    generatingKey.value = false;
  }
}

async function copyKey() {
  if (!apiKey.value) return;
  await navigator.clipboard.writeText(apiKey.value);
  showSnack('Đã sao chép API key');
}

async function saveWebhook() {
  saving.value = true;
  try {
    await api.put('/settings/webhook', {
      webhookUrl: webhookUrl.value,
      webhookSecret: webhookSecret.value,
    });
    showSnack('Đã lưu cấu hình webhook');
  } catch {
    showSnack('Lưu thất bại', 'error');
  } finally {
    saving.value = false;
  }
}

async function testWebhook() {
  testing.value = true;
  try {
    await api.post('/settings/webhook/test');
    showSnack('Gửi test webhook thành công');
  } catch {
    showSnack('Test webhook thất bại', 'error');
  } finally {
    testing.value = false;
  }
}

onMounted(async () => {
  await Promise.all([loadApiKey(), loadWebhook()]);
});
</script>
