import { ref, computed, defineComponent, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    let nowTimestamp = ref(new Date());
    const interval = setInterval(() => nowTimestamp.value = new Date(), 1000)
    
    const displayTime = computed(() => {
      return new Intl.DateTimeFormat('en-EN', {timeStyle: 'medium'}).format(nowTimestamp.value)
    })
    
    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    return {
      displayTime
    }
  },

  template: `<div class="clock">{{ displayTime }}</div>`,
})
