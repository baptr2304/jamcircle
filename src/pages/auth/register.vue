<route>
  {
      meta: {
          layout: "auth",
          title: "Register",
      }
  }
</route>
<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { emailSchema, passwordSchema } from "@/utils/validation";
import InputValidator from "@/components/ui/form/InputValidator.vue";
import { toast } from "@/components/ui/toast";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
const formSchema = toTypedSchema(
	z
		.object({
			ten_nguoi_dung: z.string(),
			email: emailSchema,
			mat_khau: passwordSchema,
			confirm: passwordSchema,
		})
		.refine((data) => data.mat_khau === data.confirm, {
			message: "Mật khẩu xác nhận không khớp",
			path: ["confirm"],
		})
);

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
	try {
		isLoading.value = true;
		await authStore.register(values);
		toast({
			title: 'Thành công',
			description: 'Đăng ký thành công',
			duration: 5000,
		})
		router.push('/auth/login')
	} catch (error) {
		console.log(error?.response?.data?.detail)
		const errorMessage = error?.response?.data?.detail || "There was a problem with your request."
		if (errorMessage) {
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
				duration: 5000,
			})
			return
		}
		toast({
			title: 'Uh oh! Something went wrong.',
			description: 'There was a problem with your request.',
			variant: 'destructive',
			duration: 5000,
		})
	}
	finally {
		isLoading.value = false;
	}
});
</script>
<template>
	<div class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2">
		<h1 class="text-2xl flex justify-center font-semibold">ĐĂNG KÝ</h1>
		<form @submit=" onSubmit " class="mt-[1rem]">
			<InputValidator type="text" label="Tên người dùng" name="ten_nguoi_dung"
				placeholder="Nhập tên người dùng" />
			<InputValidator type="email" label="Địa chỉ email" name="email" placeholder="nguyenvana@gmail.com" />
			<InputValidator id="mat_khau" type="password" label="Mật khẩu" name="mat_khau" placeholder="******" />
			<InputValidator id="confirm" type="password" label="Xác nhận mật khẩu" name="confirm"
				placeholder="******" />
			<Button type="submit"
				class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full">
				<template v-if="isLoading">
					<div v-show=" isLoading " class="flex w-full p-8 justify-center gap-2 items-center">
						<Icon name="IconLoading" />
						Please wait...
					</div>
				</template>
				<template v-else>
					ĐĂNG KÝ
				</template>
			</Button>
		</form>
		<div class="text-center mt-4 font-medium">Nếu bạn đã có tài khoản</div>
		<Button type="submit" @click="$router.push('/auth/login')"
			class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0">
			ĐĂNG NHẬP
		</Button>
	</div>
</template>
