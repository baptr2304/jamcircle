<template>
	<router-view v-slot="{ Component, route }">
		<transition name="slide">
			<div :key="route.name">
				<component :is="Component"></component>
			</div>
		</transition>
	</router-view>
</template>
