<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg p-3 ring shadow-xl ring-gray-900/5">
        <div class="flex p-3 border-b border-gray-200">
            <div class="font-bold">{{ title }}</div>
            <div class="flex-1"></div>
        </div>
        <div class="p-3">
            <slot />
        </div>
    </div>
</template>

<script setup>
    defineProps({
        title: String
    })
</script>

<style lang="scss" scoped>

</style>