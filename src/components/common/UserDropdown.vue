<script setup>
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
const authStore = useAuthStore();
const userStore = useUserStore();
import Button from "@/components/ui/button/Button.vue";
</script>
<template>
	<DropdownMenu v-if="userStore?.user">
		<DropdownMenuTrigger as-child>
			<Button variant="ghost" class="relative p-6 w-60">
				<Avatar class="h-8 w-8 rounded-lg">
					<AvatarImage :src="userStore.user.avatar" :alt="userStore.user.name" />
					<AvatarFallback class="rounded-lg"> CN </AvatarFallback>
				</Avatar>
				<div class="grid flex-1 text-left text-sm leading-tight">
					<span class="truncate font-semibold">{{ userStore.user.name }}</span>
					<span class="truncate text-xs">{{ userStore.user.email }}</span>
				</div>
				<Icon name="IconArrowDown" class="ml-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-52 rounded-lg" side="bottom" align="end" :side-offset="4">
			<DropdownMenuItem> Profile </DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="authStore.logout()"> Log out </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
