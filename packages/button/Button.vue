<template>
    <button class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem]/5 font-semibold">
        {{ label }}
        <slot />
    </button>
</template>

<script setup>
defineProps({
    label: String,
})
</script>

<style lang="scss" scoped>

</style>