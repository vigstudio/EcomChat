<template>
  <v-row>
    <v-col v-for="card in cards" :key="card.title" cols="6" sm="4" md="2">
      <v-card variant="outlined" class="h-100">
        <v-card-text class="pa-4 d-flex flex-column align-start">
          <div class="d-flex w-100 justify-space-between align-center mb-2">
            <div class="text-caption font-weight-medium text-secondary text-truncate pr-2" :title="card.title">{{ card.title }}</div>
            <v-icon :icon="card.icon" :color="card.color" size="20" />
          </div>
          <div class="text-h5 font-weight-bold text-primary mt-auto">{{ card.value }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface KpiData {
  messagesToday: number;
  messagesUnreplied: number;
  messagesUnread: number;
  appointmentsToday: number;
  newContactsThisWeek: number;
  totalContacts: number;
}

const props = defineProps<{
  kpi: KpiData | null;
}>();

const cards = computed(() => [
  { title: 'Tin nhắn hôm nay', value: props.kpi?.messagesToday ?? '—', icon: 'mdi-chat', color: 'primary' },
  { title: 'Chưa trả lời', value: props.kpi?.messagesUnreplied ?? '—', icon: 'mdi-chat-alert', color: 'warning' },
  { title: 'Chưa đọc', value: props.kpi?.messagesUnread ?? '—', icon: 'mdi-email-outline', color: 'orange' },
  { title: 'Lịch hẹn hôm nay', value: props.kpi?.appointmentsToday ?? '—', icon: 'mdi-calendar-today', color: 'success' },
  { title: 'KH mới tuần này', value: props.kpi?.newContactsThisWeek ?? '—', icon: 'mdi-account-plus', color: 'info' },
  { title: 'Tổng khách hàng', value: props.kpi?.totalContacts ?? '—', icon: 'mdi-account-group', color: 'secondary' },
]);
</script>
