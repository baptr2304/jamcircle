<route>
  {
      meta: {
          layout: "auth",
          title: "Register",
      }
  }
</route>

<script setup>
import { Button } from '@/components/ui/button'
import InputValidator from '@/components/ui/form/InputValidator.vue'
import { toast } from '@/components/ui/toast'
import { useAuthStore } from '@/stores/auth'
import { emailSchema, passwordSchema, requiredStringSchema } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const formSchema = toTypedSchema(
  z
    .object({
      ten_nguoi_dung: requiredStringSchema,
      email: emailSchema,
      mat_khau: passwordSchema,
      confirm: passwordSchema,
    })
    .refine(data => data.mat_khau === data.confirm, {
      message: 'Mật khẩu không khớp.',
      path: ['confirm'],
    }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true
    await authStore.register(values)
    toast({
      title: 'Thành công',
      description: 'Đăng ký thành công.',
      duration: 5000,
    })
    router.push('/auth/login')
  }
  catch (error) {
    const errorMessage = error?.response?.data?.detail || 'Có lỗi xảy ra.'
    if (errorMessage) {
      toast({
        title: 'Thất bại',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      })
      return
    }
    toast({
      title: 'Thất bại',
      description: 'Có lỗi xảy ra',
      variant: 'destructive',
      duration: 5000,
    })
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2">
    <h1 class="text-2xl flex justify-center font-semibold">
      Đăng ký tài khoản
    </h1>
    <form class="mt-[1rem]" @submit=" onSubmit ">
      <div class="mb-4">
        <InputValidator
          type="text" label="Tên người dùng" name="ten_nguoi_dung"
          placeholder="Nhập tên người dùng"
        />
      </div>
      <div class="mb-4">
        <InputValidator type="email" label="Địa chỉ email" name="email" placeholder="nguyenvana@gmail.com" />
      </div>
      <div class="mb-4">
        <InputValidator id="mat_khau" type="password" label="Mật khẩu" name="mat_khau" placeholder="******" />
      </div>
      <div class="mb-4">
        <InputValidator
          id="confirm" type="password" label="Xác nhận mật khẩu" name="confirm"
          placeholder="******"
        />
      </div>
      <Button
        type="submit"
        class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full"
      >
        <template v-if="isLoading">
          <div v-show=" isLoading " class="flex w-full p-8 justify-center gap-2 items-center">
            <Icon name="IconLoading" />
            Vui lòng chờ...
          </div>
        </template>
        <template v-else>
          Đăng ký
        </template>
      </Button>
    </form>
    <div class="text-center mt-4 font-medium">
      Đã có tài khoản?
    </div>
    <Button
      type="submit" class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0"
      @click="$router.push('/auth/login')"
    >
      Đăng nhập
    </Button>
  </div>
</template>
