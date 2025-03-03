<template>
    <Dialog v-model="visible">
        <div class="date-card bg-white shadow-lg border border-gray-200 border-solid rounded-lg">
            <div class="flex p-1">
                <Btn label="取消" class="border border-red-500 text-red-500 hover:bg-red-100 hover:text-red-700"
                    @click="hide" />
                <div class="flex-1 flex justify-center">
                    <div class="flex border border-blue-300 rounded-lg p-1">
                        <button v-for="(vo, i) in lifaArr" :key="i" class="px-2 rounded-md"
                            :class="[vo == lifa ? 'text-white bg-blue-500' : '']" @click="lifa = vo">
                            {{ vo }}历
                        </button>
                    </div>
                </div>
                <Btn label="确定" class="border border-sky-500 text-sky-500 hover:bg-sky-100 hover:text-sky-700"
                    @click="onConfirm" />
            </div>
            <DateView v-model="date" :lifa="lifa" />
        </div>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from '../dialog/Dialog.vue'
import DateView from './DateView.vue'
import Btn from '../button/Button.vue'

const props = defineProps({
    modelValue: String,
    show: Boolean,
})
const emit = defineEmits(['update:modelValue', 'update:show'])

const visible = ref(props.show)
const lifaArr = ['公', '农'];
const lifa = ref(getLifaStr(props.modelValue))
const date = ref(props.modelValue)

function getLifaStr(txt) {
    const lf = (txt || '').substr(0, 1);
    return lf && lifaArr.includes(lf) ? lf : '公';
}

watch(() => props.modelValue, (val) => date.value = val)
watch(() => props.show, (val) => {
    visible.value = val;
    date.value = props.modelValue
})
function show(){
    visible.value = true
}
function hide() {
    visible.value = false
    emit('update:show', false)
}

function onConfirm() {
    emit('update:modelValue', date.value)
    hide()
}
defineExpose({
    show,
    hide,
})
</script>

<style lang="scss" scoped>
.date-card {
    width: 320px;
}
</style>