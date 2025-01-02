<script setup>
import { uploadImage } from '@/api/upload'
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import Button from '@/components/ui/button/Button.vue'
import InputValidator from '@/components/ui/form/InputValidator.vue'
import { toast } from '@/components/ui/toast'
import { useSongStore } from '@/stores/song'
import { useUserStore } from '@/stores/user'
import { requiredStringSchema } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useDropZone } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { nextTick } from 'vue'
import * as z from 'zod'

const router = useRouter()
const songStore = useSongStore()
const userStore = useUserStore()

const dropZoneRef = ref(null)
const audioFile = ref()
const inputRef = ref(null)
const audioRef = ref(null)
const imageRef = ref(null)
const previewAudio = ref(null)
const imageFile = ref(null)
const imagePreview = ref(null)
const isUploading = ref(false)
function onDrop(files) {
  if (files.length === 0)
    return
  audioFile.value = files[0]
}

useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  multiple: false,
  preventDefaultForUnhandled: true,
})

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: requiredStringSchema,
    }),
  ),
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    if (!imageFile.value) {
      toast({
        title: 'Thất bại',
        description: 'Vui lòng tải lên ảnh bìa cho bài hát của bạn',
        variant: 'destructive',
        duration: 5000,
      })
      return
    }
    isUploading.value = true
    const { url } = await uploadImage(imageFile.value)
    const data = {
      ten_bai_hat: values.name,
      anh: url,
      ten_ca_si: userStore.user?.ten_nguoi_dung ?? 'Vô danh',
      file: audioFile.value,
    }

    await songStore.uploadSongToServer(data)
    toast({
      title: 'Thành công',
      description: 'Bài hát của bạn đã được tải lên thành công',
      duration: 5000,
    })
    router.push('/home')
  }
  finally {
    isUploading.value = false
  }
})

watch(audioFile, async (value) => {
  if (value)
    inputRef.value.value = null
  previewAudio.value = URL.createObjectURL(value)
  await nextTick()
  if (audioRef.value)
    await audioRef.value.load()
})
const nameSong = computed(() => {
  if (audioFile.value) {
    const fileName = audioFile.value.name
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return fileName
    }
    return fileName.substring(0, lastDotIndex)
  }
  return ''
})
function hanldeUploadThumbnail(event) {
  const file = event.target.files[0]
  if (!file)
    return
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}
</script>

<template>
  <input ref="inputRef" type="file" class="hidden" accept="audio/*" @input="onDrop($event.target.files)">
  <div class="pb-4">
    <PlaylistHeader icon="IconUpload" title="Đăng tải bài hát" />
  </div>
  <div class="overflow-y-auto scrollbar px-8 grid gap-4 max-w-7xl mx-auto grid-cols-1 md:grid-cols-2">
    <div class="container flex items-center flex-col gap-10 pb-10">
      <div
        ref="dropZoneRef"
        class="w-full max-w-80 rounded border border-foreground border-dashed flex justify-center items-center h-40 cursor-pointer"
        @click="inputRef.click()"
      >
        <div class="flex flex-col gap-2 items-center justify-center p-2">
          <Icon name="IconUploadCloud" class="w-10 h-10" />
          <span class="text-lg font-semibold text-center">Kéo và thả tệp của bạn vào đây</span>
          <span>Định dạng hỗ trợ: âm thanh</span>
        </div>
      </div>
      <audio
        v-if="previewAudio"
        ref="audioRef"
        controls
      >
        <source :src="previewAudio" type="audio/mpeg">
      </audio>
    </div>
    <form
      class="w-full max-w-96 m-auto"
      @submit="onSubmit"
    >
      <InputValidator
        :model-value="nameSong ?? null"
        type="text"
        label="Tên bài hát"
        placeholder="Nhập tên bài hát"
        name="name"
        custom="h-[3rem] mb-5 mt-1"
        @keydown.stop
      />
      <div
        class="grid gap-4 "
        :class="imageFile ? 'grid-cols-3' : ''"
      >
        <div
          class="grid w-full max-w-sm items-center gap-1.5 col-span-2"
          :class="imageFile ? 'col-span-2' : ''"
        >
          <label for="picture" class="mb-2">Ảnh bìa bài hát</label>
          <Button
            variant="secondary"
            type="button"
            @click="imageRef.click()"
          >
            <Icon name="IconUpload" class="w-8 h-8" />
            Chọn ảnh
          </Button>
          <input
            id="picture"
            ref="imageRef"
            placeholder="Chọn ảnh"
            type="file"
            accept="image/*"
            class="cursor-pointer hidden"
            @input="hanldeUploadThumbnail"
          >
        </div>
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Thumbnail"
          class="w-20 h-20 rounded-md object-cover"
        >
      </div>
      <div class="flex pt-4">
        <Button
          :disabled="!audioFile"
          type="submit"
        >
          <template v-if="isUploading">
            <div class="flex w-full p-8 justify-center gap-2 items-center">
              <Icon name="IconLoading" />
              Vui lòng chờ...
            </div>
          </template>
          <template v-else>
            Tải lên
          </template>
        </Button>
      </div>
    </form>
  </div>
</template>
