import { createApp } from 'vue'
import App from './App.vue'

import { registerPlugin } from '@/plugins/globalPlugin.js';
import { globalComponent } from '@/js/register/globalComponent.js';
import { globalPopup } from '@/js/register/popup';

const app = createApp(App);
registerPlugin(app);
globalComponent(app);
globalPopup(app);
app.mount('#app');