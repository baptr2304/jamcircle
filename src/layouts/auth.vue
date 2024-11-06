<template>
  <div class="auth-layout">
    <header class="logo">
      <IconBack />
      <div class="image-logo">
        <IconLogo />
        <h1>JamCircle</h1>
      </div>
      <div></div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconLogo from "@/components/icons/IconLogo.vue";
import IconBack from "@/components/icons/IconBack.vue";
const isAuthenticated = ref(false);

onMounted(() => {
	console.log('mounted auth layout')
})
// You can add more logic here as needed
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
}

header,
footer {
  padding: 1rem;
  text-align: center;
}

main {
  display: flex;
  justify-content: center;
}
.logo {
  border-bottom: 1px solid #d9dadc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-logo{
  display: flex;
  align-items: center;
}
.image-logo h1{
  margin-left: 0.5rem;
}
.logo h1 {
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
