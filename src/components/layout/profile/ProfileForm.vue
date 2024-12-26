<script setup>
import { Button } from '@/components/ui/button'
import InputValidator from '@/components/ui/form/InputValidator.vue'
import { emailSchema, nameSchema, passwordSchema } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const props = defineProps({
  user: Object,
  onSubmit: Function,
  isAdmin: Boolean,
  context: {
    type: String,
    default: 'self',
  },
})

const isEditing = ref(false)
const avatarPreview = ref(props.user?.avatar || '')
const isAvatarRemoved = ref(false)

const profileSchema = toTypedSchema(
  z
    .object({
      username: nameSchema,
      email: emailSchema,
      password: passwordSchema.optional(),
      confirmPassword: z.string().optional(),
      role: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.password) {
          return data.password === data.confirmPassword
        }
        return true
      },
      {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      },
    ),
)

const form = useForm({
  validationSchema: profileSchema,
  initialValues: {
    username: props.user?.username || '',
    email: props.user?.email || '',
  },
})

const handleSubmit = form.handleSubmit(async (values) => {
  const updatedValues = {
    ...values,
    avatar: isAvatarRemoved.value ? null : avatarPreview.value,
  }
  await props.onSubmit(updatedValues)
  isEditing.value = false
  form.resetForm()
})
function handleAvatarChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
      isAvatarRemoved.value = false
    }
    reader.readAsDataURL(file)
  }
}
function removeAvatar() {
  avatarPreview.value = props.user?.avatar || ''
  isAvatarRemoved.value = true
}
function startEdit() {
  isEditing.value = true
}
function cancelEdit() {
  isEditing.value = false
  form.resetForm()
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="flex flex-col items-center w-11/12 md:w-3/4 lg:w-1/2">
      <h1 class="self-start text-2xl font-bold mt-4 mb-2">
        Personal Information
      </h1>

      <form class="w-full" @submit="handleSubmit">
        <div class="relative w-24 h-24 mb-4">
          <img
            v-if="avatarPreview"
            v-lazy="avatarPreview"
            alt="Avatar"
            class="w-full h-full rounded-lg border-2 border-popover-foreground object-cover"
          >
          <div
            v-if="isEditing && avatarPreview && context !== 'editUser'"
            class="absolute rounded-lg inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer "
          >
            <label class="text-white text-sm font-medium cursor-pointer">
              Edit
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleAvatarChange"
              >
            </label>
          </div>
        </div>

        <button
          v-if="isEditing && avatarPreview && context !== 'editUser'"
          type="button"
          class="text-red-500 text-sm mb-4"
          @click="removeAvatar"
        >
          Remove Avatar
        </button>
        <InputValidator
          v-model="form.values.username"
          type="text"
          label="Username"
          name="username"
          :disabled="!isEditing || context === 'editUser'"
          custom="h-[3rem] mb-5 mt-1"
        />
        <InputValidator
          v-model="form.values.email"
          type="text"
          label="Email Address"
          name="email"
          disabled
          custom="h-[3rem] mb-5 mt-1"
        />
        <InputValidator
          v-if="isAdmin && context === 'editUser'"
          v-model="form.values.role"
          type="text"
          label="Role"
          name="role"
          :disabled="!isEditing"
          custom="h-[3rem] mb-5 mt-1"
        />
        <div class="flex justify-end">
          <div v-if="isEditing">
            <Button
              class="bg-foreground hover:bg-muted-foreground mr-2"
              @click="cancelEdit"
            >
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
          <div v-else>
            <Button @click="startEdit">
              Edit
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
