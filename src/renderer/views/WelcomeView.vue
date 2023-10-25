<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiFilePlusOutline,
  mdiFolderOpenOutline,
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithoutButton from '@/components/SectionTitleLineWithoutButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

const transactionBarItems = computed(() => mainStore.history)

function handleClick () {
  //handle the click
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithoutButton :icon="mdiChartTimelineVariant" title="Archon - Welcome" main>
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
