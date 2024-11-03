<script setup>
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import AppSideBarItem from "@/components/layout/SideBar/AppSideBarItem.vue";
import AppSideBarItemRoom from "@/components/layout/SideBar/AppSideBarItemRoom.vue";
import AppSideBarGroup from "./SideBar/AppSideBarGroup.vue";
import Separator from "../ui/separator/Separator.vue";
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
			url: "/create-playlist",
		},
		{
			id: 4,
			icon: "IconMusic",
			title: "Create Song",
			url: "/create-song",
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
			url: "/jam",
			type: "button",
		},
		{
			id: 7,
			icon: "IconJoin",
			title: "Join room",
			url: "/setting",
			type: "button",
		},
	],
});
</script>
<template>
	<Sidebar>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<div class="flex pl-4 py-5 gap-2">
						<Icon name="IconLogo" class="w-9 text-foreground" />
						<span class="text-secondary-foreground text-3xl font-mono">JamCirle</span>
					</div>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>

		<SidebarContent class="gap-0">
			<!-- Group A -->
			<AppSideBarGroup class="mb-16">
				<template v-for="item in data.groupA" :key="item.id">
					<AppSideBarItem v-bind="item" />
				</template>
			</AppSideBarGroup>
			<!-- Broup B -->
			<AppSideBarGroup>
				<template v-for="item in data.groupB" :key="item.id">
					<AppSideBarItem v-bind="item" />
				</template>
			</AppSideBarGroup>
			<!-- Broup C -->
			<span class="pt-2 px-6">
				<Separator />
			</span>
			<AppSideBarGroup class="pt-4">
				<template v-for="item in data.groupC" :key="item.id">
					<AppSideBarItem v-bind="item" />
				</template>
				<AppSideBarItemRoom/>
			</AppSideBarGroup>
		</SidebarContent>

		<SidebarRail />
	</Sidebar>
</template>
