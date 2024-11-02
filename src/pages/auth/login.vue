<route>
    {
        meta: {
            layout: "auth",
            title: "Login",
        }
    }
</route>
<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema, passwordSchema } from "@/utils/validation";

const formSchema = toTypedSchema(
  z.object({
    email: emailSchema,
    password: passwordSchema,
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
    <h1 class="text-2xl flex justify-center font-semibold">ĐĂNG NHẬP</h1>
    <form @submit="onSubmit" class="mt-[2.25rem]">
      <FormField v-slot="{ componentField }" name="email" class="gap-2.5">
        <FormItem>
          <Label class="font-semibold">Địa chỉ Email</Label>
          <FormControl>
            <Input
              type="text"
              placeholder="Email address"
              class="rounded-[0.25rem] h-[2.875rem]"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="mt-4">
          <Label class="font-semibold">Mật khẩu</Label>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              class="rounded-[0.25rem] h-[2.875rem]"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button
        type="submit"
        class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full"
      >
        ĐĂNG NHẬP
      </Button>
    </form>
    <div class="text-center mt-4 font-medium">
      Bạn đã đăng ký tài khoản chưa?
    </div>
    <Button
      @click="$router.push('/auth/register')"
      type="submit"
      class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0"
    >
      ĐĂNG KÝ
    </Button>
  </div>
</template>
