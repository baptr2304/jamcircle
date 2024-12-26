<script setup>
import Button from '@/components/ui/button/Button.vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  user: Object,
})
const emit = defineEmits(['save', 'cancel'])
const selectedStatus = ref(props.user.quyen === 'quan_tri_vien' ? 'ADMIN' : 'USER')

async function save() {
  emit('save', props.user.id, selectedStatus.value.toLowerCase())
}

function cancel() {
  emit('cancel')
}
</script>

<template>
  <div class="main" @click="cancel">
    <div
      class="container bg-background relative p-8 py-12 rounded border"
      @click.stop
    >
      <h1
        class="font-medium text-3xl"
      >
        Edit Role
      </h1>
      <X class="w-4 h-4 absolute right-8 top-8 cursor-pointer" @click="cancel" />
      <form>
        <div class="flex justify-center w-full">
          <div class="w-full">
            <div class="form">
              <div class="w-full flex flex-col text-foreground items-center">
                <select
                  v-model="selectedStatus"
                  class="p-2 rounded-sm bg-background text-foreground cursor-pointer border border-primary"
                >
                  <option value="ADMIN">
                    ADMIN
                  </option>
                  <option value="USER">
                    USER
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group space-x-4 mt-8">
          <Button
            variant="outline"
            @click="cancel"
          >
            Cancel
          </Button>
          <Button
            @click="save"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.main {
  position: fixed;
  inset: 0;
  background: rgba(71, 79, 98, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.container {
  max-width: 600px;

  h1 {
    margin-bottom: 40px;
    text-align: center;
  }
}

.button-group {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
select option:hover {
  @apply bg-primary text-white;
}
</style>
