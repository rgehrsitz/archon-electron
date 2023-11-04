// MillerColumn.vue

<script setup>
import { computed, onMounted, onUnmounted, onUpdated } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode.js'
import { mdiFileTreeOutline } from '@mdi/js'
import MillerColumnItem from './MillerColumnItem.vue'; // Import the new component
import { ref } from 'vue';


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
                                    },
                                    {
                                        name: 'Great-Great-Grandchild 2',
                                        type: 'file',
                                        children: []
                                    },
                                    {
                                        name: 'Great-Great-Grandchild 3',
                                        type: 'file',
                                        children: []
                                    },
                                    {
                                        name: 'Great-Great-Grandchild 4',
                                        type: 'file',
                                        children: []
                                    }
                                ]
                            }
                        ]
                    },
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
    if (index < columns.value.length - 1) {
        columns.value.splice(index + 1);
    }
};

const handleLeftClick = (node, columnIndex) => {

    console.log('Node Name:', node.name)
    console.log('Index value:', columnIndex)
    selectedNodes.value[columnIndex] = node.name;



    removeColumnsAfter(columnIndex);
    if (node.children && node.children.length > 0) {
        // Check if the next column exists, update it, or add a new one
        if (columns.value.length > columnIndex + 1) {
            columns.value[columnIndex + 1] = node.children;
        } else {
            columns.value.push(node.children);
        }
    } else {
        // If there are no children, ensure we don't have extra columns
        removeColumnsAfter(columnIndex);
    }
    // Clear selected nodes for columns that are removed
    selectedNodes.value = selectedNodes.value.slice(0, columns.value.length);
    console.log('Selected Nodes:', selectedNodes.value)
};

const handleColumnMounted = (columnElement) => {
    columnRefs.value.push(columnElement);
    checkForOverflow();
};

const handleColumnUnmounted = (columnElement) => {
    const index = columnRefs.value.findIndex((ref) => ref === columnElement);
    if (index > -1) {
        columnRefs.value.splice(index, 1);
    }
    checkForOverflow();
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
    const expandThreshold = 150;

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
    const columnElements = document.querySelectorAll('.miller-column-item');

    // Populate columnRefs
    columnElements.forEach(column => {
        columnRefs.value.push(column);
    });

    // Re-check for overflow after updating
    checkForOverflow();
});




</script>

<template>
    <div id="miller-container" class="flex overflow-x-auto fixed-height">
        <MillerColumnItem v-for="(column, index) in columns" :key="index" :nodes="column"
            :selectedNode="selectedNodes[index]" :isCollapsed="collapsedColumns.includes(index)" :columnIndex="index"
            @node-clicked="handleLeftClick" @node-right-clicked="handleRightClick" @column-mounted="handleColumnMounted"
            @column-unmounted="handleColumnUnmounted" />
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

.fixed-height {
    max-height: 80px;
    overflow-y: auto;
}
</style>
