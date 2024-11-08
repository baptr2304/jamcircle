<script setup>
import AppFooter from './components/layout/AppFooter.vue';
</script>
<template>
	<router-view v-slot="{ Component }">
		<transition name="slide">
			<component :is="Component"></component>
		</transition>
	</router-view>
</template>
