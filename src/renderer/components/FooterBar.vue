<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
import LarsLogo from './LarsLogo.vue';

const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <p>&copy;{{ year }}, <a href="" target="_blank">LARS Team</a>.</p>
        <slot />
      </div>
      <div class="md:py-2">

        <LarsLogo class="w-auto h-8 md:h-6" />

      </div>
    </BaseLevel>
  </footer>
</template>
