<route>
  {
    path: '/admin/statistics',
    meta:{
        title: 'Admin',
        layout: 'admin'
    }
}
</route>

<script setup>
import { useAdminStore } from '@/stores/admin'
import { computed } from 'vue'

const adminStore = useAdminStore()
const users = adminStore.allUsers

const isDarkMode = ref(localStorage.getItem('dark') === 'true')
const series = ref([{
  name: 'Number of registrations',
  data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
}])
const chartOptions = ref({
  chart: {
    background: 'transparent',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  tooltip: {
    style: {
      fontSize: '20px',
    },
  },
  theme: {
    mode: computed(() => (isDarkMode.value ? 'dark' : 'light')).value,
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
</script>

<template>
  <div class="w-full flex justify-center items-center lg:h-full flex-col  mt-10 lg:mt-0">
    <h1 class="text-xl font-bold">
      Registration statistics
    </h1>
    <div class="lg:w-3/5 w-full">
      <apexchart type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>
