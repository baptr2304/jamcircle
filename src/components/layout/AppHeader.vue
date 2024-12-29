<script setup>
import UserDropdown from '@/components/common/UserDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const searchValue = ref('')
const router = useRouter()
const route = useRoute()
const inputSearch = useTemplateRef('input-search')
function handleUpdateQuery() {
  router.push({ name: 'Search', query: { q: searchValue.value } })
}
onMounted(() => {
  if (route.query.q) {
    searchValue.value = route.query.q
  }
  if (Object.keys(route.query).includes('q'))
    inputSearch.value.focus()
})
const role = computed(() => userStore.user?.role)
</script>

<template>
  <div
    class="flex items-center w-full h-full gap-2 p-2 lg:pr-8 bg-card" :class="{
      'justify-between': role !== 'quan_tri_vien',
      'justify-end': role === 'quan_tri_vien',
    }"
  >
    <div v-if="role !== 'quan_tri_vien'" class="relative w-full max-w-sm items-center ml-3 lg:ml-8">
      <input
        id="search" ref="input-search" v-model=" searchValue " type="text"
        placeholder="Tìm kiếm..." class="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 rounded-full text-black" @focus=" handleNavigate "
        @keydown.stop
        @change="handleUpdateQuery"
        autocomplete="off"
      >
      <span class="absolute start-0 inset-y-0 flex items-center justify-center h-10" style="left: 0.75rem">
        <Icon name="IconSearch" class="w-4 text-black" />
      </span>
    </div>
    <div class="flex">
      <UserDropdown v-if="userStore?.user" />
      <template v-else>
        <router-link to="/auth/register">
          <Button class="rounded-full px-6" variant="ghost">
            Đăng ký
          </Button>
        </router-link>
        <router-link to="/auth/login">
          <Button class="rounded-full px-6 bg-foreground">
            Đăng nhập
          </Button>
        </router-link>
      </template>
    </div>
  </div>
</template>
