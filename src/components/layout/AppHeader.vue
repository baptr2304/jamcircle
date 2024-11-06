<script setup>
import UserDropdown from "@/components/common/UserDropdown.vue";
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
};
const searchValue = ref("");
const router = useRouter();
const route = useRoute();
const inputSearch = useTemplateRef("input-search");
const handleNavigate = () => {
	if (route.name === "Search") return;
	router.push({ name: "Search", query: { q: searchValue.value } });
};
function handleUpdateQuery() {
	router.push({ query: { q: searchValue.value } });
}
onMounted(() => {
	if (route.query.q) {
		searchValue.value = route.query.q;
	}
	if (Object.keys(route.query).includes("q")) inputSearch.value.focus();
});
</script>
<template>
	<div class="flex items-center justify-between w-full h-full p-2">
		<div class="relative w-full max-w-sm items-center ml-8">
			<input
				ref="input-search"
				v-model="searchValue"
				@focus="handleNavigate"
				@change="handleUpdateQuery"
				id="search"
				type="text"
				placeholder="Search..."
				class="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 text-background rounded-full bg-foreground"
			/>
			<span class="absolute start-0 inset-y-0 flex items-center justify-center h-10" style="left: 0.75rem">
				<Icon name="IconSearch" class="w-4 text-background" />
			</span>
		</div>
		<UserDropdown />
	</div>
</template>
