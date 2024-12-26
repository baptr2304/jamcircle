<script setup>
import AppSideBarGroup from '@/components/layout/SideBar/AppSideBarGroup.vue'
import AppSideBarItem from '@/components/layout/SideBar/AppSideBarItem.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const data = ref({
  groupA: [
    {
      id: 1,
      icon: 'IconUser',
      title: 'User Management',
      url: '/admin',
    },
    {
      id: 2,
      icon: 'IconChart',
    title: 'Statistics',
      url: '/admin/statistics',
      content: 'Login to view your playlist',
      requiredAuthen: true,
    },
  ],

})
</script>

<template>
  <div class="flex flex-col duration-200 w-[15rem] bg-transparent ease-linear">
    <div
      class="flex gap-2 pl-6 py-6 cursor-pointer"
      @click="$router.push('/admin')"
    >
      <Icon name="IconLogo" class="w-9 text-foreground" />
      <span class="text-secondary-foreground text-3xl font-mono">JamCirle</span>
    </div>
    <ScrollArea class="w-full" style="height: calc(100% - 6rem)">
      <div
        class="flex flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden gap-0"
      >
        <AppSideBarGroup class="mb-8">
          <template v-for="item in data.groupA" :key="item.id">
            <AppSideBarItem v-bind="item" />
          </template>
        </AppSideBarGroup>
      </div>
    </ScrollArea>
  </div>
</template>
