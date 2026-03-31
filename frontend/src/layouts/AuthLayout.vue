<template>
  <v-app class="bg-background">
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
      <v-container style="max-width: 420px; width: 100%;">
        <slot />
        
        <div class="text-center mt-8">
          <p class="text-caption text-secondary">
            &copy; {{ new Date().getFullYear() }} ZaloCRM Enterprise.
          </p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
