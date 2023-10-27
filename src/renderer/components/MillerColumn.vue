// MillerColumn.vue

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode.js'

// if (useDarkModeStore().isEnabled) {
//     return gradientBgDark
// }


const isDarkMode = computed(() => useDarkModeStore().isEnabled)

const selectedNode = ref(null);

const isSelected = computed(() => {
    return selectedNode.value ? selectedNode.value.name : null;
});

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
                    },
                    {
                        name: 'Grandchild 2',
                        type: 'folder',
                        children: [
                            {
                                name: 'Great-Grandchild 1',
                                type: 'file',
                                children: []
                            },
                            {
                                name: 'Great-Grandchild 2',
                                type: 'folder',
                                children: [
                                    {
                                        name: 'Great-Great-Grandchild 1',
                                        type: 'file',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Child 3',
                type: 'folder',
                children: [
                    {
                        name: 'Grandchild 3',
                        type: 'file',
                        children: []
                    },
                    {
                        name: 'Grandchild 4',
                        type: 'folder',
                        children: []
                    }
                ]
            }
        ]
    }
];


const columns = ref([data]);

const columnRefs = ref([]);

const addColumn = (children) => {
    columns.value.push(children);
};

const removeColumnsAfter = (index) => {
    columns.value = columns.value.slice(0, index + 1);
};

const handleLeftClick = (node, index) => {
    selectedNode.value = node;
    removeColumnsAfter(index);
    if (node.children && node.children.length > 0) {
        addColumn(node.children);
    }
    // Trigger your custom event here to display additional information
    console.log(node);
};

const handleRightClick = (event, node) => {
    event.preventDefault();
    // Implement your context menu logic here
};

const isShrunk = ref(false);
const collapsedColumns = ref([]);

const checkForOverflow = () => {
    const container = document.getElementById('miller-container');

    let totalColumnWidth = 0;
    columnRefs.value.forEach((column, index) => {
        if (!collapsedColumns.value.includes(index)) {
            totalColumnWidth += column.offsetWidth;
        }
    });

    if (totalColumnWidth > container.offsetWidth && columns.length > 0) {
        const leftMostUncollapsed = columns.length - 1;
        collapsedColumns.value.push(leftMostUncollapsed);
    } else if (totalColumnWidth <= container.offsetWidth && collapsedColumns.value.length > 0) {
        collapsedColumns.value.pop();
    }
};

onMounted(() => {
    window.addEventListener('resize', checkForOverflow);
    checkForOverflow(); // Initial check
});

onUnmounted(() => {
    window.removeEventListener('resize', checkForOverflow);
});

</script>

<template>
    <div id="miller-container" class="flex overflow-x-auto">
        <div v-for="(column, index) in columns" :key="index" ref="el => { if (el) columnRefs[index] = el }" :class="[
            'min-w-[200px] border-r border-gray-300',
            collapsedColumns.includes(index) ? 'shrink-column' : ''
        ]">
            <ul>
                <li v-for="node in column" :key="node.name" :class="[
                    'cursor-pointer',
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200',
                    node.name === isSelected ? 'border border-blue-500 rounded vertical-text' : 'border border-transparent rounded'
                ]" @click="handleLeftClick(node, index)" @contextmenu="handleRightClick($event, node)">
                    {{ node.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/* Add your custom styles here */
.shrink-column {
    width: 20px;
    /* or any small width */
}

.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
}
</style>
