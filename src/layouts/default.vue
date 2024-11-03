<!-- <script setup>
import { onMounted } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSideBar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<template>
    <div class="layout">
        <AppHeader class="layout-header" />
        <div class="layout-body">
            <AppSidebar class="layout-sidebar" />
            <main class="layout-main">
                <router-view />
            </main>
        </div>
        <AppFooter class="layout-footer" />
    </div>
</template>
<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
}

.layout-header {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    flex-shrink: 0;
}

.layout-body {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.layout-sidebar {
    width: 250px;
    background-color: #343a40;
    color: #fff;
    padding: 1rem;
    flex-shrink: 0;
    overflow-y: auto;
}

.layout-main {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background-color: #f0f2f5;
}

.layout-footer {
    background-color: #f8f9fa;
    padding: 1rem;
    text-align: center;
    flex-shrink: 0;
}
</style> -->

<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSideBar from "@/components/layout/AppSideBar.vue";
</script>

<template>
  <SidebarProvider>
    <AppSideBar />

    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 border-b px-4"
      ></header>
      <div class="flex flex-1 flex-col gap-4 p-4 min-h-0 max-h-full">
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
