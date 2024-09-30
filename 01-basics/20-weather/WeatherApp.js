import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    return {
      weatherData: getWeatherData(),
      weatherIcons: WeatherConditionIcons,
      isNightTime: ({dt, sunrise, sunset}) => {
        const todayStr = (new Date()).toDateString();
        const dtDate = new Date(`${todayStr} ${dt}`);
        const sunriseDate = new Date(`${todayStr} ${sunrise}`);
        const sunsetDate = new Date(`${todayStr} ${sunset}`);

        return dtDate < sunriseDate || dtDate > sunsetDate;
      }
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherItem in weatherData" class="weather-card" :class="{ 'weather-card--night': isNightTime(weatherItem.current) }">
          <div v-if="weatherItem?.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherItem?.alert?.sender_name }}: {{ weatherItem?.alert?.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherItem.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherItem.current?.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" v-bind:title="weatherItem.current?.weather?.description">{{ weatherIcons[weatherItem.current?.weather?.id] }}</div>
            <div class="weather-conditions__temp">{{ (weatherItem.current?.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(weatherItem.current?.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current?.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current?.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherItem.current?.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
