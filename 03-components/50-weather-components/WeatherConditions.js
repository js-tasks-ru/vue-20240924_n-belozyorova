import {defineComponent} from 'vue';
import { WeatherConditionIcons } from './weather.service';


export default defineComponent({
  name: 'WeatherConditions',

  props: {
    temp: {
      type: Number,
      required: true,
    },

    weather: {
      type: Object,
      required: true,
    }
  },

  setup() {
    return {
      weatherIcons: WeatherConditionIcons
    }
  },

  template: `
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="weather.description">{{ weatherIcons[weather.id] }}</div>
      <div class="weather-conditions__temp">{{ (temp - 273.15).toFixed(1) }} °C</div>
    </div>
  `,
})
