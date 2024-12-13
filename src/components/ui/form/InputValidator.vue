<script setup lang="js">
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import { computed, ref } from 'vue'

// Định nghĩa props
const props = defineProps({
  id: {
    type: String,
    default: 'text',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: 'Text',
  },
  name: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  custom: {
    type: String,
    default: '',
  },
})

// State hiển thị mật khẩu
const isShowPassword = ref(false)

// Hàm toggle icon hiển thị mật khẩu
function toggleShowIcon() {
  isShowPassword.value = !isShowPassword.value
}

// Giá trị type input được tính toán
const typeInputComputed = computed(() => {
  return props.type === 'password' && isShowPassword.value ? 'text' : props.type
})
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.name" :validate-on-blur="false">
    <div class="space-y-2">
      <Label :for="props.id">{{ props.label }}</Label>
      <FormItem class="relative">
        <FormControl>
          <Input
            :id="props.id"
            :type="typeInputComputed"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :class="props.custom"
            v-bind="componentField"
            class="pr-9 rounded-[0.25rem]"
            autocomplete="off"
            @keydown.stop
          />
          <div
            v-if="props.type === 'password'"
            class="w-10 h-10 absolute right-0 top-0 cursor-pointer flex items-center justify-center"
            @click="toggleShowIcon"
          >
            <Icon v-if="!isShowPassword" name="IconEyeOff" class="w-6 h-6" />
            <Icon v-else name="IconEyeOn" class="w-6 h-6" />
          </div>
          <FormMessage class="error-message" />
        </FormControl>
      </FormItem>
    </div>
  </FormField>
</template>

<style scoped>
.error-message {
	margin-top: 4px !important;
}
</style>
