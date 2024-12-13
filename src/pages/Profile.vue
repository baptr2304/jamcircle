<script setup>
import { Button } from "@/components/ui/button";
import InputValidator from "@/components/ui/form/InputValidator.vue";
import { useUserStore } from "@/stores/user";
import { emailSchema, nameSchema, passwordSchema } from "@/utils/validation";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
onMounted(async () => {
  await userStore.getUserAuth();
  form.setValues({
    username: userStore.user?.username || "",
    email: userStore.user?.email || "",
    // gender: userStore.user?.gender || "",
  });
});
const userStore = useUserStore();
const isEditing = ref(false);

const startEdit = () => {
  isEditing.value = true;
};
const cancelEdit = () => {
  isEditing.value = false;
  form.resetForm();
};
const profileSchema = toTypedSchema(
  z
    .object({
      username: nameSchema,
      email: emailSchema,
      password: passwordSchema.optional(),
      confirmPassword: z.string().optional(),
      // gender: genderSchema,
    })
    .refine(
      (data) => {
        if (data.password) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      }
    )
);
const form = useForm({
  validationSchema: profileSchema,
  initialValues: {
    username: userStore.user?.username || "",
    email: userStore.user?.email || "",
    // gender: userStore.user?.gender || "",
    password: "*************",
    confirmPassword: "*************",
  },
});
const onSubmit = form.handleSubmit(async (values) => {
  try {
    const updates = {
      username: values.username,
      email: values.email,
    };

    if (values.password) {
      updates.password = values.password;
    }

    await userStore.updateUser(updates);
    isEditing.value = false;
    form.resetForm();
  } catch (err) {
    console.error("Error in updating profile:", err);
  }
});
</script>
<template>
  <div class="w-full flex justify-center">
    <div class="flex flex-col items-center w-11/12 md:w-3/4 lg:w-1/2">
      <h1 class="self-start text-2xl font-bold mt-4 mb-2">Thông tin cá nhân</h1>
      <form @submit="onSubmit" class="w-full">
        <InputValidator
          type="text"
          label="Tên người dùng"
          name="username"
          :disabled="!isEditing"
          :custom="'h-[3rem] mb-5 mt-1'"
          v-model="form.values.username"
        />
        <InputValidator
          type="text"
          label="Địa chỉ Email"
          name="email"
          :disabled="!isEditing"
          :custom="'h-[3rem] mb-5 mt-1'"
          v-model="form.values.email"
        />
        <InputValidator
          type="password"
          label="Mật khẩu"
          name="password"
          :disabled="!isEditing"
          :custom="'h-[3rem] mb-5 mt-1'"
          placeholder="*********"
          v-model="form.values.password"
        />
        <div v-if="isEditing">
          <InputValidator
            type="password"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            :disabled="!isEditing"
            :custom="'h-[3rem] mb-5 mt-1'"
            placeholder="*********"
            v-model="form.values.confirmPassword"
          />
        </div>
        <!-- <Select v-model="form.values.gender">
          <Label for="gender" class="ml-1">Giới tính</Label>
          <SelectTrigger class="h-[3rem] mt-1 mb-5" :disabled="!isEditing">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Nam</SelectItem>
              <SelectItem value="Female">Nữ</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> -->
        <div class="flex justify-end">
          <div v-if="isEditing">
            <Button
              class="bg-foreground hover:bg-muted-foreground mr-2"
              @click="cancelEdit"
            >
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </div>
          <div v-else>
            <Button @click="startEdit">Chỉnh sửa</Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
