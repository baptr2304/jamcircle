<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { PopoverClose } from "radix-vue";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
const props = defineProps({
	title: String,
	content: String,
	requiredAuthen: Boolean,
});
</script>

<template>
	<Popover class="bg-foreground">
		<PopoverTrigger v-if="props.requiredAuthen" as-child>
			<slot>
				<Button variant="primary">Button trigger</Button>
			</slot>
		</PopoverTrigger>
		<template v-else>
			<slot>
				<Button variant="primary">Button trigger</Button>
			</slot>
		</template>
		<PopoverContent class="w-80">
			<div class="flex flex-col gap-2 bg-transparent">
				<h4 class="title text-sm font-semibold">{{ props.title }}</h4>
				<p class="font-light">{{ props.content }}</p>
				<div class="flex justify-end gap-2 bg-transparent">
					<PopoverClose class="bg-transparent">
						<Button variant="outline" class="rounded-full">Not now</Button>
					</PopoverClose>
					<RouterLink to="/auth/login">
            <Button class="rounded-full">Log in</Button>
          </RouterLink>
				</div>
			</div>
		</PopoverContent>
	</Popover>
</template>
