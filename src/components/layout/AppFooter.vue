<script setup>
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const progress = ref(0);
const progressBar = ref(null);
const audio = ref(null);
const isPlaying = ref(false);
const isDragging = ref(false);
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
function updateTime(e) {
	if (isDragging.value) return;
	const { currentTime, duration } = e.target;
	progress.value = (currentTime / duration) * 100;
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
}
</script>

<template>
	<div class="grid w-full h-full bg-muted-foreground">
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
				<img src="https://i.ytimg.com/vi/CRK7M0TIAso/maxresdefault.jpg" alt="" class="thumbnail" />
				<div class="song-meta w-full">
					<div class="title truncate font-semibold">Hello, Dolly!</div>
					<div class="artist truncate text-secondary-foreground">Louis Armstrong</div>
				</div>
			</div>
			<div class="control-bar">
				<div class="flex items-center gap-4">
					<Icon
						name="IconBackward"
						class="icon-button"
						@click="changeCurrentTime(15, 'backward')"
					/>
					<Icon name="IconPrevious" class="icon-button" />
					<button class="cursor-pointer flex p-2 rounded-full w-8 h-8" @click="handlePlay">
						<Icon v-if="isPlaying" name="IconPlay" class="cursor-pointer w-4 h-4" />
						<Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
					</button>
					<Icon name="IconNext" class="icon-button" />
					<Icon name="IconForward" class="icon-button" @click="changeCurrentTime(15, 'forward')" />
				</div>
				<div
					ref="progressBar"
					class="flex items-center justify-center gap-2 w-96 cursor-pointer"
					@mousedown="handleMouseDown"
				>
					<Progress v-model="progress" class="w-full" />
				</div>
			</div>
			<audio ref="audio" controls @timeupdate="updateTime" class="hidden">
				<source
					src="https://res.cloudinary.com/dzdfgj03g/video/upload/v1730885321/y2mate.com_-_BIGDADDY_ft_GREY_D_M%C6%AFA_TH%C3%82M_L%E1%BA%B6NG_GI%E1%BB%9CI_OFFICIAL_MUSIC_VIDEO_s1xzma.mp3"
					type="audio/mpeg"
				/>
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
