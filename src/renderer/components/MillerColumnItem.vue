<script setup>
import { ref, computed } from 'vue';
import { mdiFileTreeOutline } from '@mdi/js'; // Import the placeholder icon
import { useDarkModeStore } from '@/stores/darkMode.js'

// Props for receiving data from the parent component
const props = defineProps({
    columnData: Array,
    isCollapsed: Boolean,
    isSelected: Function,
    handleLeftClick: Function,
    handleRightClick: Function,
    index: Number,
});

const isDarkMode = computed(() => useDarkModeStore().isEnabled); // Assuming you have this store in your setup

</script>

<template>
    <div class="miller-column-item" :class="[
        isCollapsed ? 'shrink-column vertical-text' : ''
    ]">
        <ul>
            <li v-for="node in columnData" :key="node.name" :class="[
                'cursor-pointer flex items-center',
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200',
                isSelected(node.name) ? 'border border-blue-500 rounded' : 'border border-transparent rounded',
                isCollapsed && isSelected(node.name) ? 'vertical-text' : ''
            ]" @click="handleLeftClick(node, index)" @contextmenu="handleRightClick($event, node)">
                <svg v-if="!isCollapsed" class="w-6 h-6 mr-2" viewBox="0 0 24 24">
                    <path :d="mdiFileTreeOutline"></path>
                </svg>
                {{ node.name }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* Add your custom styles here */
.shrink-column {
    min-width: 20px !important;
    width: 20px !important;
}

.vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}
</style>
