import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const a = ref(0)
    const b = ref(0)
    const operation = ref('sum')

    const result = computed(() => {
      let res;

      switch (operation.value) {
        case 'subtract':
          res = a.value - b.value
          break;
        case 'multiply':
          res = a.value * b.value
          break;
        case 'divide':
          res = a.value / b.value
          break;
        case 'sum':
        default:
          res = a.value + b.value
      }

      return res;
    })

    return {
      a,
      b,
      operation,
      result
    }
  },

  template: `
    <div class="calculator">
      <input
        type="number"
        aria-label="First operand"
        v-model="a"
      />

      <div class="calculator__operators">
        <label>
          <input type="radio" name="operator" value="sum" v-model="operation" />
          ➕
        </label>
        <label>
          <input type="radio" name="operator" value="subtract" v-model="operation" />
          ➖
        </label>
        <label>
          <input type="radio" name="operator" value="multiply" v-model="operation" />
          ✖
        </label>
        <label>
          <input type="radio" name="operator" value="divide" v-model="operation" />
          ➗
        </label>
      </div>

      <input
        type="number"
        aria-label="Second operand"
        v-model="b"
      />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
