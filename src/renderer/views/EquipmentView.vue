<script setup>
import { mdiFileTreeOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import { Finder } from "@jledentu/vue-finder";
import "@jledentu/vue-finder/dist/vue-finder.css";

const sampleData = {
  id: "lab",
  label: "My Lab",
  children: [
    {
      id: "rack1",
      label: "Rack 1",
      children: [
        {
          id: "server1",
          label: "Server 1",
          children: [
            { id: "networkCard1", label: "Network Card 1" },
            { id: "networkCard2", label: "Network Card 2" },
          ],
        },
        {
          id: "server2",
          label: "Server 2",
          children: [
            { id: "networkCard3", label: "Network Card 3" },
            { id: "networkCard4", label: "Network Card 4" },
          ],
        },
      ],
    },
    {
      id: "rack2",
      label: "Rack 2",
      children: [
        {
          id: "server3",
          label: "Server 3",
          children: [
            { id: "networkCard5", label: "Network Card 5" },
            { id: "networkCard6", label: "Network Card 6" },
          ],
        },
      ],
    },
  ],
};


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
        <Finder :tree="sampleData" :selectable="true" />
      </CardBox>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
