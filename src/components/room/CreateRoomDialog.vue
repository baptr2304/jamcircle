<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ref } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:open", "create"]);

const roomName = ref("");

const handleCreate = () => {
  if (!roomName.value.trim()) return;
  emit("create", roomName.value);
  emit("update:open", false);
};
</script>

<template>
  <Dialog :open="open" @update:open="(value) => emit('update:open', value)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Start a Jam!</DialogTitle>
        <DialogDescription>
          Enter a name for your jam room. Click start when you're ready.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="room-name" class="text-right"> Room Name </Label>
          <Input
            id="room-name"
            v-model="roomName"
            placeholder="Enter room name"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          :disabled="!roomName.trim()"
          @click="handleCreate"
        >
          Start
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
