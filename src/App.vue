<script setup>
import ErrorBoundary from './components/ErrorBoundary.vue';
import Toaster from './components/ui/toast/Toaster.vue';


const isDarkMode = ref(localStorage.getItem("dark") === "true");

watch(isDarkMode, (value) => {
	document.body.classList.toggle("dark", value);
},{ immediate: true });

</script>
<template>
	<router-view v-slot="{ Component }">
		<transition name="slide">
			<ErrorBoundary>
				<component :is="Component"></component>
			</ErrorBoundary>
		</transition>
	</router-view>
	<Toaster/>
</template>
