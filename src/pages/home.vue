<route>
  {
      meta: {
          layout: "default",
          title: "Home"
      }
  }
</route>
<script setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CardList from "@/components/home/Card/CardList.vue";
</script>

<template>
  <div>
    <CardList />
  </div>
  <!-- <Popover>
    <PopoverTrigger> Open popover </PopoverTrigger>
    <PopoverContent> Some popover content </PopoverContent>
  </Popover>
  <br />
  <Icon name="IconLogo" class="text-blue-500 w-8 h-8" />
  <Icon name="IconPlus" class="text-rose-600 w-10 h-10" />
  <Icon name="IconBack" />
  <RouterLink to="/auth/login">Login</RouterLink> -->
</template>
