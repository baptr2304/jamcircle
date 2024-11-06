<script setup>
import AppSideBar from "@/components/layout/AppSideBar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

onMounted(() => {
	console.log('mounted')
})
</script>

<template>
	<div class="flex flex-col h-full justify-between">
		<div class="flex w-full" style="height: calc(100% - 6rem)">
			<AppSideBar />
			<div class="h-full" style="width:calc(100% - 15rem)">
				<header class="flex h-16 items-center gap-2">
					<AppHeader />
				</header>
				<ScrollArea class="flex flex-1 flex-col gap-4 p-4" style="height: calc(100% - 4rem)">
					<!-- <div class="w-full h-full bg-red-400"></div> -->
					<router-view />
				</ScrollArea>
			</div>
		</div>
		<footer class="w-full h-[5.75rem]">
			<AppFooter />
		</footer>
	</div>
</template>
