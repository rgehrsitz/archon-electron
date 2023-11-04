<template>
    <div ref="columnRef" class="miller-column-item custom-column" :class="{ 'shrink-column': isCollapsed }">
        <ul>
            <li v-for="node in nodes" :key="node.name" :class="itemClasses(node)" @click="handleClick(node)"
                @contextmenu="handleRightClick($event, node)">
                <svg v-if="!isCollapsed" class="w-6 h-6 mr-2" viewBox="0 0 24 24">
                    <path :d="iconPath"></path>
                </svg>
                {{ node.name }}
            </li>
        </ul>
    </div>
</template>



<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { mdiFileTreeOutline } from '@mdi/js';

const props = defineProps({
    nodes: Array,
    selectedNode: String,
    isCollapsed: Boolean,
    iconPath: {
        type: String,
        default: mdiFileTreeOutline
    },
    columnIndex: Number
});

const columnRef = ref(null);
//const emit = defineEmits(['node-clicked', 'node-right-clicked'])
const emit = defineEmits(['column-mounted', 'column-unmounted', 'node-clicked', 'node-right-clicked']);

const itemClasses = (node) => ({
    'cursor-pointer flex items-center': true,
    'hover:bg-gray-700': isDarkMode,
    'hover:bg-gray-200': !isDarkMode,
    'border border-blue-500 rounded': node.name === props.selectedNode,
    'border border-transparent rounded': node.name !== props.selectedNode,
    'vertical-text': props.isCollapsed && node.name === props.selectedNode,
    'hidden': props.isCollapsed && node.name !== props.selectedNode
});

const handleClick = (node) => {
    // Emit an event to the parent component with the node and its index
    console.log('Emitting node-clicked event with node and columnIndex', { node, columnIndex: props.columnIndex });
    emit('node-clicked', node, props.columnIndex);
};;

const handleRightClick = (event, node) => {
    event.preventDefault();
    // Emit an event to the parent component
    emit('node-right-clicked', { event, node });
};

onMounted(() => {
    if (columnRef.value) {
        emit('column-mounted', columnRef.value);
    }
});

onUnmounted(() => {
    if (columnRef.value) {
        emit('column-unmounted', columnRef.value);
    }
});

const isDarkMode = computed(() => useDarkModeStore().isEnabled);
</script>

<style scoped>
.shrink-column {
    min-width: 20px !important;
    width: 20px !important;
}

.vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}

.custom-column {
    min-width: 100px;
    border-right: 1px solid #ccc;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-right: 4px;
}
</style>
