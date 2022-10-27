import { createApp } from 'vue'
import ThreeDS from '../../src/3DS.vue'
import store from '../../src/store/index.js'

createApp(ThreeDS).use(store).mount('#root')
