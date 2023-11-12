<script setup>
import { mdiFileTreeOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import { Finder } from "@jledentu/vue-finder";
import "@jledentu/vue-finder/dist/vue-finder.css";
import { computed } from 'vue'
import { useEquipmentStore } from '../stores/equipmentStore'

const equipmentStore = useEquipmentStore();

// Convert the equipment data to a format that vue-finder understands
const equipmentTree = computed(() => {
  const convertEquipmentToTree = (equipment) => {
    return {
      id: equipment.uuid,
      label: equipment.name,
      children: equipment.children.map(convertEquipmentToTree),
    };
  };

  console.log(JSON.stringify(equipmentStore.rootEquipment));
  return equipmentStore.rootEquipment ? convertEquipmentToTree(equipmentStore.rootEquipment) : {};
});


// Event handlers
const handleSelect = ({ selected, selectedItems }) => {
  // Handle selection logic here
};

const handleExpand = ({ expanded, sourceEvent, expandedItems }) => {
  // Handle expand logic here
};


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiFileTreeOutline" title="Equipment" main>
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <Finder :tree="equipmentTree" :selectable="true" />
      </CardBox>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
