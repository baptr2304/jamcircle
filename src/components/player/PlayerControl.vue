<!-- create playercontrol.vue to control music player -->
<script setup>
function playPause() {
    // play or pause the music
}
function prev() {
    // play the previous song
}

function next() {
    // play the next song
}
</script>
<template>
	<footer>
		<div class="player-control">
			<button @click="playPause">
				<i v-if="isPlaying" class="fas fa-pause"></i>
				<i v-else class="fas fa-play"></i>
			</button>
			<button @click="prev">
				<i class="fas fa-backward"></i>
			</button>
			<button @click="next">
				<i class="fas fa-forward"></i>
			</button>
		</div>
	</footer>
</template>
