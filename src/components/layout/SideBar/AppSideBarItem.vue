<script setup>
import UnauthenPopover from '@/components/common/UnauthenPopover.vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  icon: String,
  title: String,
  type: {
    type: String,
    default: 'router-link',
  },
  url: {
    type: String,
    default: '/',
  },
  textStyle: {
    type: String,
    default: 'text-sm',
  },
  requiredAuthen: Boolean,
})
const emit = defineEmits(['toggleQueue'])
const userStore = useUserStore()
const route = useRoute()
const isActive = computed(() => props.url === route.path)
const component = computed(() => {
  if (userStore.isAuthenticated)
    return props.type

  if (props.requiredAuthen)
    return 'button'
  else return 'RouterLink'
})
function handleClick() {
  if (!userStore.isAuthenticated || props.type !== 'button')
    return

  switch (props.title) {
    case 'Hàng đợi':
      emit('toggleQueue')
      break
  }
}
</script>

<template>
  <UnauthenPopover
    :title="props.title"
    :content="props.content"
    :is-required="props.requiredAuthen && !userStore.isAuthenticated"
  >
    <component
      :is="component"
      v-bind="props.type === 'router-link' ? { to: props.url } : {}"
      :class="
        isActive || props.type !== 'router-link' ? 'opacity-100' : 'opacity-50'
      "
      class="flex py-2 lg:pl-4 gap-2 items-center cursor-pointer text-foreground max-lg:flex-col bg-transparent"
      @click="handleClick"
    >
      <Icon :name="props.icon" class="w-6 h-6" />

      <span class="font-bold" :class="props.textStyle">{{ props.title }}</span>
    </component>
  </UnauthenPopover>
</template>
