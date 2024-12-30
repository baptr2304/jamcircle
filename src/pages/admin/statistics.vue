<route>
  {
      meta: {
          layout: "admin",
          title: "statistics",
      }
  }
</route>

<script setup>
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()
const users = adminStore.allUsers
const isDarkMode = ref(localStorage.getItem('dark') === 'true')

const selectedYear = ref(new Date().getFullYear())

function processData(year) {
  if (!users || !users.length) {
    return Array.from({ length: 12 }).fill(0)
  }
  const data = Array.from({ length: 12 }).fill(0)
  users.forEach((user) => {
    const createdAt = new Date(user.thoi_gian_tao)
    const month = createdAt.getMonth()
    const userYear = createdAt.getFullYear()
    if (userYear === year) {
      data[month] += 1
    }
  })

  return data
}

const series = ref([
  {
    name: 'Number of registrations',
    data: processData(selectedYear.value),
  },
])

const chartOptions = ref({
  chart: {
    background: 'transparent',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  tooltip: {
    style: {
      fontSize: '20px',
    },
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  fill: {
    colors: ['#16A34A'],
  },
})

watch(isDarkMode, (newValue) => {
  chartOptions.value = {
    ...chartOptions.value,
    theme: {
      mode: newValue ? 'dark' : 'light',
    },
  }
})

watch(selectedYear, (newYear) => {
  series.value[0].data = processData(newYear)
}, { immediate: true })
function redirectAgeChart() {
  router.push('/admin/statistics/age')
}
</script>

<template>
  <div class="w-full flex justify-center items-center lg:h-full  flex-col mt-10 lg:mt-0 overflow-auto">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="self-start bg-muted ml-2">
          Thống kê
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Thống kê theo:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="redirectAgeChart">
          Số lượng đăng ký
        </DropdownMenuItem>
        <DropdownMenuItem>
          Tuổi tác
        </DropdownMenuItem>
        <DropdownMenuItem>
          Giới tính
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <h1 class="text-xl font-bold ">
      Số lượng đăng ký {{ selectedYear }}
    </h1>
    <select v-model="selectedYear" class="mb-4 p-1 mt-2 border rounded bg-muted">
      <option :value="2024">
        2024
      </option>
      <option :value="2025">
        2025
      </option>
      <option :value="2026">
        2026
      </option>
    </select>
    <div class="lg:w-3/5 w-full">
      <apexchart type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>
