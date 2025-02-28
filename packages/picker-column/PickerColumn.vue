<template>
    <div class="wheel-column relative select-none" v-bind="columnAttrs">
        <div ref="columnRef" class="wheel-scroll overflow-hidden " v-bind="scrollAttrs">
            <div class="wheel-inner">
                <div v-for="(vo, i) in opts" :key="i" class="wheel-item text-nowrap px-2"
                    :class="[vo.disabled ? 'wheel-disabled-item' : '', i == indexKey ? 'current' : '']"
                    v-bind="itemAttrs">
                    {{ vo.label }}
                </div>
            </div>
        </div>
        <div
            class="mask-top absolute w-full top-0 border-b-1 border-gray-300/45 bg-gradient-to-b from-white/70 to-white/40 to-90%">
        </div>
        <div
            class="mask-btm absolute w-full bottom-0 border-t-1 border-gray-300/45 bg-gradient-to-t from-white/70 to-white/40 to-90%">
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { columnProps, usePickerColumn } from './usePickerColumn'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
BScroll.use(Wheel)

const props = defineProps({
    // 下标值
    modelValue: [Number, String, Object],
    ...columnProps
})
const columnRef = ref(null)
let scroll = null
// hooks
const { getItemValue } = usePickerColumn(props)

// 标准列表项数据
const opts = computed(() => {
    const { options, optionLabel, optionValue } = props;
    return options.map(vo => {
        let label = vo, value = vo, disabled = false;
        if (typeof vo === "object") {
            label = vo[optionLabel];
            value = vo[optionValue];
            disabled = !!vo.disabled;
        }
        return { label, value, disabled }
    })
})

// 选中值
const innerValue = ref(props.modelValue)
watch(() => props.modelValue, (val) => innerValue.value = val)
// 下标值
const indexKey = ref(initKey())
function initKey() {
    const index = opts.value.findIndex(vo => {
        return vo.value === props.modelValue
    })
    return index >= 0 ? index : 0
}


if (props.modelValue == null) {
    innerValue.value = getItemValue(opts[0])
}

watch(() => opts.value, (val) => {
    if (indexKey.value > val.length) {
        innerValue.value = getItemValue(val[val.length - 1])
    }

    if (scroll) {
        nextTick(() => scroll.refresh())
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const offsetRows = computed(() => {
    return Math.floor(props.rowNumber / 2)
})
const columnAttrs = computed(() => {
    const { itemHeight } = props;
    return {
        style: {
            '--offset-rows': (offsetRows.value * itemHeight) + 'px',
        }
    }
})
// 样式
const scrollAttrs = computed(() => {
    const { align, rowNumber, itemHeight } = props;
    return {
        style: {
            textAlign: align,
            height: (itemHeight * rowNumber) + 'px',
            paddingTop: (offsetRows * itemHeight) + 'px',
        }
    }
});
// 行样式
const itemAttrs = computed(() => {
    const { itemHeight } = props
    return {
        style: {
            height: itemHeight + 'px',
            lineHeight: itemHeight + 'px',
        }
    }
});

// update
function emitValue(index) {
    const { options } = props;
    // 原始列表item
    const item = options[index];
    indexKey.value = index;
    innerValue.value = getItemValue(options[index]);
    emit('update:modelValue', innerValue.value)
    emit('change', { index, value: innerValue.value, item })
}

// 初始化
function initScroll() {
    const { rowNumber, itemHeight } = props
    const { align } = props
    scroll = new BScroll(columnRef.value, {
        wheel: {
            selectedIndex: indexKey.value,
            align,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
            wheelDisabledItemClass: 'wheel-disabled-item'
        },
        probeType: 3,
    })
    scroll.on('wheelIndexChanged', emitValue)
}
onMounted(initScroll)

</script>

<style lang="scss" scoped>
.wheel-column {

    .mask-top,
    .mask-btm {
        z-index: 2;
        pointer-events: none;
        height: var(--offset-rows);
    }
}

.wheel-inner {
    margin-top: var(--offset-rows);

    &-item {
        cursor: pointer;
    }
}
</style>