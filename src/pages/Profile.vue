<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/stores/user";
import {
  emailSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
} from "@/utils/validation";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
onMounted(async () => {
  await userStore.fetchUser();
  gender.value = userStore.user?.gender || "";
  name.value = userStore.user?.name || "";
  email.value = userStore.user?.email || "";
});
const userStore = useUserStore();
const isEditing = ref(false);
const password = ref("");
const confirmPassword = ref("");
const email = ref(userStore.user?.email);
const name = ref(userStore.user?.name);
const gender = ref(userStore.user?.gender);

const startEdit = () => {
  isEditing.value = true;
};
const cancelEdit = () => {
  isEditing.value = false;
};
const profileSchema = toTypedSchema(
  z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema.optional(),
      confirmPassword: z.string(),
      gender: genderSchema,
    })
    .refine(
      (data) => {
        if (data.password && data.password == data.confirmPassword)
          return false;
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
    name: userStore.user?.name || "",
    email: userStore.user?.email || "",
    gender: userStore.user?.gender || "",
    password: "",
    confirmPassword: "",
  },
});
const handleSave = () => {
  if (password.value && password.value !== confirmPassword.value) {
    alert("Passwords don't match");
    return;
  }

  const updates = {
    name: name.value,
    email: email.value,
    gender: gender.value,
  };

  if (password.value) {
    updates.password = password.value;
  }

  userStore.updateUser(updates);
  console.log("User updated", updates);
  password.value = "";
  confirmPassword.value = "";
  isEditing.value = false;
};
</script>
<template>
  <div class="w-full flex justify-center">
    <div class="flex flex-col items-center w-11/12 md:w-3/4 lg:w-1/2">
      <h1 class="self-start text-2xl font-bold mt-4">Profile</h1>
      <form @submit="handleSave" class="w-full">
        <div class="mt-4">
          <Label for="name" class="ml-1">User name</Label>
          <Input
            type="text"
            placeholder=""
            class="mb-5 mt-1 h-[3rem]"
            :disabled="!isEditing"
            v-model="name"
          />
        </div>
        <div class="mt-4">
          <Label for="email" class="ml-1">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            class="mb-5 mt-1 h-[3rem]"
            :disabled="!isEditing"
            v-model="email"
          />
        </div>
        <div>
          <Label for="password" class="ml-1">Password</Label>
          <Input
            type="password"
            placeholder="*********"
            class="mb-5 mt-1 h-[3rem]"
            :disabled="!isEditing"
            v-model="password"
          />
        </div>
        <div v-if="isEditing">
          <Label for="confirm" class="ml-1">Confirm Password</Label>
          <Input
            type="password"
            placeholder="*********"
            class="mb-5 mt-1 h-[3rem]"
            v-model="confirmPassword"
          />
        </div>
        <Select v-model="gender">
          <Label for="gender" class="ml-1">Gender</Label>
          <SelectTrigger class="h-[3rem] mt-1 mb-5" :disabled="!isEditing">
            <SelectValue :placeholder="gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div class="flex justify-end">
          <div v-if="isEditing">
            <Button
              class="bg-foreground hover:bg-muted-foreground mr-2"
              @click="cancelEdit"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
          <div v-else>
            <Button @click="startEdit">Edit</Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
