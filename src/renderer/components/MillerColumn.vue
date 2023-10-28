// MillerColumn.vue

<script setup>
import { ref, computed, onMounted, onUnmounted, onUpdated } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode.js'
import { mdiFileTreeOutline } from '@mdi/js'

const columnRefs = ref([]);

// if (useDarkModeStore().isEnabled) {
//     return gradientBgDark
// }


const isDarkMode = computed(() => useDarkModeStore().isEnabled)

const selectedNode = ref(null);
const selectedNodes = ref([]);


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

const addColumn = (children) => {
    columns.value.push(children);
};

const removeColumnsAfter = (index) => {
    columns.value = columns.value.slice(0, index + 1);
};

const handleLeftClick = (node, index) => {
    selectedNodes.value[index] = node.name;
    removeColumnsAfter(index);
    if (node.children && node.children.length > 0) {
        addColumn(node.children);
    }
    // Clear selected nodes for columns that are removed
    selectedNodes.value = selectedNodes.value.slice(0, columns.value.length);
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

    // Threshold for expanding columns
    const expandThreshold = 50;

    if (totalColumnWidth > container.offsetWidth && columns.value.length > 0) {
        const leftMostUncollapsed = collapsedColumns.value.length;
        collapsedColumns.value.push(leftMostUncollapsed);
        // Recalculate totalColumnWidth after collapsing
        totalColumnWidth -= columnRefs.value[leftMostUncollapsed].offsetWidth;
    } else if (totalColumnWidth <= container.offsetWidth - expandThreshold && collapsedColumns.value.length > 0) {
        collapsedColumns.value.pop();
        // Recalculate totalColumnWidth after expanding
        const lastCollapsed = collapsedColumns.value[collapsedColumns.value.length - 1];
        totalColumnWidth += columnRefs.value[lastCollapsed].offsetWidth;
    }

    console.log('Total Column Width:', totalColumnWidth);
    console.log('Container Width:', container.offsetWidth);
    console.log('Collapsed Columns:', collapsedColumns.value);
    console.log('Column Refs:', columnRefs.value);
    columnRefs.value.forEach((column, index) => {
        console.log(`Column ${index} Width:`, column.offsetWidth);
    });

};

onMounted(() => {
    window.addEventListener('resize', checkForOverflow);
    checkForOverflow(); // Initial check
});

onUnmounted(() => {
    window.removeEventListener('resize', checkForOverflow);
});

onUpdated(() => {
    // Clear the existing refs
    columnRefs.value = [];

    // Query the DOM to get the column elements
    const columns = document.querySelectorAll('.miller-column');

    // Populate columnRefs
    columns.forEach(column => {
        columnRefs.value.push(column);
    });
});



</script>

<template>
    <div id="miller-container" class="flex overflow-x-auto">
        <div v-for="(column, index) in columns" :key="index" class="miller-column custom-column" :class="[
            collapsedColumns.includes(index) ? 'shrink-column' : ''
        ]">
            <ul>
                <li v-for="node in column" :key="node.name" :class="[
                    'cursor-pointer flex items-center',
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200',
                    node.name === selectedNodes[index] ? 'border border-blue-500 rounded' : 'border border-transparent rounded',
                    collapsedColumns.includes(index) && node.name !== selectedNodes[index] ? 'hidden' : '',
                    collapsedColumns.includes(index) && node.name === selectedNodes[index] ? 'vertical-text' : ''
                ]" @click="handleLeftClick(node, index)" @contextmenu="handleRightClick($event, node)">
                    <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24">
                        <path :d="mdiFileTreeOutline"></path>
                    </svg>
                    {{ node.name }}
                </li>
            </ul>
        </div>
    </div>
</template>




<style scoped>
/* Add your custom styles here */
.shrink-column {
    min-width: 20px !important;
    /* Override any existing min-width */
    width: 20px !important;
    /* Set the collapsed width */
}

.vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}

/* Add your custom styles here */
.custom-column {
    min-width: 100px;
    border-right: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-right: 4px !important;
}
</style>
