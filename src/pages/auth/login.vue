<route>
  {
      name: 'auth-login',
      path: '/auth/login',
      meta: {
          layout: "auth",
          title: "Login"
      }
  }
  </route>

<script setup>
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { useAuthStore } from '@/stores/auth'
import { emailSchema, requiredStringSchema } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const isLoading = ref(false)
const authStore = useAuthStore()
const formSchema = toTypedSchema(
  z.object({
    email: emailSchema,
    mat_khau: requiredStringSchema,
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isLoading.value = true
    await authStore.login(values)
  }
  catch (error) {
    const errorMessage = error?.response?.data?.detail || 'Something went wrong.'
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
      description: 'Something went wrong.',
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
      LOGIN
    </h1>
    <form class="mt-[2.25rem]" @submit=" onSubmit ">
      <FormField v-slot=" { componentField } " name="email" class="gap-2.5">
        <FormItem>
          <Label class="font-semibold">Email Address</Label>
          <FormControl>
            <Input
              type="text" placeholder="Email address" class="rounded-[0.25rem] h-[2.875rem]"
              v-bind=" componentField "
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot=" { componentField } " name="mat_khau">
        <FormItem class="mt-4">
          <Label class="font-semibold">Password</Label>
          <FormControl>
            <Input
              type="password" placeholder="Password" class="rounded-[0.25rem] h-[2.875rem]"
              v-bind=" componentField "
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button
        type="submit"
        class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-6 h-[2.875rem] rounded-full"
      >
        <template v-if="isLoading">
          <div class="flex w-full p-8 justify-center gap-2 items-center">
            <Icon name="IconLoading" />
            Please wait...
          </div>
        </template>
        <template v-else>
          LOGIN
        </template>
      </Button>
    </form>
    <div class="text-center mt-4 font-medium">
      Don't have an account?
    </div>
    <Button
      type="submit" class="lg:w-[26.375rem] md:w-[26.375rem] sm:w-[20rem] w-[17rem] mt-2 h-[2.875rem] rounded-full bg-white text-black duration-300 hover:text-white shadow-inherit border-2 hover:border-0"
      @click="$router.push('/auth/register')"
    >
      REGISTER
    </Button>
  </div>
</template>
