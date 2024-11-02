<script setup>
const props = defineProps({
	icon: String,
	title: String,
	type: {
		type: String,
		default: "router-link",
	},
	url: {
		type: String,
		default: "/",
	},
});

const route = useRoute();
const isActive = computed(() => props.url === route.path);
</script>

<template>
	<component
		:is="props.type"
		v-bind="props.type === 'router-link' ? { to: props.url } : {}"
		:class="isActive || props.type !== 'router-link' ? 'text-foreground' : 'text-gray-400'"
		class="flex py-2 pl-4 gap-4 items-center cursor-pointer"
	>
		<Icon :name="props.icon" class="w-6" />
		<span class="text-sm font-bold">{{ props.title }}</span>
	</component>
</template>
