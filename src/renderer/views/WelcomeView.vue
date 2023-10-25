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

// const chartData = ref(null)

// const fillChartData = () => {
//   chartData.value = chartConfig.sampleChartData()
// }

onMounted(() => {
  //fillChartData()
})

const mainStore = useMainStore()

function handleClick () {
  //handle the click
}
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
        <button @click="handleClick" class="text-blue-500">
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
