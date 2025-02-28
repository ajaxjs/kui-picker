<template>
  <div class="card">
    <div class="text-lg font-bold">单列 picker-column</div>
    <div class="grid gap-4">
      <label>
        <input type="checkbox" v-model="attrs.emitValue" />
        <span> emitValue</span>
      </label>
    </div>

    <div class="bg-sky-500/100 px-5 rounded-sm">
      <KuiPickerColumn v-model="value" :options="options" v-bind="attrs" />
    </div>
    <div>选中：{{ value }}</div>
    <div>属性：{{ attrs }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const attrs = ref({ emitValue: true })

const options = new Array(30).fill().map((_, i) => {
  const disabled = i == 3
  return {
    label: `选项${i}`,
    value: 'value-' + i,
    disabled
  }
})

const value = ref()
</script>

<style lang="scss" scoped></style>