<script setup>
import { cn } from '@/lib/utils'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [Number, null], required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
const currentPosition = computed(() => {
  return `${props.modelValue ?? 0}%`
})
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    class="progress-root"
    :class="cn('relative h-[0.375rem] w-full rounded-full bg-muted-foreground', props.class)"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-foreground rounded-full progress-indicator"
      :style="`width:${currentPosition};`"
    />
  </ProgressRoot>
</template>

<style lang="scss" scoped>
.progress-root {
	&::after {
		@apply w-[0.75rem] h-[0.75rem] bg-primary rounded-full absolute top-0;
		display: none;
		transform: translate(-50%, -0.2rem);
		content: "";
		left: v-bind(currentPosition);
	}
	&:active,
	&:hover {
		@apply cursor-pointer;
		.progress-indicator {
			@apply bg-primary;
		}
		&::after {
			display: block;
		}
	}
}
</style>
