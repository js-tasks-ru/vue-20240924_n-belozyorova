import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    text: String,
  },

  template: `
    <div class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ text }}</span>
    </div>
  `,
})
