<template>
    
    <div class="card">
        <div class="lm-title">多列：picker-view</div>

        <kui-picker-view emit-value v-model="value" :options="options"></kui-picker-view>

        <div>
            选中：{{ value }}
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import address from '../assets/addr.json';

const options = [
    new Array(30).fill().map((_, i) => ({ label: '列A' + i, value: 'value-A' + i })),
    new Array(30).fill().map((_, i) => ({ label: '列B' + i, value: 'value-B' + i })),
    new Array(30).fill().map((_, i) => ({ label: '列C' + i, value: 'value-C' + i })),
];

const value = ref();
const addrValue = ref();

console.log(address);

</script>

<style lang="scss" scoped></style>