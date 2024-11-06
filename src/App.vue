<template>
	<router-view v-slot="{ Component, route }">
		<transition name="slide">
			<component :is="Component" :key="route.name"></component>
		</transition>
	</router-view>
</template>
