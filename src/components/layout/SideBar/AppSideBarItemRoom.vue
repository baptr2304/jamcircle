<script setup>
import AppSideBarItem from "@/components/layout/SideBar/AppSideBarItem.vue";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import Input from "@/components/ui/input/Input.vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Separator from "@/components/ui/separator/Separator.vue";
import { Watch } from "lucide-vue-next";

const data = ref({
	id: 8,
	icon: "IconDoor",
	title: "Your Room",
	url: "/room",
	type: "button",
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
	return rooms.value.filter((room) =>
		room.name.toLowerCase().includes(roomName.value.toLowerCase())
	);
});
const isOpen = ref(false);
const classAnimate = ref("");

watch(isOpen, (value) => {
	classAnimate.value = value ? "animate-rotate-up" : "animate-rotate-down";
});
</script>
<template>
	<Collapsible v-model:open="isOpen" class="space-y-2">
		<CollapsibleTrigger as-child>
			<div class="flex items-center justify-between space-x-4 px-4 cursor-pointer">
				<AppSideBarItem v-bind="data" style="padding-left: 0" />
				<Icon name="IconArrowDown" :class="classAnimate" />
			</div>
		</CollapsibleTrigger>
		<CollapsibleContent class="space-y-2 py-2 px-4">
			<div class="relative w-full max-w-sm items-center">
				<Input v-model="roomName" id="find" type="text" placeholder="Search..." class="pl-10" />
				<span class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2">
					<Icon name="IconSearch" class="w-4 text-white" />
				</span>
				<Separator class="my-2" />
			</div>
			<ScrollArea class="w-full h-36">
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
</template>
