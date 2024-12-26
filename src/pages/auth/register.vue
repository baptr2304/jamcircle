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
      message: 'Passwords do not match',
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
      title: 'Success',
      description: 'Your account has been created successfully.',
      duration: 5000,
    })
    router.push('/auth/login')
  }
  catch (error) {
    console.log(error?.response?.data?.detail)
    const errorMessage = error?.response?.data?.detail || 'There was a problem with your request.'
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
    isLoading.value = false
  }
})
</script>

<template>
  <div class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2">
    <h1 class="text-2xl flex justify-center font-semibold">
      REGISTER
    </h1>
    <form class="mt-[1rem]" @submit=" onSubmit ">
      <InputValidator
        type="text" label="Username" name="ten_nguoi_dung"
        placeholder="Enter Username"
      />
      <InputValidator type="email" label="Email Address" name="email" placeholder="nguyenvana@gmail.com" />
      <InputValidator id="mat_khau" type="password" label="Password" name="mat_khau" placeholder="******" />
      <InputValidator
        id="confirm" type="password" label="Password confirm" name="confirm"
        placeholder="******"
      />
      <Button
        type="submit"
        class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full"
      >
        <template v-if="isLoading">
          <div v-show=" isLoading " class="flex w-full p-8 justify-center gap-2 items-center">
            <Icon name="IconLoading" />
            Please wait...
          </div>
        </template>
        <template v-else>
          REGISTER
        </template>
      </Button>
    </form>
    <div class="text-center mt-4 font-medium">
      Already have an account?
    </div>
    <Button
      type="submit" class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0"
      @click="$router.push('/auth/login')"
    >
      LOGIN
    </Button>
  </div>
</template>
