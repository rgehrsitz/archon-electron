<script setup>
import { mdiFileTreeOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import { computed } from 'vue'
import { useEquipmentStore } from '../stores/equipmentStore'
import { ref } from 'vue'
import ColumnVue from '@/components/ColumnVue.vue'


const equipmentStore = useEquipmentStore();
const selectedNode = ref(null); // Reactive property for selected node
const finderRef = ref(null); // Ref for the Finder component

// Convert the equipment data to a format that vue-finder understands
const equipmentTree = computed(() => {
  const convertEquipmentToTree = (equipment) => {
    return {
      id: equipment.uuid,
      label: equipment.name,
      children: equipment.children.map(convertEquipmentToTree),
    };
  };

  //console.log(JSON.stringify(equipmentStore.rootEquipment));
  return equipmentStore.rootEquipment ? convertEquipmentToTree(equipmentStore.rootEquipment) : {};
});


// Event handlers
const handleSelect = ({ selected, selectedItems }) => {
  // Handle selection logic here
  selectedNode.value = selectedItems[0]; // Update the selected node
  //console.log(selectedItems[0]);
};

const handleClick = (event) => {
  // Access the Finder component's internal state or methods
  // This part depends on the implementation details of the Finder component
  // For example:
  const clickedNode = finderRef.value.getNodeByEvent(event);
  selectedNode.value = clickedNode;

};

const handleExpand = ({ expanded, sourceEvent, expandedItems }) => {
  // Handle expand logic here
};


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFileTreeOutline" title="Equipment" main />

      <CardBox class="mb-6" has-table>
        <column-vue :equipments="equipmentStore.rootEquipment" @select="handleSelection"></column-vue>
      </CardBox>

      <CardBox>
        <div v-if="selectedNode">
          <h3>Selected Node Details</h3>
          <p>ID: {{ selectedNode.id }}</p>
          <p>Name: {{ selectedNode.label }}</p>
          <!-- Add more details as needed -->
        </div>
        <CardBoxComponentEmpty v-else />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
