// MillerColumn.vue

<script setup>
import { ref, computed } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode.js'

// if (useDarkModeStore().isEnabled) {
//     return gradientBgDark
// }

const isDarkMode = computed(() => useDarkModeStore().isEnabled)

// Sample data structure, replace this with your actual data
const data = [
    {
        name: 'Root',
        type: 'folder',
        children: [
            {
                name: 'Child 1',
                type: 'file',
                children: []
            },
            {
                name: 'Child 2',
                type: 'folder',
                children: [
                    {
                        name: 'Grandchild 1',
                        type: 'file',
                        children: []
                    }
                ]
            }
        ]
    }
];

const columns = ref([data]);

const addColumn = (children) => {
    columns.value.push(children);
};

const removeColumnsAfter = (index) => {
    columns.value = columns.value.slice(0, index + 1);
};

const handleLeftClick = (node, index) => {
    removeColumnsAfter(index);
    if (node.children && node.children.length > 0) {
        addColumn(node.children);
    }
    // Trigger your custom event here to display additional information
};

const handleRightClick = (event, node) => {
    event.preventDefault();
    // Implement your context menu logic here
};
</script>

<template>
    <div class="flex overflow-x-auto">
        <div v-for="(column, index) in columns" :key="index" class="min-w-[200px] border-r border-gray-300">
            <ul>
                <li v-for="node in column" :key="node.name" :class="[
                    'cursor-pointer',
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                ]" @click="handleLeftClick(node, index)" @contextmenu="handleRightClick($event, node)">
                    {{ node.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
