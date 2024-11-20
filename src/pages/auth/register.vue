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

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema, passwordSchema } from "@/utils/validation";
import InputValidator from "@/components/ui/form/InputValidator.vue";

const formSchema = toTypedSchema(
z
  .object({
    username: z.string().nonempty("Tên người dùng không được để trống"),
    email: emailSchema,
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm"],
  })
);

const form = useForm({
validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
console.log("Form submitted!", values);
});
</script>
<template>
<div class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2">
  <h1 class="text-2xl flex justify-center font-semibold">ĐĂNG KÝ</h1>
  <form @submit="onSubmit" class="mt-[1rem]">
    <InputValidator
      type="text"
      label="Tên người dùng"
      name="username"
      placeholder="Nhập tên người dùng"
    />
    <InputValidator
      type="email"
      label="Địa chỉ email"
      name="email"
      placeholder="nguyenvana@gmail.com"
    />
    <InputValidator type="password" label="Mật khẩu" name="password" placeholder="******" />
    <InputValidator
      type="password"
      label="Xác nhận mật khẩu"
      name="confirm"
      placeholder="******"
    />
    <Button
      type="submit"
      class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full"
    >
      ĐĂNG KÝ
    </Button>
  </form>
  <div class="text-center mt-4 font-medium">Nếu bạn đã có tài khoản</div>
  <Button
    type="submit"
    @click="$router.push('/auth/login')"
    class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0"
  >
    ĐĂNG NHẬP
  </Button>
</div>
</template>
