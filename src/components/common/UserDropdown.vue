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
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
};
</script>
<template>
	<div class="flex items-end">
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<div
					size="lg"
					class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
				>
					<Avatar class="h-8 w-8 rounded-lg">
						<AvatarImage :src="data.user.avatar" :alt="data.user.name" />
						<AvatarFallback class="rounded-lg"> CN </AvatarFallback>
					</Avatar>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-semibold">{{ data.user.name }}</span>
						<span class="truncate text-xs">{{ data.user.email }}</span>
					</div>
					<ChevronsUpDown class="ml-auto size-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side="bottom"
				align="end"
				:side-offset="4"
			>
				<DropdownMenuLabel class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar class="h-8 w-8 rounded-lg">
							<AvatarImage :src="data.user.avatar" :alt="data.user.name" />
							<AvatarFallback class="rounded-lg"> CN </AvatarFallback>
						</Avatar>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{{ data.user.name }}</span>
							<span class="truncate text-xs">{{ data.user.email }}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Sparkles />
						Upgrade to Pro
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BadgeCheck />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Bell />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
