<script setup>
import IconBack from '@/components/icons/IconBack.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
</script>

<template>
  <div class="auth-layout">
    <header class="logo">
      <router-link to="/home">
        <IconBack />
      </router-link>
      <div class="image-logo">
        <IconLogo />
        <h1>JamCircle</h1>
      </div>
      <div />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

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
.image-logo {
	display: flex;
	align-items: center;
}
.image-logo h1 {
	margin-left: 0.5rem;
}
.logo h1 {
	font-size: 2rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
}
</style>
