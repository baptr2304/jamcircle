<script setup>
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Input from "@/components/ui/input/Input.vue";
import AppSideBarItem from "@/components/layout/SideBar/AppSideBarItem.vue";
import AppSideBarGroup from "./SideBar/AppSideBarGroup.vue";
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
	collapsible: {
		id: 8,
		icon: "IconDoor",
		title: "Your room",
		type: "button",
	},
});
const rooms = ref([
	{
		id: 1,
		name: "bap tr",
	},
	{
		id: 2,
		name: "trong khoa",
	},
	{
		id: 3,
		name: "dua hau",
	},
	{
		id: 4,
		name: "dua gang",
	},
	{
		id: 5,
		name: "bo",
	},
	{
		id: 6,
		name: "nau",
	},
]);

const roomName = ref("");
const listRoom = computed(() => {
	return rooms.value.filter((room) => room.name.toLowerCase().includes(roomName.value.toLowerCase()));
});
const isOpen = ref(false);
</script>
<template>
	<Sidebar>
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<div class="flex pl-6 py-7 gap-2">
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
				<Collapsible v-model:open="isOpen" class="space-y-2">
					<CollapsibleTrigger as-child>
						<div class="flex items-center justify-between space-x-4 px-4 cursor-pointer">
							<AppSideBarItem v-bind="data.collapsible" style="padding-left: 0" />
							<Icon
								name="IconArrowDown"
								:class="isOpen ? 'animate-rotate-up' : 'animate-rotate-down'"
							/>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent class="space-y-2 p-1 pl-4">
						<div class="relative w-full max-w-sm items-center">
							<Input
								v-model="roomName"
								id="find"
								type="text"
								placeholder="Search..."
								class="pl-10"
							/>
							<span class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2">
								<Icon name="IconSearch" class="w-4 text-white" />
							</span>
							<Separator class="my-2" />
						</div>
						<ScrollArea class="h-72 w-full">
							<div class="flex flex-col gap-2 px-4">
								<template v-for="room in listRoom" :key="room.id">
									<div class="rounded-md border px-4 py-3 font-mono text-sm cursor-pointer">
										{{ room.name }}
									</div>
								</template>
							</div>
						</ScrollArea>
					</CollapsibleContent>
				</Collapsible>
			</AppSideBarGroup>
		</SidebarContent>

		<SidebarRail />
	</Sidebar>
</template>
