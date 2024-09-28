import {defineComponent, createApp} from 'vue'

const App = defineComponent({
  name: 'DataVApp',
  setup() {
    const localDate = (new Date()).toLocaleDateString(navigator.language, {dateStyle: 'long'});

    return {
      localDate
    }
  },

  template: `
    <div>Сегодня {{ localDate }}</div>
  `,
})

const app = createApp(App)

const vm = app.mount('#app')

window.vm = vm
