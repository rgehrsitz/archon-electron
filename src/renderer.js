/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// import './index.css';

// console.log('👋 This message is being logged by "renderer.js", included via Vite');

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './renderer/App.vue'
import router from './renderer/router'
import { useMainStore } from './renderer/stores/main.js'

import './renderer/css/main.css'

// Init Pinia
const pinia = createPinia()

// Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
import { useDarkModeStore } from './renderer/stores/darkMode'

const darkModeStore = useDarkModeStore(pinia)

if (
    (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    localStorage['darkMode'] === '1'
) {
    darkModeStore.set(true)
}

// Default title tag
const defaultDocumentTitle = 'Archon'

// Set document title from route meta
router.afterEach((to) => {
    document.title = to.meta?.title
        ? `${defaultDocumentTitle} - ${to.meta.title}`
        : defaultDocumentTitle
})
