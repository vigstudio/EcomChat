import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'light',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#09090B', // Zinc 950
          surface: '#18181B', // Zinc 900
          'surface-variant': '#27272A', // Zinc 800
          'surface-light': '#27272A', // Zinc 800
          primary: '#FAFAFA', // Zinc 50
          secondary: '#A1A1AA', // Zinc 400
          accent: '#2563EB', // Blue 600
          error: '#EF4444', 
          warning: '#F59E0B',
          success: '#10B981',
          info: '#3B82F6',
          'on-background': '#FAFAFA',
          'on-surface': '#FAFAFA',
          'on-surface-variant': '#FAFAFA',
          'on-surface-light': '#FAFAFA',
          'on-primary': '#18181B',
        },
      },
      light: {
        dark: false,
        colors: {
          background: '#FAFAFA', // Zinc 50
          surface: '#FFFFFF', // White
          'surface-variant': '#E4E4E7', // Zinc 200
          'surface-light': '#F4F4F5', // Zinc 100
          primary: '#18181B', // Zinc 900
          secondary: '#71717A', // Zinc 500
          accent: '#0F172A', // Slate 900
          error: '#DC2626',
          warning: '#D97706',
          success: '#059669',
          info: '#2563EB',
          'on-background': '#18181B',
          'on-surface': '#18181B',
          'on-surface-variant': '#18181B',
          'on-surface-light': '#18181B',
          'on-primary': '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    VBtn: { 
      variant: 'flat', 
      rounded: 'lg', 
      elevation: 0 
    },
    VTextField: { 
      variant: 'outlined', 
      density: 'comfortable', 
      rounded: 'lg',
      hideDetails: 'auto',
      color: 'primary'
    },
    VSelect: { 
      variant: 'outlined', 
      density: 'comfortable', 
      rounded: 'lg',
      color: 'primary'
    },
    VCard: { 
      rounded: 'lg', 
      variant: 'outlined',
      elevation: 0
    },
    VChip: {
      variant: 'tonal',
      size: 'small',
      label: true,
    },
    VTab: {
      rounded: 'lg',
    },
    VDialog: { maxWidth: 600 },
    VAlert: { rounded: 'lg', variant: 'tonal' },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'primary',
    },
  },
});
