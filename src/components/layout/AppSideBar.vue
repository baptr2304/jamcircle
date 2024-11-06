<script setup>
import AppSideBarItem from "@/components/layout/SideBar/AppSideBarItem.vue";
import AppSideBarItemRoom from "@/components/layout/SideBar/AppSideBarItemRoom.vue";
import AppSideBarGroup from "@/components/layout/SideBar/AppSideBarGroup.vue";
import Separator from "../ui/separator/Separator.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
const data = ref({
	groupA: [
		{
			id: 1,
			icon: "IconHome",
			title: "Home",
			url: "/home",
		},
		{
			id: 2,
			icon: "IconLibrary",
			title: "Your Playlist",
			url: "/playlist",
		},
	],
	groupB: [
		{
			id: 3,
			icon: "IconAdd",
			title: "Create Playlist",
			url: "/playlist/create",
		},
		{
			id: 4,
			icon: "IconMusic",
			title: "Create Song",
			url: "/song/create",
		},
		{
			id: 5,
			icon: "IconFavorite",
			title: "Favorite",
			url: "/favorite",
		},
	],
	groupC: [
		{
			id: 6,
			icon: "IconJam",
			title: "Jam",
			type: "button",
		},
		{
			id: 7,
			icon: "IconJoin",
			title: "Join room",
			type: "button",
		},
	],
});
</script>
<template>
	<div
		class="flex flex-col duration-200 w-[15rem] bg-transparent ease-linear"
	>
		<div class="flex gap-2 pl-6 py-6 cursor-pointer" @click="$router.push('/home')">
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
	
				<AppSideBarGroup>
					<template v-for="item in data.groupB" :key="item.id">
						<AppSideBarItem v-bind="item" />
					</template>
				</AppSideBarGroup>
	
				<span class="pt-2 px-6">
					<Separator />
				</span>
				<AppSideBarGroup class="pt-4">
					<template v-for="item in data.groupC" :key="item.id">
						<AppSideBarItem v-bind="item" />
					</template>
				</AppSideBarGroup>
			</div>
			<AppSideBarItemRoom class="pl-2 h-[20rem]" />
		</ScrollArea>
	</div>
</template>
