<script setup lang="js">
import { ref, computed } from 'vue'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'

// Định nghĩa props
const props = defineProps({
  id: 'text',
  type: 'text',
  label: 'Text',
  name: 'text',
  placeholder: 'Text',
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
			<div class="relative">
				<FormControl>
					<Input
						:id="props.id"
						:type="typeInputComputed"
						:placeholder="props.placeholder"
						v-bind="componentField"
						class="pr-9 rounded-[0.25rem]"
						autocomplete="off"
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
			</div>
		</div>
	</FormField>
</template>

<style scoped>
.error-message {
	margin-top: 4px !important;
}
</style>
