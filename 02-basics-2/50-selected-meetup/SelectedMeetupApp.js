import { defineComponent, ref, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetup = ref(null)
    const selected = ref(1)
    
    watch(selected, async (newSelected) => {
      meetup.value = await getMeetup(newSelected)
    })

    onMounted(async () => {
      meetup.value = await getMeetup(selected.value)
    })

    return {
      meetup,
      selected,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="selected === 1"
          @click="selected--"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <template v-for="index in 5">
            <div class="radio-group__button">
              <input
                :id="'meetup-id-' + index"
                class="radio-group__input"
                type="radio"
                name="meetupId"
                :value="index"
                v-model="selected"
              />
              <label
                :for="'meetup-id-' + index"
                class="radio-group__label"
              >
                {{ index }}
              </label>
            </div>
          </template>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="selected === 5"
          @click="selected++"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup?.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
