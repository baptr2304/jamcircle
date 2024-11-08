<script setup>

const isDarkMode = ref(localStorage.getItem("dark") === "true");

watch(isDarkMode, (value) => {
	document.body.classList.toggle("dark", value);
},{ immediate: true });

</script>
<template>
	<router-view v-slot="{ Component }">
		<transition name="slide">
			<component :is="Component"></component>
		</transition>
	</router-view>
</template>
