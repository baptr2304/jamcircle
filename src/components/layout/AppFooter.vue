<script setup>
import { Progress } from "@/components/ui/progress";
import VolumeControl from "@/components/song/VolumeControl.vue";
import { useUserStore } from "@/stores/user";
import { formatTime } from "@/utils/format";
import { useSongStore } from "@/stores/song";
const userStore = useUserStore();
const songStore = useSongStore();

const progress = ref(0);
const progressBar = ref(null);
const audio = ref(null);
const isPlaying = ref(false);
const isDragging = ref(false);
const songCurrentTime = ref(0);
const songDuration = ref(0);
const volume = ref(100);
const isMuted = ref(false);
watch(volume, (val) => {
	audio.value.volume = val / 100;
	isMuted.value = val === 0;
});
const updateProgress = (event) => {
	const rect = progressBar.value.getBoundingClientRect();
	if (event.clientX < rect.left) {
		progress.value = 0;
		return;
	}
	if (event.clientX > rect.right) {
		progress.value = 100;
		return;
	}
	const offsetX = event.clientX - rect.left;
	const width = rect.width;
	progress.value = Math.round((offsetX / width) * 100);
};

const handleMouseMove = (event) => {
	event.preventDefault();
	updateProgress(event);
};

const handleMouseUp = () => {
	isDragging.value = false;
	changeCurrentTime((progress.value / 100) * audio.value.duration);
	document.removeEventListener("mousemove", handleMouseMove);
	document.removeEventListener("mouseup", handleMouseUp);
};

const handleMouseDown = (event) => {
	isDragging.value = true;
	updateProgress(event);
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);
};

function handlePlay() {
	isPlaying.value = !isPlaying.value;
	if (isPlaying.value) {
		audio.value.play();
	} else {
		audio.value.pause();
	}
}
function updateTime() {
	if (isDragging.value) return;
	const { currentTime, duration } = audio.value;
	if (!duration) {
		progress.value = 0;
		return;
	}
	progress.value = (currentTime / duration) * 100;
	songCurrentTime.value = Math.floor(currentTime);
	songDuration.value = Math.floor(duration);
	if (currentTime === duration) {
		nextSong();
	}
}
function changeCurrentTime(time, type) {
	switch (type) {
		case "backward":
			audio.value.currentTime -= time;
			break;
		case "forward":
			audio.value.currentTime += time;
			break;

		default:
			audio.value.currentTime = time;
			break;
	}
	updateTime();
}
onMounted(() => {
	setInterval(updateTime, 1000);
});
onUnmounted(() => {
	clearInterval(updateTime);
});
async function resetControl() {
	isPlaying.value = true;
	progress.value = 0;
	await audio.value.load();
	audio.value.play();
	songCurrentTime.value = 0;
	changeCurrentTime(0);
}
function nextSong() {
	songStore.nextSong();
	resetControl();
}
function prevSong() {
	songStore.prevSong();
	resetControl();
}
function toggleMuted() {
	audio.value.muted = !audio.value.muted;
	isMuted.value = audio.value.muted;
}
</script>

<template>
	<div class="grid w-full h-full bg-muted-foreground select-none">
		<div
			v-if="!userStore.isAuthenticated"
			class="flex justify-between items-center p-4 well-come-bar"
		>
			<div class="flex flex-col">
				<div class="title text-sm">REVIEW FOR JAMCIRCLE</div>
				<div class="descritption">
					Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
				</div>
			</div>
			<RouterLink to="auth/login">
				<button class="flex py-4 px-8">Sign up free</button>
			</RouterLink>
		</div>
		<div class="song-controller" v-else>
			<div class="song absolute left-8 max-w-80">
				<img :src="songStore.currentSong.thumbnail" alt="" class="thumbnail" />
				<div class="song-meta w-full">
					<div class="title truncate font-semibold">{{ songStore.currentSong.name }}</div>
					<div class="artist truncate text-secondary-foreground">
						{{ songStore.currentSong.singer }}
					</div>
				</div>
			</div>
			<div class="control-bar">
				<div class="flex items-center gap-4">
					<Icon
						name="IconBackward"
						class="icon-button"
						@click="changeCurrentTime(15, 'backward')"
					/>
					<Icon name="IconPrevious" class="icon-button" @click="prevSong" />
					<button class="cursor-pointer flex p-2 rounded-full w-8 h-8" @click="handlePlay">
						<Icon v-if="isPlaying" name="IconPlay" class="cursor-pointer w-4 h-4" />
						<Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
					</button>
					<Icon name="IconNext" class="icon-button" @click="nextSong" />
					<Icon name="IconForward" class="icon-button" @click="changeCurrentTime(15, 'forward')" />
				</div>
				<div class="flex gap-4 justify-center">
					<span class="w-14 text-center">{{ formatTime(songCurrentTime) }}</span>
					<div
						ref="progressBar"
						class="flex items-center justify-center gap-2 w-96 cursor-pointer"
						@mousedown="handleMouseDown"
					>
						<Progress v-model="progress" class="w-full" />
					</div>
					<span class="w-14 text-center">{{ formatTime(songDuration) }}</span>
				</div>
			</div>
			<VolumeControl
				v-model="volume"
				:muted="isMuted"
				class="absolute right-8"
				@toggle-muted="toggleMuted"
			/>
			<audio ref="audio" controls class="hidden">
				<source :src="songStore.currentSong.source" type="audio/mpeg" />
			</audio>
		</div>
	</div>
</template>

<style scoped>
.well-come-bar {
	background: linear-gradient(90deg, #af2896 0%, #509bf5 100%);
}
button {
	@apply text-center text-sm font-bold rounded-full bg-[#f2f2f2] bg-secondary-foreground text-background hover:opacity-100 opacity-75;
	font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
		"Segoe UI Symbol", "Noto Color Emoji";
	border-radius: 500px;
}
.song-controller {
	@apply bg-secondary flex p-4 items-center justify-center gap-14 relative;
	.icon-button {
		@apply cursor-pointer w-4 h-4 hover:opacity-100 opacity-75;
	}
}
.control-bar {
	@apply flex flex-col justify-start items-center gap-2 w-[35rem] h-16;
}
.thumbnail {
	@apply w-14 h-14 rounded-lg object-cover;
}
.song {
	@apply flex gap-2 items-center;
}
</style>
