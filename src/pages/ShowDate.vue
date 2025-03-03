<template>
    <LmCard title="日期选择">
        <button @click="dateVisib = true"
            class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-indigo-500">日期选择</button>
        <kui-button @click="$refs['dateRef'].show()">日期选择</kui-button>
        <div>
            当前日期：{{ dateStr }}
        </div>
    </LmCard>
    <!-- <kui-dialog v-model="dateVisib">
        <div>123</div>
    </kui-dialog> -->
    <kui-picker-date ref="dateRef" v-model="dateStr" v-model:show="dateVisib" />
</template>

<script setup>
import { ref } from 'vue'
const dateVisib = ref(false)
const dateStr = ref('农历 2025-7-28 11:40');

const options = new Array(30).fill().map((_, i) => ({ label: '选项' + i, value: i }))

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>

<style lang="scss" scoped></style>