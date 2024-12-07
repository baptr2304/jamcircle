<script setup>
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSideBar from "@/components/layout/AppSideBar.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex w-full lg:[height:calc(100%-5.75rem)] h-[calc(100%-10rem)]"
    >
      <AppSideBar class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full lg:[width:calc(100%-15rem)]">
        <header class="flex h-16 items-center">
          <AppHeader />
        </header>
        <ScrollArea class="flex flex-1 flex-col gap-4 bg-muted">
          <router-view />
        </ScrollArea>
      </div>
    </div>
    <footer class="w-full h-40 lg:h-[5.75rem]">
      <AppFooter />
    </footer>
  </div>
</template>
