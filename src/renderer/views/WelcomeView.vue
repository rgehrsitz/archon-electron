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


onMounted(() => {
  //fillChartData()
})

const mainStore = useMainStore()

const selectedFilePath = ref(null);

const openFileDialog = async () => {
  // Use the exposed 'openFileDialog' method from the preload script
  const filePaths = await window.electron.openFileDialog();

  if (filePaths.length > 0) {
    // Handle the file path, for example, display it or read the file
    selectedFilePath.value = filePaths[0];
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
        <button @click="openFileDialog" class="text-blue-500">
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
