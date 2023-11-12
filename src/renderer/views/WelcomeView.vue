<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiChartTimelineVariant,
  mdiDelta,
  mdiFilePlusOutline,
  mdiFolderOpenOutline,
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithoutButton from '@/components/SectionTitleLineWithoutButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import EquipmentModel from '../models/equipment';
import { useEquipmentStore } from '@/stores/equipmentStore';

onMounted(() => {
  //fillChartData()
})

const mainStore = useMainStore()
const equipmentStore = useEquipmentStore();

const selectedFilePath = ref(null);

const fileContent = ref(null);

const openAndReadFile = async () => {
  try {
    const filePaths = await window.electron.openFileDialog();
    if (filePaths.length > 0) {
      const content = await window.electron.readFile(filePaths[0]);
      // Parse the content into a JavaScript object
      const equipmentData = JSON.parse(content);
      // Create an Equipment instance from the parsed data
      const rootEquipment = EquipmentModel.Equipment.fromJSON(JSON.stringify(equipmentData));
      // Update the store with the new root equipment
      equipmentStore.setRootEquipment(rootEquipment);
    }
  } catch (error) {
    console.error('Error loading equipment:', error);
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithoutButton :icon="mdiDelta" title="Archon - Welcome" main>
      </SectionTitleLineWithoutButton>

      <SectionMain class="font-bold text-xl p-0">Start</SectionMain>

      <SectionMain>
        <button @click="handleClick" class="text-blue-500">
          <BaseIcon :path="mdiFilePlusOutline" :size="20" />
          New Project
        </button>
        <br />
        <button @click="openAndReadFile" class="text-blue-500">
          <BaseIcon :path="mdiFolderOpenOutline" :size="20" />
          Open Project
        </button>
      </SectionMain>

      <SectionMain class="font-bold text-xl p-0">Recent</SectionMain>
      <SectionMain>
        <p class="p-0">Example1</p>
        <p class="p-0">Example2</p>
        <p class="p-0">Example3</p>
      </SectionMain>

    </SectionMain>
  </LayoutAuthenticated>
</template>
