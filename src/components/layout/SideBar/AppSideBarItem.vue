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
	textStyle: {
		type: String,
		default: "text-sm",
	},
});

const route = useRoute();
const isActive = computed(() => props.url === route.path);
</script>

<template>
	<component
		:is="props.type"
		v-bind="props.type === 'router-link' ? { to: props.url } : {}"
		:class="isActive || props.type !== 'router-link' ? 'opacity-100' : 'opacity-50'"
		class="flex py-2 pl-4 gap-4 items-center cursor-pointer text-foreground"
	>
		<Icon :name="props.icon" class="w-6 h-6" />
		<span class="font-bold" :class="props.textStyle">{{ props.title }}</span>
	</component>
</template>
