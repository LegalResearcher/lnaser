import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.470a0a8a2c2d4730bcd7f805c9ea8726',
  appName: 'مكتب الناصر للمحاماة',
  webDir: 'dist',
  server: {
    url: 'https://470a0a8a-2c2d-4730-bcd7-f805c9ea8726.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a2332',
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a2332',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
