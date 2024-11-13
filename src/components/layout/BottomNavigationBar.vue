<script setup>
import Button from "@/components/ui/button/Button.vue";
import AppSideBarItem from "@/components/layout/SideBar/AppSideBarItem.vue";

const data = ref([
	{
		id: 0,
		icon: "IconSearch",
		title: "Search",
		url: "/search",
	},
	{
		id: 1,
		icon: "IconLibrary",
		title: "Playlist",
		url: "/playlist",
		content: "Login to view your playlist",
		requiredAuthen: true,
	},
	{
		id: 2,
		icon: "IconHome",
		title: "Home",
		url: "/home",
	},
	{
		id: 3,
		icon: "IconJam",
		title: "Jam",
		type: "button",
		content: "Login to start a jam",
		requiredAuthen: true,
	},
	{
		id: 4,
		icon: "IconJoin",
		title: "Join room",
		type: "button",
		content: "Login to join room",
		requiredAuthen: true,
	},
]);
</script>
<template>
	<div class="flex justify-around h-20">
		<AppSideBarItem
			v-for="item in data"
			:key="item.id"
			v-bind="item"
			text-style="text-xs text-center font-normal"
			class="flex-col item"
		/>
	</div>
</template>
<style scoped>
.item {
	padding: 0.25rem 0.5rem;
}
</style>
