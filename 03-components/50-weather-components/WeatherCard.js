import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'


export default defineComponent({
  name: 'WeatherCard',
  
  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    weatherItem: {
      type: Object,
      reuired: true,
    }
  },

  setup(props) {
    return {
      isNightTime: () => {
        const { dt, sunrise, sunset } = props.weatherItem.current

        return dt < sunrise || dt > sunset
      }
    }
  },

  template: `
    <li class="weather-card" :class="{ 'weather-card--night': isNightTime() }">
      <WeatherAlert v-if="weatherItem?.alert" :text="weatherItem?.alert?.sender_name + ': ' + weatherItem?.alert?.description" />
      <div>
        <h2 class="weather-card__name">
          {{ weatherItem.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ weatherItem.current?.dt }}
        </div>
      </div>
      <WeatherConditions :weather="weatherItem.current.weather" :temp="weatherItem.current.temp" />
      <WeatherDetails
        :pressure="weatherItem.current.pressure"
        :humidity="weatherItem.current.humidity"
        :clouds="weatherItem.current.clouds"
        :wind-speed="weatherItem.current.wind_speed"
      />
    </li>
  `,
})
