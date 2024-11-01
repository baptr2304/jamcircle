<script setup>
import { defineProps, computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
    validator(value) {
      return value.startsWith('Icon');
    }
  },
});

const component = computed(() => {
  return defineAsyncComponent(() => import(`../icons/${props.name}.vue`));
});
</script>

<template>
  <component
    :is="component"
    role="img"
    class="inline-block fill-current"
  />
</template>
